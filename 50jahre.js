//LOADER
//variables
let customEase =
  "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1";
let counter = {
  value: 0
};
let loaderDuration = 6;

// If not a first time visit in this tab
if (sessionStorage.getItem("visited") !== null) {
  loaderDuration = 2;
  counter = {
    value: 75
  };
}
sessionStorage.setItem("visited", "true");

function updateLoaderText() {
  let progress = Math.round(counter.value);
  $(".loader-number").text(progress);
}
// Loader Out Animation
function endLoaderAnimation() {
  let tlcounter = gsap
    .timeline({
      delay: 0.4,
      ease: Power2.easeInOut
    })
    .to(".loader", {
      yPercent: -100,
      duration: 0.8
    })

    .from(
      ".intro-logo",
      {
        yPercent: 100,
        duration: 0.4
      },
      "<50%"
    )
    .from(
      ".is-50jahre",
      {
        opacity: 0,
        duration: 1
      },
      "<50%"
    )
    .to(".loader", {
      display: "none"
    });
}

let tl = gsap.timeline({
  onComplete: endLoaderAnimation
});
tl.to(counter, {
  value: 100,
  onUpdate: updateLoaderText,
  duration: loaderDuration,
  ease: CustomEase.create("custom", customEase)
});
tl.to(
  ".loader_progress",
  {
    width: "100%",
    duration: loaderDuration,
    ease: CustomEase.create("custom", customEase)
  },
  0
);

// HORIZONTAL
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
  // effects
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
// fade in counter
gsap.from(".fixedjahr", {
  scrollTrigger: {
    trigger: ".section-height",
    start: "top top",
    toggleActions: "restart none none reverse"
  }, // start the animation when ".box" enters the viewport (once)
  opacity: 0
});
