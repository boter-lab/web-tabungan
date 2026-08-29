# 📊 Aplikasi Web Tabungan

Aplikasi web interaktif untuk mengelola dan memantau perkembangan tabungan pribadi Anda secara real-time dengan grafik dinamis.

## ✨ Fitur Utama

- **💰 Input Transaksi**: Tambahkan nominal menabung atau penarikan dengan mudah
- **📈 Grafik Dinamis**: Visualisasi perkembangan saldo dengan grafik yang naik turun sesuai transaksi
- **📝 Keterangan Transaksi**: Tambahkan deskripsi untuk setiap transaksi
- **💾 Penyimpanan Lokal**: Data otomatis tersimpan di browser Anda (LocalStorage)
- **📊 Ringkasan Statistik**: Lihat saldo total, total menabung, dan total penarikan
- **📋 Riwayat Lengkap**: Pantau semua transaksi dalam satu tempat
- **🔄 Reset Data**: Hapus semua data jika diperlukan
- **📱 Responsive Design**: Bekerja sempurna di desktop dan mobile

## 🚀 Cara Menggunakan

### 1. Buka Aplikasi
- Clone repository ini atau buka langsung di browser
- Buka file `index.html` di browser Anda

### 2. Menambah Transaksi
1. Masukkan **Nominal** (dalam Rupiah)
2. Pilih **Jenis Transaksi**:
   - 💰 Menabung (Tambah) - untuk uang masuk
   - 💸 Penarikan (Kurang) - untuk uang keluar
3. (Opsional) Tambahkan **Keterangan** transaksi
4. Klik tombol **"Tambah Transaksi"** atau tekan **Enter**

### 3. Pantau Perkembangan
- **Saldo Saat Ini**: Menampilkan total uang Anda
- **Total Menabung**: Jumlah semua uang yang ditambahkan
- **Total Penarikan**: Jumlah semua uang yang diambil
- **Grafik**: Visualisasi perkembangan saldo secara real-time

### 4. Lihat Riwayat
Scroll ke bawah untuk melihat semua transaksi yang telah dicatat dengan tanggal dan waktu.

## 📦 Struktur File

```
web-tabungan/
├── index.html      # File HTML utama
├── style.css       # Styling dan design
├── script.js       # Logika aplikasi
└── README.md       # Dokumentasi ini
```

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur aplikasi
- **CSS3** - Styling dan responsif design
- **JavaScript (Vanilla)** - Logika interaktif
- **Chart.js** - Library untuk grafik dinamis
- **LocalStorage** - Penyimpanan data lokal

## 📊 Cara Kerja Grafik

Grafik akan **naik ↑** ketika Anda menambahkan transaksi menabung dan **turun ↓** ketika melakukan penarikan. Grafik menampilkan:
- **Garis Biru**: Perkembangan saldo Anda
- **Titik pada Garis**: Setiap transaksi yang dicatat
- **Tooltip**: Hover pada titik untuk melihat saldo detail

## 💾 Penyimpanan Data

Data Anda disimpan secara otomatis di **LocalStorage** browser. Ini berarti:
- ✅ Data tetap tersimpan meski browser ditutup
- ✅ Tidak perlu login atau akun khusus
- ⚠️ Data akan hilang jika cache/cookies dihapus

## 🎨 Desain dan UI

- **Warna Tema**: Gradasi ungu (#667eea - #764ba2)
- **Font**: Segoe UI untuk tampilan modern
- **Animasi**: Smooth transitions dan hover effects
- **Layout**: Grid responsive yang menyesuaikan dengan ukuran layar

## 📱 Kompatibilitas

- ✅ Chrome, Firefox, Safari, Edge (browser modern)
- ✅ Desktop, Tablet, Mobile
- ✅ Semua sistem operasi

## 🔧 Pengembangan Lebih Lanjut

Ide fitur tambahan:
- 📅 Filter transaksi berdasarkan tanggal
- 🏷️ Kategori transaksi (gaji, belanja, dll)
- 📊 Export data ke CSV/PDF
- ☁️ Sinkronisasi cloud
- 🔐 Keamanan dengan password
- 📈 Laporan bulanan/tahunan

## 📄 Lisensi

Bebas digunakan untuk keperluan pribadi atau komersial.

## 👨‍💻 Author

Dibuat oleh **boter-lab**

---

**Selamat menggunakan Aplikasi Web Tabungan! 📊💰**

Jika ada pertanyaan atau saran, silakan buat issue di repository ini.
