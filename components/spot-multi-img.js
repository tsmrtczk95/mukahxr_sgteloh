let currentGallery = [];
let currentCaptions = [];
let currentIndex = 0;

// OPEN GALLERY
function openGallery(images, captions = []) {
    currentGallery = images;
    currentCaptions = captions;
    currentIndex = 0;

    updateGallery();

    document.getElementById("imageModal").style.display = "block";
}

// UPDATE IMAGE + CAPTION
function updateGallery() {
    const img = document.getElementById("galleryImage");
    const captionBox = document.getElementById("galleryCaption");

    img.src = currentGallery[currentIndex];

    let captionText = currentCaptions[currentIndex] || "";
    captionBox.innerText = `${captionText} (${currentIndex+1}/${currentGallery.length})`;
}

// NAVIGATION
function nextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateGallery();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateGallery();
}

// CLOSE GALLERY
function closeGallery() {
    document.getElementById("imageModal").style.display = "none";
}

// SWIPE SUPPORT
let startX = 0;

document.getElementById("imageModal").addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

document.getElementById("imageModal").addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
});
