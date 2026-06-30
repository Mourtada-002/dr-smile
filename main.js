document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  //   LOADER
  const tl = gsap.timeline();

  tl.to(".loader__mark", { opacity: 1, duration: 0.6, ease: "power2.out" })
    .to(".loader", {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      delay: 0.3,
      onComplete: () =>
        (document.getElementById("loader").style.display = "none"),
    })
    .fromTo(
      ".hero__img",
      { scale: 1.25 },
      { scale: 1.1, duration: 2.2, ease: "power2.out" },
      "-=0.4",
    )
    .fromTo(
      "[data-nav-reveal]",
      { y: -16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" },
      "-=1.8",
    )
    .fromTo(
      ".hero__eyebrow",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=1.4",
    )
    .fromTo(
      "[data-hero-line]",
      { yPercent: 110 },
      { yPercent: 0, duration: 1, stagger: 0.12, ease: "power3.out" },
      "-=1.1",
    )
    .fromTo(
      ".hero__subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.6",
    )
    .fromTo(
      ".hero__actions",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      "-=0.5",
    )
    .fromTo(
      ".hero__scroll",
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4",
    );

  gsap.to(".hero__img", {
    scale: 1.25,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  //   NAVBAR - background on scroll
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  ScrollTrigger.create({
    start: "top -10",
    onUpdate: (self) => {
      navbar.classList.toggle("is-scrolled", self.scroll() > 10);
    },
  });

  window.addEventListener(
    "scroll",
    () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 200) {
        gsap.to(navbar, { y: "-100%", duration: 0.4, ease: "power2.inOut" });
      } else {
        gsap.to(navbar, { y: "0%", duration: 0.4, ease: "power2.inOut" });
      }
      lastScroll = current;
    },
    { passive: true },
  );

  //   MOBILE MENU
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.classList.toggle("is-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";

    if (isOpen) {
      gsap.fromTo(
        ".mobile-menu__links a",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.2,
          ease: "power2.out",
        },
      );
    }
  });

  document
    .querySelectorAll(".mobile-menu__links a, .mobile-menu__cta")
    .forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("is-open");
        burger.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });

  //   GENERIC SCROLL REVEALS
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  });

  [".services__grid", ".why__grid", ".gallery__grid", ".stats__grid"].forEach(
    (selector) => {
      const container = document.querySelector(selector);
      if (!container) return;
      const items = container.querySelectorAll("[data-reveal]");
      gsap.fromTo(
        items,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
  );

  //   ABOUT - image
  const aboutMedia = document.querySelector("[data-reveal-image]");
  if (aboutMedia) {
    gsap.fromTo(
      aboutMedia,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: aboutMedia,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    );
  }

  //   STATS - animated counters
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const counter = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(counter.val) + suffix;
          },
        });
      },
    });
  });

  //   TESTIMONIALS
const track = document.getElementById("testimonialTrack");
const slider = document.getElementById("testimonialSlider");

if (track) {
  let index = 0;
  let auto;

  const isStacked = () => window.matchMedia("(max-width: 900px)").matches;
  const getVisibleCount = () => (isStacked() ? 1 : 3);
  const getCardWidth = () =>
    track.children[0].getBoundingClientRect().width + 28;

  const goTo = (i) => {
    if (isStacked()) {
      gsap.set(track, { x: 0 });
      return;
    }
    const total = track.children.length;
    const visible = getVisibleCount();
    const maxIndex = total - visible;
    index = Math.max(0, Math.min(i, maxIndex));
    gsap.to(track, {
      x: -index * getCardWidth(),
      duration: 0.9,
      ease: "power3.inOut",
    });
  };

  const startAuto = () => {
    if (isStacked()) return;
    auto = setInterval(() => {
      const total = track.children.length;
      const visible = getVisibleCount();
      const maxIndex = total - visible;
      goTo(index >= maxIndex ? 0 : index + 1);
    }, 4500);
  };

  startAuto();

  slider.addEventListener("mouseenter", () => clearInterval(auto));
  slider.addEventListener("mouseleave", () => {
    clearInterval(auto);
    startAuto();
  });

  window.addEventListener("resize", () => {
    clearInterval(auto);
    goTo(index);
    startAuto();
  });
}

  //   PROCESS
  const lineFill = document.getElementById("processLineFill");
  if (lineFill) {
    gsap.to(lineFill, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".process__timeline",
        start: "top 75%",
        end: "bottom 75%",
        scrub: true,
      },
    });
  }

  //   CONTACT FORM
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      gsap.to(form, {
        opacity: 0.4,
        duration: 0.3,
        onComplete: () => {
          form.reset();
          gsap.to(form, { opacity: 1, duration: 0.3 });
          success.classList.add("is-visible");
          setTimeout(() => success.classList.remove("is-visible"), 4000);
        },
      });
    });
  }

  //   BUTTON RIPPLE EFFECT
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      btn.style.setProperty("--rx", `${e.clientX - rect.left}px`);
      btn.style.setProperty("--ry", `${e.clientY - rect.top}px`);
      btn.classList.remove("btn--ripple");
      void btn.offsetWidth;
      btn.classList.add("btn--ripple");
    });
  });

  //   FOOTER YEAR
  document.getElementById("year").textContent = new Date().getFullYear();
});
