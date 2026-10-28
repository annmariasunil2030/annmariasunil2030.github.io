
const CONTACT_EMAIL = "your.email@example.com";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const emailButton = document.getElementById("emailButton");
  const copyEmail = document.getElementById("copyEmail");
  const feedback = document.getElementById("feedback");

  // Automatically update the copyright year.
  document.getElementById("year").textContent = new Date().getFullYear();

  // Configure the contact email.
  emailButton.href = `mailto:${CONTACT_EMAIL}`;

  // Mobile menu toggle.
  menuToggle.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  // Close the mobile menu after a navigation link is selected.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Copy the contact email to the clipboard.
  copyEmail.addEventListener("click", async () => {
    if (CONTACT_EMAIL === "your.email@example.com") {
      feedback.textContent = "Replace CONTACT_EMAIL in script.js with your real email.";
      return;
    }

    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      feedback.textContent = "Email copied successfully!";
    } catch {
      feedback.textContent = `Contact email: ${CONTACT_EMAIL}`;
    }
  });

  // Smooth scrolling for internal links.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Reveal project and skill cards as they enter the screen.
  const cards = document.querySelectorAll(".card, .timeline-item");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(14px)";
      card.style.transition = "opacity .6s ease, transform .6s ease";
      observer.observe(card);
    });
  }
});
