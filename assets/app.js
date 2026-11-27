/* ======================= LOGIKA (tidak perlu diubah) =======================
   Dipakai bersama oleh index.html dan profil.html. Setiap bagian hanya
   dijalankan kalau elemennya ada di halaman. */
const $ = s => document.querySelector(s);

/* ---------- Navbar: scroll, burger (langsung jalan, tidak menunggu isi) ---------- */
const nav = $("#nav"), burger = $("#burger");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });
burger.onclick = () => { const b = nav.classList.toggle("buka"); burger.setAttribute("aria-expanded", b); burger.setAttribute("aria-label", b ? "Tutup menu" : "Buka menu"); };
document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("buka"); burger.setAttribute("aria-expanded", "false"); }));

// Isi halaman dibuat setelah isi terbaru dari halaman admin dimuat (lihat assets/konten.js)
muatKontenSitus().then(jalankanSitus);
function jalankanSitus() {
const ada = (sel, fn) => { const el = $(sel); if (el) fn(el); };
const ikonFoto = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>';
const kosong = (teks = "Foto menyusul") => `<div class="foto-kosong">${ikonFoto}${teks}</div>`;
window.kosongHTML = kosong();
const gambar = (src, alt) => src
  ? `<img class="foto-isi" src="${src}" alt="${alt}" loading="lazy" onerror="this.outerHTML=kosongHTML">`
  : kosong();
const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
// data-wa berisi kunci kalimat di PESAN_WA (mis. "daftar") atau kalimat langsung
const isiPesan = (kunci, isi = {}) => (PESAN_WA[kunci] ?? kunci).replace(/\{(\w+)\}/g, (_, k) => isi[k] ?? "");
const waLink = pesan => KONTAK.wa ? `https://wa.me/${KONTAK.wa}?text=${encodeURIComponent(isiPesan(pesan))}` : "#kontak";

// Kontak & tautan
document.querySelectorAll("[data-wa]").forEach(a => {
  a.href = waLink(a.dataset.wa);
  if (KONTAK.wa) { a.target = "_blank"; a.rel = "noopener"; }
  else if (!$("#kontak")) a.href = "kontak.html";
});
const tautan = { instagram: KONTAK.instagram, tiktok: KONTAK.tiktok, email: KONTAK.email ? "mailto:" + KONTAK.email : "" };
document.querySelectorAll("[data-link]").forEach(a => {
  const url = tautan[a.dataset.link];
  if (url) { a.href = url; if (!url.startsWith("mailto")) { a.target = "_blank"; a.rel = "noopener"; } }
  else a.href = $("#kontak") ? "#kontak" : "kontak.html";
});
const isiTeks = { jam: KONTAK.jam, alamat: KONTAK.alamat, simpanan: KONTAK.simpanan, "wa-tampil": KONTAK.waTampil, "ig-tampil": KONTAK.igTampil, "email-tampil": KONTAK.emailTampil };
document.querySelectorAll("[data-isi]").forEach(el => { if (isiTeks[el.dataset.isi]) el.textContent = isiTeks[el.dataset.isi]; });
ada("#tahun", el => el.textContent = new Date().getFullYear());

/* ---------- BERANDA ---------- */
ada("#foto-tentang", el => {
  el.innerHTML = FOTO_TENTANG
    ? `<img class="foto-isi" src="${FOTO_TENTANG}" alt="Pengurus dan toko KOPMA UM">`
    : `<img class="maskot" src="assets/adit.svg" alt="Adit, maskot KOPMA UM">`;
  ada("#label-bingkai", l => l.textContent = FOTO_TENTANG ? "KOPMA UM" : "ADIT");
});


const fmtTgl = s => { const d = new Date(s + "T00:00:00"); return { h: d.getDate(), b: d.toLocaleString("id-ID", { month: "short" }), lengkap: d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }; };
ada("#grid-berita", el => el.innerHTML = BERITA.map(b => { const t = fmtTgl(b.tanggal); return `<article class="kartu berita muncul">
  <div class="gambar"><span class="tanggal"><b>${t.h}</b><small>${t.b}</small></span>${gambar(b.foto, b.judul)}</div>
  <div class="badan"><span class="tag">${b.tag}</span><h3>${b.judul}</h3><p>${b.ringkas}</p><span class="meta"><time datetime="${b.tanggal}">${t.lengkap}</time></span></div></article>`; }).join(""));

ada("#daftar-faq", el => el.innerHTML = FAQ.map((f, i) => `<details class="muncul" ${i === 0 ? "open" : ""}><summary>${f.t}</summary><p>${f.j}</p></details>`).join(""));

ada("#teks-visi", el => el.textContent = VISI_MISI.visi);
ada("#daftar-misi", el => el.innerHTML = VISI_MISI.misi.map(m => `<li>${esc(m)}</li>`).join(""));

/* ---------- PROFIL ---------- */
ada("#foto-profil", el => el.innerHTML = PROFIL.foto
  ? `<img class="foto-isi" src="${PROFIL.foto}" alt="Foto bersama pengurus KOPMA UM">`
  : kosong("Foto bersama pengurus menyusul"));
ada("#teks-profil", el => el.innerHTML = PROFIL.paragraf.map(p => `<p>${p}</p>`).join(""));
ada("#logo-ringkas", el => el.textContent = PROFIL.logoRingkas);
ada("#makna-logo", el => el.innerHTML = PROFIL.maknaLogo.map(m => `<li class="muncul">${m}</li>`).join(""));
ada("#daftar-warna", el => el.innerHTML = PROFIL.warna.map(w => `<div class="baris-warna muncul" style="--w:${w.kode};--w2:${w.kode2 || w.kode}">
  <span class="contoh-warna" aria-hidden="true"><i></i><i></i></span>
  <div class="kartu-warna"><span class="tab-warna" style="background:${w.kode};color:${w.teksTab || "#fff"}">${w.nama}</span><p>${w.makna}</p></div></div>`).join(""));

ada("#proker", wadah => {
  const pita = $("#proker-pita"), titik = $("#proker-titik");
  pita.innerHTML = PROKER.map((p, i) => `<article class="slide-proker" role="group" aria-roledescription="slide" aria-label="${i + 1} dari ${PROKER.length}">
    <div class="kepala-proker"><h3>${p.nama}</h3></div><p>${p.teks}</p></article>`).join("");
  titik.innerHTML = PROKER.map((p, i) => `<button type="button" aria-label="Program ${i + 1}: ${p.nama.replace(/"/g, "")}"></button>`).join("");
  let k = 0;
  const slides = [...pita.children], tombol = [...titik.children];
  const ke = i => {
    k = (i + PROKER.length) % PROKER.length;
    pita.style.transform = `translateX(${-k * 100}%)`;
    slides.forEach((s, j) => { s.inert = j !== k; s.setAttribute("aria-hidden", j !== k); });
    tombol.forEach((t, j) => t.setAttribute("aria-current", j === k));
  };
  $("#proker-sebelum").onclick = () => ke(k - 1);
  $("#proker-sesudah").onclick = () => ke(k + 1);
  tombol.forEach((t, j) => t.onclick = () => ke(j));
  let x0 = null;
  wadah.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
  wadah.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) ke(k + (dx < 0 ? 1 : -1)); x0 = null; });
  ke(0);
});

