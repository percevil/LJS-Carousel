const carousel = document.querySelector(".carousel");
const nextButton = carousel.querySelector(".next-button");
const previousButton = carousel.querySelector(".previous-button");
const contents = carousel.querySelector(".carousel__contents");
const slides = [...carousel.querySelectorAll(".carousel__slide")];

const dotsContainer = createDots(slides);
const dots = [...dotsContainer.children];

// const dots = [...carousel.querySelectorAll(".carousel__dot")];
// // ^ getting dots for JS and changing them to an array
// const dotsContainer = carousel.querySelector(".carousel__dots");
// ^^^ 10.5 Creating dots dynamically through JS

const slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + "px";
  //  ADDED 9-11 FROM 14-17 SOURCE
});

// NEXT BUTTON
nextButton.addEventListener("click", (e) => {
  const currentSlide = contents.querySelector(".is-selected");
  // ^ finds which is the current slide
  const nextSlide = currentSlide.nextElementSibling;
  // ^this declaration gets next sibling and makes it the next Slide
  const destination = getComputedStyle(nextSlide).left;
  // ^this declaration gets the computed style from left which is 800px
  // contents.style.left = '-' + destination
  contents.style.transform = `translateX(-${destination})`;
  // ^ We can use this destination value to set .carousel__content's left property.
  currentSlide.classList.remove("is-selected");
  // ^ removes is-selected class from current slide
  nextSlide.classList.add("is-selected");
  // ^ and adds it to the next slide
  previousButton.removeAttribute("hidden");
  // ^ removes the hidden attribute when on the second slide

  if (!nextSlide.nextElementSibling) {
    nextButton.setAttribute("hidden", true);
    // ^ checks for a last slide. If no more, then removes the nextButton by setting hidden
  }

  //    UPDATING HIGHLIGHTED DOT WITH NEXT BUTTON CLICK
  // const currentDot = dotsContainer.querySelector(".is-selected");
  // ^ find the current dot selected
  // const nextDot = currentDot.nextElementSibling;
  // // ^ then find the next dot
  // currentDot.classList.remove("is-selected");
  // // ^remove is-selected class from current dot
  // nextDot.classList.add("is-selected");
  // ^ add is-selected class to current dot
});

// PREVIOUS BUTTON
previousButton.addEventListener("click", (e) => {
  const currentSlide = contents.querySelector(".is-selected");
  // ^ finds the current slide with is-selected class
  const previousSlide = currentSlide.previousElementSibling;
  // ^ finds previous slide and tags it
  const destination = getComputedStyle(previousSlide).left;

  // contents.style.left = "-" + destination;
  //  THIS LINE WAS REMOVED L49 - Not needed, was replaced with L62

  // ^ We can use this destination value to set .carousel__content's left property.

  contents.style.transform = "translateX(-" + destination + ")";
  currentSlide.classList.remove("is-selected");
  previousSlide.classList.add("is-selected");
  //   ^removes is-selected class from current slide and adds it to the previous slide
  nextButton.removeAttribute("hidden");
  //  ^ when back on the second slide add the nextButton back by removing hidden from the button

  if (!previousSlide.previousElementSibling) {
    previousButton.setAttribute("hidden", true);
    // ^ checks for a last slide. If no more, then removes the nextButton by setting hidden again
  }

  //    UPDATING HIGHLIGHTED DOT WITH PREVIOUS BUTTON CLICK
  // const currentDot = dotsContainer.querySelector(".is-selected");
  // ^ find the current dot selected
  //   const previousDot = currentDot.previousElementSibling;
  //   // ^ then find the next dot
  //   currentDot.classList.remove("is-selected");
  //   // ^remove is-selected class from current dot
  //   previousDot.classList.add("is-selected");
  //   // ^ add is=selected class to current dot
  // });

  // DOTS
  // 10.5 Creating dots dynamically through JS

  function createDots(slides) {
    const dotsContainer = document.createElement("div");
    //  ^^ creating dotsContainer div into HTML
    dotsContainer.classList.add("carousel__dots");
    // ^^ adding carousel dots class

    slides.forEach((slide) => {
      const dot = document.createElement("button");
      // ^^ loop through each slide to create button elements
      dot.classList.add("carousel__dot");
      // ^^ adding dots to each button element
      if (slide.classList.contains("is-selected")) {
        dot.classList.add("is-selected");
      }

      dotsContainer.appendChild(dot);
      // ^^ appending each dot to the container
      console.log(dotsContainer);
    });
    return dotsContainer;
  }

  // 10.5 Creating dots dynamically through JS instead of using HTML, replaced by above code

  // dotsContainer.addEventListener("click", (event) => {
  //   const dot = event.target.closest("button");

  //   // ^ event delegation way of listening to the dots, making lines 84-85 obsolete

  // dots.forEach((dot) => {
  //   dot.addEventListener("click", (e) => {
  // ^ adds event listener on to dots through a forEach loop
  // if (!dot) return;
  // let clickedDotIndex;
  // ^ declaration of clickedDotIndex
  // for (let index = 0; index < dots.length; index++) {
  //   if (dots[index] === dot) {
  //     clickedDotIndex = index;
  //   }
  // }
  // ^loop through dots and check which dot was clicked.
  // const slideToShow = slides[clickedDotIndex];
  // const destination = getComputedStyle(slideToShow).left;
  // ^ Once position is known, get left position can be shown
  // contents.style.transform = "translateX(-" + destination + ")";
  // // contents.style.left = "-" + destination;
  // // ^ we can show the slide by changing .carousel__content's left position.
  // slides.forEach((slide) => {
  //   slide.classList.remove("is-selected");
  // });
  //   ^ After changing the selected slide, we need to update the location of the is-selected class. (Without this, our previous and next buttons will not work).
  // To do this, we need to remove the is-selected class from the current slide. We can find the selected slide with querySelector
  // An alternate way is to loop through all slides and remove the is-selected class from them all.

  // slideToShow.classList.add("is-selected");
  // ^^ Then, we add is-selected to the newly displayed slide.
  // dots.forEach((d) => {
  //   d.classList.remove("is-selected");
  // });
  // dot.classList.add("is-selected");
  // ^^ To update the styled dot, we remove the is-selected class from all other dots. And we add is-selected back to the clicked dot.

  //  SHOW/HIDE BUTTONS BASED ON WHICH DOTS ARE CLICKED
  // if (clickedDotIndex === 0) {
  // ^ IF 0 dot is clicked
  // previousButton.setAttribute("hidden", true);
  // //  ^ hide previous button
  // nextButton.removeAttribute("hidden");
  //  ^ show next button
  // } else if (clickedDotIndex === dots.length - 1) {
  //   // ^ check number of dots in array , -1 establishes length from end. So if last dot is clicked
  //   previousButton.removeAttribute("hidden");
  //   // ^ then remove from previous
  //   nextButton.setAttribute("hidden", true);
  //   // ^ and add hidden to nextButton
  // } else {
  // previousButton.removeAttribute("hidden");
  // nextButton.removeAttribute("hidden");
  // ^ else if clicked on a middle dot, remove hidden from both buttons.
  // }
});
