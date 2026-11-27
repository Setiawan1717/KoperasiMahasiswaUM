/* =====================================================================
   DATA WEBSITE — EDIT DI SINI SAJA
   - Kolom "foto": isi dengan path file (mis. "assets/minimarket.jpg")
     atau URL gambar. Kalau kosong, tampil kotak "Foto menyusul".
   - Semua teks bertanda [ ... ] adalah placeholder yang wajib diganti.
   ===================================================================== */
const KONTAK = {
  wa: "",                       // contoh: "6281234567890" (tanpa + dan spasi)
  waTampil: "[Nomor WhatsApp]",
  instagram: "",                // contoh: "https://instagram.com/akun_kopma"
  igTampil: "[@akun_instagram]",
  tiktok: "",                   // contoh: "https://tiktok.com/@akun_kopma"
  email: "",                    // contoh: "kopma@um.ac.id"
  emailTampil: "[email@kopma]",
  jam: "[Jam buka, mis. Senin–Jumat 08.00–16.00]",
  alamat: "[Gedung/lokasi sekretariat], Universitas Negeri Malang, Jl. Semarang No. 5, Malang",
  simpanan: "[Isi nominal simpanan pokok dan simpanan wajib]"
};

// Foto untuk bingkai di bagian "Kenalan Yuk!". Kosong = tampil logo besar.
const FOTO_TENTANG = "";

// Unit usaha: SESUAIKAN dengan unit yang benar-benar dimiliki KOPMA UM
const UNIT = [
  { nama:"Toko Kopma", teks:"Kebutuhan harian, camilan, dan minuman dengan harga mahasiswa.", lokasi:"[Lokasi unit]", foto:"" },
  { nama:"ATK & Fotokopi", teks:"Alat tulis, print, fotokopi, jilid, dan perlengkapan tugas kuliah.", lokasi:"[Lokasi unit]", foto:"" },
  { nama:"Kantin Kopma", teks:"Tempat makan dan nongkrong dengan menu ramah kantong.", lokasi:"[Lokasi unit]", foto:"" },
  { nama:"Merchandise UM", teks:"Kaos, jaket, totebag, dan suvenir khas Universitas Negeri Malang.", lokasi:"[Lokasi unit]", foto:"" }
];

// Promo: CONTOH — ganti nama, harga, dan foto sesuai promo asli
const PROMO = [
  { nama:"[Contoh] Buku Tulis 38 Lembar (pak isi 10)", kategori:"ATK", harga:32000, hargaAwal:38000, foto:"" },
  { nama:"[Contoh] Pulpen Gel Hitam", kategori:"ATK", harga:3500, hargaAwal:4500, foto:"" },
  { nama:"[Contoh] Air Mineral 600 ml", kategori:"Minuman", harga:3000, hargaAwal:4000, foto:"" },
  { nama:"[Contoh] Kopi Susu Botol", kategori:"Minuman", harga:7000, hargaAwal:9000, foto:"" },
  { nama:"[Contoh] Roti Isi Cokelat", kategori:"Makanan", harga:5000, hargaAwal:6500, foto:"" },
  { nama:"[Contoh] Mi Instan Goreng", kategori:"Makanan", harga:3000, hargaAwal:3500, foto:"" },
  { nama:"[Contoh] Kaos Logo UM", kategori:"Merchandise", harga:75000, hargaAwal:90000, foto:"" },
  { nama:"[Contoh] Totebag Kanvas KOPMA", kategori:"Merchandise", harga:35000, hargaAwal:45000, foto:"" }
];

// Kegiatan: CONTOH — ganti dengan kegiatan/berita asli
const BERITA = [
  { judul:"[Contoh] Pendidikan Dasar Anggota Baru", tag:"Kegiatan", tanggal:"2026-11-10", ringkas:"Pengenalan nilai koperasi, unit usaha, dan kepengurusan bagi anggota baru KOPMA UM.", foto:"" },
  { judul:"[Contoh] Bazar Wirausaha Mahasiswa", tag:"Event", tanggal:"2026-10-24", ringkas:"Lapak produk UMKM mahasiswa di area kampus.", foto:"" },
  { judul:"[Contoh] Rapat Anggota Tahunan", tag:"Organisasi", tanggal:"2026-09-15", ringkas:"Laporan pertanggungjawaban pengurus dan pembagian SHU.", foto:"" }
];

