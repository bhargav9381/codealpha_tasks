// Get elements

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const imageTitle = document.getElementById("imageTitle");
const imageCategory = document.getElementById("imageCategory");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const filterButtons = document.querySelectorAll(".filter-btn");


// Store currently visible images

let visibleItems = Array.from(galleryItems);

let currentIndex = 0;


// ------------------------------------
// OPEN LIGHTBOX
// ------------------------------------

galleryItems.forEach((item) => {

    item.addEventListener("click", () => {

        visibleItems = Array.from(
            document.querySelectorAll(
                ".gallery-item:not(.hide)"
            )
        );

        currentIndex = visibleItems.indexOf(item);

        showImage(currentIndex);

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";
    });

});


// ------------------------------------
// SHOW IMAGE
// ------------------------------------

function showImage(index) {

    if (visibleItems.length === 0) return;

    const item = visibleItems[index];

    const image = item.querySelector("img");

    const title = item.querySelector("h3");

    const category = item.querySelector("p");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    imageTitle.textContent = title.textContent;

    imageCategory.textContent = category.textContent;

}


// ------------------------------------
// NEXT IMAGE
// ------------------------------------

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage(currentIndex);

});


// ------------------------------------
// PREVIOUS IMAGE
// ------------------------------------

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage(currentIndex);

});


// ------------------------------------
// CLOSE LIGHTBOX
// ------------------------------------

closeBtn.addEventListener("click", closeLightbox);


function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.style.overflow = "auto";

}


// ------------------------------------
// CLICK OUTSIDE IMAGE
// ------------------------------------

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// ------------------------------------
// KEYBOARD NAVIGATION
// ------------------------------------

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        nextBtn.click();
    }

    if (event.key === "ArrowLeft") {
        prevBtn.click();
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});


// ------------------------------------
// FILTER IMAGES
// ------------------------------------

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active class

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const category = button.dataset.category;


        // Filter gallery

        galleryItems.forEach((item) => {

            const itemCategory = item.dataset.category;

            if (
                category === "all" ||
                category === itemCategory
            ) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });


        // Update visible items

        visibleItems = Array.from(
            document.querySelectorAll(
                ".gallery-item:not(.hide)"
            )
        );

    });

});