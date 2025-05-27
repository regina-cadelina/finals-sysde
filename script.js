document.addEventListener('DOMContentLoaded', function() {
    // Product Modal Functionality
    const productModal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const productImages = document.querySelectorAll('.product-img');
    
    // Product data - in a real application, this would come from a database
    const products = {
        1: {
            id: 1,
            name: "Premium Business Card",
            price: 24.99,
            description: "Our premium business cards are printed on high-quality 350gsm silk card stock with a smooth matte finish. These cards are perfect for making a professional impression.",
            features: [
                "350gsm silk card stock",
                "Full color printing on both sides",
                "Matte or glossy finish options",
                "Standard size: 3.5\" x 2\"",
                "Rounded corners option available"
            ],
            images: [
                "images/product-business-card-1.jpg",
                "images/product-business-card-1-back.jpg",
                "images/product-business-card-1-stack.jpg",
                "images/product-business-card-1-closeup.jpg"
            ],
            colors: [
                { name: "White", code: "#ffffff" },
                { name: "Cream", code: "#f5f5dc" },
                { name: "Light Gray", code: "#d3d3d3" }
            ],
            sizes: ["Standard (3.5\" x 2\")", "Square (2.5\" x 2.5\")", "Folded (3.5\" x 4\")"],
            quantities: [100, 250, 500, 1000],
            finishes: ["Matte", "Glossy", "Soft Touch"],
            bestseller: true
        },
        2: {
            id: 2,
            name: "Event Flyer",
            price: 19.99,
            description: "High-quality event flyers printed on premium 100lb gloss paper. Perfect for promoting your events with vibrant colors and sharp details.",
            features: [
                "100lb gloss paper",
                "Full color printing on one or both sides",
                "Available in multiple sizes",
                "Fast turnaround time"
            ],
            images: [
                "images/product-flyer-1.jpg",
                "images/product-flyer-1-back.jpg",
                "images/product-flyer-1-stack.jpg"
            ],
            colors: [],
            sizes: ["8.5\" x 11\"", "5.5\" x 8.5\"", "4\" x 6\""],
            quantities: [50, 100, 250, 500],
            finishes: ["Gloss", "Matte"],
            new: true
        },
        3: {
            id: 3,
            name: "Promotional Banner",
            price: 49.99,
            description: "Durable vinyl banners perfect for indoor and outdoor use. Our banners are printed with UV-resistant inks for long-lasting color and include grommets for easy hanging.",
            features: [
                "13oz scrim vinyl material",
                "UV-resistant inks",
                "Waterproof and weather-resistant",
                "Grommets included",
                "Hemmed edges for durability"
            ],
            images: [
                "images/product-banner-1.jpg",
                "images/product-banner-1-detail.jpg",
                "images/product-banner-1-hanging.jpg"
            ],
            colors: [],
            sizes: ["2' x 4'", "3' x 6'", "4' x 8'", "Custom Size"],
            quantities: [1, 2, 5, 10],
            finishes: ["Matte", "Gloss"],
            bestseller: false
        },
        4: {
            id: 4,
            name: "Custom T-Shirt Design",
            price: 29.99,
            originalPrice: 34.99,
            description: "High-quality custom printed t-shirts. Perfect for events, promotions, or personal use. Our shirts are made from 100% cotton for comfort and durability.",
            features: [
                "100% cotton material",
                "Direct-to-garment printing",
                "Vibrant, long-lasting colors",
                "Available in multiple sizes and colors",
                "Machine washable"
            ],
            images: [
                "images/product-custom-1.jpg",
                "images/product-custom-1-back.jpg",
                "images/product-custom-1-detail.jpg"
            ],
            colors: [
                { name: "White", code: "#ffffff" },
                { name: "Black", code: "#000000" },
                { name: "Navy", code: "#000080" },
                { name: "Red", code: "#ff0000" },
                { name: "Gray", code: "#808080" }
            ],
            sizes: ["S", "M", "L", "XL", "2XL"],
            quantities: [1, 5, 10, 25, 50],
            finishes: [],
            sale: true
        }
    };
    
    // Open modal when clicking on a product image
    productImages.forEach(img => {
        img.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            openProductModal(productId);
        });
    });
    
    // Close modal when clicking the close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            closeProductModal();
        });
    }
    
    // Close modal when clicking outside the modal content
    if (productModal) {
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeProductModal();
            }
        });
    }
    
    // Function to open product modal
    function openProductModal(productId) {
        const product = products[productId];
        if (!product) return;
        
        let modalContent = `
            <div class="modal-images">
                <div class="modal-main-image">
                    <img src="${product.images[0]}" alt="${product.name}" id="modalMainImage">
                </div>
                ${product.images.length > 1 ? `
                <div class="modal-thumbnails">
                    ${product.images.map((img, index) => `
                        <div class="modal-thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
                            <img src="${img}" alt="${product.name} - Image ${index + 1}">
                        </div>
                    `).join('')}
                </div>` : ''}
            </div>
            <div class="modal-details">
                <div class="modal-product-tags">
                    ${product.bestseller ? '<span class="tag bestseller">BESTSELLER</span>' : ''}
                    ${product.new ? '<span class="tag new">NEW</span>' : ''}
                    ${product.sale ? '<span class="tag sale">SALE</span>' : ''}
                </div>
                <h2 class="modal-product-title">${product.name}</h2>
                <p class="modal-product-price">
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                    $${product.price}
                </p>
                <div class="modal-product-description">
                    <p>${product.description}</p>
                    <ul class="product-features">
                        ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-options">
                    ${product.sizes.length > 0 ? `
                    <div class="option-group">
                        <label>Size:</label>
                        <div class="size-options">
                            ${product.sizes.map((size, index) => `
                                <div class="size-option ${index === 0 ? 'active' : ''}" data-size="${size}">
                                    ${size}
                                </div>
                            `).join('')}
                        </div>
                    </div>` : ''}
                    
                    ${product.colors.length > 0 ? `
                    <div class="option-group">
                        <label>Color:</label>
                        <div class="color-options">
                            ${product.colors.map((color, index) => `
                                <div class="color-option ${index === 0 ? 'active' : ''}" 
                                     data-color="${color.name}" 
                                     style="background-color: ${color.code}">
                                </div>
                            `).join('')}
                        </div>
                        <div class="selected-color-name">${product.colors[0].name}</div>
                    </div>` : ''}
                    
                    ${product.quantities.length > 0 ? `
                    <div class="option-group">
                        <label>Quantity:</label>
                        <select class="option-select quantity-select">
                            ${product.quantities.map(qty => `<option value="${qty}">${qty}</option>`).join('')}
                        </select>
                    </div>` : ''}
                    
                    ${product.finishes.length > 0 ? `
                    <div class="option-group">
                        <label>Finish:</label>
                        <select class="option-select finish-select">
                            ${product.finishes.map(finish => `<option value="${finish.toLowerCase()}">${finish}</option>`).join('')}
                        </select>
                    </div>` : ''}
                </div>
                
                <div class="customization-field">
                    <label>Customization Notes:</label>
                    <textarea placeholder="Add any special instructions or customization details here..."></textarea>
                </div>
                
                <div class="quantity-selector">
                    <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                    <input type="number" value="1" min="1" max="100" class="quantity-input">
                    <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                </div>
                
                <div class="modal-actions">
                    <button class="btn primary-btn add-to-cart-modal" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> ADD TO CART
                    </button>
                    <button class="btn secondary-btn view-details">
                        VIEW FULL DETAILS
                    </button>
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        productModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        
        // Add event listeners for modal functionality
        setupModalEventListeners();
    }
    
    // Function to close product modal
    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Setup event listeners for modal functionality
    function setupModalEventListeners() {
        // Thumbnail image switching
        const thumbnails = document.querySelectorAll('.modal-thumbnail');
        const mainImage = document.getElementById('modalMainImage');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Update main image
                mainImage.src = this.getAttribute('data-image');
            });
        });
        
        // Size selection
        const sizeOptions = document.querySelectorAll('.size-option');
        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                sizeOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        // Color selection
        const colorOptions = document.querySelectorAll('.color-option');
        const selectedColorName = document.querySelector('.selected-color-name');
        
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                if (selectedColorName) {
                    selectedColorName.textContent = this.getAttribute('data-color');
                }
            });
        });
        
        // Quantity buttons
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');
        const quantityInput = document.querySelector('.quantity-input');
        
        if (minusBtn && plusBtn && quantityInput) {
            minusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(quantityInput.value);
                if (value < 100) {
                    quantityInput.value = value + 1;
                }
            });
            
            quantityInput.addEventListener('change', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) {
                    this.value = 1;
                } else if (value > 100) {
                    this.value = 100;
                }
            });
        }
        
        // Add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart-modal');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const quantity = document.querySelector('.quantity-input').value;
                const size = document.querySelector('.size-option.active')?.getAttribute('data-size') || '';
                const color = document.querySelector('.color-option.active')?.getAttribute('data-color') || '';
                const finish = document.querySelector('.finish-select')?.value || '';
                const customization = document.querySelector('.customization-field textarea').value;
                
                // In a real application, you would add this to a cart object and save to localStorage or send to server
                console.log('Adding to cart:', {
                    productId,
                    quantity,
                    size,
                    color,
                    finish,
                    customization
                });
                
                // Show success message
                alert('Product added to cart!');
                
                // Close modal
                closeProductModal();
                
                // Update cart count (this would be more sophisticated in a real app)
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    cartCount.textContent = parseInt(cartCount.textContent) + 1;
                }
            });
        }
        
        // View details button
        const viewDetailsBtn = document.querySelector('.view-details');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                const productId = document.querySelector('.add-to-cart-modal').getAttribute('data-product-id');
                window.location.href = `product-detail.html?id=${productId}`;
            });
        }
    }
    
    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuBtn && menu) {
        mobileMenuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
});