/* ======================= LOGIKA (tidak perlu diubah) =======================
   Dipakai bersama oleh index.html dan profil.html. Setiap bagian hanya
   dijalankan kalau elemennya ada di halaman. */
const $ = s => document.querySelector(s);
const ada = (sel, fn) => { const el = $(sel); if (el) fn(el); };
const rupiah = n => "Rp" + n.toLocaleString("id-ID");
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
ada("#foto-tentang", el => el.innerHTML = FOTO_TENTANG
  ? `<img class="foto-isi" src="${FOTO_TENTANG}" alt="Pengurus dan toko KOPMA UM">`
  : `<img class="logo-besar" src="assets/logo-kopma-um.webp" alt="Logo KOPMA UM">`);

const ikonLokasi = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
ada("#grid-unit", el => el.innerHTML = UNIT.map(u => `<article class="kartu takik kanan-bawah muncul">
  <div class="gambar">${gambar(u.foto, u.nama)}</div>
  <div class="badan"><h3>${u.nama}</h3><p>${u.teks}</p><span class="meta">${ikonLokasi}${u.lokasi}</span></div></article>`).join(""));

ada("#grid-promo", grid => {
  const filter = $("#filter");
  const kategori = ["Semua", ...new Set(PROMO.map(p => p.kategori))];
  filter.innerHTML = kategori.map((k, i) => `<button type="button" aria-pressed="${i === 0}" data-kat="${k}">${k}</button>`).join("");
  grid.innerHTML = PROMO.map(p => {
    const persen = p.hargaAwal ? Math.round((1 - p.harga / p.hargaAwal) * 100) : 0;
    return `<article class="kartu promo muncul" data-kat="${p.kategori}">
      <div class="gambar">${persen ? `<span class="diskon">-${persen}%</span>` : ""}${gambar(p.foto, p.nama)}</div>
      <div class="badan"><span class="kat">${p.kategori}</span><h3>${p.nama}</h3>
      <div class="harga"><b>${rupiah(p.harga)}</b>${p.hargaAwal ? `<s>${rupiah(p.hargaAwal)}</s>` : ""}</div></div></article>`;
  }).join("");
  filter.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    filter.querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", x === b));
    document.querySelectorAll(".promo").forEach(k => k.classList.toggle("sembunyi", b.dataset.kat !== "Semua" && k.dataset.kat !== b.dataset.kat));
  });
});

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
