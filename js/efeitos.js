document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(
      Draggable,
      DrawSVGPlugin,
      Flip,
      MotionPathHelper,
      MotionPathPlugin,
      ScrambleTextPlugin,
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      TextPlugin
    );
  
});