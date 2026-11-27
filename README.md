# KOPMA UM — Website Promosi

Website promosi Koperasi Mahasiswa Universitas Negeri Malang. Satu halaman statis (HTML + CSS + JS tanpa framework).

Gaya visual: latar krem, navbar pill oranye, tipografi poster biru (Anton + Archivo Expanded), kartu peach/koral dengan sudut bertakik, bola kaca, dan pita miring. Warna diatur di `:root` pada bagian `<style>`.

Teks hero (judul besar dan tagline) diedit langsung di HTML, bagian `<!-- ===== HERO ===== -->`.

## Struktur
- `index.html` — halaman Beranda
- `profil.html` — halaman Profil (tentang, filosofi logo, filosofi warna, program kerja unggulan)
- `assets/gaya.css` — semua tampilan (warna di `:root`), dipakai bersama semua halaman
- `assets/data.js` — **semua isi yang bisa diedit** (kontak, unit, promo, kegiatan, FAQ, profil, proker)
- `assets/app.js` — logika, tidak perlu diubah
- `assets/` — logo dan foto

## Cara mengedit isi
Buka `assets/data.js`:
- `KONTAK` — nomor WhatsApp (format `628xxx`), Instagram, TikTok, email, jam buka, alamat, nominal simpanan
- `FOTO_TENTANG` — foto di bingkai bagian "Kenalan Yuk!" (kosong = logo besar)
- `UNIT`, `PROMO`, `BERITA`, `FAQ` — daftar unit usaha, promo, kegiatan, tanya jawab
- `PROFIL` — foto bersama, paragraf profil, makna logo, dan makna warna (halaman Profil)
- `PROKER` — kartu carousel program kerja unggulan

Taruh foto di folder `assets/`, lalu isi kolom `foto`, misalnya `foto: "assets/toko.jpg"`. Kalau kosong, tampil kotak "Foto menyusul".

Semua teks bertanda `[...]`, `[Contoh]`, dan `[Draf]` adalah placeholder yang perlu diganti dengan data asli.

## Publikasi gratis (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pilih branch dan folder `/ (root)`.
