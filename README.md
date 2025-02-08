# Aplikasi Manajemen Polis 

Ini adalah aplikasi web sederhana untuk mengelola polis asuransi. Aplikasi ini memungkinkan pengguna untuk membuat, memperbarui, menghapus, dan melihat data polis asuransi.

## Fitur
- Melihat daftar polis asuransi
- Membuat polis asuransi baru
- Mengedit polis asuransi yang sudah ada
- Menghapus polis asuransi

## Teknologi yang Digunakan
- React.js
- Axios
- Node.js
- Express
- MongoDB

## Instalasi
### Backend
1. Clone repository:
   ```sh
   git clone https://github.com/adofauzan/policy.git
   ```
2. Masuk ke direktori proyek:
   ```sh
   cd policy
   ```
3. Instal dependensi backend:
   ```sh
   npm install
   ```
4. Jalankan server backend:
   ```sh
   npm run dev
   ```

## API Endpoints
- `GET /api/policy` - Mengambil semua polis
- `POST /api/policy` - Membuat polis baru
- `PUT /api/policy/:id` - Memperbarui polis
- `DELETE /api/policy/:id` - Menghapus polis


### Frontend
1. Masuk ke direktori frontend:
   ```sh
   cd frontend
   ```
2. Instal dependensi frontend:
   ```sh
   npm install
   ```
3. Jalankan aplikasi frontend:
   ```sh
   npm run dev
   ```

## Konfigurasi Port

Aplikasi berjalan di localhost:5000. Pastikan backend dijalankan di port ini agar sesuai dengan konfigurasi frontend.

## Kontribusi
Silakan fork proyek ini dan kirim pull request jika ingin berkontribusi.

## Lisensi
Proyek ini dilisensikan di bawah MIT License.

---
Created by Fauzan
