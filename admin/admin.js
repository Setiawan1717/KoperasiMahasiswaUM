/* ======================= HALAMAN ADMIN KOPMA UM =======================
   Mengubah isi website tanpa membuka kode. Isi disimpan di database Supabase
   (tabel situs_konten) lewat fungsi situs_simpan yang mengecek sandi di server.
   Sandi TIDAK disimpan di kode ini. */

const API = SEWA.supabaseUrl + "/rest/v1";
const HDR = { apikey: SEWA.supabaseKey, "Content-Type": "application/json" };
const KUNCI_SANDI = "kopma-admin-sandi";
const $ = s => document.querySelector(s);
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

async function rpc(fungsi, data) {
  const r = await fetch(`${API}/rpc/${fungsi}`, { method: "POST", headers: HDR, body: JSON.stringify(data) });
  const isi = await r.json().catch(() => null);
  if (!r.ok) throw new Error((isi && (isi.message || isi.hint)) || `Gagal (${r.status})`);
  return isi;
}

/* ---------- Skema form: apa saja yang bisa diubah ---------- */
const teks = (l, ket) => ({ jenis: "teks", l, ket });
const area = (l, ket) => ({ jenis: "area", l, ket });
const tautan = (l, ket) => ({ jenis: "tautan", l, ket });
const foto = (l = "Foto") => ({ jenis: "tautan", l, ket: "Tempel link gambar (https://...) atau nama file di folder assets, mis. assets/unit/kopma-mart.jpg. Kosongkan untuk kotak \"Foto menyusul\"." });
const daftarTeks = (l, ket, satuan = "baris") => ({ jenis: "daftarTeks", l, ket, satuan });
const daftar = (l, judulDari, bidang, ket, satuan = "item") => ({ jenis: "daftar", l, judulDari, bidang, ket, satuan });
const objek = (l, bidang, ket) => ({ jenis: "objek", l, bidang, ket });
const IKON_OPSI = { mart: "Keranjang (Mart)", sewa: "Tenda (Sewa)", print: "Printer (Print)", usaha: "Toko", ketua: "Mahkota", keuangan: "Koin", administrasi: "Papan klip", kominfo: "Megafon", psda: "Orang & tunas" };
const pilihan = (l, opsi) => ({ jenis: "pilihan", l, opsi });

