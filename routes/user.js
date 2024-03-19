import express from "express";
import { getRefCode } from "../controllers/user";
import { isVerifiedUser } from "../middlewares/isVerifiedUser";

const router = express.Router();

router.get("/get-referel-code", isVerifiedUser, getRefCode);

export default router;
