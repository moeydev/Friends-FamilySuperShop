document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Add to Cart
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            count++;
            if(cartCount) cartCount.innerText = count;
            
            // Visual feedback
            button.innerText = "Added!";
            button.style.backgroundColor = "var(--color-success)";
            
            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.backgroundColor = "var(--color-primary)";
            }, 1500);
        });
    });

    // 2. Mobile Menu Toggle (Simplified)
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            // Add CSS logic for .active in responsive.css if you want a slide-down effect
        });
    }
});