/* ---------- STRUKTUR ---------- */
const IKON = {
  ketua:'<path d="M14 46 10 20l14 12 8-18 8 18 14-12-4 26z"/><path d="M14 52h36"/><circle cx="32" cy="34" r="4"/>',
  keuangan:'<ellipse cx="26" cy="18" rx="15" ry="6"/><path d="M11 18v10c0 3.3 6.7 6 15 6s15-2.7 15-6V18"/><path d="M11 28v10c0 3.3 6.7 6 15 6 1.6 0 3.2-.1 4.6-.3"/><circle cx="44" cy="44" r="12"/><path d="M44 37.5v13M40.8 40.8h4.9a2.4 2.4 0 0 1 0 4.8h-3.4a2.4 2.4 0 0 0 0 4.8h4.9"/>',
  administrasi:'<rect x="14" y="10" width="36" height="46" rx="5"/><path d="M24 10V6h16v4"/><path d="M22 24h20M22 32h20M22 40h12"/><path d="m36 46 4 4 8-9"/>',
  kominfo:'<path d="M10 28v10h8l20 12V16L18 28z"/><path d="M18 38l4 14h6l-3-12"/><path d="M46 24c4 3 4 15 0 18M52 18c8 6 8 24 0 30"/>',
  psda:'<circle cx="22" cy="22" r="7"/><circle cx="42" cy="22" r="7"/><path d="M8 50c0-8 6-14 14-14 3 0 6 .8 8 2.4M56 50c0-8-6-14-14-14-3 0-6 .8-8 2.4"/><path d="M32 54V40"/><path d="M32 46c-6 0-9-4-9-9 6 0 9 4 9 9zM32 44c0-6 3-9 9-9 0 6-3 9-9 9z"/>',
  mart:'<path d="M8 14h6l6 28h28l6-20H18"/><circle cx="24" cy="50" r="4"/><circle cx="44" cy="50" r="4"/><path d="M26 28h20M28 35h16"/>',
  sewa:'<path d="M32 8 6 44h52z"/><path d="M32 8v36M22 44l10-18 10 18"/><path d="M6 44v10M58 44v10M4 54h56"/>',
  print:'<path d="M18 24V8h28v16"/><rect x="8" y="24" width="48" height="22" rx="5"/><path d="M18 38h28v18H18z"/><path d="M24 45h16M24 50h10"/><circle cx="47" cy="31" r="2"/>',
  usaha:'<path d="M8 24 13 10h38l5 14"/><path d="M8 24c0 4 3 7 8 7s8-3 8-7c0 4 3 7 8 7s8-3 8-7c0 4 3 7 8 7s8-3 8-7"/><path d="M12 31v23h40V31"/><path d="M26 54V40h12v14"/>'
};
const ikon = k => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IKON[k] || IKON.ketua}</svg>`;
const fotoOrang = (src, nama) => src ? `<img class="foto-isi" src="${src}" alt="Foto ${nama}" loading="lazy" onerror="this.outerHTML=kosongHTML">` : kosong();
const namaTautan = (o, nama) => o.instagram ? `<a href="${o.instagram}" target="_blank" rel="noopener">${nama}</a>` : nama;

document.querySelectorAll("[data-periode]").forEach(el => el.textContent = STRUKTUR.periode);
ada("#organigram", el => {
  const k = STRUKTUR.ketua;
  el.innerHTML = `<div class="simpul akar muncul"><span class="ubin-ikon">${ikon(k.ikon)}</span><b>${k.jabatan}</b></div>
    <div class="cabang">${STRUKTUR.bidang.map(b => `<a class="simpul muncul" href="bidang.html?b=${b.id}"><span class="ubin-ikon">${ikon(b.ikon)}</span><b>${b.nama}</b></a>`).join("")}</div>`;
});
ada("#kartu-ketua", el => {
  const k = STRUKTUR.ketua;
  el.innerHTML = `<article class="kartu-pimpinan muncul">
    <div class="kepala-pimpinan"><h3>${k.jabatan}</h3><span class="bulat-ikon">${ikon(k.ikon)}</span></div>
    <div class="foto-pimpinan">${fotoOrang(k.foto, k.nama)}<span class="nama-kaca">${namaTautan(k, k.nama)}</span></div></article>`;
});
ada("#daftar-bidang", el => el.innerHTML = STRUKTUR.bidang.map(b => `<article class="kartu-bidang muncul">
  <div class="foto-bidang">${fotoOrang(b.foto, b.kepala)}<span class="lencana-ikon">${ikon(b.ikon)}</span></div>
  <div class="isi-bidang">
    <span class="pil-nama">${namaTautan(b, b.kepala)}</span>
    <span class="jabatan">Kepala Bidang</span>
    <h3>${b.nama}</h3>
    <p>${b.ringkas}</p>
    <a class="btn btn-biru btn-kecil" href="bidang.html?b=${b.id}">Klik <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
  </div></article>`).join(""));

ada("#detail-bidang", el => {
  const id = new URLSearchParams(location.search).get("b");
  const i = Math.max(0, STRUKTUR.bidang.findIndex(b => b.id === id));
  const b = STRUKTUR.bidang[i], n = STRUKTUR.bidang.length;
  const sblm = STRUKTUR.bidang[(i - 1 + n) % n], ssdh = STRUKTUR.bidang[(i + 1) % n];
  document.title = `${b.nama} | KOPMA UM`;
  el.innerHTML = `<h1 class="judul-bidang muncul"><small>Bidang</small>${b.nama.replace(/^Bidang\s+/i, "")}</h1>
    <div class="lingkar-ikon muncul">${ikon(b.ikon)}</div>
    <p class="ringkas-bidang muncul">${b.ringkas}</p>
    <h2 class="sub-bidang muncul">Tugas utama:</h2>
    <ol class="tugas-bidang">${b.tugas.map(t => `<li class="muncul">${t}</li>`).join("")}</ol>
    <article class="kartu-bidang tunggal muncul">
      <div class="foto-bidang">${fotoOrang(b.foto, b.kepala)}<span class="lencana-ikon">${ikon(b.ikon)}</span></div>
      <div class="isi-bidang"><span class="pil-nama">${namaTautan(b, b.kepala)}</span><span class="jabatan">Kepala Bidang</span><h3>${b.nama}</h3></div>
    </article>
    <nav class="nav-bidang" aria-label="Bidang lain">
      <a class="btn btn-putih" href="bidang.html?b=${sblm.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>${sblm.nama.replace(/^Bidang\s+/i, "")}</a>
      <a class="btn btn-biru" href="struktur.html">Semua Struktur</a>
      <a class="btn btn-putih" href="bidang.html?b=${ssdh.id}">${ssdh.nama.replace(/^Bidang\s+/i, "")}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
    </nav>`;
});

/* ---------- UNIT USAHA ---------- */
const ikonPanah = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const ikonPanahKiri = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
const ikonWA = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3.1.2.1.7-.1 1.4z"/></svg>';
const ikonLokasiKecil = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const ikonJam = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const pasangWA = el => el.querySelectorAll("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); if (KONTAK.wa) { a.target = "_blank"; a.rel = "noopener"; } else a.href = "kontak.html"; });

ada("#grid-unit", el => el.innerHTML = UNIT.map(u => `<article class="kartu kartu-unit takik kanan-bawah muncul">
  <a class="gambar" href="unit-detail.html?u=${u.id}" tabindex="-1" aria-hidden="true">${gambar(u.foto, u.nama)}<span class="lencana-ikon">${ikon(u.ikon)}</span></a>
  <div class="badan"><h3><a href="unit-detail.html?u=${u.id}">${u.nama}</a></h3><p>${u.ringkas}</p>
  <a class="btn btn-biru btn-kecil" href="unit-detail.html?u=${u.id}">Selengkapnya ${ikonPanah}</a></div></article>`).join(""));

ada("#detail-unit", el => {
  const id = new URLSearchParams(location.search).get("u");
  const i = Math.max(0, UNIT.findIndex(u => u.id === id));
  const u = UNIT[i], n = UNIT.length, sblm = UNIT[(i - 1 + n) % n], ssdh = UNIT[(i + 1) % n];
  document.title = `${u.nama} | KOPMA UM`;
  el.innerHTML = `<div class="unit-atas">
      <div class="muncul">
        <span class="label-unit">Unit Usaha</span>
        <h1 class="judul-unit">${u.nama}</h1>
        <p class="ringkas-unit">${u.ringkas}</p>
        <div class="info-unit">
          <span>${ikonLokasiKecil}<span><small>Lokasi</small><b>${u.lokasi}</b></span></span>
          <span>${ikonJam}<span><small>Jam buka</small><b>${u.jam}</b></span></span>
        </div>
        <a href="#" class="btn btn-biru" data-wa="${esc(u.pesanWA || isiPesan("unit", { unit: u.nama }))}">${ikonWA} Tanya via WhatsApp</a>
      </div>
      <div class="bingkai-foto muncul"><div class="isi">${gambar(u.foto, u.nama)}</div><span class="lencana-ikon besar">${ikon(u.ikon)}</span><span class="orb ungu" aria-hidden="true"></span></div>
    </div>
    <div class="isi-unit muncul">${u.deskripsi.map(p => `<p>${p}</p>`).join("")}</div>
    <h2 class="judul-sorot muncul">Layanan <span class="sorot oranye">Kami</span></h2>
    <div class="grid-layanan">${u.layanan.map((l, j) => `<div class="layanan muncul"><span class="no">${j + 1}</span><h3>${l.nama}</h3><p>${l.teks}</p></div>`).join("")}</div>
    ${u.kalender ? `<section class="kalender-sewa" id="kalender-sewa" aria-labelledby="judul-kalender">
      <h2 class="judul-sorot" id="judul-kalender">Cek <span class="sorot biru">Jadwal Sewa</span></h2>
      <p class="sub">Pilih barang, lalu lihat tanggal yang masih tersedia. Jadwal ini tersambung langsung dengan Kopma Hub.</p>
      <div id="isi-kalender" aria-live="polite"><div class="kal-pesan">Memuat jadwal sewa…</div></div>
    </section>` : ""}
    <nav class="nav-bidang" aria-label="Unit usaha lain">
      <a class="btn btn-putih" href="unit-detail.html?u=${sblm.id}">${ikonPanahKiri}${sblm.nama}</a>
      <a class="btn btn-biru" href="unit.html">Semua Unit Usaha</a>
      <a class="btn btn-putih" href="unit-detail.html?u=${ssdh.id}">${ssdh.nama}${ikonPanah}</a>
    </nav>`;
  pasangWA(el);
  if (u.kalender) kalenderSewa($("#isi-kalender"));
});

/* ---------- Kalender sewa (data dari Kopma Hub / Supabase) ---------- */
function kalenderSewa(wadah) {
  const BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const AKTIF = ["Menunggu", "Dikonfirmasi", "Diambil"];
  const pad = n => String(n).padStart(2, "0");
  const hariIni = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
  const tglPanjang = ds => { const [y, m, d] = ds.split("-").map(Number); return `${d} ${BULAN[m - 1]} ${y}`; };
  const t0 = hariIni();
  // daftar dasar: semua barang di SEWA.urutan selalu tampil, walau belum terdaftar/belum ada booking di Kopma Hub
  const dasar = () => SEWA.urutan.map((nama, i) => ({ id: "lokal-" + i, nama, spek: "", unit: null, harga24: null, harga2: null, batas_hari: null }));
  const st = { barang: dasar(), jadwal: [], pilih: null, bulan: t0.slice(0, 7), tanggal: null, error: "", tersambung: false };
  st.pilih = st.barang[0]?.nama || null;

  const urut = b => { const i = SEWA.urutan.findIndex(n => n.toLowerCase() === b.nama.toLowerCase()); return i < 0 ? 99 : i; };
  async function muat() {
    try {
      const h = { apikey: SEWA.supabaseKey, "Content-Type": "application/json" };
      const [rb, rj] = await Promise.all([
        fetch(`${SEWA.supabaseUrl}/rest/v1/sewa_barang?select=id,nama,spek,unit,harga24,harga2,batas_hari&aktif=eq.true&order=nama`, { headers: h }),
        fetch(`${SEWA.supabaseUrl}/rest/v1/rpc/jadwal_sewa_publik`, { method: "POST", headers: h, body: "{}" })
      ]);
      if (!rb.ok || !rj.ok) throw new Error(`server ${rb.ok ? rj.status : rb.status}`);
      const dariHub = await rb.json();
      const sama = n => x => x.nama.trim().toLowerCase() === n.trim().toLowerCase();
      // barang di SEWA.urutan memakai data Kopma Hub kalau ada; barang lain dari Hub ditambahkan di belakang
      st.barang = [...dasar().map(b => dariHub.find(sama(b.nama)) || b),
                   ...dariHub.filter(x => !SEWA.urutan.some(n => sama(n)(x))).sort((a, b) => a.nama.localeCompare(b.nama))];
      st.jadwal = await rj.json();
      st.error = ""; st.tersambung = true;
    } catch (e) { if (!st.tersambung) st.error = "Jadwal booking dari Kopma Hub belum bisa dimuat, jadi semua tanggal ditampilkan tersedia. Pastikan lagi lewat WhatsApp sebelum menyewa."; }
    if (!st.barang.find(b => b.nama === st.pilih)) st.pilih = st.barang[0]?.nama || null;
    gambar();
  }

  function sisa(b, ds) {
    if (b.unit == null) return Infinity;   // belum terdaftar di Kopma Hub: anggap tersedia
    const t = hariIni();
    return b.unit - st.jadwal.filter(x => x.barang_id === b.id && AKTIF.includes(x.status) && (
      (ds >= x.ambil && ds < x.kembali) ||
      (x.status === "Diambil" && x.kembali < t && ds >= x.kembali && ds <= t)   // terlambat kembali tetap memakai unit
    )).reduce((a, x) => a + x.unit, 0);
  }
  const rp = n => "Rp" + Number(n || 0).toLocaleString("id-ID");

  function gambar() {
    if (!st.barang.length) { wadah.innerHTML = `<div class="kal-pesan">Belum ada barang sewa.</div>`; return; }
    const b = st.barang.find(x => x.nama === st.pilih) || st.barang[0];
    const [y, m] = st.bulan.split("-").map(Number);
    const mulai = (new Date(y, m - 1, 1).getDay() + 6) % 7, jml = new Date(y, m, 0).getDate();
    const t = hariIni(), sel = [];
    for (let i = 0; i < mulai; i++) sel.push('<span class="hari kosong" aria-hidden="true"></span>');
    for (let d = 1; d <= jml; d++) {
      const ds = `${y}-${pad(m)}-${pad(d)}`, s = sisa(b, ds), lewat = ds < t, penuh = s <= 0;
      const label = lewat ? "Lewat" : penuh ? "Penuh" : "Tersedia";
      sel.push(`<button type="button" class="hari ${penuh ? "penuh" : "ada"} ${lewat ? "lewat" : ""} ${ds === t ? "kini" : ""} ${ds === st.tanggal ? "dipilih" : ""}" data-tgl="${ds}" ${lewat || penuh ? "disabled" : ""} aria-pressed="${ds === st.tanggal}" aria-label="${tglPanjang(ds)}: ${label}"><b>${d}</b><small>${label}</small></button>`);
    }
    const bisaMundur = st.bulan > t.slice(0, 7);
    const pesan = isiPesan("sewa", { barang: b.nama, tanggal: st.tanggal ? tglPanjang(st.tanggal) : "" });
    wadah.innerHTML = `
      <div class="chip-sewa" role="group" aria-label="Pilih barang">${st.barang.map(x => `<button type="button" data-barang="${esc(x.nama)}" aria-pressed="${x.nama === b.nama}">${esc(x.nama)}</button>`).join("")}</div>
      ${st.error ? `<div class="kal-pesan galat kecil">${st.error} <a href="${SEWA.halamanHub}" target="_blank" rel="noopener">Cek di Kopma Hub</a></div>` : ""}
      <div class="kal-grid">
        <div class="kal-kartu">
          <div class="kal-kepala">
            <button type="button" class="kal-panah" data-geser="-1" ${bisaMundur ? "" : "disabled"} aria-label="Bulan sebelumnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m15 18-6-6 6-6"/></svg></button>
            <h3>${BULAN[m - 1]} ${y}</h3>
            <button type="button" class="kal-panah" data-geser="1" aria-label="Bulan berikutnya"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="m9 18 6-6-6-6"/></svg></button>
          </div>
          <div class="kal">${["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(h => `<span class="nama-hari">${h}</span>`).join("")}${sel.join("")}</div>
          <div class="kal-legenda"><span><i class="ada"></i>Tersedia</span><span><i class="penuh"></i>Penuh</span><span><i class="dipilih"></i>Tanggal dipilih</span></div>
        </div>
        <div class="kal-info">
          <span class="label-unit">Barang</span>
          <h3>${esc(b.nama)}</h3>
          ${b.spek ? `<p>${esc(b.spek)}</p>` : ""}
          ${b.unit == null ? `<p class="kal-tgl">Harga dan jumlah unit: tanyakan lewat WhatsApp.</p>` : `<dl>
            <dt>Jumlah unit</dt><dd>${b.unit} unit</dd>
            <dt>Sewa 24 jam</dt><dd>${rp(b.harga24)}</dd>
            <dt>2 hari ke atas</dt><dd>${rp(b.harga2)} / hari</dd>
            <dt>Batas sewa</dt><dd>${b.batas_hari} hari</dd>
          </dl>`}
          <p class="kal-tgl">${st.tanggal ? `Tanggal dipilih: <b>${tglPanjang(st.tanggal)}</b>` : "Klik tanggal yang tersedia untuk memilih."}</p>
          <a class="btn btn-biru" href="#" data-wa="${esc(pesan)}">${ikonWA} Booking via WhatsApp</a>
          <p class="kal-catatan">${st.tersambung ? "Jadwal diambil langsung dari Kopma Hub dan diperbarui otomatis. Tanggal merah sudah penuh." : st.error ? "Belum tersambung ke Kopma Hub; sistem akan mencoba lagi tiap menit." : "Memeriksa jadwal di Kopma Hub…"}</p>
        </div>
      </div>`;
    pasangWA(wadah);
  }

  wadah.addEventListener("click", e => {
    const tb = e.target.closest("[data-barang]"), tg = e.target.closest("[data-tgl]"), gs = e.target.closest("[data-geser]");
    if (tb) { st.pilih = tb.dataset.barang; st.tanggal = null; gambar(); }
    else if (tg && !tg.disabled) { st.tanggal = st.tanggal === tg.dataset.tgl ? null : tg.dataset.tgl; gambar(); }
    else if (gs && !gs.disabled) {
      const [y, m] = st.bulan.split("-").map(Number), d = new Date(y, m - 1 + Number(gs.dataset.geser), 1);
      st.bulan = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`; gambar();
    }
  });
  gambar();   // tampilkan kalender langsung, lalu perbarui setelah data Kopma Hub masuk
  muat();
  setInterval(() => { if (document.visibilityState === "visible") muat(); }, 60000);
}

/* ---------- Menu aktif (bagian halaman) ---------- */
const linkSeksi = [...document.querySelectorAll('.menu a[href^="#"]')];
if (linkSeksi.length) {
  const pantauSection = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && linkSeksi.some(a => a.getAttribute("href") === "#" + e.target.id))
      linkSeksi.forEach(a => a.classList.toggle("aktif", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(s => pantauSection.observe(s));
}

/* ---------- Animasi muncul saat scroll ---------- */
const pantauMuncul = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("tampak"); pantauMuncul.unobserve(e.target); } }), { threshold: .12 });
document.querySelectorAll(".muncul").forEach(el => pantauMuncul.observe(el));
}
