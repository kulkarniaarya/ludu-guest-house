
// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();


// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});


// Booking date validation
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

const today = new Date();

const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().slice(0, 10);

checkin.min = localToday;
checkout.min = localToday;

checkin.addEventListener("change", () => {
  checkout.min = checkin.value || localToday;

  if (checkout.value && checkout.value <= checkin.value) {
    checkout.value = "";
  }
});


// WhatsApp booking request
document.getElementById("bookingForm").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();
  const guests = document.getElementById("guests").value;
  const rooms = document.getElementById("rooms").value;

  if (!checkin.value || !checkout.value || checkout.value <= checkin.value) {
    alert("Please select valid check-in and check-out dates.");
    return;
  }

  if (!name || !phone) {
    alert("Please enter your name and contact number.");
    return;
  }

  const start = new Date(`${checkin.value}T00:00:00`);
  const end = new Date(`${checkout.value}T00:00:00`);

  const nights = Math.round((end - start) / 86400000);

  const estimated = nights * Number(rooms) * 1000;

  const message = [
    "Hello LUDU Guest House! I would like to request a booking.",
    "",
    `Name: ${name}`,
    `Contact: ${phone}`,
    `Check-in: ${checkin.value} (10:00 AM)`,
    `Check-out: ${checkout.value} (11:00 AM)`,
    `Guests: ${guests}`,
    `Rooms requested: ${rooms}`,
    `Nights: ${nights}`,
    `Estimated room total: ₹${estimated.toLocaleString("en-IN")}`,
    "",
    "Please confirm availability and booking details. Thank you."
  ].join("\n");

  const whatsappUrl =
    `https://wa.me/918328802305?text=${encodeURIComponent(message)}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
