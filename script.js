let cart = {};
let totalAmount = 0;
let currentVendor = 'C1';
let switchToVendor = '';

function showCategory(vendor) {
    // Hide all categories
    document.getElementById('C1').classList.remove('active');
    document.getElementById('C2').classList.remove('active');

    // Show the selected category
    document.getElementById(vendor).classList.add('active');
}

function switchVendor(vendor) {
    if (Object.keys(cart).length > 0 && currentVendor !== vendor) {
        // Show modal warning
        switchToVendor = vendor;
        openModal();
    } else {
        // No items in the cart, switch directly
        showCategory(vendor);
    }
}



function increaseCount(item, price) {
    let countSpan = document.getElementById(`${item}-count`);
    let currentCount = parseInt(countSpan.innerText);
    currentCount += 1;
    countSpan.innerText = currentCount;

    addToCart(item, currentCount, price);
}

function decreaseCount(item, price) {
    let countSpan = document.getElementById(`${item}-count`);
    let currentCount = parseInt(countSpan.innerText);
    if (currentCount > 0) {
        currentCount -= 1;
    }
    countSpan.innerText = currentCount;

    addToCart(item, currentCount, price);
}

function addToCart(item, count, price) {
    if (count > 0) {
        cart[item] = { count, price };
    } else {
        delete cart[item];
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    let cartItemsDiv = document.getElementById('cart-items');
    let totalAmountSpan = document.getElementById('total-amount');
    cartItemsDiv.innerHTML = ''; // Clear the current cart display

    totalAmount = 0;
    for (let item in cart) {
        let itemTotal = cart[item].count * cart[item].price;
        totalAmount += itemTotal;
        cartItemsDiv.innerHTML += `<p>${item}: ${cart[item].count} x $${cart[item].price} = $${itemTotal.toFixed(2)}</p>`;
    }

    totalAmountSpan.innerText = totalAmount.toFixed(2);
}

// Modal functions
function openModal() {
    document.getElementById('vendorModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('vendorModal').style.display = 'none';
}

function confirmVendorSwitch() {
    // Clear the cart and switch vendor
    cart = {};
    totalAmount = 0;
    updateCartDisplay();
    showCategory(switchToVendor);
    closeModal();
}
