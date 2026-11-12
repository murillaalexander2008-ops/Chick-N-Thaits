

let cart = [];

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

}

// ADD DRINK TO CART WITH SIZE

function addDrinkToCart(name, selectId, regularPrice, largePrice) {

    let selectedSize = document.getElementById(selectId).value;

    let price;
    let size;

    if (selectedSize === "large") {

        price = largePrice;
        size = "22 oz - Large";

    } else {

        price = regularPrice;
        size = "16 oz - Regular";

    }

    addToCart(name + " (" + size + ")", price);

}

function updateCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';

    }

    else {

        cart.forEach(function(item, index) {

            let itemElement = document.createElement("div");

            itemElement.className = "cart-item";

            let itemName = document.createElement("span");

            itemName.textContent = item.name + " - ₱" + item.price;

            let removeButton = document.createElement("button");

            removeButton.textContent = "Remove";

            removeButton.className = "remove-button";

            removeButton.type = "button";

            removeButton.addEventListener("click", function() {

                removeFromCart(index);

            });

            itemElement.appendChild(itemName);

            itemElement.appendChild(removeButton);

            cartItems.appendChild(itemElement);

            total = total + item.price;

        });

    }

    cartTotal.textContent = "₱" + total;

}


// REMOVE INDIVIDUAL PRODUCT

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// CLEAR ENTIRE CART

function clearCart() {

    cart = [];

    updateCart();

}


// CLEAR CART BUTTON

document.querySelectorAll(".clear-button, .clear-cart").forEach(function(button) {

    button.addEventListener("click", clearCart);

});


//FEEDBACK IMAGE PREVIEW

const feedbackImage = document.getElementById("feedback-image");

const imagePreview = document.getElementById("image-preview");

const previewContainer = document.getElementById("image-preview-container");


if (feedbackImage && imagePreview && previewContainer) {

    feedbackImage.addEventListener("change", function() {

        const file = this.files[0];

        if (!file) {

            previewContainer.style.display = "none";
            imagePreview.removeAttribute("src");

            return;

        }

        if (!file.type.startsWith("image/")) {

            alert("Please select a valid image.");

            this.value = "";

            previewContainer.style.display = "none";

            return;

        }

        if (file.size > 5 * 1024 * 1024) {

            alert("Image must not exceed 5MB.");

            this.value = "";

            previewContainer.style.display = "none";

            return;

        }

        const reader = new FileReader();

        reader.onload = function(event) {

            imagePreview.src = event.target.result;

            previewContainer.style.display = "block";

        };

        reader.readAsDataURL(file);

    });

}


// FEEDBACK FORM

let feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("feedback-name").value.trim();

        let rating = document.getElementById("feedback-rating").value;

        let message = document.getElementById("feedback-message").value.trim();

        let image = feedbackImage ? feedbackImage.files[0] : null;


        if (/[0-9]/.test(name)) {

            alert("Please enter a valid name. Numbers are not allowed.");

            document.getElementById("feedback-name").focus();

            return;

        }


        if (image && image.size > 5 * 1024 * 1024) {

            alert("Image must not exceed 5MB.");

            return;

        }


        // Collect feedback information

        let feedback = {

            name: name,

            rating: rating,

            message: message,

            image: image || null

        };


        console.log("Customer Feedback:", feedback);


        alert("Thank you, " + name + "! Your feedback has been received.");


        feedbackForm.reset();

        if (imagePreview && previewContainer) {

            imagePreview.removeAttribute("src");

            previewContainer.style.display = "none";

        }

    });

}


//VIDEO ROTATION

const videos = [
    "videos/Restaurant.mp4",
    "videos/Home page vid sarap.mp4",
    "videos/Pick up line ata to.mp4",
    "videos/HUGOT nanaman.mp4",
    "videos/HUGOT NUMBER3.mp4",
    "videos/Sharap.mp4",
    "videos/SARAP.mp4",
    "videos/SHARAPE.mp4",
    "videos/Chat ta chick n thaits.mp4",
    "videos/Chick and Thaits.mp4"
];


function setupVideo(videoElement, startIndex) {

    let currentVideo = startIndex;

    function loadCurrentVideo() {

        videoElement.classList.remove("show-video");

        videoElement.src = videos[currentVideo];

        videoElement.load();

    }


    // Show the video once it is ready

    videoElement.addEventListener("canplay", async function () {

        try {

            await videoElement.play();

            videoElement.classList.add("show-video");

        } catch (error) {

            console.log("Playback error:", error);

        }

    });


    // Move to the next video when the current one finishes

    videoElement.addEventListener("ended", function () {

        currentVideo = (currentVideo + 1) % videos.length;

        loadCurrentVideo();

    });


    // Report loading errors

    videoElement.addEventListener("error", function () {

        console.log("Video loading error:", videoElement.src);

    });


    loadCurrentVideo();

}


const leftVideo = document.querySelector(".hero-video-left");

const rightVideo = document.querySelector(".hero-video-right");


if (leftVideo && rightVideo) {

    setupVideo(leftVideo, 0);

    setupVideo(rightVideo, 1);

}
