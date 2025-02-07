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

export const deletePolicy = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Policy.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Policy deleted" });
  } catch (error) {
    console.log("Error in deleting policy:", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const updatePolicy = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid policy ID" });
  }

  try {
    let policy = await Policy.findById(id);
    if (!policy) {
      return res
        .status(404)
        .json({ success: false, message: "Policy not found" });
    }

    if (
      updateData.harga_kendaraan !== undefined ||
      updateData.rate_premi !== undefined
    ) {
      const harga_kendaraan =
        updateData.harga_kendaraan ?? policy.harga_kendaraan;
      const rate_premi = updateData.rate_premi ?? policy.rate_premi;

      updateData.harga_premi = harga_kendaraan * rate_premi;
    }

    const updatedPolicy = await Policy.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: updatedPolicy });
  } catch (error) {
    console.error("Error in updating policy:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
