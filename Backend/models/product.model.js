import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    nomor_polis: {
      type: String,
      required: true,
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

const Policy = mongoose.model("Policy", policySchema);

export default Policy;
