let cart = [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = count;
}

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartCount();
    alert(`${name} added to cart!`);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const upiTotalPrice = document.getElementById('upi-total-price');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotalPrice.innerText = '0';
        upiTotalPrice.innerText = '0';
        return;
    }

    let itemsHtml = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHtml += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">X</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHtml;
    cartTotalPrice.innerText = total;
    upiTotalPrice.innerText = total;
}

function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartDisplay();
            updateCartCount();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartDisplay();
    updateCartCount();
}

function openCartModal(event) {
    if(event) event.preventDefault();
    updateCartDisplay();
    document.getElementById('cart-modal').classList.add('show');
}

function closeCartModal() {
    document.getElementById('cart-modal').classList.remove('show');
}

function openUpiModal() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    closeCartModal();
    document.getElementById('upi-modal').classList.add('show');
}

function closeUpiModal() {
    document.getElementById('upi-modal').classList.remove('show');
}

function simulatePayment() {
    alert("Payment Successful! Thank you for your purchase.");
    cart = [];
    updateCartCount();
    closeUpiModal();
}

// Close modals when clicking outside
window.onclick = function(event) {
    const cartModal = document.getElementById('cart-modal');
    const upiModal = document.getElementById('upi-modal');
    if (event.target == cartModal) {
        closeCartModal();
    }
    if (event.target == upiModal) {
        closeUpiModal();
    }
}
