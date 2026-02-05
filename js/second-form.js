  const overlay = document.getElementById("leadOverlay");
  const openBtn  = document.getElementById("openLead");
  const closeBtn = document.getElementById("closeLead");


  function openModal() {
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
  }

  function closeModal() {
    overlay.classList.add("hidden");
    overlay.classList.remove("flex");
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("CLOSE CLICK");
    
    closeModal();
  });

  // клик по затемнению закрывает
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // Esc закрывает
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeModal();
  });

  document.getElementById('leadFormSecond').addEventListener('submit', function(e){
  e.preventDefault();

  const data = new FormData(this);
  const msg =
`בקשה מהאתר:
שֵׁם: ${data.get('name')}
טֵלֵפוֹן: ${data.get('phone')};`

  const phone = "972528078844"; // твой номер в формате Израиля без +
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");
});