import express from "express";
import {
  createPolicy,
  deletePolicy,
  getPolicy,
  updatePolicy,
} from "../controllers/policy.controller.js";

const router = express.Router();

router.get("/", getPolicy);
router.post("/", createPolicy);
router.delete("/:id", deletePolicy);
router.put("/:id", updatePolicy);

export default router;
