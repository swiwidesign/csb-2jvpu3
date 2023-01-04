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

// Horizontal scroll and animations
let tlMain;
$(".section-height").each(function (index) {
  let childrenYears = $(this).find("[year]"),
    childrenCounter = $(this).find("[counter]"),
    scaleDown = $(this).find("[scaletrigger]");

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
    let tlCounter = gsap
      .timeline({
        scrollTrigger: {
          trigger: $(this),
          containerAnimation: tlMain,
          start: "left center",
          end: "left left",
          scrub: true
        }
      })
      .to(childrenCounter, {
        innerText: $(this).attr("year"),
        snap: "innerText"
      });
  });

  scaleDown.each(function (index) {
    let tlScaleDown = gsap
      .timeline({
        scrollTrigger: {
          trigger: $(this),
          containerAnimation: tlMain,
          start: "left center",
          end: "right left",
          scrub: 2
        }
      })
      .from($(this).find("[scaledown]"), { scale: 1.3 });
  });
});
