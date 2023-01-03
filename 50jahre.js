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

// Horizontal scroll
let tlMain = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section-height",
      start: "top top",
      end: "98% bottom",
      scrub: 1
    }
  })
  .to(".track", {
    xPercent: -100,
    ease: "none"
  });

// hero photo
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero-panel",
      containerAnimation: tlMain,
      start: "left left",
      end: "right left",
      scrub: true
    }
  })
  .from(".hero-panel_img", { scale: 1.6 }, 0);

// note
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".note-panel",
      containerAnimation: tlMain,
      start: "left right",
      end: "left left",
      scrub: true
    }
  })
  .from(".note-panel_img", { rotate: 45, scale: 0.3 });

// thanks
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".thanks-panel_wrap",
      containerAnimation: tlMain,
      start: "left left",
      end: "right right",
      scrub: true
    }
  })
  .to(".thanks-panel", { xPercent: 100, ease: "none" })
  .to(".thanks-panel_photo", { scale: 1 }, 0)
  .fromTo(
    ".thanks-panel_contain.is-2",
    {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
    },
    { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", ease: "none" },
    0
  );

// stagger photos
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".stagger-panel",
      containerAnimation: tlMain,
      start: "left right",
      end: "right left",
      scrub: true
    }
  })
  .from(".stagger-panel_img", { x: "100vw", stagger: { each: 0.05 } })
  .to(".stagger-panel_img", { scale: 0.5, stagger: { each: 0.05 } });

$("[year]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      containerAnimation: tlMain,
      // start: "left center",
      // end: "left left",
      scrub: false
    }
  });
  tl.to("[counter]", { innerText: $(this).attr("year"), snap: "innerText" });
});
