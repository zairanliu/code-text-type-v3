function setUpImageAnimation() {
  const images = document.querySelectorAll("#image-column > img");

  images.forEach((img) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: img,
          scrub: true,
        },
      })
      .from(img, { opacity: 0, y: -200 })
      .to(img, { opacity: 1, y: 0 });
  });
}

function setUpParagraphAnimation() {
  const paragraphs = document.querySelectorAll("#body-text-column > *");

  paragraphs.forEach((p) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: p,
          start: "top 80%",
          end: "bottom 40%",
          scrub: 0.4,
        },
      })
      .from(p, { opacity: 0.1 })
      .to(p, { opacity: 1 });
  });
}

function setUpFootnoteAnimation() {
  const footnotes = document.querySelectorAll("#footnote-column > p");

  footnotes.forEach((footnote) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: footnote,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      })
      .from(footnote, { opacity: 0, y: 50 })
      .to(footnote, { opacity: 1, y: 0 });
  });
}

function setUpAnimations() {
  setUpParagraphAnimation();
  setUpImageAnimation();
  setUpFootnoteAnimation();
}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
});
