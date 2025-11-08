// Product catalog from your CSV
const productCatalog = {
    'B-DN-46X14': { name: 'Butcher Block Dining 46x14', retailPrice: 239.99, productCost: 121.44, smallParcelShipping: 40.00 },
    'B-DN-58X14': { name: 'Butcher Block Dining 58x14', retailPrice: 299.99, productCost: 161.23, smallParcelShipping: 65.00 },
    'C-TABLE': { name: 'Coffee Table', retailPrice: 149.99, productCost: 89.39, smallParcelShipping: 30.00 },
    'CF-U-36X22': { name: 'Coffee Table U-Shape 36x22', retailPrice: 269.99, productCost: 146.17, smallParcelShipping: 40.00 },
    'CF-U-36X22-DRAWER': { name: 'Coffee Table U-Shape 36x22 w/Drawer', retailPrice: 389.99, productCost: 200.59, smallParcelShipping: 60.00 },
    'CF-U-46X24': { name: 'Coffee Table U-Shape 46x24', retailPrice: 329.99, productCost: 175.84, smallParcelShipping: 45.00 },
    'CF-U-46X24-DRAWER': { name: 'Coffee Table U-Shape 46x24 w/Drawer', retailPrice: 449.99, productCost: 230.27, smallParcelShipping: 65.00 },
    'CF-U-58X28': { name: 'Coffee Table U-Shape 58x28', retailPrice: 479.99, productCost: 240.96, smallParcelShipping: 70.00 },
    'CF-U-58X28-DRAWER': { name: 'Coffee Table U-Shape 58x28 w/Drawer', retailPrice: 569.99, productCost: 295.39, smallParcelShipping: 90.00 },
    'CN-U-46X14': { name: 'Console U-Shape 46x14', retailPrice: 239.99, productCost: 130.34, smallParcelShipping: 40.00 },
    'CN-U-58X14': { name: 'Console U-Shape 58x14', retailPrice: 329.99, productCost: 170.13, smallParcelShipping: 65.00 },
    'D-HP-36X22': { name: 'Desk Hairpin 36x22', retailPrice: 269.99, productCost: 144.29, smallParcelShipping: 40.00 },
    'D-HP-36X22-DRAWER': { name: 'Desk Hairpin 36x22 w/Drawer', retailPrice: 389.99, productCost: 198.72, smallParcelShipping: 60.00 },
    'D-HP-46X24': { name: 'Desk Hairpin 46x24', retailPrice: 329.99, productCost: 173.96, smallParcelShipping: 45.00 },
    'D-HP-46X24-DRAWER': { name: 'Desk Hairpin 46x24 w/Drawer', retailPrice: 449.99, productCost: 228.39, smallParcelShipping: 65.00 },
    'D-HP-58X28': { name: 'Desk Hairpin 58x28', retailPrice: 449.99, productCost: 239.09, smallParcelShipping: 70.00 },
    'D-HP-58X28-DRAWER': { name: 'Desk Hairpin 58x28 w/Drawer', retailPrice: 569.99, productCost: 293.51, smallParcelShipping: 90.00 },
    'D-SSB-46X24': { name: 'Desk Standing Black 46x24', retailPrice: 479.99, productCost: 244.69, smallParcelShipping: 55.00 },
    'D-SSB-46X24-DRAWER': { name: 'Desk Standing Black 46x24 w/Drawer', retailPrice: 569.99, productCost: 299.12, smallParcelShipping: 75.00 },
    'D-SSB-58X28': { name: 'Desk Standing Black 58x28', retailPrice: 599.99, productCost: 309.81, smallParcelShipping: 80.00 },
    'D-SSB-58X28-DRAWER': { name: 'Desk Standing Black 58x28 w/Drawer', retailPrice: 689.99, productCost: 364.24, smallParcelShipping: 100.00 },
    'D-SSW-46X24': { name: 'Desk Standing White 46x24', retailPrice: 479.99, productCost: 244.69, smallParcelShipping: 55.00 },
    'D-SSW-46X24-DRAWER': { name: 'Desk Standing White 46x24 w/Drawer', retailPrice: 569.99, productCost: 299.12, smallParcelShipping: 75.00 },
    'D-SSW-58X28': { name: 'Desk Standing White 58x28', retailPrice: 599.99, productCost: 309.81, smallParcelShipping: 80.00 },
    'D-SSW-58X28-DRAWER': { name: 'Desk Standing White 58x28 w/Drawer', retailPrice: 689.99, productCost: 364.24, smallParcelShipping: 100.00 },
    'D-U-36X22': { name: 'Desk U-Shape 36x22', retailPrice: 299.99, productCost: 154.34, smallParcelShipping: 40.00 },
    'D-U-36X22-DRAWER': { name: 'Desk U-Shape 36x22 w/Drawer', retailPrice: 419.99, productCost: 208.77, smallParcelShipping: 60.00 },
    'D-U-46X24': { name: 'Desk U-Shape 46x24', retailPrice: 359.99, productCost: 184.02, smallParcelShipping: 45.00 },
    'D-U-46X24-DRAWER': { name: 'Desk U-Shape 46x24 w/Drawer', retailPrice: 449.99, productCost: 238.44, smallParcelShipping: 65.00 },
    'D-U-58X28': { name: 'Desk U-Shape 58x28', retailPrice: 479.99, productCost: 249.14, smallParcelShipping: 70.00 },
    'D-U-58X28-DRAWER': { name: 'Desk U-Shape 58x28 w/Drawer', retailPrice: 569.99, productCost: 303.56, smallParcelShipping: 90.00 },
    'DN-U-48X36': { name: 'Dining Table U-Shape 48x36', retailPrice: 539.99, productCost: 283.56, smallParcelShipping: 80.00 },
    'DN-U-60X36': { name: 'Dining Table U-Shape 60x36', retailPrice: 599.99, productCost: 323.71, smallParcelShipping: 85.00 },
    'DN-U-72X36': { name: 'Dining Table U-Shape 72x36', retailPrice: 659.99, productCost: 362.02, smallParcelShipping: 90.00 },
    'END-TABLE': { name: 'End Table', retailPrice: 119.99, productCost: 69.73, smallParcelShipping: 25.00 },
    'MONITOR-STAND-BK': { name: 'Monitor Stand Black', retailPrice: 119.99, productCost: 65.33, smallParcelShipping: 20.00 }
};

