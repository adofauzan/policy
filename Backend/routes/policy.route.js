import express from "express";
import { createPolicy, getPolicy } from "../controllers/policy.controller.js";

const router = express.Router();

router.get("/", getPolicy);
router.post("/", createPolicy);

export default router;
