// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

// CLOSE MENU AFTER CLICKING A LINK

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();

// BOOKING DATE VALIDATION

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const today = new Date();

const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

checkIn.min = localToday;
checkOut.min = localToday;

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || localToday;

  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = "";
  }
});

// WHATSAPP BOOKING ENQUIRY

document.getElementById("bookingForm").addEventListener("submit", event => {

  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const phone = document.getElementById("guestPhone").value.trim();

  const arrival = checkIn.value;
  const departure = checkOut.value;

  const guests = document.getElementById("guests").value;
  const rooms = document.getElementById("roomsCount").value;

  if (!name || !phone || !arrival || !departure) {
    alert("Please complete all booking enquiry details.");
    return;
  }

  if (departure <= arrival) {
    alert("Check-out date must be after check-in date.");
    return;
  }

  const nights = Math.round(
    (new Date(departure) - new Date(arrival)) / 86400000
  );

  const estimate = nights * Number(rooms) * 1000;

  const message = [
    "Hello LUDU Guest House, I would like to enquire about a booking.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Check-in: ${arrival}`,
    `Check-out: ${departure}`,
    `Guests: ${guests}`,
    `Rooms: ${rooms}`,
    `Nights: ${nights}`,
    `Estimated room amount: ₹${estimate.toLocaleString("en-IN")}`,
    "",
    "Please confirm availability. Thank you."
  ].join("\n");

  const whatsappUrl =
    `https://wa.me/918328802305?text=${encodeURIComponent(message)}`;

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

});