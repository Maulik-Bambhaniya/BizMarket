import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAgencyProfile,
    updateBusinessProfile
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.mw.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);

// Add new routes for agency and business profile updates
router.route("/agency-profile").post(verifyJWT, updateAgencyProfile);
router.route("/business-profile").post(verifyJWT, updateBusinessProfile);

export default router;
