// Kalimat yang diketik bergantian di bagian Hero
const daftarPeran = [
  "Mahasiswa Informatika",
  "Universitas Muhammadiyah Maumere",
  "Suka Voli, Futsal, dan Badminton"
];

document.documentElement.classList.add("js");

// ===== 1. TEMA GELAP / TERANG =====
const tombolTema = document.getElementById("tema");

function setTema(gelap) {
  document.body.classList.toggle("gelap", gelap);
  tombolTema.textContent = gelap ? "☀️" : "🌙";
  try { localStorage.setItem("tema", gelap ? "gelap" : "terang"); } catch (e) {}
}

let temaTersimpan = null;
try { temaTersimpan = localStorage.getItem("tema"); } catch (e) {}
setTema(temaTersimpan === "gelap");

tombolTema.addEventListener("click", () => {
  setTema(!document.body.classList.contains("gelap"));
});

// ===== 2. MENU HAMBURGER (HP) =====
const menu = document.getElementById("menu");
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  const terbuka = menu.classList.toggle("buka");
  hamburger.textContent = terbuka ? "✕" : "☰";
});

menu.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    menu.classList.remove("buka");
    hamburger.textContent = "☰";
  });
});

// ===== 3. EFEK MENGETIK =====
const target = document.getElementById("mengetik");
let indexKata = 0;
let indexHuruf = 0;
let menghapus = false;

function ketik() {
  const kata = daftarPeran[indexKata];

  if (!menghapus) {
    indexHuruf++;
    target.textContent = kata.slice(0, indexHuruf);
    if (indexHuruf === kata.length) {
      menghapus = true;
      return setTimeout(ketik, 1600);
    }
  } else {
    indexHuruf--;
    target.textContent = kata.slice(0, indexHuruf);
    if (indexHuruf === 0) {
      menghapus = false;
      indexKata = (indexKata + 1) % daftarPeran.length;
    }
  }
  setTimeout(ketik, menghapus ? 40 : 80);
}

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  target.textContent = daftarPeran[0];
} else {
  ketik();
}

// ===== 4. ANIMASI MUNCUL SAAT SCROLL + BAR SKILL =====
const pengamat = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("tampil");
    entry.target.querySelectorAll(".isi").forEach((bar) => {
      bar.style.width = bar.dataset.level + "%";
    });
    pengamat.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".muncul").forEach((el) => pengamat.observe(el));

// ===== 5. TAHUN OTOMATIS =====
document.getElementById("tahun").textContent = new Date().getFullYear();