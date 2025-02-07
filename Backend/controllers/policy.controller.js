import mongoose from "mongoose";
import Policy from "../models/policy.model.js";

export const getPolicy = async (req, res) => {
  try {
    const policies = await Policy.find({});
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    console.log("Error in fetching policy:", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const createPolicy = async (req, res) => {
  try {
    const policyData = req.body;

    policyData.harga_premi = policyData.harga_kendaraan * policyData.rate_premi;

    const newPolicy = new Policy(policyData);
    await newPolicy.save();

    res.status(201).json({ success: true, data: newPolicy });
  } catch (error) {
    console.error("Error creating policy:", error.message);

    if (error.name === "ValidationError") {
      const errors = {};

      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid data type",
        errors: { [error.path]: `Invalid value for ${error.path}` },
      });
    }

    res.status(500).json({ success: false, message: "Server Error" });
  }
};
