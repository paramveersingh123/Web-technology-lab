// Show the saved cart count on every page
let cartCount = Number(localStorage.getItem("cartCount")) || 0;
let countPlaces = document.querySelectorAll("#cart-count");

countPlaces.forEach(function(place) {
    place.textContent = cartCount;
});

// Add to Cart feature
let cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        cartCount = cartCount + 1;
        localStorage.setItem("cartCount", cartCount);

        countPlaces.forEach(function(place) {
            place.textContent = cartCount;
        });

        let message = document.getElementById("cart-message");
        if (message) {
            message.textContent = button.dataset.name + " added to cart!";
        } else {
            alert(button.dataset.name + " added to cart!");
        }
    });
});

// Product search feature
let searchBox = document.getElementById("search");

if (searchBox) {
    searchBox.addEventListener("input", function() {
        let searchText = searchBox.value.toLowerCase();
        let products = document.querySelectorAll(".product");

        products.forEach(function(product) {
            let name = product.querySelector("h3").textContent.toLowerCase();

            if (name.includes(searchText)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });
    });
}

// Category filter feature
let filterButtons = document.querySelectorAll(".filter");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let category = button.dataset.category;
        let products = document.querySelectorAll(".product");

        products.forEach(function(product) {
            if (category === "All" || product.dataset.category === category) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }
        });

        // Clear the search field after choosing a category
        if (searchBox) {
            searchBox.value = "";
        }
    });
});

// Product details feature
let detailButtons = document.querySelectorAll(".details");

detailButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        alert(
            button.dataset.name + "\\n" +
            "Price: " + button.dataset.price + "\\n" +
            button.dataset.description
        );
    });
});

// Contact form validation feature
let contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let email = document.getElementById("email").value;
        let message = document.getElementById("form-message");

        if (email.includes("@") && email.includes(".")) {
            message.textContent = "Thank you! Your enquiry has been received.";
            contactForm.reset();
        } else {
            message.textContent = "Please enter a valid email address.";
        }
    });
}

// Clear Cart feature
let clearButton = document.getElementById("clear-cart");

if (clearButton) {
    clearButton.addEventListener("click", function() {
        cartCount = 0;
        localStorage.setItem("cartCount", "0");

        countPlaces.forEach(function(place) {
            place.textContent = 0;
        });

        document.getElementById("cart-message").textContent = "Cart cleared!";
    });
}