const FAQ = [
  { t:"Siapa saja yang boleh jadi anggota KOPMA UM?", j:"Mahasiswa aktif Universitas Negeri Malang dari semua fakultas dan angkatan." },
  { t:"Apa bedanya belanja sebagai anggota dan bukan anggota?", j:"Semua orang boleh belanja di unit usaha KOPMA UM. Anggota mendapat harga anggota, promo khusus, dan pembagian SHU di akhir tahun buku." },
  { t:"Apa itu SHU?", j:"Sisa Hasil Usaha adalah keuntungan koperasi selama satu tahun buku yang dibagikan kembali ke anggota sesuai keputusan Rapat Anggota." },
  { t:"Bagaimana kalau saya sudah lulus?", j:"[Isi aturan keanggotaan setelah lulus, misalnya pengembalian simpanan pokok dan wajib.]" }
];


/* ===================== HALAMAN PROFIL (profil.html) =====================
   Teks bertanda [Draf] ditulis sebagai contoh. CEK dan GANTI dengan makna
   resmi dari pengurus KOPMA UM sebelum website dipublikasikan. */
const PROFIL = {
  foto: "",   // foto bersama pengurus, mis. "assets/pengurus.jpg"
  paragraf: [
    "<b>KOPMA UM</b> (Koperasi Mahasiswa Universitas Negeri Malang) adalah koperasi yang dimiliki dan dikelola oleh mahasiswa. Sebagai badan usaha sekaligus organisasi kemahasiswaan, KOPMA UM menjalankan dua peran: <b>melayani kebutuhan</b> anggota dan civitas akademika dengan harga bersahabat, serta <b>menjadi ruang belajar</b> berkoperasi dan berwirausaha secara nyata.",
    "[Isi sejarah singkat: tahun berdiri, dasar hukum/badan hukum, lokasi sekretariat, dan perkembangan unit usaha KOPMA UM sampai sekarang.]"
  ],
  logoRingkas: "[Draf] Logo KOPMA UM memadukan lengkung biru dan tulisan hijau sebagai lambang gerak usaha mahasiswa yang tumbuh bersama.",
  maknaLogo: [
    "[Draf] Lengkung biru di atas tulisan menggambarkan naungan dan perlindungan koperasi bagi seluruh anggotanya.",
    "[Draf] Garis hijau yang melaju ke depan melambangkan semangat usaha yang terus bergerak dan berkembang.",
    "[Draf] Tulisan \"kopma\" yang menyatu dengan \"UM\" menegaskan bahwa koperasi ini lahir dari dan untuk keluarga besar Universitas Negeri Malang."
  ],
  warna: [
    { nama:"Hijau", kode:"#009C3C", kode2:"#5FD08A", makna:"[Draf] Hijau melambangkan pertumbuhan dan kesejahteraan. Seperti tunas, koperasi tumbuh dari kontribusi kecil setiap anggota menjadi manfaat besar untuk bersama." },
    { nama:"Biru", kode:"#0090D8", kode2:"#7CCBF2", makna:"[Draf] Biru melambangkan kepercayaan dan profesionalitas. Usaha koperasi dijalankan secara jujur, terbuka, dan bertanggung jawab kepada anggota." },
    { nama:"Putih", kode:"#FFFFFF", kode2:"#E8EEF6", teksTab:"#13489B", makna:"[Draf] Putih melambangkan ketulusan dan kebersamaan, sesuai asas kekeluargaan yang menjadi dasar koperasi." }
  ]
};

// Program kerja unggulan (carousel di profil.html): CONTOH — ganti dengan proker asli
const PROKER = [
  { nama:"[Contoh] Pendidikan Dasar Perkoperasian", teks:"Program pengenalan nilai, prinsip, dan praktik koperasi bagi anggota baru, mulai dari hak dan kewajiban anggota sampai cara kerja unit usaha KOPMA UM." },
  { nama:"[Contoh] Bazar Wirausaha Mahasiswa", teks:"Lapak terbuka bagi mahasiswa yang punya usaha untuk memasarkan produknya di area kampus, sekaligus ajang belajar menjual dan melayani pembeli." },
  { nama:"[Contoh] Pelatihan Manajemen Ritel", teks:"Pelatihan pengelolaan toko, stok, keuangan sederhana, dan pemasaran digital untuk pengurus dan anggota yang ingin mendalami dunia usaha." },
  { nama:"[Contoh] Rapat Anggota Tahunan", teks:"Forum tertinggi koperasi untuk laporan pertanggungjawaban pengurus, pengesahan rencana kerja, dan penetapan pembagian Sisa Hasil Usaha (SHU)." }
];
