//50 jahre scroller

$(".section-height").each(function (index) {
  let tlMain = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top top",
      end: "98% bottom",
      scrub: 1
    }
  });
  tlMain.to($(this).find(".track"), {
    xPercent: -100,
    ease: "none"
  });
});