// Configuration defaults
const config = {
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

// Current product configuration
let productConfig = {
    sku: '',
    name: '',
    retailPrice: 0,
    productCost: 0,
    smallParcelShipping: 0,
    ...config
};

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Add product selector to the page
    addProductSelector();
    
    // Set first product as default
    const firstSku = Object.keys(productCatalog)[0];
    selectProduct(firstSku);
    
    // Set up event listener for quantity
    document.getElementById('quantity').addEventListener('input', calculatePricing);
});

function addProductSelector() {
    // Find the product info div
    const productInfo = document.querySelector('.product-info');
    
    // Create selector HTML
    const selectorHTML = `
        <div style="margin-bottom: 15px;">
            <label for="productSelector" style="display: block; margin-bottom: 5px; font-weight: 500;">Select Product:</label>
            <select id="productSelector" style="width: 100%; padding: 8px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 14px;">
                ${Object.entries(productCatalog).map(([sku, product]) => 
                    `<option value="${sku}">${sku} - ${product.name} ($${product.retailPrice})</option>`
                ).join('')}
            </select>
        </div>
    `;
    
    // Insert at the beginning of product info
    productInfo.insertAdjacentHTML('afterbegin', selectorHTML);
    
    // Add change event listener
    document.getElementById('productSelector').addEventListener('change', function(e) {
        selectProduct(e.target.value);
    });
}

function selectProduct(sku) {
    const product = productCatalog[sku];
    if (!product) return;
    
    // Update product config
    productConfig = {
        sku: sku,
        name: product.name,
        retailPrice: product.retailPrice,
        productCost: product.productCost,
        smallParcelShipping: product.smallParcelShipping,
        ...config
    };
    
    // Update display
    document.getElementById('productName').textContent = productConfig.name;
    document.getElementById('retailPrice').textContent = `$${productConfig.retailPrice.toFixed(2)}`;
    document.getElementById('moqValue').textContent = productConfig.moq;
    
    // Update selector if needed
    const selector = document.getElementById('productSelector');
    if (selector && selector.value !== sku) {
        selector.value = sku;
    }
    
    // Recalculate pricing
    calculatePricing();
}

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
    
    // Show profitability info (for internal use)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const profitInfo = document.getElementById('profitInfo');
        if (!profitInfo) {
            const infoHTML = `<div id="profitInfo" style="background: #f0f0f0; padding: 10px; margin-top: 10px; border-radius: 6px; font-size: 12px;"></div>`;
            document.querySelector('.pricing-breakdown').insertAdjacentHTML('afterend', infoHTML);
        }
        
        if (quantity >= productConfig.moq) {
            const totalInternalCost = (productConfig.productCost * quantity) + freightCost;
            const grossProfit = totalCost - totalInternalCost;
            const grossMargin = (grossProfit / totalCost) * 100;
            
            document.getElementById('profitInfo').innerHTML = `
                <strong>Internal Info (Dev Only):</strong><br>
                Product Cost: $${(productConfig.productCost * quantity).toFixed(2)}<br>
                Total Internal Cost: $${totalInternalCost.toFixed(2)}<br>
                Gross Profit: $${grossProfit.toFixed(2)}<br>
                Gross Margin: ${grossMargin.toFixed(1)}%
            `;
        } else {
            document.getElementById('profitInfo').innerHTML = '';
        }
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
    alert(`Added to cart:\n${quantity} x ${productConfig.name}\nSKU: ${productConfig.sku}\nUnit Price: $${bulkUnitPrice.toFixed(2)} (${discount}% off)\nTotal: $${totalCost.toFixed(2)} (includes freight)`);
    
    // You would typically redirect or update cart UI here
    // window.location.href = '/cart';
}