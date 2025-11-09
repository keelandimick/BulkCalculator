// Helper function to format currency with commas
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Product categories
const productCategories = {
    'Benches': ['B-DN-46X14', 'B-DN-58X14'],
    'Coffee Tables': ['CF-U-36X22', 'CF-U-36X22-DRAWER', 'CF-U-46X24', 'CF-U-46X24-DRAWER', 'CF-U-58X28', 'CF-U-58X28-DRAWER'],
    'Console Tables': ['CN-U-46X14', 'CN-U-58X14'],
    'Desks': ['D-HP-36X22', 'D-HP-36X22-DRAWER', 'D-HP-46X24', 'D-HP-46X24-DRAWER', 'D-HP-58X28', 'D-HP-58X28-DRAWER',
             'D-SSB-46X24', 'D-SSB-46X24-DRAWER', 'D-SSB-58X28', 'D-SSB-58X28-DRAWER',
             'D-SSW-46X24', 'D-SSW-46X24-DRAWER', 'D-SSW-58X28', 'D-SSW-58X28-DRAWER',
             'D-U-36X22', 'D-U-36X22-DRAWER', 'D-U-46X24', 'D-U-46X24-DRAWER', 'D-U-58X28', 'D-U-58X28-DRAWER'],
    'Dining Tables': ['DN-U-48X36', 'DN-U-60X36', 'DN-U-72X36'],
    'Side Tables': ['END-TABLE', 'C-TABLE'],
    'Accessories': ['MONITOR-STAND-BK']
};

