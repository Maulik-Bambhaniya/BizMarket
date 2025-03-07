import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Business } from "../models/business.model.js";

// Get all businesses with filtering and sorting
const getAllBusinesses = asyncHandler(async (req, res) => {
    let { searchTerm, sortBy, sortOrder } = req.query;
    let page = parseInt(req.query.page) || 1; // Default page 1
    let limit = parseInt(req.query.limit) || 10; // Default limit 10

    let query = {};
    let sort = {};

    // Search Term
    if (searchTerm) {
        query.$or = [
            { businessName: { $regex: searchTerm, $options: 'i' } },
            { businessDescription: { $regex: searchTerm, $options: 'i' } },
            { type: { $regex: searchTerm, $options: 'i' } }
        ];
    }

    // Sorting
    if (sortBy) {
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
        // Default sorting by createdAt descending
        sort.createdAt = -1;
    }

    const businesses = await Business.find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(limit);

    if (!businesses || businesses.length === 0) {
        throw new ApiError(404, "No businesses found");
    }

    //Get total number of documents and pages for pagination
    const totalBusinesses = await Business.countDocuments(query);
    const totalPages = Math.ceil(totalBusinesses / limit);

    return res
        .status(200)
        .json(new ApiResponse(200, {
            businesses,
            page,
            limit,
            totalPages,
            totalBusinesses
        }, "Businesses fetched successfully"));
});

// Get a single business by ID
const getBusinessById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const business = await Business.findById(id);

    if (!business) {
        throw new ApiError(404, "Business not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, business, "Business fetched successfully"));
});

export {
    getAllBusinesses,
    getBusinessById
};
