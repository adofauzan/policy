import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const PolicyForm = ({ onPolicyCreated }) => {
  const [formData, setFormData] = useState({
    nama: "",
    tanggal_efektif: "",
    tanggal_expired: "",
    merek_kendaraan: "",
    tipe_kendaraan: "",
    tahun_kendaraan: "",
    harga_kendaraan: "",
    rate_premi: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/policy", formData);
      onPolicyCreated(response.data);
      setFormData({
        nama: "",
        tanggal_efektif: "",
        tanggal_expired: "",
        merek_kendaraan: "",
        tipe_kendaraan: "",
        tahun_kendaraan: "",
        harga_kendaraan: "",
        rate_premi: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
      }}
    >
      <TextField
        label="Nama Tertanggung"
        name="nama"
        value={formData.nama}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <TextField
        label="Tanggal Efektif"
        name="tanggal_efektif"
        type="date"
        value={formData.tanggal_efektif}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        variant="filled"
      />
      <TextField
        label="Tanggal Expired"
        name="tanggal_expired"
        type="date"
        value={formData.tanggal_expired}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        variant="filled"
      />
      <TextField
        label="Merek Kendaraan"
        name="merek_kendaraan"
        value={formData.merek_kendaraan}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <TextField
        label="Tipe Kendaraan"
        name="tipe_kendaraan"
        value={formData.tipe_kendaraan}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <TextField
        label="Tahun Kendaraan"
        name="tahun_kendaraan"
        type="number"
        value={formData.tahun_kendaraan}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <TextField
        label="Harga Kendaraan"
        name="harga_kendaraan"
        type="number"
        value={formData.harga_kendaraan}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <TextField
        label="Rate Premi"
        name="rate_premi"
        type="number"
        value={formData.rate_premi}
        onChange={handleChange}
        required
        fullWidth
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default PolicyForm;
