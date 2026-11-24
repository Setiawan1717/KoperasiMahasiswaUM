# KOPMA UM — Website Promosi

Website promosi Koperasi Mahasiswa Universitas Negeri Malang. Satu halaman statis (HTML + CSS + JS tanpa framework).

## Struktur
- `index.html` — seluruh halaman
- `assets/` — logo dan foto

## Cara mengedit isi
Buka `index.html`, cari blok **DATA WEBSITE — EDIT DI SINI SAJA** di bagian `<script>` paling bawah:
- `KONTAK` — nomor WhatsApp (format `628xxx`), Instagram, TikTok, email, jam buka, alamat, nominal simpanan
- `SLIDES` — teks dan foto hero slider
- `UNIT`, `PROMO`, `BERITA`, `FAQ` — daftar unit usaha, promo, kegiatan, tanya jawab

Taruh foto di folder `assets/`, lalu isi kolom `foto`, misalnya `foto: "assets/toko.jpg"`. Kalau kosong, tampil kotak "Foto menyusul".

Semua teks bertanda `[...]` dan `[Contoh]` adalah placeholder yang perlu diganti dengan data asli.

## Publikasi gratis (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pilih branch dan folder `/ (root)`.
