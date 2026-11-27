# KOPMA UM — Website Promosi

Website promosi Koperasi Mahasiswa Universitas Negeri Malang. Satu halaman statis (HTML + CSS + JS tanpa framework).

Gaya visual: latar krem, navbar pill oranye, tipografi poster biru (Anton + Archivo Expanded), kartu peach/koral dengan sudut bertakik, bola kaca, dan pita miring. Warna diatur di `:root` pada bagian `<style>`.

Teks hero (judul besar dan tagline) diedit langsung di HTML, bagian `<!-- ===== HERO ===== -->`.

## Struktur
- `index.html` — seluruh halaman
- `assets/` — logo dan foto

## Cara mengedit isi
Buka `index.html`, cari blok **DATA WEBSITE — EDIT DI SINI SAJA** di bagian `<script>` paling bawah:
- `KONTAK` — nomor WhatsApp (format `628xxx`), Instagram, TikTok, email, jam buka, alamat, nominal simpanan
- `FOTO_TENTANG` — foto di bingkai bagian "Kenalan Yuk!" (kosong = logo besar)
- `UNIT`, `PROMO`, `BERITA`, `FAQ` — daftar unit usaha, promo, kegiatan, tanya jawab

Taruh foto di folder `assets/`, lalu isi kolom `foto`, misalnya `foto: "assets/toko.jpg"`. Kalau kosong, tampil kotak "Foto menyusul".

Semua teks bertanda `[...]` dan `[Contoh]` adalah placeholder yang perlu diganti dengan data asli.

## Publikasi gratis (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pilih branch dan folder `/ (root)`.
