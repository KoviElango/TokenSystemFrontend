// Example Indian food items for Vendor 1 and Vendor 2
const vendor1Items = [
    { name: 'Idli Sambar', price: 30, image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2014/05/idli-sambar-1-500x500.jpg' },
    { name: 'Dosa with Coconut Chutney and Sambar', price: 50, image: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/07/dosa-recipe-3-500x500.jpg' },
    { name: 'Pongal', price: 40, image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal-500x500.jpg' },
    { name: 'Uttapam', price: 50, image: 'https://i0.wp.com/15minmom.com/wp-content/uploads/2020/06/Instant-Semolina-Uttapam-scaled.jpeg?fit=1440%2C1440&ssl=1' },
    { name: 'Puttu with Kadala Curry', price: 40, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStkV23Y_gViWIOaA_kKpPZCjY2N3e31hhkEg&s' },
];

const vendor2Items = [
    { name: 'Biryani', price: 180, image: 'https://www.cookwithnabeela.com/wp-content/uploads/2024/02/MuttonBiryani-500x500.webp' },
    { name: 'Sambar Rice', price: 80, image: 'https://www.icampinmykitchen.com/wp-content/uploads/2023/02/IMG_1875-500x500.jpg' },
    { name: 'Rasam with Rice', price: 80, image: 'https://mytastycurry.com/wp-content/uploads/2024/02/Pepper-rasam-recipe-featured.jpg' },
    { name: 'Curd Rice', price: 80, image: 'https://www.indianveggiedelight.com/wp-content/uploads/2022/08/curd-rice-featured.jpg' },
    { name: 'Chettinad Chicken Curry with Rice', price: 80, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8xBmke3I2gsMSyee9fmr9bNLdYmT_tkzWBA&s' }
];

// Global cart object to store selected items
let cart = {};
let currentVendor = 'C1'; 

// Function to generate the menu dynamically based on vendor
function generateMenu(vendorItems, vendorId) {
    let menuSection = document.getElementById(vendorId);
    menuSection.innerHTML = ''; // Clear previous content

    vendorItems.forEach(item => {
        menuSection.innerHTML += `
            <div class="menu-item">
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="item-controls">
                    <button onclick="decreaseCount('${item.name}', ${item.price})">-</button>
                    <span id="${item.name}-count">0</span>
                    <button onclick="increaseCount('${item.name}', ${item.price})">+</button>
                </div>
            </div>
        `;
    });
}

// Call generateMenu for each vendor
generateMenu(vendor1Items, 'C1');
generateMenu(vendor2Items, 'C2');

// Function to switch between vendors
function switchVendor(vendor) {
    if (Object.keys(cart).length > 0 && currentVendor !== vendor) {
        // Show confirmation alert if cart is not empty and switching vendors
        if (confirm("Switching vendors will clear your cart. Do you want to continue?")) {
            // Clear cart and update the UI
            clearCart();
            currentVendor = vendor;
            displayVendor(vendor);
        }
    } else {
        // No cart items or switching to the same vendor, just switch
        currentVendor = vendor;
        displayVendor(vendor);
    }
}

// Initialize Vendor 1 display
function displayVendor(vendor) {
    document.getElementById('C1').style.display = 'none';
    document.getElementById('C2').style.display = 'none';
    document.getElementById(vendor).style.display = 'block';
}

function clearCart() {
    cart = {}; // Reset the cart
    updateCartDisplay(); // Update cart display to reflect cleared cart
}

// Increase the item count and add to cart
function increaseCount(item, price) {
    let countElement = document.getElementById(`${item}-count`);
    let currentCount = parseInt(countElement.innerText);
    currentCount += 1;
    countElement.innerText = currentCount;
    addToCart(item, currentCount, price);
}
// Decrease the item count and update cart
function decreaseCount(item, price) {
    let countElement = document.getElementById(`${item}-count`);
    let currentCount = parseInt(countElement.innerText);
    if (currentCount > 0) {
        currentCount -= 1;
        countElement.innerText = currentCount;
    }
    addToCart(item, currentCount, price);
}

// Add or remove items to/from cart and update the total
function addToCart(item, count, price) {
    if (count > 0) {
        cart[item] = { count: count, price: price };
    } else {
        delete cart[item];
    }
    updateCartDisplay();
}

// Update the cart display and calculate the total
function updateCartDisplay() {
    let cartItemsDiv = document.getElementById('cart-items');
    let totalAmount = 0;
    cartItemsDiv.innerHTML = ''; // Clear previous cart items

    for (let item in cart) {
        let cartItem = cart[item];
        cartItemsDiv.innerHTML += `<p>${item} x ${cartItem.count} = $${(cartItem.count * cartItem.price).toFixed(2)}</p>`;
        totalAmount += cartItem.count * cartItem.price;
    }

    document.getElementById('total-amount').innerText = totalAmount.toFixed(2);
}


// Proceed to payment (modal implementation)
function proceedToPayment() {
    if (Object.keys(cart).length > 0) {
        document.getElementById('paymentModal').style.display = 'flex';
    } else {
        alert("Your cart is empty. Please add some items to proceed.");
    }
}

// Process the payment and show the receipt
function processPayment(method) {
    document.getElementById('paymentModal').style.display = 'none';

    let receiptDetails = document.getElementById('receipt-details');
    receiptDetails.innerHTML = `<p>Payment Method: ${method}</p>`;
    let total = document.getElementById('total-amount').innerText;
    receiptDetails.innerHTML += `<p>Total Paid: $${total}</p>`;

    // Display the items from the cart in the receipt
    for (let item in cart) {
        let cartItem = cart[item];
        receiptDetails.innerHTML += `<p>${item}: ${cartItem.count} x $${cartItem.price} = $${(cartItem.count * cartItem.price).toFixed(2)}</p>`;
    }

    document.getElementById('receiptModal').style.display = 'flex';
}

// Close any open modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.getElementById('receiptModal').style.display = 'none';
}
