import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const PolicyPage = () => {
  const [policies, setPolicies] = useState([]);
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
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get("/api/policy");
      setPolicies(response.data.data);
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/policy/${editingId}`, formData);
      } else {
        await axios.post("/api/policy", formData);
      }
      handleClose();
      fetchPolicies();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (policy) => {
    setFormData(policy);
    setEditingId(policy._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/policy/${id}`);
      fetchPolicies();
    } catch (error) {
      console.error("Error deleting policy:", error);
    }
  };

  const handleOpen = () => {
    setEditingId(null);
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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, margin: "auto" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Create Item
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingId ? "Edit Policy" : "Create Policy"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
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
              variant="filled"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Tanggal Expired"
              name="tanggal_expired"
              type="date"
              value={formData.tanggal_expired}
              onChange={handleChange}
              required
              fullWidth
              variant="filled"
              InputLabelProps={{ shrink: true }}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingId ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nomor Polis</TableCell>
              <TableCell>Nama Tertanggung</TableCell>
              <TableCell>Periode</TableCell>
              <TableCell>Nama Item</TableCell>
              <TableCell>Harga Pertanggungan</TableCell>
              <TableCell>Harga Premi</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy._id}>
                <TableCell>{policy.nomor_polis}</TableCell>
                <TableCell>{policy.nama}</TableCell>
                <TableCell>{`${policy.tanggal_efektif} - ${policy.tanggal_expired}`}</TableCell>
                <TableCell>{`${policy.merek_kendaraan} - ${policy.tipe_kendaraan}`}</TableCell>
                <TableCell>{policy.harga_kendaraan.toLocaleString()}</TableCell>
                <TableCell>{policy.harga_premi.toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleEdit(policy)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(policy._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PolicyPage;
