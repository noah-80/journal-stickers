console.clear(); 
gsap.registerPlugin(ScrollTrigger); 

const list = document.querySelector(".list"); 
const fill = document.querySelector(".fill"); 
const listItems = gsap.utils.toArray("li", list); 
const slides = gsap.utils.toArray(".slide"); 
const pinSections = gsap.utils.toArray(".pin-section"); 
const lists = gsap.utils.toArray(".list"); 

const tl = gsap.timeline({ 
  scrollTrigger: { 
    trigger: ".pin-section", 
    start: "top top", 
    end: "+=" + listItems.length * 50 + "%", 
    pin: true, 
    scrub: true 
    // markers: true 
  } 
}); 

// First element visible, set the marker 
fill && gsap.set(fill, { scaleY: 1 / listItems.length, transformOrigin: "top left" }); 

listItems.forEach((item, i) => { 
  const previousItem = listItems[i - 1]; 
  // Scope the date query to the current and previous items
  const currentDate = item.querySelector(".listdate");
  const previousDate = previousItem ? previousItem.querySelector(".listdate") : null;

  if (previousItem) { 
    // Animate current list item and its child .listdate to active color
    tl.set([item, currentDate], { color: "#363636" }, 0.5 * i) 
      .to(slides[i], { autoAlpha: 1, duration: 0.2 }, "<" ) 
      // Animate previous list item and its child .listdate to inactive color
      .set([previousItem, previousDate], { color: "#C8C6C6" }, "<") 
      .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, "<" ); 
  } else { 
    // Set initial active state for the first item and its child .listdate
    gsap.set([item, currentDate], { color: "#363636" }); 
    gsap.set(slides[i], { autoAlpha: 1 }); 
  } 
}); 

tl.to( 
  fill, 
  { scaleY: 1, transformOrigin: "top left", ease: "none", duration: tl.duration() }, 
  0 
).to({}, {}); // small pause at the end of the timeline before it un-pins
