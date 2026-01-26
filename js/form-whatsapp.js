document.getElementById('leadForm').addEventListener('submit', function(e){
  e.preventDefault();

  const data = new FormData(this);
  const msg =
`בקשה מהאתר:
שֵׁם: ${data.get('name')}
טֵלֵפוֹן: ${data.get('phone')}
מאיפה: ${data.get('from') || '-'}
לאן: ${data.get('to') || '-'}`;

  const phone = "972528078844"; // твой номер в формате Израиля без +
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  window.open(url, "_blank");
});
