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

//MATCHMEDIA
let mm = gsap.matchMedia(),
  breakPoint = 800;

mm.add(
  {
    // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
    isDesktop: `(min-width: 992px)`,
    isTablet: `(max-width: 991px)`,
    isMobile: `(max-width: 480px)`,
    reduceMotion: "(prefers-reduced-motion: reduce)"
  },
  (context) => {
    // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
    let { isDesktop, isMobile, isTablet, reduceMotion } = context.conditions;

    // HERO VIDEO
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
      .to(
        ".hero-video_wrapper .image-2-3",
        { paddingTop: isMobile ? "66%" : "100vh" },
        0
      );

    // CLIPPATH
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
    // 50 YEAR TEASER
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

    return () => {
      // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
      // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
    };
  }
);

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
