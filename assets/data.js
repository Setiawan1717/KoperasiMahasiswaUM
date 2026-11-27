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

// Unit usaha (unit.html) + halaman detail (unit-detail.html?u=<id>)
// - "ikon": mart, sewa, print
// - "foto": foto utama unit, mis. "assets/unit/kopma-mart.jpg". Kosong = kotak "Foto menyusul".
// - Teks bertanda [Draf] dan [ ... ] adalah contoh — GANTI dengan info asli dari pengurus.
const UNIT = [
  { id:"kopma-mart", nama:"Kopma Mart", ikon:"mart", foto:"",
    ringkas:"Minimarket kampus untuk kebutuhan harian, camilan, minuman, dan perlengkapan kuliah dengan harga mahasiswa.",
    deskripsi:[
      "[Draf] Kopma Mart adalah minimarket milik KOPMA UM yang menyediakan kebutuhan sehari-hari mahasiswa di area kampus, mulai dari makanan ringan, minuman, kebutuhan pribadi, sampai alat tulis.",
      "[Draf] Semua orang boleh berbelanja di Kopma Mart. Anggota KOPMA UM mendapat harga anggota, dan setiap belanja anggota ikut dihitung dalam pembagian Sisa Hasil Usaha (SHU)."
    ],
    layanan:[
      { nama:"Makanan & Minuman", teks:"[Draf] Camilan, roti, mi instan, minuman dingin, dan kopi." },
      { nama:"Kebutuhan Harian", teks:"[Draf] Perlengkapan mandi, tisu, dan kebutuhan pribadi lainnya." },
      { nama:"Alat Tulis", teks:"[Draf] Buku, pulpen, map, dan perlengkapan tugas kuliah." }
    ],
    lokasi:"[Lokasi Kopma Mart]", jam:"[Jam buka Kopma Mart]" },
  { id:"persewaan", nama:"Persewaan Kopma", ikon:"sewa", foto:"",
    ringkas:"Sewa perlengkapan untuk acara dan kegiatan mahasiswa dengan harga terjangkau.",
    deskripsi:[
      "[Draf] Persewaan Kopma melayani penyewaan perlengkapan untuk kegiatan organisasi, kepanitiaan, dan acara mahasiswa di lingkungan Universitas Negeri Malang.",
      "[Draf] Pemesanan bisa dilakukan lewat WhatsApp. Sebutkan barang, jumlah, dan tanggal pemakaian agar ketersediaannya bisa dicek lebih dulu."
    ],
    layanan:[
      { nama:"[Barang sewa 1]", teks:"[Isi barang yang disewakan, mis. perlengkapan acara]" },
      { nama:"[Barang sewa 2]", teks:"[Isi barang yang disewakan]" },
      { nama:"[Barang sewa 3]", teks:"[Isi barang yang disewakan]" }
    ],
    lokasi:"[Lokasi Persewaan Kopma]", jam:"[Jam layanan Persewaan Kopma]" },
  { id:"kopma-print", nama:"Kopma Print", ikon:"print", foto:"",
    ringkas:"Print, fotokopi, scan, dan jilid untuk tugas kuliah, makalah, sampai skripsi.",
    deskripsi:[
      "[Draf] Kopma Print membantu mahasiswa menyelesaikan kebutuhan cetak dokumen dengan cepat dan murah, langsung di area kampus.",
      "[Draf] File bisa dikirim lewat WhatsApp atau dibawa langsung dalam flashdisk. Untuk pesanan dalam jumlah banyak, sebaiknya kirim file lebih awal."
    ],
    layanan:[
      { nama:"Print", teks:"[Draf] Cetak hitam-putih dan berwarna." },
      { nama:"Fotokopi & Scan", teks:"[Draf] Fotokopi dokumen dan scan ke PDF." },
      { nama:"Jilid", teks:"[Draf] Jilid makalah, laporan, dan skripsi." }
    ],
    lokasi:"[Lokasi Kopma Print]", jam:"[Jam buka Kopma Print]" }
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

/* ===================== STRUKTUR ORGANISASI (struktur.html & bidang.html) =====================
   - "foto": path foto pengurus, mis. "assets/pengurus/ketua.jpg". Kosong = kotak "Foto menyusul".
   - "instagram": link IG pribadi (opsional). Kalau diisi, nama di kartu bisa diklik.
   - "ikon": pilih salah satu: ketua, keuangan, administrasi, kominfo, psda, usaha
   - Teks bertanda [Draf] adalah contoh tugas bidang — CEK ke pengurus sebelum publikasi. */
const STRUKTUR = {
  periode: "2026",
  ketua: { jabatan:"Ketua", nama:"[Nama Ketua]", foto:"", instagram:"", ikon:"ketua" },
  bidang: [
    { id:"keuangan", nama:"Bidang Keuangan", ikon:"keuangan", kepala:"[Nama Kepala Bidang]", foto:"", instagram:"",
      ringkas:"[Draf] Mengelola arus kas, pencatatan, dan laporan keuangan koperasi secara tertib dan transparan.",
      tugas:["[Draf] Mencatat pemasukan dan pengeluaran seluruh unit usaha.","[Draf] Mengelola simpanan pokok dan simpanan wajib anggota.","[Draf] Menyusun laporan keuangan dan perhitungan SHU untuk Rapat Anggota."] },
    { id:"administrasi", nama:"Bidang Administrasi Umum", ikon:"administrasi", kepala:"[Nama Kepala Bidang]", foto:"", instagram:"",
      ringkas:"[Draf] Mengurus surat-menyurat, arsip, data anggota, dan inventaris koperasi.",
      tugas:["[Draf] Mengelola surat masuk, surat keluar, dan arsip organisasi.","[Draf] Memperbarui database dan kartu anggota.","[Draf] Mendata dan merawat inventaris sekretariat."] },
    { id:"kominfo", nama:"Bidang Kominfo", ikon:"kominfo", kepala:"[Nama Kepala Bidang]", foto:"", instagram:"",
      ringkas:"[Draf] Menjadi pusat komunikasi dan informasi KOPMA UM di media sosial dan kampus.",
      tugas:["[Draf] Mengelola Instagram, TikTok, dan website KOPMA UM.","[Draf] Membuat desain, foto, dan video publikasi promo serta kegiatan.","[Draf] Menjalin komunikasi dengan organisasi dan Kopma kampus lain."] },
    { id:"psda", nama:"Bidang Pengembangan Sumber Daya Anggota", ikon:"psda", kepala:"[Nama Kepala Bidang]", foto:"", instagram:"",
      ringkas:"[Draf] Mengembangkan kapasitas dan kebersamaan anggota melalui pendidikan dan pelatihan.",
      tugas:["[Draf] Menyelenggarakan pendidikan dasar perkoperasian untuk anggota baru.","[Draf] Mengadakan pelatihan kewirausahaan dan manajemen.","[Draf] Menjaga keakraban anggota lewat kegiatan internal."] },
    { id:"usaha", nama:"Bidang Usaha", ikon:"usaha", kepala:"[Nama Kepala Bidang]", foto:"", instagram:"",
      ringkas:"[Draf] Menjalankan dan mengembangkan unit-unit usaha KOPMA UM agar melayani anggota dengan baik.",
      tugas:["[Draf] Mengatur operasional toko, stok barang, dan jadwal jaga.","[Draf] Merancang promo dan produk baru bersama Bidang Kominfo.","[Draf] Menjajaki peluang usaha dan kerja sama baru."] }
  ]
};
