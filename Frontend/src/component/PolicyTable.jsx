import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const PolicyTable = () => {
  const [policies, setPolicies] = useState([]);

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

  const formatDate = (dateString) => {
    return dateString.split("T")[0].replace(/-/g, "/");
  };

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID");
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tabel Polis">
        <TableHead>
          <TableRow>
            <TableCell>Nomor Polis</TableCell>
            <TableCell align="left">Nama Tertanggung</TableCell>
            <TableCell align="left">Periode</TableCell>
            <TableCell align="left">Nama Item</TableCell>
            <TableCell align="left">Harga Pertanggungan</TableCell>
            <TableCell align="left">Harga Premi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {policies.map((policy) => (
            <TableRow key={policy._id}>
              <TableCell>{policy.nomor_polis}</TableCell>
              <TableCell>{policy.nama}</TableCell>
              <TableCell>{`${formatDate(policy.tanggal_efektif)} - ${formatDate(
                policy.tanggal_expired
              )}`}</TableCell>
              <TableCell>{`${policy.merek_kendaraan} - ${policy.tipe_kendaraan}`}</TableCell>
              <TableCell>{`Rp ${formatRupiah(
                policy.harga_kendaraan
              )},00`}</TableCell>
              <TableCell>{`Rp ${formatRupiah(
                policy.harga_premi
              )},00`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PolicyTable;
