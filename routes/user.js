import express from "express";
import { getRefCode } from "../controllers/user.js";
import { isVerifiedUser } from "../middlewares/isVerifiedUser.js";

const router = express.Router();

router.get("/get-referel-code", isVerifiedUser, getRefCode);

export default router;
