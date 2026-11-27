# KOPMA UM — Website Promosi

Website promosi Koperasi Mahasiswa Universitas Negeri Malang. Website statis (HTML + CSS + JS tanpa framework).

Gaya visual: latar krem, navbar pill oranye, tipografi poster biru (Anton + Archivo Expanded), kartu peach/koral dengan sudut bertakik, bola kaca, dan pita miring. Warna diatur di `:root` pada `assets/gaya.css`.

Teks hero (judul besar dan tagline) diedit langsung di `index.html`, bagian `<!-- ===== HERO ===== -->`. Header dan footer ada di setiap file HTML; kalau menambah menu, ubah di semua halaman.

## Struktur
Setiap menu adalah halaman sendiri:
- `index.html` — Beranda (hero, Kenalan Yuk!, Nilai Kami)
- `profil.html` — Profil (tentang, filosofi logo, filosofi warna, program kerja unggulan)
- `struktur.html` — hero maskot Adit, organigram (Ketua + 5 bidang), kartu ketua dan kartu bidang
- `bidang.html` — detail satu bidang, dibuka dari tombol KLIK (mis. `bidang.html?b=kominfo`)
- `unit.html` — daftar unit usaha (Kopma Mart, Persewaan Kopma, Kopma Print)
- `unit-detail.html` — penjelasan satu unit, dibuka dari tombol Selengkapnya (mis. `unit-detail.html?u=kopma-print`)
- `kegiatan.html` — kabar kegiatan
- `kontak.html` — kontak, jam buka, peta, dan tanya jawab

File bersama:
- `assets/gaya.css` — semua tampilan (warna di `:root`), dipakai bersama semua halaman
- `assets/data.js` — **semua isi yang bisa diedit** (kontak, unit, kegiatan, FAQ, profil, proker, struktur)
- `assets/app.js` — logika, tidak perlu diubah
- `assets/` — logo dan foto

## Cara mengedit isi
Buka `assets/data.js`:
- `KONTAK` — nomor WhatsApp (format `628xxx`), Instagram, TikTok, email, jam buka, alamat, nominal simpanan
- `PESAN_WA` — kalimat otomatis untuk setiap tombol WhatsApp (tanya, daftar anggota, tanya unit, booking sewa). Kalimat khusus tiap unit usaha ada di kolom `pesanWA` pada `UNIT`
- `FOTO_TENTANG` — foto di bingkai bagian "Kenalan Yuk!" (kosong = maskot Adit)
- `UNIT` — tiap unit usaha: ringkasan, deskripsi, layanan, lokasi, jam buka, foto
- `BERITA`, `FAQ` — kegiatan dan tanya jawab
- `PROFIL` — foto bersama, paragraf profil, makna logo, dan makna warna (halaman Profil)
- `PROKER` — kartu carousel program kerja unggulan
- `STRUKTUR` — periode, nama & foto Ketua, serta tiap bidang (kepala bidang, foto, ringkasan, tugas)

Maskot **Adit** ada di `assets/adit.svg` (gambar vektor, bisa dibuka/diedit di Figma, Illustrator, atau Inkscape).

Taruh foto di folder `assets/`, lalu isi kolom `foto`, misalnya `foto: "assets/toko.jpg"`. Kalau kosong, tampil kotak "Foto menyusul".

Semua teks bertanda `[...]`, `[Contoh]`, dan `[Draf]` adalah placeholder yang perlu diganti dengan data asli.

## Publikasi gratis (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pilih branch dan folder `/ (root)`.

## Setelah mengubah CSS atau JS
Setiap halaman memuat `assets/gaya.css`, `assets/data.js`, dan `assets/app.js` dengan penanda versi, misalnya `assets/data.js?v=20261127-2`. Setiap kali file-file itu diubah, ganti angka versinya di semua file `.html` (cari `?v=`) supaya browser pengunjung langsung mengambil versi terbaru, bukan versi lama dari cache.

## Kalender sewa (Persewaan Kopma)
Halaman `unit-detail.html?u=persewaan` menampilkan kalender ketersediaan per barang. Datanya dibaca langsung dari database Kopma Hub (Supabase `kopma-um`), sumber yang sama dengan halaman publik `https://setiawan1717.github.io/KOPMAUM/#sewa`:
- daftar barang, jumlah unit, dan harga dari tabel `sewa_barang` (yang aktif),
- jadwal dari fungsi `jadwal_sewa_publik` (tanpa nama/nomor penyewa).

Jadi barang, harga, dan booking cukup diatur di Kopma Hub; kalender di sini ikut berubah otomatis (diperbarui tiap menit). Urutan tombol barang diatur di `SEWA.urutan` (`assets/data.js`).
