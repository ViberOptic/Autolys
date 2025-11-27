# ⚡ Autolys

**Katalog Mobil Masa Depan: Electric & Hybrid Vehicle Explorer**

Autolys adalah aplikasi web modern berbasis Progressive Web App (PWA) yang dirancang untuk membantu pengguna menemukan, membandingkan, dan menyimpan koleksi mobil listrik (EV) dan hybrid impian mereka. Aplikasi ini menawarkan pengalaman pengguna yang cepat, responsif, dan dapat berjalan secara offline.

![Autolys Banner](./public/maskable-icon-512x512.png)

## 🌟 Fitur Utama

* **Katalog Komprehensif:** Jelajahi berbagai koleksi mobil listrik murni (BEV) dan Hybrid (HEV/PHEV).
* **Pencarian & Filter Pintar:** Filter mobil berdasarkan merek, kategori teknologi (Listrik/Hybrid), dan rentang harga.
* **Rekomendasi Sultan:** Halaman khusus yang mengurasi mobil-mobil mewah performa tinggi.
* **Simpan Favorit:** Fitur *Wishlist* yang terintegrasi dengan **Supabase** (Cloud Database) agar data tersimpan aman.
* **Detail Spesifikasi:** Informasi lengkap mengenai tenaga (HP), tipe mesin, harga estimasi, dan deskripsi kendaraan.
* **PWA Ready:** Dapat diinstal di Smartphone (Android/iOS) dan Desktop, serta berfungsi dalam kondisi koneksi lambat/offline.
* **Responsif:** Tampilan antarmuka yang optimal baik di Desktop maupun Mobile (dengan navigasi bar yang berbeda).

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan teknologi web modern:

* **Frontend:** [React 19](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Database:** [Supabase](https://supabase.com/) (untuk fitur Favorit Realtime)
* **Icons:** [Lucide React](https://lucide.dev/)
* **PWA:** [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)

## 🚀 Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda.

### 1. Prasyarat
Pastikan Anda sudah menginstal **Node.js** (disarankan versi 18 atau terbaru).

### 2. Instalasi Dependensi
Buka terminal di folder proyek, lalu jalankan:

```bash
npm install