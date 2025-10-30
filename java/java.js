document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".navbar_links");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // σταματά την άμεση μετάβαση

      // αφαιρεί το active από όλα τα links
      links.forEach(l => l.classList.remove("active"));

      // προσθέτει το active στο πατημένο link
      link.classList.add("active");

      // μετά από 400ms (όσο το animation), πάει στη σελίδα
      setTimeout(() => {
        window.location.href = link.href;
      }, 400);
    });
  });
});
