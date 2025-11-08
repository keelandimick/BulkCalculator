// Configuration - this would come from your backend/database
const productConfig = {
    sku: 'EXAMPLE-001',
    name: 'Premium Widget',
    retailPrice: 299.99,
    productCost: 100.00,  // Your cost (production + import)
    smallParcelShipping: 15.00,  // Regular shipping cost
    avgLtlFreight: 361.24,  // Average LTL freight cost
    moq: 100,  // Minimum order quantity for bulk
    
    // Tiered pricing structure
    pricingTiers: [
        { minQty: 50, maxQty: 99, discount: 10 },
        { minQty: 100, maxQty: 199, discount: 15 },
        { minQty: 200, maxQty: 299, discount: 20 },
        { minQty: 300, maxQty: 499, discount: 25 },
        { minQty: 500, maxQty: null, discount: 30 }
    ]
};

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Set product info
    document.getElementById('productName').textContent = productConfig.name;
    document.getElementById('retailPrice').textContent = `$${productConfig.retailPrice.toFixed(2)}`;
    document.getElementById('moqValue').textContent = productConfig.moq;
    
    // Set up event listener
    document.getElementById('quantity').addEventListener('input', calculatePricing);
    
    // Initial calculation
    calculatePricing();
});

function calculatePricing() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    // Show/hide MOQ notice
    const moqNotice = document.getElementById('moqNotice');
    if (quantity < productConfig.moq && quantity > 0) {
        moqNotice.style.display = 'block';
    } else {
        moqNotice.style.display = 'none';
    }
    
    // Calculate retail pricing (no bulk discount)
    const retailUnitPrice = productConfig.retailPrice;
    const retailTotal = retailUnitPrice * quantity;
    
    // Update retail pricing display
    document.getElementById('retailUnitPrice').textContent = `$${retailUnitPrice.toFixed(2)}`;
    document.getElementById('retailTotal').textContent = `Total: $${retailTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Calculate bulk pricing
    let discount = 0;
    let bulkUnitPrice = retailUnitPrice;
    let freightCost = 0;
    
    if (quantity >= productConfig.moq) {
        // Find applicable discount tier
        for (const tier of productConfig.pricingTiers) {
            if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
                discount = tier.discount;
                break;
            }
        }
        
        // Calculate bulk unit price with discount
        bulkUnitPrice = retailUnitPrice * (1 - discount / 100);
        
        // Calculate freight cost
        freightCost = productConfig.avgLtlFreight;
    }
    
    // Calculate totals
    const productCost = bulkUnitPrice * quantity;
    const totalCost = productCost + freightCost;
    
    // Update bulk pricing display
    document.getElementById('bulkUnitPrice').textContent = `$${bulkUnitPrice.toFixed(2)}`;
    document.getElementById('bulkTotal').textContent = `Total: $${productCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Update order summary
    document.getElementById('productCost').textContent = `$${productCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    document.getElementById('freightCost').textContent = `$${freightCost.toFixed(2)}`;
    document.getElementById('totalCost').textContent = `$${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Calculate and display savings
    const savingsBox = document.getElementById('savingsBox');
    if (quantity >= productConfig.moq) {
        const savings = retailTotal - productCost;
        savingsBox.textContent = `You save $${savings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${discount}%) with bulk pricing!`;
        savingsBox.style.display = 'block';
    } else {
        savingsBox.style.display = 'none';
    }
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (quantity < productConfig.moq) {
        alert(`Please order at least ${productConfig.moq} units for bulk pricing.`);
        return;
    }
    
    // Calculate all the values
    let discount = 0;
    for (const tier of productConfig.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    const bulkUnitPrice = productConfig.retailPrice * (1 - discount / 100);
    const productCost = bulkUnitPrice * quantity;
    const freightCost = productConfig.avgLtlFreight;
    const totalCost = productCost + freightCost;
    
    // Create cart item object
    const cartItem = {
        sku: productConfig.sku,
        name: productConfig.name,
        quantity: quantity,
        unitPrice: bulkUnitPrice,
        productTotal: productCost,
        freightCost: freightCost,
        totalCost: totalCost,
        discount: discount,
        isBulkOrder: true
    };
    
    // In a real implementation, this would send to your cart API
    console.log('Adding to cart:', cartItem);
    
    // For demo purposes
    alert(`Added to cart:\n${quantity} x ${productConfig.name}\nUnit Price: $${bulkUnitPrice.toFixed(2)} (${discount}% off)\nTotal: $${totalCost.toFixed(2)} (includes freight)`);
    
    // You would typically redirect or update cart UI here
    // window.location.href = '/cart';
}

// Export function for use in product listing pages
function createBulkCalculator(containerId, productData) {
    // This function could be used to create multiple calculators on a listing page
    // Each product would have its own calculator instance
    const container = document.getElementById(containerId);
    // Implementation would clone the calculator HTML and bind to specific product data
}