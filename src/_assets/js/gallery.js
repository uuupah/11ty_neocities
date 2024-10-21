// this js should be called in the html page head with 'defer' so it runs after the page is loaded.
// created by varve! https://www.write-on.org/tools/
// free to use non-commercially, have fun with it.
// also free to use for artists who are selling their own work that they made.
// any people or companies who are selling things that other people made can't use this.
//
// This creates a slideshow of items in a simple gallery, without needing to edit anything
// when you add a new image. It reads the page and pulls everything with class="gallery"
// (which must be a div containing <a><img></a> <div>caption</div> --those can have whatever
// class/id/styling you want as long as they're inside a div with class="gallery" and in that order.
// The a must be a functioning link to the image, so that if js is missing or turned off, clicking
// on the image will go to the file. The a link is used to get the full size image for the slideshow,
// which allows the gallery to have a thumbnail image in the img element, if you want.
// I prefer putting the elements of the overlay before the gallery. Their default is display=none.
//
// this is ugly but way easier than doing it properly
const overlayHtml = `<div id="overlay">
    <button
        onclick="closeOverlay()"
        class="overlay-control"
        id="overlay-close"
        aria-label="close"
    >
        x
    </button>
    <button
        class="overlay-control"
        id="overlay-prev"
        aria-label="previous"
    >
        &lt;
    </button>
    <button class="overlay-control" id="overlay-next" aria-label="next">
        &gt;
    </button>
    <img id="overlay-img" />
    <div id="overlay-caption"></div>
</div>`;
document.body.insertAdjacentHTML("beforeend", overlayHtml);
// Get the various bits of the overlay
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlay-img");
const overlayCaption = document.getElementById("overlay-caption");
const overlayClose = document.getElementById("overlay-close");
const overlayPrev = document.getElementById("overlay-prev");
const overlayNext = document.getElementById("overlay-next");
//const debug = document.getElementById("tmp"); // if needed during testing.

// get the gallery image list
const g = document.getElementsByClassName("gallery");
for (let i = 0; i < g.length; i++) {
  //loop through all gallery items
  c = g[i].children; // children are what's inside the gallery div: a and div
  c[0].onclick = function (event) {
    event.preventDefault(); //make sure the regular click to a new page doesn't happen
    showOverlay(this, i); //instead show the slideshow overlay
  }; //if javascript is off or missing, clicking the image will go directly to the image file
  // 'this' in this case is c[0], or the first child of the gallery div, the a element around the image.

  img = c[0].children; // inside the a is an img
  if (img[0].getAttribute("alt") != null) {
    // if there's an alt text
    const imgAlt = img[0].getAttribute("alt");
    const alt = document.createElement("div"); //add the alt text as a div that only shows up
    const altText = document.createTextNode(imgAlt); //on hover (controlled by the CSS)
    alt.appendChild(altText);
    alt.setAttribute("class", "altpopup");
    g[i].appendChild(alt);
  }
}

// close the overlay by hiding all the parts
function closeOverlay() {
  overlay.style.display = "none";
  overlayClose.style.display = "none";
  overlayImg.style.display = "none";
  overlayCaption.style.display = "none";
}

// set up the previous item button
// this doesn't actually change the image yet!
function prevItem(p) {
  if (p == 0) {
    p = g.length - 1;
  } else {
    p--;
  } //previous index with loop around to end
  prev = g[p].children; //the gallery div representing the previous image
  overlayPrev.onclick = function () {
    showOverlay(prev[0], p);
  };
}
// sending prev[0], the a child of the previous gallery div, as the gallery image to load
// when the previous button is clicked. same as set up for the entire gallery up top.

// set up the next item button
// this doesn't actually change the image yet!
// same notes as prevItem
function nextItem(n) {
  if (n == g.length - 1) {
    n = 0;
  } else {
    n++;
  } //next image with loop around to beginning
  next = g[n].children;
  overlayNext.onclick = function () {
    showOverlay(next[0], n);
  };
}

// show the overlay
function showOverlay(pic, index) {
  overlayImg.src = pic.href; //put the clicked image in the overlay
  overlayCaption.innerHTML = pic?.nextElementSibling?.innerHTML; //next sibling is the caption div
  prevItem(index); //set up the next/prev buttons relative to the current image
  nextItem(index);
  overlay.style.display = "block"; //show the parts of the overlay now that they're set up
  overlayImg.style.display = "block";
  overlayClose.style.display = "block";
  overlayCaption.style.display = overlayCaption.innerHTML ? "hidden" : "block";
}
