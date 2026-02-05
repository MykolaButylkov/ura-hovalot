  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 40,

    autoplay: {
      delay: 2500,          // каждые 2.5 секунды
      disableOnInteraction: false, // не останавливать при клике
      pauseOnMouseEnter: true,    // пауза при наведении мыши
    },

    loop: true,                // бесконечный цикл
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0:   { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });