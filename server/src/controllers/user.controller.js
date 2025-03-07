import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Agency } from "../models/agency.model.js"; // Import Agency model
import { Business } from "../models/business.model.js"; // Import Business model

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    console.log("Received request body:", req.body); // Debugging
    const { email, username, password } = req.body;

    if ([email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({
        email,
        password,
        username,
        userType: 0 // Set default userType to 0 (general)
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered Successfully")); // Correct status code
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({ $or: [{ username }, { email }] });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken, userType: user.userType }, "User logged in successfully")); // Include userType in response
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });

    const options = { httpOnly: true, secure: true };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const options = { httpOnly: true, secure: true };
        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findByIdAndUpdate(req.user?._id, { $set: { email } }, { new: true }).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
});

// New controller function to update agency profile
const updateAgencyProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        agencyName,
        agencyOwner,
        agencyDescription,
        agencyEmail,
        agencyWebsite,
        services
    } = req.body;

    if (!agencyName || !agencyOwner || !agencyEmail || !services) {
        throw new ApiError(400, "All agency profile fields are required");
    }

    const agency = await Agency.create({
        agencyName,
        agencyOwner,
        agencyDescription,
        agencyEmail,
        agencyWebsite,
        services,
        user: userId // Associate the agency profile with the user
    });

    if (!agency) {
        throw new ApiError(500, "Failed to create agency profile");
    }

    // Optionally update userType in the User model
    await User.findByIdAndUpdate(userId, { $set: { userType: 2 } });

    return res.status(201).json(new ApiResponse(201, agency, "Agency profile created successfully"));
});

// New controller function to update business profile
const updateBusinessProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        businessName,
        businessOwner,
        businessDescription,
        businessEmail,
        businessWebsite,
        type
    } = req.body;

    if (!businessName || !businessOwner || !businessEmail || !type) {
        throw new ApiError(400, "All business profile fields are required");
    }

    const business = await Business.create({
        businessName,
        businessOwner,
        businessDescription,
        businessEmail,
        businessWebsite,
        type,
        user: userId // Associate the business profile with the user
    });

    if (!business) {
        throw new ApiError(500, "Failed to create business profile");
    }
    // Optionally update userType in the User model
    await User.findByIdAndUpdate(userId, { $set: { userType: 1 } });


    return res.status(201).json(new ApiResponse(201, business, "Business profile created successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAgencyProfile, // Export the new function
    updateBusinessProfile // Export the new function
};
