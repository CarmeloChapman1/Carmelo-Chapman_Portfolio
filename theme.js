// Theme + nav + scroll reveal
(function () {
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    if (toggleBtn) {
      toggleBtn.textContent = theme === "dark" ? "Light mode" : "Dark mode";
    }
  }

  const savedTheme = (function () {
    try {
      return localStorage.getItem("theme");
    } catch (e) {
      return null;
    }
  })();

  if (savedTheme === "light" || savedTheme === "dark") {
    setTheme(savedTheme);
  } else {
    setTheme("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("open");
      }
    });
  }

  // Update footer year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }
})();