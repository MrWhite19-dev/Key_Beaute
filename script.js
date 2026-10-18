const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const showPrices = document.getElementById("showPrices");
const pricePanel = document.getElementById("pricePanel");

showPrices.addEventListener("click", () => {
  const hidden = pricePanel.hasAttribute("hidden");
  if (hidden) {
    pricePanel.removeAttribute("hidden");
    showPrices.innerHTML = 'Masquer les tarifs <span>↑</span>';
  } else {
    pricePanel.setAttribute("hidden", "");
    showPrices.innerHTML = 'Découvrir les tarifs <span>→</span>';
  }
});

const form = document.getElementById("bookingForm");
const salonWhatsApp = "2250545239483";

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const formattedDate = date
    ? new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(date + "T12:00:00"))
    : "";

  const message =
`Bonjour Key Beauté 💕
Je souhaite prendre rendez-vous.

👤 Nom : ${name}
📱 Mon WhatsApp : ${phone}
💅 Service : ${service}
📅 Date souhaitée : ${formattedDate}
🕒 Heure souhaitée : ${time}

Merci beaucoup ! ✨`;

  window.open(`https://wa.me/${salonWhatsApp}?text=${encodeURIComponent(message)}`, "_blank");
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id], #accueil");
const navLinks = document.querySelectorAll(".nav a:not(.nav-cta)");

window.addEventListener("scroll", () => {
  let current = "accueil";
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 120) current = section.id || "accueil";
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
