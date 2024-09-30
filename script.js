function getBasename(url) {
  return url.substring(url.lastIndexOf("/") + 1);
}

function getPreviousValidSibling(element) {
  let previousSibling = element.previousElementSibling;

  while (
    previousSibling &&
    (previousSibling.tagName === "IMG" ||
      (previousSibling.tagName === "P" &&
        previousSibling.classList.contains("footnote")))
  ) {
    previousSibling = previousSibling.previousElementSibling;
  }

  return previousSibling;
}

function getNextValidSibling(element) {
  let nextSibling = element.nextElementSibling;

  while (
    nextSibling &&
    (nextSibling.tagName === "IMG" ||
      (nextSibling.tagName === "P" &&
        nextSibling.classList.contains("footnote")))
  ) {
    nextSibling = nextSibling.nextElementSibling;
  }

  return nextSibling;
}

function assignPositionToFloatingElements() {
  const bodyTextColumn = document.querySelector("#body-text-column");
  const imageColumn = document.querySelector("#image-column");
  const footnoteColumn = document.querySelector("#footnote-column");

  // Matching images' position from the body text to the image column
  const imagesInBodyText = bodyTextColumn.querySelectorAll("img");
  imagesInBodyText.forEach((image) => {
    const prevSibling = getPreviousValidSibling(image);
    const offsetTop = prevSibling.offsetTop + prevSibling.offsetHeight;

    const imageBaseName = getBasename(image.src);

    const theSameImageButInImageColumn = imageColumn.querySelector(
      `img[src$="${imageBaseName}"]`
    );

    theSameImageButInImageColumn.style.position = "absolute";
    theSameImageButInImageColumn.style.top = `${offsetTop - 18}px`;
  });

  // Create a copy of the footnote to the footnote column
  footnoteColumn.innerHTML = "";
  const footnoteInBodyText = bodyTextColumn.querySelectorAll(".footnote");
  footnoteInBodyText.forEach((footnote) => {
    const prevSibling = getPreviousValidSibling(footnote);
    const offsetTop = prevSibling.offsetTop + prevSibling.offsetHeight;

    const existingClassList = footnote.className
      .split(" ")
      .filter((className) => {
        return className.indexOf("hidden") === -1 && className !== "footnote";
      });

    const footnoteInFootnoteColumn = document.createElement("p");
    footnoteInFootnoteColumn.innerHTML = footnote.innerHTML;
    footnoteInFootnoteColumn.classList.add(...existingClassList, "px-6");
    footnoteInFootnoteColumn.style.position = "absolute";
    footnoteInFootnoteColumn.style.top = `${offsetTop - 18}px`;

    footnoteColumn.appendChild(footnoteInFootnoteColumn);
  });

  // Set the image and footnote columns to be visible
  imageColumn.style.visibility = "visible";
  footnoteColumn.style.visibility = "visible";
}

window.addEventListener("resize", () => {
  assignPositionToFloatingElements();
});

document.fonts.ready.then(function () {
  assignPositionToFloatingElements();
  document.querySelector("body").style.opacity = 1;

  setUpAnimations();
});
