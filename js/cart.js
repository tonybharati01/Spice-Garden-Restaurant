// ========================================
// SPICE GARDEN CART
// ========================================

let cart = JSON.parse(
    localStorage.getItem("spiceGardenCart")
) || [];


// ========================================
// ADD TO CART
// ========================================

const cartButtons = document.querySelectorAll(".menu-cart-btn");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName = button.dataset.name;
        const productPrice = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === productName
        );

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: button.dataset.image
            });
        }

        saveCart();
        updateCartCount();

        // Optional visual feedback
        button.innerHTML = '<i class="fa-solid fa-check"></i>';

        setTimeout(() => {
            button.innerHTML =
                '<i class="fa-solid fa-cart-plus"></i>';
        }, 800);

    });

});


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "spiceGardenCart",
        JSON.stringify(cart)
    );

}


// ========================================
// UPDATE HEADER CART COUNT
// ========================================

function updateCartCount() {

    const cartCount =
        document.querySelector(".cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    const cartItemsContainer =
        document.querySelector("#cart-items");

    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";


    // EMPTY CART
    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add some delicious dishes from our menu.
                </p>

                <a href="./menu.html">
                    Explore Menu
                </a>

            </div>
        `;

        updateCartSummary();

        return;
    }


    // DISPLAY EACH PRODUCT
    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        const cartItem =
            document.createElement("article");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

    <div class="cart-item-info">

        <img
            src="${item.image}"
            alt="${item.name}"
            class="cart-item-image"
        >

        <div class="cart-item-details">

            <h3>${item.name}</h3>

            <p>
                ₹${item.price} × ${item.quantity}
            </p>

        </div>

    </div>


    <div class="cart-item-actions">

        <div class="quantity-control">

            <button
                type="button"
                onclick="decreaseQuantity(${index})"
            >
                −
            </button>

            <span>${item.quantity}</span>

            <button
                type="button"
                onclick="increaseQuantity(${index})"
            >
                +
            </button>

        </div>


        <strong class="cart-item-price">
            ₹${itemTotal}
        </strong>


        <button
            type="button"
            class="remove-item"
            onclick="removeItem(${index})"
            aria-label="Remove ${item.name}"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>

    </div>

`;

        cartItemsContainer.appendChild(cartItem);

    });


    updateCartSummary();

}


// ========================================
// INCREASE QUANTITY
// ========================================

function increaseQuantity(index) {

    cart[index].quantity += 1;

    saveCart();

    displayCart();

    updateCartCount();

}


// ========================================
// DECREASE QUANTITY
// ========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    displayCart();

    updateCartCount();

}


// ========================================
// REMOVE ITEM
// ========================================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

    updateCartCount();

}


// ========================================
// UPDATE CART SUMMARY
// ========================================

function updateCartSummary() {

    const summaryItems =
        document.querySelector("#summary-items");

    const subtotal =
        document.querySelector("#cart-subtotal");

    const total =
        document.querySelector("#cart-total");


    if (!summaryItems || !subtotal || !total) {
        return;
    }


    // TOTAL QUANTITY
    const totalItems = cart.reduce(
        (total, item) => {
            return total + item.quantity;
        },
        0
    );


    // TOTAL MONEY
    const totalPrice = cart.reduce(
        (total, item) => {
            return total + (
                item.price * item.quantity
            );
        },
        0
    );


    // UPDATE HTML

    summaryItems.textContent =
        totalItems;

    subtotal.textContent =
        `₹${totalPrice}`;

    total.textContent =
        `₹${totalPrice}`;

}


// ========================================
// INITIALIZE CART
// ========================================

updateCartCount();

displayCart();