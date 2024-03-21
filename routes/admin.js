import express from "express";
import { isAdmin } from "../middlewares/isAdmin.js";


const router=express.Router();

router.get('/all-pending-deposits',isAdmin,getAllPendingDeposits)