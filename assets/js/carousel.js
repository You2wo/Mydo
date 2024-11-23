const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      968: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
      }
    }
});

const kampanyeSwiper = new Swiper(".kampanyeSwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
      640: {
          slidesPerView: 2,
          spaceBetween: 20,
      },
      968: {
          slidesPerView: 3,
          spaceBetween: 30,
      },
      1200: {
        slidesPerView: 4,
      }
    }
});