const SKEMA = {
  KONTAK: { judul: "Kontak", ket: "Nomor WhatsApp, media sosial, jam buka, dan alamat yang tampil di seluruh website.",
    bidang: {
      wa: teks("Nomor WhatsApp (untuk tombol)", "Format 62..., tanpa + dan spasi. Contoh: 62881025725575"),
      waTampil: teks("Nomor WhatsApp yang ditampilkan", "Contoh: +62 881-0257-25575"),
      instagram: tautan("Link Instagram", "Contoh: https://instagram.com/kopma_um"),
      igTampil: teks("Nama Instagram yang ditampilkan", "Contoh: @kopma_um"),
      tiktok: tautan("Link TikTok", "Contoh: https://tiktok.com/@kopma_um"),
      email: teks("Email", "Contoh: kopma@um.ac.id"),
      emailTampil: teks("Email yang ditampilkan"),
      jam: teks("Jam buka", "Contoh: Senin–Jumat 08.00–16.00"),
      alamat: area("Alamat"),
      simpanan: area("Info simpanan pokok & wajib", "Tampil di langkah pendaftaran anggota.")
    } },
  VISI_MISI: { judul: "Visi & Misi", ket: "Tampil di Beranda.",
    bidang: { visi: area("Visi"), misi: daftarTeks("Misi", "Satu kotak untuk satu poin misi.", "misi") } },
  FOTO_TENTANG: { judul: "Foto Kenalan", ket: "Foto di bingkai bagian \"Kenalan Yuk!\" di Beranda. Kosongkan untuk menampilkan maskot Adit.", tunggal: foto("Foto bingkai Kenalan Yuk!") },
  UNIT: { judul: "Unit Usaha", ket: "Kartu di halaman Unit Usaha dan halaman detail tiap unit.",
    tunggal: daftar("Unit usaha", "nama", {
      nama: teks("Nama unit"),
      id: teks("Kode halaman", "Huruf kecil dan tanda -, mis. kopma-mart. Dipakai di alamat halaman detail; jangan diubah kalau tidak perlu."),
      ikon: pilihan("Ikon", IKON_OPSI),
      foto: foto("Foto unit"),
      ringkas: area("Ringkasan (tampil di kartu)"),
      deskripsi: daftarTeks("Penjelasan (halaman detail)", "Satu kotak untuk satu paragraf.", "paragraf"),
      layanan: daftar("Layanan", "nama", { nama: teks("Nama layanan"), teks: area("Keterangan") }, "", "layanan"),
      lokasi: teks("Lokasi"),
      jam: teks("Jam buka"),
      pesanWA: area("Kalimat WhatsApp untuk unit ini", "Kosongkan untuk memakai kalimat umum. Tulis tiap baris di baris baru."),
      kalender: { jenis: "centang", l: "Tampilkan kalender sewa (khusus Persewaan)" }
    }, "", "unit") },
  BERITA: { judul: "Kegiatan", ket: "Kartu di halaman Kegiatan.",
    tunggal: daftar("Kegiatan", "judul", { judul: teks("Judul"), tag: teks("Label", "Contoh: Kegiatan, Event, Organisasi"), tanggal: { jenis: "tanggal", l: "Tanggal" }, ringkas: area("Ringkasan"), foto: foto() }, "", "kegiatan") },
  FAQ: { judul: "Tanya Jawab", ket: "Tampil di halaman Kontak.",
    tunggal: daftar("Pertanyaan", "t", { t: teks("Pertanyaan"), j: area("Jawaban") }, "", "pertanyaan") },
  PROFIL: { judul: "Profil", ket: "Halaman Profil: tentang KOPMA, filosofi logo, dan filosofi warna. Teks boleh memakai <b>tebal</b>.",
    bidang: {
      foto: foto("Foto bersama pengurus"),
      paragraf: daftarTeks("Paragraf profil", "Satu kotak untuk satu paragraf.", "paragraf"),
      logoRingkas: area("Kalimat utama filosofi logo"),
      maknaLogo: daftarTeks("Makna logo", "Satu kotak untuk satu poin.", "makna"),
      warna: daftar("Filosofi warna", "nama", { nama: teks("Nama warna"), kode: { jenis: "warna", l: "Warna utama" }, kode2: { jenis: "warna", l: "Warna gradasi" }, teksTab: { jenis: "warna", l: "Warna tulisan label" }, makna: area("Makna") }, "", "warna")
    } },
  PROKER: { judul: "Program Kerja", ket: "Carousel Program Kerja Unggulan di halaman Profil.",
    tunggal: daftar("Program kerja", "nama", { nama: teks("Nama program"), teks: area("Penjelasan") }, "", "program") },
  STRUKTUR: { judul: "Struktur", ket: "Halaman Struktur dan halaman detail tiap bidang.",
    bidang: {
      periode: teks("Periode", "Contoh: 2026"),
      ketua: objek("Ketua", { jabatan: teks("Jabatan"), nama: teks("Nama"), foto: foto(), instagram: tautan("Link Instagram (opsional)") }),
      bidang: daftar("Bidang", "nama", {
        nama: teks("Nama bidang"),
        id: teks("Kode halaman", "Huruf kecil dan tanda -, mis. keuangan."),
        ikon: pilihan("Ikon", IKON_OPSI),
        kepala: teks("Nama kepala bidang"),
        foto: foto("Foto kepala bidang"),
        instagram: tautan("Link Instagram (opsional)"),
        ringkas: area("Ringkasan bidang"),
        tugas: daftarTeks("Tugas utama", "Satu kotak untuk satu tugas.", "tugas")
      }, "", "bidang")
    } },
  PESAN_WA: { judul: "Pesan WhatsApp", ket: "Kalimat otomatis saat pengunjung menekan tombol WhatsApp. {unit}, {barang}, dan {tanggal} diisi otomatis.",
    bidang: { tanya: area("Tanya umum"), daftar: area("Daftar anggota"), unit: area("Tanya unit usaha (umum)", "{unit} = nama unit"), sewa: area("Booking sewa dari kalender", "{barang} dan {tanggal} diisi otomatis") } }
};

/* ---------- Status ---------- */
let BAWAAN = ambilKonten();          // isi bawaan dari assets/data.js
let kerja = null;                    // isi yang sedang diedit
let tab = "KONTAK";
let berubah = false;
let sandi = sessionStorage.getItem(KUNCI_SANDI) || "";

const ambil = (o, path) => path.reduce((a, k) => (a == null ? a : a[k]), o);
function setel(o, path, v) { const p = path.slice(0, -1).reduce((a, k) => a[k], o); p[path[path.length - 1]] = v; }
const kosongDari = sk => {
  if (sk.jenis === "daftar" || sk.jenis === "daftarTeks") return [];
  if (sk.jenis === "centang") return false;
  if (sk.jenis === "warna") return "#13489B";
  if (sk.jenis === "objek") return Object.fromEntries(Object.entries(sk.bidang).map(([k, b]) => [k, kosongDari(b)]));
  return "";
};
function tandaiBerubah(v = true) {
  berubah = v;
  $("#status-simpan").textContent = v ? "Ada perubahan yang belum disimpan" : "";
  $("#status-simpan").className = "status-simpan" + (v ? " belum" : "");
}

/* ---------- Pembuat form ---------- */
const P = path => esc(JSON.stringify(path));
let nomor = 0;
function bidangHtml(sk, nilai, path) {
  const id = "f" + (++nomor);
  const ket = sk.ket ? `<small class="ket">${esc(sk.ket)}</small>` : "";
  switch (sk.jenis) {
    case "teks": case "tautan":
      return `<div class="isian"><label for="${id}">${esc(sk.l)}</label>${ket}<input id="${id}" type="${sk.jenis === "tautan" ? "url" : "text"}" data-path="${P(path)}" value="${esc(nilai)}"></div>`;
    case "tanggal":
      return `<div class="isian"><label for="${id}">${esc(sk.l)}</label>${ket}<input id="${id}" type="date" data-path="${P(path)}" value="${esc(nilai)}"></div>`;
    case "warna":
      return `<div class="isian isian-warna"><label for="${id}">${esc(sk.l)}</label><input id="${id}" type="color" data-path="${P(path)}" value="${esc(/^#[0-9a-f]{6}$/i.test(nilai) ? nilai : "#13489b")}"><code>${esc(nilai)}</code></div>`;
    case "area":
      return `<div class="isian"><label for="${id}">${esc(sk.l)}</label>${ket}<textarea id="${id}" rows="${Math.min(10, Math.max(3, String(nilai || "").split("\n").length + 1))}" data-path="${P(path)}">${esc(nilai)}</textarea></div>`;
    case "pilihan":
      return `<div class="isian"><label for="${id}">${esc(sk.l)}</label><select id="${id}" data-path="${P(path)}">${Object.entries(sk.opsi).map(([k, l]) => `<option value="${esc(k)}" ${k === nilai ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div>`;
    case "centang":
      return `<label class="isian-centang"><input type="checkbox" data-path="${P(path)}" ${nilai ? "checked" : ""}> ${esc(sk.l)}</label>`;
    case "objek":
      return `<fieldset class="kelompok"><legend>${esc(sk.l)}</legend>${ket}${Object.entries(sk.bidang).map(([k, b]) => bidangHtml(b, (nilai || {})[k], [...path, k])).join("")}</fieldset>`;
    case "daftarTeks": {
      const isi = Array.isArray(nilai) ? nilai : [];
      return `<fieldset class="kelompok"><legend>${esc(sk.l)}</legend>${ket}
        ${isi.map((v, i) => `<div class="baris-daftar"><span class="no-daftar">${i + 1}</span><textarea rows="${Math.min(8, Math.max(2, String(v).split("\n").length + 1))}" data-path="${P([...path, i])}" aria-label="${esc(sk.l)} ${i + 1}">${esc(v)}</textarea>${tombolBaris(path, i, isi.length)}</div>`).join("")}
        <button type="button" class="btn-tambah" data-aksi="tambah" data-path="${P(path)}" data-baru='""'>+ Tambah ${esc(sk.satuan)}</button></fieldset>`;
    }
    case "daftar": {
      const isi = Array.isArray(nilai) ? nilai : [];
      return `<fieldset class="kelompok"><legend>${esc(sk.l)}</legend>${ket}
        ${isi.map((v, i) => `<details class="item-daftar" ${isi.length <= 1 ? "open" : ""}><summary><span class="no-daftar">${i + 1}</span><b>${esc((v && v[sk.judulDari]) || "(tanpa nama)")}</b>${tombolBaris(path, i, isi.length)}</summary>
          <div class="isi-item">${Object.entries(sk.bidang).map(([k, b]) => bidangHtml(b, (v || {})[k], [...path, i, k])).join("")}</div></details>`).join("")}
        <button type="button" class="btn-tambah" data-aksi="tambah" data-path="${P(path)}" data-baru="${esc(JSON.stringify(kosongDari({ jenis: "objek", bidang: sk.bidang })))}">+ Tambah ${esc(sk.satuan)}</button></fieldset>`;
    }
  }
  return "";
}
const tombolBaris = (path, i, n) => `<span class="tombol-baris">
  <button type="button" data-aksi="naik" data-path="${P(path)}" data-i="${i}" ${i === 0 ? "disabled" : ""} aria-label="Pindah ke atas">↑</button>
  <button type="button" data-aksi="turun" data-path="${P(path)}" data-i="${i}" ${i === n - 1 ? "disabled" : ""} aria-label="Pindah ke bawah">↓</button>
  <button type="button" data-aksi="hapus" data-path="${P(path)}" data-i="${i}" aria-label="Hapus" class="hapus">✕</button></span>`;

function gambarTab() {
  $("#tab-admin").innerHTML = Object.entries(SKEMA).map(([k, s]) => `<button type="button" data-tab="${k}" aria-current="${k === tab}">${esc(s.judul)}</button>`).join("");
}
function gambarIsi() {
  const s = SKEMA[tab]; nomor = 0;
  const badan = s.tunggal ? bidangHtml(s.tunggal, kerja[tab], [tab]) : Object.entries(s.bidang).map(([k, b]) => bidangHtml(b, kerja[tab][k], [tab, k])).join("");
  // simpan item yang sedang terbuka agar tidak tertutup setelah tambah/hapus
  $("#isi-admin").innerHTML = `<h1>${esc(s.judul)}</h1><p class="ket-bagian">${esc(s.ket)}</p>${badan}
    <div class="bawah-isi"><button type="button" class="btn btn-oranye" data-simpan>Simpan perubahan</button></div>`;
}
function gambarUlang() {
  const terbuka = [...document.querySelectorAll("#isi-admin details[open] > summary b")].map(b => b.textContent);
  gambarIsi();
  document.querySelectorAll("#isi-admin details > summary b").forEach(b => { if (terbuka.includes(b.textContent)) b.closest("details").open = true; });
}

/* ---------- Interaksi editor ---------- */
$("#isi-admin").addEventListener("input", e => {
  const el = e.target.closest("[data-path]"); if (!el || el.matches("button")) return;
  const path = JSON.parse(el.dataset.path);
  const v = el.type === "checkbox" ? el.checked : el.value;
  setel(kerja, path, v);
  if (el.type === "color") el.nextElementSibling.textContent = v;
  // perbarui judul item daftar secara langsung
  const det = el.closest("details.item-daftar");
  if (det) { const sk = cariSkema(path.slice(0, -1)); if (sk && sk.judulDari === path[path.length - 1]) det.querySelector("summary b").textContent = v || "(tanpa nama)"; }
  tandaiBerubah();
});
function cariSkema(pathItem) {
  // pathItem: [..., daftarKunci, index] -> skema daftar
  let sk = SKEMA[pathItem[0]]; let node = sk.tunggal || { jenis: "objek", bidang: sk.bidang };
  for (const k of pathItem.slice(1, -1)) {
    if (node.jenis === "objek") node = node.bidang[k];
    else if (node.jenis === "daftar") node = typeof k === "number" ? { jenis: "objek", bidang: node.bidang } : node.bidang[k];
  }
  return node && node.jenis === "daftar" ? node : null;
}
document.addEventListener("click", e => {
  const t = e.target.closest("[data-tab]");
  if (t) { tab = t.dataset.tab; gambarTab(); gambarIsi(); $("#isi-admin").scrollTop = 0; scrollTo({ top: 0 }); return; }
  const a = e.target.closest("[data-aksi]");
  if (a) {
    e.preventDefault();
    const path = JSON.parse(a.dataset.path), arr = ambil(kerja, path), i = Number(a.dataset.i);
    if (a.dataset.aksi === "tambah") arr.push(JSON.parse(a.dataset.baru));
    if (a.dataset.aksi === "hapus") { if (!confirm("Hapus item ini?")) return; arr.splice(i, 1); }
    if (a.dataset.aksi === "naik" && i > 0) [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    if (a.dataset.aksi === "turun" && i < arr.length - 1) [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
    gambarUlang(); tandaiBerubah();
    if (a.dataset.aksi === "tambah") { const d = [...document.querySelectorAll("#isi-admin details.item-daftar")].pop(); if (d) d.open = true; }
    return;
  }
  if (e.target.closest("[data-simpan]")) simpan();
});

/* ---------- Simpan, riwayat ---------- */
async function simpan() {
  const tombol = $("#tombol-simpan");
  tombol.disabled = true; $("#status-simpan").textContent = "Menyimpan…";
  try {
    const waktu = await rpc("situs_simpan", { sandi, isi: kerja });
    tandaiBerubah(false);
    $("#status-simpan").textContent = "Tersimpan " + new Date(waktu).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " · website langsung berubah";
    $("#status-simpan").className = "status-simpan sukses";
  } catch (e) {
    $("#status-simpan").textContent = "Gagal menyimpan: " + e.message;
    $("#status-simpan").className = "status-simpan galat";
    if (/sandi/i.test(e.message)) keluar();
  } finally { tombol.disabled = false; }
}
$("#tombol-simpan").onclick = simpan;
addEventListener("keydown", e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s" && kerja) { e.preventDefault(); simpan(); } });
addEventListener("beforeunload", e => { if (berubah) { e.preventDefault(); e.returnValue = ""; } });

$("#tombol-riwayat").onclick = async () => {
  const d = $("#dialog-riwayat"); d.showModal();
  $("#daftar-riwayat").innerHTML = "<p>Memuat…</p>";
  try {
    const daftarV = await rpc("situs_riwayat_daftar", { sandi });
    $("#daftar-riwayat").innerHTML = daftarV.length ? daftarV.map(v => `<div class="baris-riwayat"><span>${new Date(v.waktu).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}</span><button type="button" class="btn btn-putih" data-versi="${v.id}">Buka</button></div>`).join("")
      : "<p>Belum ada versi lama. Versi lama tercatat setiap kali kamu menyimpan.</p>";
  } catch (e) { $("#daftar-riwayat").innerHTML = `<p class="pesan-galat">${esc(e.message)}</p>`; }
};
$("#daftar-riwayat").addEventListener("click", async e => {
  const b = e.target.closest("[data-versi]"); if (!b) return;
  if (berubah && !confirm("Perubahan yang belum disimpan akan hilang. Lanjut?")) return;
  try {
    const isi = await rpc("situs_riwayat_ambil", { sandi, versi: Number(b.dataset.versi) });
    kerja = gabungKonten(BAWAAN, isi); gambarIsi(); tandaiBerubah();
    $("#dialog-riwayat").close();
    $("#status-simpan").textContent = "Versi lama dimuat. Klik Simpan perubahan untuk memakainya.";
  } catch (err) { alert(err.message); }
});
$("#tombol-bawaan").onclick = () => {
  if (!confirm("Ganti semua isi di editor dengan isi bawaan dari kode (assets/data.js)? Belum tersimpan sampai kamu klik Simpan perubahan.")) return;
  kerja = JSON.parse(JSON.stringify(BAWAAN)); gambarIsi(); tandaiBerubah(); $("#dialog-riwayat").close();
};
$("#tutup-riwayat").onclick = () => $("#dialog-riwayat").close();

/* ---------- Masuk / keluar ---------- */
async function bukaEditor() {
  $("#layar-masuk").hidden = true; $("#layar-editor").hidden = false;
  $("#isi-admin").innerHTML = "<p>Memuat isi website…</p>";
  try {
    const r = await fetch(`${API}/situs_konten?select=isi&id=eq.1`, { headers: HDR, cache: "no-store" });
    const [baris] = await r.json();
    kerja = gabungKonten(BAWAAN, baris && baris.isi);
  } catch (e) { kerja = JSON.parse(JSON.stringify(BAWAAN)); }
  kerja = JSON.parse(JSON.stringify(kerja));
  gambarTab(); gambarIsi();
}
function keluar() {
  sessionStorage.removeItem(KUNCI_SANDI); sandi = ""; kerja = null; berubah = false;
  $("#layar-editor").hidden = true; $("#layar-masuk").hidden = false; $("#sandi").value = ""; $("#sandi").focus();
}
$("#tombol-keluar").onclick = () => { if (berubah && !confirm("Ada perubahan yang belum disimpan. Tetap keluar?")) return; keluar(); };
$("#lihat-sandi").onclick = () => { const i = $("#sandi"); i.type = i.type === "password" ? "text" : "password"; };
$("#form-masuk").onsubmit = async e => {
  e.preventDefault();
  const tombol = $("#tombol-masuk"), coba = $("#sandi").value;
  tombol.disabled = true; tombol.textContent = "Memeriksa…"; $("#galat-masuk").textContent = "";
  try {
    if (await rpc("situs_cek_sandi", { sandi: coba })) { sandi = coba; sessionStorage.setItem(KUNCI_SANDI, coba); bukaEditor(); }
    else $("#galat-masuk").textContent = "Sandi salah.";
  } catch (err) { $("#galat-masuk").textContent = "Tidak bisa terhubung ke server. Periksa internet lalu coba lagi."; }
  tombol.disabled = false; tombol.textContent = "Masuk";
};
if (sandi) bukaEditor(); else $("#sandi").focus();
