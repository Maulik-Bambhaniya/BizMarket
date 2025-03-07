import { Router } from "express";
import {
    getAllBusinesses,
    getBusinessById
} from "../controllers/business.controller.js";

const router = Router();

router.route("/").get(getAllBusinesses);
router.route("/:id").get(getBusinessById);

export default router;