// Product catalog with names
const productCatalog = {
    'B-DN-46X14': { name: 'Bench DN 46X14', retailPrice: 239.99, productCost: 121.44, smallParcelShipping: 40.00 },
    'B-DN-58X14': { name: 'Bench DN 58X14', retailPrice: 299.99, productCost: 161.23, smallParcelShipping: 65.00 },
    'C-TABLE': { name: 'C Table', retailPrice: 149.99, productCost: 89.39, smallParcelShipping: 30.00 },
    'CF-U-36X22': { name: 'Coffee U 36X22', retailPrice: 269.99, productCost: 146.17, smallParcelShipping: 40.00 },
    'CF-U-36X22-DRAWER': { name: 'Coffee U 36X22 Drawer', retailPrice: 389.99, productCost: 200.59, smallParcelShipping: 60.00 },
    'CF-U-46X24': { name: 'Coffee U 46X24', retailPrice: 329.99, productCost: 175.84, smallParcelShipping: 45.00 },
    'CF-U-46X24-DRAWER': { name: 'Coffee U 46X24 Drawer', retailPrice: 449.99, productCost: 230.27, smallParcelShipping: 65.00 },
    'CF-U-58X28': { name: 'Coffee U 58X28', retailPrice: 479.99, productCost: 240.96, smallParcelShipping: 70.00 },
    'CF-U-58X28-DRAWER': { name: 'Coffee U 58X28 Drawer', retailPrice: 569.99, productCost: 295.39, smallParcelShipping: 90.00 },
    'CN-U-46X14': { name: 'Console U 46X14', retailPrice: 239.99, productCost: 130.34, smallParcelShipping: 40.00 },
    'CN-U-58X14': { name: 'Console U 58X14', retailPrice: 329.99, productCost: 170.13, smallParcelShipping: 65.00 },
    'D-HP-36X22': { name: 'Desk HP 36X22', retailPrice: 269.99, productCost: 144.29, smallParcelShipping: 40.00 },
    'D-HP-36X22-DRAWER': { name: 'Desk HP 36X22 Drawer', retailPrice: 389.99, productCost: 198.72, smallParcelShipping: 60.00 },
    'D-HP-46X24': { name: 'Desk HP 46X24', retailPrice: 329.99, productCost: 173.96, smallParcelShipping: 45.00 },
    'D-HP-46X24-DRAWER': { name: 'Desk HP 46X24 Drawer', retailPrice: 449.99, productCost: 228.39, smallParcelShipping: 65.00 },
    'D-HP-58X28': { name: 'Desk HP 58X28', retailPrice: 449.99, productCost: 239.09, smallParcelShipping: 70.00 },
    'D-HP-58X28-DRAWER': { name: 'Desk HP 58X28 Drawer', retailPrice: 569.99, productCost: 293.51, smallParcelShipping: 90.00 },
    'D-SSB-46X24': { name: 'Desk SSB 46X24', retailPrice: 479.99, productCost: 244.69, smallParcelShipping: 55.00 },
    'D-SSB-46X24-DRAWER': { name: 'Desk SSB 46X24 Drawer', retailPrice: 569.99, productCost: 299.12, smallParcelShipping: 75.00 },
    'D-SSB-58X28': { name: 'Desk SSB 58X28', retailPrice: 599.99, productCost: 309.81, smallParcelShipping: 80.00 },
    'D-SSB-58X28-DRAWER': { name: 'Desk SSB 58X28 Drawer', retailPrice: 689.99, productCost: 364.24, smallParcelShipping: 100.00 },
    'D-SSW-46X24': { name: 'Desk SSW 46X24', retailPrice: 479.99, productCost: 244.69, smallParcelShipping: 55.00 },
    'D-SSW-46X24-DRAWER': { name: 'Desk SSW 46X24 Drawer', retailPrice: 569.99, productCost: 299.12, smallParcelShipping: 75.00 },
    'D-SSW-58X28': { name: 'Desk SSW 58X28', retailPrice: 599.99, productCost: 309.81, smallParcelShipping: 80.00 },
    'D-SSW-58X28-DRAWER': { name: 'Desk SSW 58X28 Drawer', retailPrice: 689.99, productCost: 364.24, smallParcelShipping: 100.00 },
    'D-U-36X22': { name: 'Desk U 36X22', retailPrice: 299.99, productCost: 154.34, smallParcelShipping: 40.00 },
    'D-U-36X22-DRAWER': { name: 'Desk U 36X22 Drawer', retailPrice: 419.99, productCost: 208.77, smallParcelShipping: 60.00 },
    'D-U-46X24': { name: 'Desk U 46X24', retailPrice: 359.99, productCost: 184.02, smallParcelShipping: 45.00 },
    'D-U-46X24-DRAWER': { name: 'Desk U 46X24 Drawer', retailPrice: 449.99, productCost: 238.44, smallParcelShipping: 65.00 },
    'D-U-58X28': { name: 'Desk U 58X28', retailPrice: 479.99, productCost: 249.14, smallParcelShipping: 70.00 },
    'D-U-58X28-DRAWER': { name: 'Desk U 58X28 Drawer', retailPrice: 569.99, productCost: 303.56, smallParcelShipping: 90.00 },
    'DN-U-48X36': { name: 'Dining U 48X36', retailPrice: 539.99, productCost: 283.56, smallParcelShipping: 80.00 },
    'DN-U-60X36': { name: 'Dining U 60X36', retailPrice: 599.99, productCost: 323.71, smallParcelShipping: 85.00 },
    'DN-U-72X36': { name: 'Dining U 72X36', retailPrice: 659.99, productCost: 362.02, smallParcelShipping: 90.00 },
    'END-TABLE': { name: 'End Table', retailPrice: 119.99, productCost: 69.73, smallParcelShipping: 25.00 },
    'MONITOR-STAND-BK': { name: 'Monitor Stand Black', retailPrice: 119.99, productCost: 65.33, smallParcelShipping: 20.00 }
};

// Component data with dimensions (keeping original numbers but treating as arbitrary units)
const componentData = {
    '46X14': { unitsPerPallet: 36, volume: 38530 },
    '58X14': { unitsPerPallet: 36, volume: 47935 },
    '36X22': { unitsPerPallet: 36, volume: 45251 },
    '46X24': { unitsPerPallet: 18, volume: 61380 },
    '58X28': { unitsPerPallet: 18, volume: 90376 },
    '48X36': { unitsPerPallet: 18, volume: 91936 },
    '60X36': { unitsPerPallet: 18, volume: 113365 },
    '72X36': { unitsPerPallet: 18, volume: 133066 },
    'END-TABLE': { unitsPerPallet: 48, volume: 15625 },
    'C-TABLE': { unitsPerPallet: 40, volume: 20250 },
    'MONITOR-STAND-BK': { unitsPerPallet: 60, volume: 8000 },
    'DRAWER': { unitsPerPallet: 36, volume: 12000 }  // Drawer component
};

