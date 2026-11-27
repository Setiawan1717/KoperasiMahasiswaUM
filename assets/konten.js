/* ======================= ISI WEBSITE DARI HALAMAN ADMIN (tidak perlu diubah) =======================
   Isi bawaan ada di assets/data.js. Perubahan yang disimpan lewat halaman /admin disimpan di
   database Supabase (tabel situs_konten) dan menimpa isi bawaan saat halaman dibuka.
   Kalau database tidak bisa dihubungi, website tetap tampil memakai isi bawaan. */

const KUNCI_KONTEN = ["KONTAK", "VISI_MISI", "FOTO_TENTANG", "PESAN_WA", "UNIT", "BERITA", "FAQ", "PROFIL", "PROKER", "STRUKTUR"];

// salinan isi saat ini (bawaan atau yang sudah diterapkan)
function ambilKonten() {
  return JSON.parse(JSON.stringify({ KONTAK, VISI_MISI, FOTO_TENTANG, PESAN_WA, UNIT, BERITA, FAQ, PROFIL, PROKER, STRUKTUR }));
}

const objekBiasa = v => v && typeof v === "object" && !Array.isArray(v);
// gabung isi dari admin ke bawaan: objek digabung (kolom baru di bawaan tetap ada), selain itu diganti
function gabungKonten(bawaan, baru) {
  const hasil = {};
  for (const k of KUNCI_KONTEN) {
    const b = bawaan[k], n = baru ? baru[k] : undefined;
    if (n === undefined || n === null) hasil[k] = b;
    else if (objekBiasa(b) && objekBiasa(n)) hasil[k] = { ...b, ...n };
    else if (Array.isArray(b) === Array.isArray(n) && typeof b === typeof n) hasil[k] = n;
    else hasil[k] = b;   // jenis data tidak cocok: abaikan
  }
  return hasil;
}

/* Pengaman: isi dari database dibersihkan sebelum dipakai di halaman.
   - tanda " diganti ”, tag HTML selain <b> <i> <br> dinetralkan
   - kolom tautan/foto hanya boleh http(s)://, mailto:, atau file assets/
   - kode (id) hanya huruf kecil, angka, dan tanda - ; nomor WA hanya angka */
const KOLOM_TAUTAN = new Set(["foto", "instagram", "tiktok"]);
function bersihTeks(t) {
  return String(t)
    .replace(/"/g, "”")
    .replace(/<(\/?)(b|i|br)\s*\/?>/gi, (m, garis, tag) => `\u0001${garis}${tag.toLowerCase()}\u0002`)   // simpan tag yang diizinkan
    .replace(/</g, "‹").replace(/>/g, "›")
    .replace(/\u0001(\/?)(b|i|br)\u0002/g, "<$1$2>");
}
function bersihkan(nilai, kunci = "", luar = "") {
  if (Array.isArray(nilai)) return nilai.map(v => bersihkan(v, kunci, luar));
  if (objekBiasa(nilai)) { const o = {}; for (const [k, v] of Object.entries(nilai)) o[k] = bersihkan(v, k, luar || kunci); return o; }
  if (typeof nilai === "boolean" || typeof nilai === "number") return nilai;
  if (nilai === null || nilai === undefined) return "";
  const s = String(nilai).trim();
  if (luar === "PESAN_WA" || kunci === "pesanWA") return s;                // dipakai di tautan WA (sudah di-encode), bukan HTML
  if (kunci === "wa") return s.replace(/\D/g, "");
  if (kunci === "id") return s.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (KOLOM_TAUTAN.has(kunci) || kunci === "FOTO_TENTANG") return /^(https?:\/\/|assets\/)[^"'<>\s]*$/i.test(s) ? s : "";
  if (kunci === "email") return /^[^\s"'<>@]+@[^\s"'<>@]+$/.test(s) ? s : "";
  if (/^(kode|kode2|teksTab)$/.test(kunci)) return /^#[0-9a-f]{3,8}$/i.test(s) ? s : "";
  return bersihTeks(s);
}

function terapkanKonten(isi) {
  const k = gabungKonten(ambilKonten(), isi);
  const b = {};
  for (const kunci of KUNCI_KONTEN) b[kunci] = bersihkan(k[kunci], kunci, kunci);
  KONTAK = b.KONTAK; VISI_MISI = b.VISI_MISI; FOTO_TENTANG = b.FOTO_TENTANG; PESAN_WA = b.PESAN_WA;
  UNIT = b.UNIT; BERITA = b.BERITA; FAQ = b.FAQ; PROFIL = b.PROFIL; PROKER = b.PROKER; STRUKTUR = b.STRUKTUR;
}

// Ambil isi dari database (maks. 3 detik). Gagal = tetap pakai isi bawaan.
async function muatKontenSitus() {
  try {
    const kendali = new AbortController();
    const batas = setTimeout(() => kendali.abort(), 3000);
    const r = await fetch(`${SEWA.supabaseUrl}/rest/v1/situs_konten?select=isi&id=eq.1`, {
      headers: { apikey: SEWA.supabaseKey }, signal: kendali.signal, cache: "no-store"
    });
    clearTimeout(batas);
    if (!r.ok) return;
    const [baris] = await r.json();
    if (baris && objekBiasa(baris.isi) && Object.keys(baris.isi).length) terapkanKonten(baris.isi);
  } catch (e) { /* tetap memakai isi bawaan */ }
}
