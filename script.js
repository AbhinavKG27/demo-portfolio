const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");

    const expanded = navToggle.classList.contains("open");
    navToggle.setAttribute("aria-expanded", expanded);
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
    });
  });
}

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

const revealElements = document.querySelectorAll(
  ".section-title, .section-sub, .skill-card, .project-card, .about-text, .about-visual"
);

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

const skillBars = document.querySelectorAll(".skill-fill");

const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.dataset.width;
        entry.target.style.width = width + "%";
      }
    });
  },
  {
    threshold: 0.4
  }
);

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    projects.forEach(project => {
      const tags = project.dataset.tags;

      if (filter === "all" || tags.includes(filter)) {
        project.style.display = "flex";
      } else {
        project.style.display = "none";
      }
    });
  });
});

const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill all fields.");
      return;
    }

    alert("Message sent successfully!");
    form.reset();
  });
}

const navbar = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(8,8,16,0.98)";
    } else {
      navbar.style.background = "rgba(8,8,16,0.85)";
    }
  }
});

const footerCopy = document.querySelector(".footer-copy");

if (footerCopy) {
  footerCopy.innerHTML =
    `© ${new Date().getFullYear()} Abhinav K G · Built with HTML, CSS & JavaScript`;
}