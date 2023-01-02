// SWIPER COUNTER
const slides = $(".swiper-slide");
const total = slides.length;
slides.each(function (index) {
  const myIndex = index + 1;
  const formattedIndex = myIndex < 10 ? `0${myIndex}` : myIndex;
  const formattedTotal = total < 10 ? `0${total}` : total;
  $(this).find(".swiper-number").text(`${formattedIndex}/${formattedTotal}`);
});

// SWIPER
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  grabCursor: true,
  cssMode: false,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 40,
  parallax: false,
  centeredSlides: true,
  mousewheel: {
    forceToAxis: true
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 1
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 2
    }
  },
  // autoplay
  autoplay: {
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  keyboard: {
    enabled: true
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  speed: 2000,
  lazy: true
});
