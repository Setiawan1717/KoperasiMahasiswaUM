/* ======================= LOGIKA (tidak perlu diubah) =======================
   Dipakai bersama oleh index.html dan profil.html. Setiap bagian hanya
   dijalankan kalau elemennya ada di halaman. */
const $ = s => document.querySelector(s);
const ada = (sel, fn) => { const el = $(sel); if (el) fn(el); };
const ikonFoto = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg>';
const kosong = (teks = "Foto menyusul") => `<div class="foto-kosong">${ikonFoto}${teks}</div>`;
window.kosongHTML = kosong();
const gambar = (src, alt) => src
  ? `<img class="foto-isi" src="${src}" alt="${alt}" loading="lazy" onerror="this.outerHTML=kosongHTML">`
  : kosong();
const waLink = pesan => KONTAK.wa ? `https://wa.me/${KONTAK.wa}?text=${encodeURIComponent(pesan)}` : "#kontak";

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

const ikonLokasi = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
ada("#grid-unit", el => el.innerHTML = UNIT.map(u => `<article class="kartu takik kanan-bawah muncul">
  <div class="gambar">${gambar(u.foto, u.nama)}</div>
  <div class="badan"><h3>${u.nama}</h3><p>${u.teks}</p><span class="meta">${ikonLokasi}${u.lokasi}</span></div></article>`).join(""));

const fmtTgl = s => { const d = new Date(s + "T00:00:00"); return { h: d.getDate(), b: d.toLocaleString("id-ID", { month: "short" }), lengkap: d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) }; };
ada("#grid-berita", el => el.innerHTML = BERITA.map(b => { const t = fmtTgl(b.tanggal); return `<article class="kartu berita muncul">
  <div class="gambar"><span class="tanggal"><b>${t.h}</b><small>${t.b}</small></span>${gambar(b.foto, b.judul)}</div>
  <div class="badan"><span class="tag">${b.tag}</span><h3>${b.judul}</h3><p>${b.ringkas}</p><span class="meta"><time datetime="${b.tanggal}">${t.lengkap}</time></span></div></article>`; }).join(""));

ada("#daftar-faq", el => el.innerHTML = FAQ.map((f, i) => `<details class="muncul" ${i === 0 ? "open" : ""}><summary>${f.t}</summary><p>${f.j}</p></details>`).join(""));

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

/* ---------- Navbar: scroll, burger, menu aktif ---------- */
const nav = $("#nav"), burger = $("#burger");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });
burger.onclick = () => { const b = nav.classList.toggle("buka"); burger.setAttribute("aria-expanded", b); burger.setAttribute("aria-label", b ? "Tutup menu" : "Buka menu"); };
document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("buka"); burger.setAttribute("aria-expanded", "false"); }));
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
