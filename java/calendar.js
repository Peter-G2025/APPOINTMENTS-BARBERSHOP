// ====== calendar.js ======
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedService = params.get("service") || "Γενική Υπηρεσία";
  const grid = document.getElementById("calendarGrid");
  const monthLabel = document.getElementById("monthLabel");
  const prev = document.getElementById("prevMonth");
  const next = document.getElementById("nextMonth");
  const timeSection = document.getElementById("timeSection");
  const timesContainer = document.getElementById("timesContainer");
  const selectedDateLabel = document.getElementById("selectedDateLabel");

  let today = new Date();
  let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);

  function renderCalendar() {
    grid.innerHTML = "";
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    monthLabel.textContent = viewDate.toLocaleString("el-GR", { month: "long", year: "numeric" });

    const firstDay = new Date(year, month, 1);
    const startDay = (firstDay.getDay() + 6) % 7; // Δευτέρα=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // προηγούμενες μέρες
    for (let i = 0; i < startDay; i++) {
      const dayNum = new Date(year, month, -startDay + i + 1).getDate();
      const d = document.createElement("div");
      d.textContent = dayNum;
      d.classList.add("outside");
      grid.appendChild(d);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const btn = document.createElement("div");
      btn.textContent = d;
      const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      btn.dataset.date = iso;
      if (iso === today.toISOString().slice(0, 10)) btn.style.fontWeight = "bold";

      btn.addEventListener("click", () => {
        document.querySelectorAll(".calendar-grid div").forEach(el => el.classList.remove("selected"));
        btn.classList.add("selected");
        showTimes(iso);
      });
      grid.appendChild(btn);
    }
  }

  function showTimes(dateStr) {
    selectedDateLabel.textContent = new Date(dateStr).toLocaleDateString("el-GR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    timesContainer.innerHTML = "";
    timeSection.hidden = false;

    const times = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];
    times.forEach(t => {
      const b = document.createElement("button");
      b.textContent = t;
      b.classList.add("available");
      b.addEventListener("click", () => {
      window.location.href = `form.html?date=${dateStr}&time=${t}&service=${encodeURIComponent(selectedService)}`;
      });
      timesContainer.appendChild(b);
    });
  }

  prev.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCalendar();
  });
  next.addEventListener("click", () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});