// Map SKUs to their components
const skuComponents = {
    'B-DN-46X14': ['B-DN', '46X14'],
    'B-DN-58X14': ['B-DN', '58X14'],
    'C-TABLE': ['C-TABLE'],
    'CF-U-36X22': ['CF-U', '36X22'],
    'CF-U-36X22-DRAWER': ['CF-U', '36X22', 'DRAWER'],
    'CF-U-46X24': ['CF-U', '46X24'],
    'CF-U-46X24-DRAWER': ['CF-U', '46X24', 'DRAWER'],
    'CF-U-58X28': ['CF-U', '58X28'],
    'CF-U-58X28-DRAWER': ['CF-U', '58X28', 'DRAWER'],
    'CN-U-46X14': ['CN-U', '46X14'],
    'CN-U-58X14': ['CN-U', '58X14'],
    'D-HP-36X22': ['D-HP', '36X22'],
    'D-HP-36X22-DRAWER': ['D-HP', '36X22', 'DRAWER'],
    'D-HP-46X24': ['D-HP', '46X24'],
    'D-HP-46X24-DRAWER': ['D-HP', '46X24', 'DRAWER'],
    'D-HP-58X28': ['D-HP', '58X28'],
    'D-HP-58X28-DRAWER': ['D-HP', '58X28', 'DRAWER'],
    'D-SSB-46X24': ['D-SSB', '46X24'],
    'D-SSB-46X24-DRAWER': ['D-SSB', '46X24', 'DRAWER'],
    'D-SSB-58X28': ['D-SSB', '58X28'],
    'D-SSB-58X28-DRAWER': ['D-SSB', '58X28', 'DRAWER'],
    'D-SSW-46X24': ['D-SSW', '46X24'],
    'D-SSW-46X24-DRAWER': ['D-SSW', '46X24', 'DRAWER'],
    'D-SSW-58X28': ['D-SSW', '58X28'],
    'D-SSW-58X28-DRAWER': ['D-SSW', '58X28', 'DRAWER'],
    'D-U-36X22': ['D-U', '36X22'],
    'D-U-36X22-DRAWER': ['D-U', '36X22', 'DRAWER'],
    'D-U-46X24': ['D-U', '46X24'],
    'D-U-46X24-DRAWER': ['D-U', '46X24', 'DRAWER'],
    'D-U-58X28': ['D-U', '58X28'],
    'D-U-58X28-DRAWER': ['D-U', '58X28', 'DRAWER'],
    'DN-U-48X36': ['DN-U', '48X36'],
    'DN-U-60X36': ['DN-U', '60X36'],
    'DN-U-72X36': ['DN-U', '72X36'],
    'END-TABLE': ['END-TABLE'],
    'MONITOR-STAND-BK': ['MONITOR-STAND-BK']
};

// Configuration
const config = {
    baseLtlFreight: 361.24,  // Minimum LTL freight cost
    freightRatePerCubicFoot: 8.00,  // $ per cubic foot (adjust based on your rates)
    minCubicFeet: 45,  // Minimum billable cubic feet (roughly one pallet)
    
    // Tiered pricing structure (discounts)
    pricingTiers: [
        { minQty: 1, maxQty: 10, discount: 10 },
        { minQty: 11, maxQty: 20, discount: 20 },
        { minQty: 21, maxQty: null, discount: 30 }
    ]
};

// Current product configuration
let productConfig = {};

// Get units per pallet for a parent SKU
function getUnitsPerPallet(sku) {
    const components = skuComponents[sku];
    if (!components) return 12;
    
    // Find the limiting component (lowest units per pallet)
    let minUnits = Infinity;
    for (const component of components) {
        const componentInfo = componentData[component];
        if (componentInfo && componentInfo.unitsPerPallet < minUnits) {
            minUnits = componentInfo.unitsPerPallet;
        }
    }
    
    return minUnits === Infinity ? 12 : minUnits;
}

// Calculate freight cost based on quantity and pallet capacity
function calculateFreightCost(sku, quantity) {
    const unitsPerPallet = getUnitsPerPallet(sku);
    const palletsNeeded = Math.ceil(quantity / unitsPerPallet);
    
    // Base cost for first pallet
    let freightCost = config.baseLtlFreight;
    
    // Add cost for additional pallets (slightly less per pallet)
    if (palletsNeeded > 1) {
        freightCost += (palletsNeeded - 1) * 280; // $280 for each additional pallet
    }
    
    return {
        freightCost,
        palletsNeeded,
        unitsPerPallet
    };
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Add product selector to the page
    addProductSelector();
    
    // Don't select a product by default - user must choose
    // Clear any default values
    resetPricingDisplay();
    
    // Set up event listener for quantity
    document.getElementById('quantity').addEventListener('input', calculatePricing);
});

