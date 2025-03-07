import { Router } from "express";
import {
    getAllAgencies,
    getAgencyById
} from "../controllers/agency.controller.js";

const router = Router();

router.route("/").get(getAllAgencies);
router.route("/:id").get(getAgencyById);

export default router;
