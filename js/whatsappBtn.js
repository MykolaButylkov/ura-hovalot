  const phone = "972528078844"; // твой номер
  const text = "הי הגעתי מאתר אלכסו הובלות ואני מעוניין בהצעת מחיר עבור הובלה";

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  document.getElementById('waBtn').href = url;