function addProductSelector() {
    // Find the product info div
    const productInfo = document.querySelector('.product-info');
    
    // Create two-dropdown selector HTML
    const selectorHTML = `
        <div style="margin-bottom: 15px;">
            <label for="categorySelector" style="display: block; margin-bottom: 5px; font-weight: 500;">Select Product Type:</label>
            <select id="categorySelector" style="width: 100%; padding: 8px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 14px; margin-bottom: 15px;">
                <option value="">-- Select Category --</option>
                ${Object.keys(productCategories).map(category => 
                    `<option value="${category}">${category}</option>`
                ).join('')}
            </select>
            
            <label for="productSelector" style="display: block; margin-bottom: 5px; font-weight: 500;">Select Product Variation:</label>
            <select id="productSelector" style="width: 100%; padding: 8px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 14px;" disabled>
                <option value="">-- First select a product type --</option>
            </select>
        </div>
    `;
    
    // Insert at the beginning of product info
    productInfo.insertAdjacentHTML('afterbegin', selectorHTML);
    
    // Add category change event listener
    document.getElementById('categorySelector').addEventListener('change', function(e) {
        updateProductDropdown(e.target.value);
    });
    
    // Add product change event listener
    document.getElementById('productSelector').addEventListener('change', function(e) {
        if (e.target.value) {
            selectProduct(e.target.value);
        }
    });
}

function updateProductDropdown(category) {
    const productSelect = document.getElementById('productSelector');
    
    if (!category) {
        productSelect.disabled = true;
        productSelect.innerHTML = '<option value="">-- First select a product type --</option>';
        return;
    }
    
    // Get products for this category
    const productSkus = productCategories[category];
    
    // Enable dropdown and populate with products
    productSelect.disabled = false;
    productSelect.innerHTML = `
        <option value="">-- Select a ${category.slice(0, -1)} --</option>
        ${productSkus.map(sku => {
            const product = productCatalog[sku];
            return `<option value="${sku}">${product.name}</option>`;
        }).join('')}
    `;
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
        smallParcelShipping: product.smallParcelShipping
    };
    
    // Update display
    document.getElementById('productName').textContent = product.name;
    
    // No longer updating removed price display elements
    
    // Recalculate pricing
    calculatePricing();
}

