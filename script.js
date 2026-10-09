// MOBILE NAVIGATION
const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// CURRENT YEAR IN FOOTER
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// OPTIONAL IMAGE FRAME CONTROLS
document
  .querySelectorAll(".frame-controls input[type='range']")
  .forEach((slider) => {
    slider.addEventListener("input", () => {
      const frame = document.getElementById(slider.dataset.frame);
      const output = document.getElementById(slider.dataset.output);
      const property = slider.dataset.property;

      if (!frame || !property) return;

      const value = `${slider.value}px`;
      frame.style[property] = value;

      if (output) {
        output.value = value;
        output.textContent = value;
      }
    });
  });

// OPTIONAL IMAGE FIT CONTROLS
document
  .querySelectorAll(".frame-controls select")
  .forEach((select) => {
    select.addEventListener("change", () => {
      const image = document.getElementById(select.dataset.image);

      if (image) {
        image.style.objectFit = select.value;
      }
    });
  });

// COUNTDOWN TO PREMSINGH'S RETURN
(() => {
  // October 23, 2026, at midnight in the visitor's local time.
  const targetDate = new Date(2026, 9, 23, 0, 0, 0);

  const fields = {
    days: document.getElementById("countdown-days"),
    hours: document.getElementById("countdown-hours"),
    minutes: document.getElementById("countdown-minutes"),
    seconds: document.getElementById("countdown-seconds")
  };

  const message = document.getElementById("countdown-message");
  const timer = document.getElementById("countdown-timer");

  // Safely stop if the countdown isn't on this page.
  if (!timer || Object.values(fields).some((field) => !field)) {
    return;
  }

  function updateFlip(element, value) {
    const formatted = String(value).padStart(2, "0");

    if (element.textContent === formatted) return;

    element.textContent = formatted;
    element.classList.remove("is-flipping");

    // Restart the flip animation.
    void element.offsetWidth;
    element.classList.add("is-flipping");
  }

  function updateCountdown() {
    const remaining = targetDate.getTime() - Date.now();

    if (remaining <= 0) {
      Object.values(fields).forEach((field) => {
        field.textContent = "00";
        field.classList.remove("is-flipping");
      });

      if (message) {
        message.textContent =
          "Prem's expected return date has arrived.";
      }

      return false;
    }

    const totalSeconds = Math.floor(remaining / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    updateFlip(fields.days, days);
    updateFlip(fields.hours, hours);
    updateFlip(fields.minutes, minutes);
    updateFlip(fields.seconds, seconds);

    return true;
  }

  updateCountdown();

  const countdownInterval = setInterval(() => {
    const isCountingDown = updateCountdown();

    if (!isCountingDown) {
      clearInterval(countdownInterval);
    }
  }, 1000);
})();
