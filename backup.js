//LENIS
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: "vertical", // vertical, horizontal
  gestureDirection: "vertical", // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// no scroll on menu click
$(".nav_button").on("click", function () {
  $("body").addClass("no-scroll");
  lenis.destroy();
});
$(".nav_button.is-close, .nav_slideout-bg").on("click", function () {
  $("body").removeClass("no-scroll");
  lenis.start();
});
gsap.registerPlugin(ScrollTrigger);
// hero video
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hero-image_track",
      start: "top center",
      end: "bottom bottom",
      scrub: 0.75,
      ease: "none",
      defer: true,
      lazy: true
    }
  })
  .to(".hero-video_wrapper", { width: "100%" })
  .to(".hero-video_wrapper .image-2-3", { paddingTop: "100vh" }, 0);

// clippath for images
let tlClip = gsap.timeline({
  scrollTrigger: {
    trigger: ".clippath_inside-left.is-2",
    start: "33% bottom",
    end: "top top",
    scrub: 1,
    defaults: {}
  }
});
tlClip.fromTo(
  ".clippath-image-1",
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
  },
  {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  }
);
// 50 year teaser
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".teaser_layout",
      start: "top bottom",
      end: "bottom center",
      scrub: 3
    }
  })
  .from(".teaser-bg-text", { y: "100vw", stagger: { each: 0.08 } });

// TEXT SPLIT ANIMATION
let typeSplit;

// Split the text up
function runSplit() {
  typeSplit = new SplitType("[text-split]", {
    types: "words, chars, lines",
    tagName: "span"
  });
  createAnimation();
}
runSplit();

// Update on window resize
let windowWidth = window.innerWidth;

function checkWidth() {
  if (windowWidth !== window.innerWidth) {
    windowWidth = window.innerWidth;
    typeSplit.revert();
    runSplit();
  }
}

window.addEventListener("resize", checkWidth);

function createAnimation() {
  const lines = document.querySelectorAll("[text-ani] .line");
  for (let i = 0; i < lines.length; i++) {
    const chars = lines[i].getElementsByClassName("char");
    gsap.from(chars, {
      opacity: 0.2,
      duration: 0.2,
      ease: Power2.easeInOut,
      stagger: { each: 0.4 },
      scrollTrigger: {
        trigger: lines[i],
        start: "top center",
        end: "bottom center",
        scrub: true,
        defer: true,
        lazy: true
      }
    });
  }
}
