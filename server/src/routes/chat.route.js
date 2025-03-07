import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/chat.controller.js";
import { verifyJWT } from "../middlewares/auth.mw.js";

const router = Router();

router.route("/send").post(verifyJWT, sendMessage);
router.route("/:userId").get(verifyJWT, getMessages);

export default router;