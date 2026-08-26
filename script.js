// ==============================
// SELECT ELEMENTS
// ==============================

const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const imageTitle = document.getElementById("imageTitle");

const imageNumber = document.getElementById("imageNumber");

const imageCategory = document.getElementById("imageCategory");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// ==============================
// CURRENT IMAGE
// ==============================

let currentIndex = 0;

const visibleItems = () => {

    return Array.from(galleryItems).filter(item =>
        item.style.display !== "none"
    );

};


// ==============================
// OPEN LIGHTBOX
// ==============================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        const visibleGallery = visibleItems();

        currentIndex = visibleGallery.indexOf(item);

        openLightbox();

    });

});


function openLightbox() {

    const visibleGallery = visibleItems();

    const currentItem = visibleGallery[currentIndex];

    const image = currentItem.querySelector("img");

    const title = currentItem.querySelector("h3").textContent;

    const category = currentItem.dataset.category;

    const number = currentItem.querySelector("span").textContent;


    lightboxImage.src = image.src;

    imageTitle.textContent = title;

    imageCategory.textContent =
        category.toUpperCase();

    imageNumber.textContent =
        number + " / " + visibleGallery.length;


    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


// ==============================
// CLOSE LIGHTBOX
// ==============================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}


closeBtn.addEventListener("click", closeLightbox);


// ==============================
// NEXT IMAGE
// ==============================

nextBtn.addEventListener("click", () => {

    const visibleGallery = visibleItems();

    currentIndex++;

    if (currentIndex >= visibleGallery.length) {

        currentIndex = 0;

    }

    openLightbox();

});


// ==============================
// PREVIOUS IMAGE
// ==============================

prevBtn.addEventListener("click", () => {

    const visibleGallery = visibleItems();

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            visibleGallery.length - 1;

    }

    openLightbox();

});


// ==============================
// KEYBOARD CONTROLS
// ==============================

document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) {
        return;
    }


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


// ==============================
// CLOSE WHEN CLICKING BACKGROUND
// ==============================

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ==============================
// FILTER GALLERY
// ==============================

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.dataset.filter;


        // Remove active button

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        // Add active button

        button.classList.add("active");


        // Filter images

        galleryItems.forEach(item => {

            const category =
                item.dataset.category;


            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

            }

            else {

                item.style.display = "none";

            }

        });

    });

});