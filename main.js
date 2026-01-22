// Main JavaScript for Friends & Family Super Shop

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Dropdown Toggle for Mobile
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== this) {
                        other.parentElement.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Cart Toggle
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartSidebar.classList.add('active');
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
    }
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            cartSidebar.classList.remove('active');
        }
    });
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'quick-view-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${productTitle}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Price: ${productPrice}</p>
                        <p>This is a quick view of the product. More details coming soon!</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-primary add-to-cart-modal">Add to Cart</button>
                        <button class="btn-secondary view-details">View Details</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Close modal
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                modal.remove();
            });
            
            // Close on outside click
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });
    
    // Search Functionality
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('.search-input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                alert(`Searching for: ${searchTerm}`);
                // In real implementation, redirect to search results page
                // window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
    
    // Color Selection
    const colorDots = document.querySelectorAll('.color-dot');
    
    colorDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.color-dot').forEach(d => {
                d.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Initialize Cart
    updateCartCount();
    
    // Currency Selector
    const currencySelect = document.querySelector('.currency-selector select');
    
    if (currencySelect) {
        currencySelect.addEventListener('change', function() {
            const selectedCurrency = this.value;
            // In real implementation, update prices based on currency
            console.log(`Currency changed to: ${selectedCurrency}`);
        });
    }
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id || Math.random().toString(36).substr(2, 9);
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            addToCart({
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage,
                quantity: 1
            });
            
            // Show notification
            showNotification(`${productTitle} added to cart!`);
        });
    });
});

// Cart Functions
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    
    if (!cartItems || !cartTotal) return;
    
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach((item, index) => {
        const priceValue = parseFloat(item.price.replace(/[^\d.]/g, ''));
        const itemTotal = priceValue * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.title}</h4>
                <p class="cart-item-price">${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `৳ ${total.toFixed(2)}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            if (this.classList.contains('increase')) {
                cart[index].quantity += 1;
            } else if (this.classList.contains('decrease')) {
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
        });
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        z-index: 9999;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(notification);
    
    // Add keyframes for animation
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // In real implementation, redirect to checkout page
    // window.location.href = '/checkout.html';
    alert('Proceeding to checkout!');
}
