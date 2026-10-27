// ShopEase JavaScript

var cart = [];
var wishlist = [];
var category = "All";
var slide = 0;

// Load saved cart
if (localStorage.getItem("shopCart")) {
    cart = JSON.parse(localStorage.getItem("shopCart"));
}

// Update cart
function updateCart() {
    var count = 0;
    var total = 0;
    var list = document.getElementById("cartItems");

    if (list) {
        list.innerHTML = "";
    }

    for (var i = 0; i < cart.length; i++) {
        count = count + cart[i].quantity;
        total = total + cart[i].price * cart[i].quantity;

        if (list) {
            list.innerHTML += "<p>" + cart[i].name +
                " - Rs. " + cart[i].price +
                " x " + cart[i].quantity +
                ' <button onclick="changeQuantity(' + i + ',-1)">-</button>' +
                ' <button onclick="changeQuantity(' + i + ',1)">+</button>' +
                ' <button onclick="removeItem(' + i + ')">Remove</button></p>';
        }
    }

    var countBox = document.getElementById("cart-count");
    if (countBox) {
        countBox.innerHTML = count;
    }

    var totalBox = document.getElementById("cartTotal");
    if (totalBox) {
        totalBox.innerHTML = "Rs. " + total;
    }

    localStorage.setItem("shopCart", JSON.stringify(cart));
}

// Add to cart
function addToCart(name, price) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart[i].quantity++;
            found = true;
            break;
        }
    }

    if (found == false) {
        cart.push({
            name: name,
            price: Number(price),
            quantity: 1
        });
    }

    updateCart();

    var message = document.getElementById("cart-message");
    if (message) {
        message.innerHTML = name + " added to cart!";
    }
    var message = document.getElementById("cartMessage");

    if (message != null) {
    message.style.display = "block";

    setTimeout(function() {message.style.display = "none";}, 2000);
}
}

// Change quantity
function changeQuantity(index, amount) {
    cart[index].quantity = cart[index].quantity + amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Remove product
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}

// Search and category filter
function filterProducts() {
    var search = document.getElementById("search");
    var text = "";

    if (search) {
        text = search.value.toLowerCase();
    }

    var products = document.getElementsByClassName("product-card");

    for (var i = 0; i < products.length; i++) {
        var name = products[i].getAttribute("data-name").toLowerCase();
        var type = products[i].getAttribute("data-category");

        if (name.indexOf(text) != -1 &&
            (category == "All" || type == category)) {
            products[i].style.display = "";
        } else {
            products[i].style.display = "none";
        }
    }
}

// Product details popup
function showDetails(card) {
    var modal = document.getElementById("detailsModal");
    var content = document.getElementById("detailsContent");

    var name = card.getAttribute("data-name");
    var price = card.getAttribute("data-price");
    var description = card.getAttribute("data-description");
    var image = card.getElementsByTagName("img")[0];

    if (modal && content) {
        content.innerHTML =
            '<button id="detailsClose">Close</button>' +
            "<h2>" + name + "</h2>" +
            '<img src="' + image.getAttribute("src") +
            '" alt="' + name + '" width="150">' +
            "<p>Price: Rs. " + price + "</p>" +
            "<p>" + description + "</p>";

        modal.style.display = "block";
    }
}

// Wishlist
function toggleWishlist(name, button) {
    var found = false;

    for (var i = 0; i < wishlist.length; i++) {
        if (wishlist[i] == name) {
            wishlist.splice(i, 1);
            found = true;
            break;
        }
    }

    if (found == false) {
        wishlist.push(name);
        button.innerHTML = "♥ Saved";
    } else {
        button.innerHTML = "♡ Wishlist";
    }
}

// Dark mode
function toggleDarkMode() {
    if (document.body.className == "dark") {
        document.body.className = "";
        localStorage.setItem("shopTheme", "light");
    } else {
        document.body.className = "dark";
        localStorage.setItem("shopTheme", "dark");
    }
}

// Image slider
function showSlide(number) {
    var slides = document.getElementsByClassName("slide");

    if (slides.length == 0) {
        return;
    }

    slide = number;

    if (slide >= slides.length) {
        slide = 0;
    }

    if (slide < 0) {
        slide = slides.length - 1;
    }

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slide].style.display = "block";
}

// Contact form validation
var form = document.getElementById("contact-form");

if (form) {
    form.onsubmit = function(event) {
        event.preventDefault();

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("form-message");

        if (name == "" || email == "") {
            message.innerHTML = "Please fill in all required fields.";
        } else if (email.indexOf("@") == -1 ||
                   email.indexOf(".") == -1) {
            message.innerHTML = "Please enter a valid email.";
        } else {
            message.innerHTML = "Thank you! Your message has been submitted.";
            form.reset();
        }
    };
}

// Handle button clicks
document.addEventListener("click", function(event) {
    var button = event.target;

    if (button.className == "add-cart") {
        addToCart(
            button.getAttribute("data-name"),
            button.getAttribute("data-price")
        );
    }

    if (button.className == "filter") {
        category = button.getAttribute("data-category");
        filterProducts();
    }

    if (button.className == "home-filter") {
        window.location.href =
            "products.html?category=" +
            button.getAttribute("data-category");
    }

    if (button.className == "details") {
        showDetails(button.parentElement);
    }

    if (button.className == "wishlist") {
        toggleWishlist(button.getAttribute("data-name"), button);
    }

    if (button.id == "cartOpen") {
        document.getElementById("cartModal").style.display = "block";
        updateCart();
    }

    if (button.id == "cartClose") {
        document.getElementById("cartModal").style.display = "none";
    }

    if (button.id == "detailsClose") {
        document.getElementById("detailsModal").style.display = "none";
    }

    if (button.id == "clear-cart") {
        clearCart();
    }

    if (button.id == "themeToggle") {
        toggleDarkMode();
    }

    if (button.id == "prevSlide") {
        showSlide(slide - 1);
    }

    if (button.id == "nextSlide") {
        showSlide(slide + 1);
    }

    if (button.id == "backToTop") {
        window.scrollTo(0, 0);
    }
});

// Search products
var searchBox = document.getElementById("search");

if (searchBox) {
    searchBox.onkeyup = filterProducts;
}

// Read category from URL
var address = window.location.search;

if (address.indexOf("category=") != -1) {
    category = address.split("category=")[1].split("&")[0];
}

// Restore dark mode
if (localStorage.getItem("shopTheme") == "dark") {
    document.body.className = "dark";
}

// Back to top button
window.onscroll = function() {
    var button = document.getElementById("backToTop");

    if (button) {
        if (window.scrollY > 200) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
};

// Start website
filterProducts();
updateCart();
showSlide(0);