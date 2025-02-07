import mongoose from "mongoose";
import Counter from "./counter.model.js";

const policySchema = new mongoose.Schema(
  {
    no_urut: {
      type: Number,
    },
    nomor_polis: {
      type: String,
    },
    nama: {
      type: String,
      required: [true, "Nama perlu diisi"],
    },
    tanggal_efektif: {
      type: Date,
      required: [true, "Tanggal Efektif perlu diisi"],
    },
    tanggal_expired: {
      type: Date,
      required: [true, "Tanggal Expired perlu diisi"],
    },
    merek_kendaraan: {
      type: String,
      required: [true, "Merek Kendaraan perlu diisi"],
    },
    tahun_kendaraan: {
      type: Number,
      required: [true, "Tahun Kendaraan perlu diisi"],
    },
    harga_kendaraan: {
      type: Number,
      required: [true, "Harga Kendaraan perlu diisi"],
    },
    rate_premi: {
      type: Number,
      required: [true, "Rate Premi perlu diisi"],
    },
    harga_premi: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

policySchema.pre("save", async function (next) {
  try {
    const today = new Date().toISOString().split("T")[0].replace(/-/g, "");

    const counter = await Counter.findOneAndUpdate(
      { name: "policyCounter" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const counterValue = counter ? counter.value : 1;
    this.no_urut = counterValue;
    this.nomor_polis = `POL-${today}-${this.no_urut
      .toString()
      .padStart(3, "0")}`;

    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    next(error);
  }
});

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
