
let cart = [];

function addToCart(name, price) {

    cart.push({
       name: name,
       price: price
    });

    updateCart();

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

        cart.forEach(function(item) {

            let itemElement = document.createElement("p");

            itemElement.textContent = item.name + " - ₱" + item.price;

            cartItems.appendChild(itemElement);

            total = total + item.price;

        });

    }

    cartTotal.textContent = "₱" + total;

}


function clearCart() {

    cart = [];

    updateCart();

}


let clearButton = document.querySelector(".clear-button");

if (clearButton) {
    clearButton.addEventListener("click", clearCart);
}


let feedbackForm = document.getElementById("feedback-form");

if (feedbackForm) {

    feedbackForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let name = document.getElementById("feedback-name").value.trim();

        if (/[0-9]/.test(name)) {

            alert("Please enter a valid name. Numbers are not allowed.");

            document.getElementById("feedback-name").focus();

            return;
        }

        alert("Thank you, " + name + "! Your feedback has been received.");

        feedbackForm.reset();

    });

}