function calculatePricing() {
    if (!productConfig.sku) {
        resetPricingDisplay();
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (quantity === 0) {
        resetPricingDisplay();
        return;
    }
    
    // Calculate discount based on quantity
    let discount = 0; // No default discount, use tiers
    for (const tier of config.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    // Calculate pricing
    const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
    const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
    const retailProductTotal = retailPriceWithoutShipping * quantity;
    const bulkProductTotal = bulkUnitPrice * quantity;
    const retailShippingTotal = productConfig.smallParcelShipping * quantity;
    const { freightCost, palletsNeeded, unitsPerPallet } = calculateFreightCost(productConfig.sku, quantity);
    
    // Update displays
    document.getElementById('quantity').textContent = quantity;
    
    // Retail pricing
    document.getElementById('retailUnitCost').textContent = formatCurrency(productConfig.retailPrice);
    document.getElementById('retailQuantity').textContent = quantity;
    document.getElementById('retailDiscount').textContent = '0%';
    document.getElementById('retailProductSubtotal').textContent = formatCurrency(retailProductTotal);
    document.getElementById('retailShippingTotal').textContent = formatCurrency(retailShippingTotal);
    document.getElementById('retailOrderTotal').textContent = formatCurrency(retailProductTotal + retailShippingTotal);
    
    // Bulk pricing
    document.getElementById('bulkUnitCost').textContent = discount > 0 ? `${formatCurrency(bulkUnitPrice)} (${discount}% off)` : formatCurrency(bulkUnitPrice);
    document.getElementById('bulkQuantity').textContent = quantity;
    document.getElementById('bulkDiscount').textContent = `${discount}%`;
    document.getElementById('bulkProductTotal').textContent = formatCurrency(bulkProductTotal);
    document.getElementById('freightCost').textContent = `${formatCurrency(freightCost)} (${palletsNeeded} pallet${palletsNeeded > 1 ? 's' : ''})`;
    document.getElementById('bulkOrderTotal').textContent = formatCurrency(bulkProductTotal + freightCost);
    
    // Calculate totals for comparison
    const retailTotal = retailProductTotal + retailShippingTotal;
    const bulkTotal = bulkProductTotal + freightCost;
    
    // Update savings box
    const savingsBox = document.getElementById('savingsBox');
    const savings = retailTotal - bulkTotal;
    const savingsPercent = ((savings / retailTotal) * 100).toFixed(0);
    
    if (savings > 0) {
        savingsBox.textContent = `You save ${formatCurrency(savings).replace('$', '$')} (${savingsPercent}%) with bulk pricing!`;
        savingsBox.style.background = '#4caf50';
        savingsBox.style.color = 'white';
    } else {
        savingsBox.innerHTML = `Retail is cheaper by $${Math.abs(savings).toFixed(2)} at this quantity<br>
        <span style="font-size: 14px;">Bulk savings start at: ${getBreakEvenQuantity()} units</span>`;
        savingsBox.style.background = '#ff5252';
        savingsBox.style.color = 'white';
    }
    
    // Show/hide MOQ notice
    const moqNotice = document.getElementById('moqNotice');
    if (quantity < 100) {
        moqNotice.style.display = 'none';
    } else {
        moqNotice.style.display = 'none';
    }
    
    // Add unit comparison
    const perUnitRetail = productConfig.retailPrice;
    const perUnitBulk = (bulkProductTotal + freightCost) / quantity;
    const textColor = savings > 0 ? '#4caf50' : '#ff5252';
    
    const comparisonHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
            <div style="text-align: center;">
                <div style="font-size: 12px; color: #666;">Per unit all-in:</div>
                <div style="font-size: 14px;">Retail $${perUnitRetail.toFixed(2)}</div>
            </div>
            <div style="font-size: 20px; color: ${textColor};">→</div>
            <div style="text-align: center;">
                <div style="font-size: 12px; color: #666;">Per unit all-in:</div>
                <div style="font-size: 14px; font-weight: bold; color: ${textColor};">Bulk $${perUnitBulk.toFixed(2)}</div>
            </div>
        </div>
    `;
    
    if (!document.getElementById('unitComparison')) {
        document.getElementById('savingsBox').insertAdjacentHTML('afterend', `<div id="unitComparison">${comparisonHTML}</div>`);
    } else {
        document.getElementById('unitComparison').innerHTML = comparisonHTML;
    }
    
    // Calculate actual break-even quantity considering discounts
    let breakEvenQty = 0;
    for (let q = 1; q <= 500; q++) {
        // Calculate retail total
        const retailTotalTest = productConfig.retailPrice * q;
        
        // Calculate bulk total with discount
        let discountTest = 0; // No default discount, use tiers
        for (const tier of config.pricingTiers) {
            if (q >= tier.minQty && (tier.maxQty === null || q <= tier.maxQty)) {
                discountTest = tier.discount;
                break;
            }
        }
        const bulkUnitPriceTest = retailPriceWithoutShipping * (1 - discountTest / 100);
        const bulkProductTotalTest = bulkUnitPriceTest * q;
        const { freightCost: freightCostTest } = calculateFreightCost(productConfig.sku, q);
        const bulkTotalTest = bulkProductTotalTest + freightCostTest;
        
        if (bulkTotalTest < retailTotalTest) {
            breakEvenQty = q;
            break;
        }
    }
    
    if (!document.getElementById('breakEven')) {
        const breakEvenHTML = `
            <div id="breakEven" style="font-size: 11px; color: ${textColor}; margin-top: 5px;">
                Bulk savings start at: ${breakEvenQty > 0 ? breakEvenQty : '>500'} units
            </div>
        `;
        document.getElementById('unitComparison').insertAdjacentHTML('afterend', breakEvenHTML);
    } else {
        document.getElementById('breakEven').style.color = textColor;
        document.getElementById('breakEven').innerHTML = `Bulk savings start at: ${breakEvenQty > 0 ? breakEvenQty : '>500'} units`;
    }
}

function getBreakEvenQuantity() {
    if (!productConfig.sku) return 0;
    
    for (let q = 1; q <= 500; q++) {
        const retailTotal = productConfig.retailPrice * q;
        
        let discount = 0; // No default discount, use tiers
        for (const tier of config.pricingTiers) {
            if (q >= tier.minQty && (tier.maxQty === null || q <= tier.maxQty)) {
                discount = tier.discount;
                break;
            }
        }
        
        const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
        const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
        const bulkProductTotal = bulkUnitPrice * q;
        const { freightCost } = calculateFreightCost(productConfig.sku, q);
        const bulkTotal = bulkProductTotal + freightCost;
        
        if (bulkTotal < retailTotal) {
            return q;
        }
    }
    
    return '>500';
}

function resetPricingDisplay() {
    // Reset all displays to default
    document.getElementById('retailUnitCost').textContent = '$0';
    document.getElementById('retailQuantity').textContent = '0';
    document.getElementById('retailDiscount').textContent = '0%';
    document.getElementById('retailProductSubtotal').textContent = '$0';
    document.getElementById('retailShippingTotal').textContent = '$0';
    document.getElementById('retailOrderTotal').textContent = '$0';
    
    document.getElementById('bulkUnitCost').textContent = '$0';
    document.getElementById('bulkQuantity').textContent = '0';
    document.getElementById('bulkDiscount').textContent = '0%';
    document.getElementById('bulkProductTotal').textContent = '$0';
    document.getElementById('freightCost').textContent = '$0';
    document.getElementById('bulkOrderTotal').textContent = '$0';
    
    document.getElementById('savingsBox').textContent = 'Select a product to see pricing comparison';
    document.getElementById('savingsBox').style.background = '#f5f5f5';
    document.getElementById('savingsBox').style.color = '#666';
    
    // Remove unit comparison and break-even if they exist
    const unitComparison = document.getElementById('unitComparison');
    if (unitComparison) unitComparison.remove();
    
    const breakEven = document.getElementById('breakEven');
    if (breakEven) breakEven.remove();
}

function submitOrderRequest() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (!productConfig.sku) {
        alert('Please select a product');
        return;
    }
    
    if (quantity === 0) {
        alert('Please enter a quantity');
        return;
    }
    
    // Calculate all values
    let discount = 0; // No default discount, use tiers
    for (const tier of config.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
    const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
    const productTotal = bulkUnitPrice * quantity;
    const { freightCost, palletsNeeded } = calculateFreightCost(productConfig.sku, quantity);
    const totalCost = productTotal + freightCost;
    
    // Check if bulk is actually cheaper
    const retailTotal = productConfig.retailPrice * quantity;
    const isBulkCheaper = totalCost < retailTotal;
    
    // Create order details
    const orderDetails = {
        product: productConfig.name,
        sku: productConfig.sku,
        quantity: quantity,
        unitPrice: `$${bulkUnitPrice.toFixed(2)}`,
        productSubtotal: `$${productTotal.toFixed(2)}`,
        freightCost: `$${freightCost.toFixed(2)} (${palletsNeeded} pallet${palletsNeeded > 1 ? 's' : ''})`,
        totalCost: `$${totalCost.toFixed(2)}`,
        discount: `${discount}%`,
        retailComparison: isBulkCheaper ? 
            `Saves $${(retailTotal - totalCost).toFixed(2)} vs retail` : 
            `Retail is cheaper by $${(totalCost - retailTotal).toFixed(2)}`
    };
    
    // Create email body
    const emailSubject = `Bulk Order Request - ${productConfig.name} (${quantity} units)`;
    const emailBody = `New Bulk Order Request

Product Details:
- Product: ${orderDetails.product}
- SKU: ${orderDetails.sku}
- Quantity: ${orderDetails.quantity}

Pricing:
- Unit Price: ${orderDetails.unitPrice} (${orderDetails.discount} discount)
- Product Subtotal: ${orderDetails.productSubtotal}
- Freight Cost: ${orderDetails.freightCost}
- Total Order: ${orderDetails.totalCost}

Comparison: ${orderDetails.retailComparison}

Customer should be contacted to confirm this order.`;
    
    // Create mailto link
    const mailtoLink = `mailto:info@keelanscott.co?cc=keelandimick@gmail.com&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show thank you message
    setTimeout(() => {
        document.querySelector('.calculator-container').innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <img src="ks-logo.jpg" alt="Keelan Scott" style="height: 54px; margin-bottom: 20px;">
                <h2 style="color: #4caf50; margin-bottom: 20px;">Thank You for Your Order Request!</h2>
                <p style="font-size: 18px; margin-bottom: 30px;">
                    We've received your bulk order request for:<br>
                    <strong>${productConfig.name} (${quantity} units)</strong>
                </p>
                <p style="color: #666; margin-bottom: 30px;">
                    A member of our team will contact you within 24 hours to confirm your order and arrange payment.
                </p>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px;">Order Summary</h3>
                    <p>Total: <strong>${orderDetails.totalCost}</strong></p>
                    <p>${orderDetails.retailComparison}</p>
                </div>
                <button class="add-to-cart" onclick="location.reload()">
                    Submit Another Request
                </button>
            </div>
        `;
    }, 100);
}