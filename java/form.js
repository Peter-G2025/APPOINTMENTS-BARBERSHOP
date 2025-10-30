// ====== booking.js ======
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const date = params.get("date");
  const time = params.get("time");
  const bookingInfo = document.getElementById("bookingInfo");

  if (date && time) {
  bookingInfo.textContent = `Υπηρεσία: ${service || "—"} • Ημερομηνία: ${date} • Ώρα: ${time}`;
  } else {
    bookingInfo.textContent = "Δεν επιλέχθηκε ημερομηνία.";
  }
 
  const service = params.get("service");
  const form = document.getElementById("bookingForm");
  const backBtn = document.getElementById("backBtn");



  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {
      alert("Συμπλήρωσε όνομα και τηλέφωνο!");
      return;
    }

    alert(`Η κράτηση σου ολοκληρώθηκε!\n\nΌνομα: ${name}\nΤηλ: ${phone}\nΗμ/νία: ${date}\nΏρα: ${time}`);
    window.location.href = "index.html";
  });

  backBtn.addEventListener("click", () => history.back());
});
