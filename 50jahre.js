// Optional - Set sticky section heights based on inner content width
// Makes scroll timing feel more natural
function setTrackHeights() {
  $(".section-height").each(function (index) {
    let trackWidth = $(this).find(".track").outerWidth();
    $(this).height(trackWidth);
  });
}
setTrackHeights();
window.addEventListener("resize", function () {
  setTrackHeights();
});

// Horizontal scroll and counter
$(".section-height").each(function (index) {
  let childrenYears = $(this).find("[year]"),
    childrenCounter = $(this).find("[counter]");

  let tlMain = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top top",
      end: "98% bottom",
      scrub: 1
    }
  });
  tlMain.to($(this).find(".track"), { xPercent: -100, ease: "none" });

  childrenYears.each(function (index) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        containerAnimation: tlMain,
        start: "left center",
        end: "left left",
        scrub: true
      }
    });
    tl.to(childrenCounter, {
      innerText: $(this).attr("year"),
      snap: "innerText"
    });
  });
});

// FULL IMAGE
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".panel-full",
      containerAnimation: tlMain,
      start: "left left",
      end: "right left",
      scrub: true
    }
  })
  .from(".panel-full .image-100", { scale: 1.3 }, 0);
