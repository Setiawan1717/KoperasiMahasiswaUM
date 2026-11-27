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
- `unit.html` — unit usaha
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
- `FOTO_TENTANG` — foto di bingkai bagian "Kenalan Yuk!" (kosong = maskot Adit)
- `UNIT`, `BERITA`, `FAQ` — daftar unit usaha, kegiatan, tanya jawab
- `PROFIL` — foto bersama, paragraf profil, makna logo, dan makna warna (halaman Profil)
- `PROKER` — kartu carousel program kerja unggulan
- `STRUKTUR` — periode, nama & foto Ketua, serta tiap bidang (kepala bidang, foto, ringkasan, tugas)

Maskot **Adit** ada di `assets/adit.svg` (gambar vektor, bisa dibuka/diedit di Figma, Illustrator, atau Inkscape).

Taruh foto di folder `assets/`, lalu isi kolom `foto`, misalnya `foto: "assets/toko.jpg"`. Kalau kosong, tampil kotak "Foto menyusul".

Semua teks bertanda `[...]`, `[Contoh]`, dan `[Draf]` adalah placeholder yang perlu diganti dengan data asli.

## Publikasi gratis (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → pilih branch dan folder `/ (root)`.
