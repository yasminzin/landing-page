/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 **/

// Define Global Variables

const allSections = document.querySelectorAll("section");
const ulElement = document.querySelector("#navbar__list");
const fragment = document.createDocumentFragment();

// build the nav

// 1 loop on the sections to create li element based on their number
allSections.forEach((sec) => {
  const liElement = document.createElement("li");

  // 2 add an anchor element & set the href & the id & the class & the data as an inner text
  const aElement = document.createElement("a");

  const idAttribute = sec.getAttribute("id");
  const navAttribute = sec.getAttribute("data-nav");

  aElement.setAttribute("href", idAttribute);
  aElement.setAttribute("id", idAttribute);
  aElement.setAttribute("class", "menu__link");
  aElement.innerText = navAttribute;

  // 3 append the anchor element to the li element
  liElement.appendChild(aElement);

  // 4 append the li elements to the fragment to enhance the performance
  fragment.appendChild(liElement);

  // 5 add an event listener to make smooth scroll to the required section when the nav item clicked
  liElement.addEventListener("click", (event) => {
    event.preventDefault();
    sec.scrollIntoView({ behavior: "smooth" });
  });

  // 6 append the ul element to the fragment
  ulElement.append(fragment);
});

// the active section

// 1 build a for loop inside a function to loop on the sections & remove "your-active-class" from them
toggleActiveState = (entries) => {
  entries.forEach((entry) => {
    entry.target.classList.remove("your-active-class");

    // 2 select the navigation items
    const activeItem = ulElement.querySelector(`[id=${entry.target.id}]`);

    // 3 add the class "link__active" to the navigation items & add the class "your-active-class" to the section when it is in the viewport
    // 4 remove the classes when it is not in the viewport
    if (entry.isIntersecting) {
      entry.target.classList.add("your-active-class");
      activeItem.classList.add("link__active");
    } else {
      entry.target.classList.remove("your-active-class");
      activeItem.classList.remove("link__active");
    }
  });
};

// 5 the IntersectionObserver added to detect the intersecting section
const observer = new IntersectionObserver(toggleActiveState, {
  threshold: 0.5,
});

// 6 loop on the sections to detect the intersecting section
allSections.forEach((sec) => {
  observer.observe(sec);
});
