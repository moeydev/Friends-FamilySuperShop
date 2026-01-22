const products = [
    {
        id: 1,
        name: "Traditional Kantha Stole",
        price: "৳ 2,500",
        image: "images/products/stole-1.jpg",
        category: "accessories",
        colors: ["color-red", "color-blue", "color-green"]
    },
    {
        id: 2,
        name: "Handloom Cotton Saree",
        price: "৳ 4,800",
        image: "images/products/saree-1.jpg",
        category: "clothing",
        colors: ["color-purple", "color-pink", "color-orange"]
    },
    {
        id: 3,
        name: "Terracotta Pot Set",
        price: "৳ 1,200",
        image: "images/products/pot-1.jpg",
        category: "home-decor",
        colors: ["color-brown", "color-gray"]
    },
    {
        id: 4,
        name: "Nakshi Kantha Quilt",
        price: "৳ 6,500",
        image: "images/products/quilt-1.jpg",
        category: "home-decor",
        colors: ["color-blue", "color-red", "color-yellow"]
    },
    {
        id: 5,
        name: "Jamdani Dupatta",
        price: "৳ 3,200",
        image: "images/products/dupatta-1.jpg",
        category: "clothing",
        colors: ["color-white", "color-navy", "color-teal"]
    },
    {
        id: 6,
        name: "Brass Jewelry Set",
        price: "৳ 1,800",
        image: "images/products/jewelry-1.jpg",
        category: "accessories",
        colors: ["color-orange", "color-green", "color-purple"]
    }
];

function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        
        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="color-boxes">
                    ${product.colors.map(color => 
                        `<div class="color-box ${color}" title="${color.split('-')[1]}"></div>`
                    ).join('')}
                </div>
                <p class="product-price">${product.price}</p>
                <button class="btn-add-to-cart">Add to Cart</button>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', displayFeaturedProducts);
