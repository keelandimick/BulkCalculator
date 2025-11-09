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
    'CF-U': { unitsPerPallet: 42, volume: 45139 },
    'CN-U': { unitsPerPallet: 42, volume: 43843 },
    'D-HP': { unitsPerPallet: 36, volume: 62766 },
    'D-SSB': { unitsPerPallet: 21, volume: 75900 },
    'D-SSW': { unitsPerPallet: 21, volume: 75900 },
    'D-U': { unitsPerPallet: 28, volume: 77005 },
    'B-DN': { unitsPerPallet: 63, volume: 28487 },
    'DN-U': { unitsPerPallet: 14, volume: 118162 },
    'C-TABLE': { unitsPerPallet: 12, volume: 144040 },
    'DRAWER': { unitsPerPallet: 54, volume: 37945 },
    'END-TABLE': { unitsPerPallet: 60, volume: 30470 },
    'MONITOR-STAND-BK': { unitsPerPallet: 32, volume: 55082 }
};

// Map parent SKUs to their components
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
                    `<option value="${sku}">${product.name}</option>`
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
        unitsPerPallet: getUnitsPerPallet(sku)
    };
    
    // Update display
    document.getElementById('productName').textContent = `${productConfig.sku} - ${productConfig.name}`;
    
    // Remove MOQ notice completely
    const moqNotice = document.getElementById('moqNotice');
    if (moqNotice) {
        moqNotice.style.display = 'none';
    }
    
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
    
    if (quantity === 0) {
        // Reset all displays to zero
        document.getElementById('retailUnitPrice').textContent = '$0.00';
        document.getElementById('retailBreakdown').textContent = '$0.00 + $0.00 shipping';
        document.getElementById('bulkUnitPrice').textContent = '$0.00';
        document.getElementById('bulkBreakdown').innerHTML = '$0.00 - 0% discount<br><span style="font-size: 12px;">(freight not included)</span>';
        
        // Reset retail order summary
        document.getElementById('retailUnitCost').textContent = '$0.00';
        document.getElementById('retailQuantity').textContent = '0';
        document.getElementById('retailDiscount').textContent = '0%';
        document.getElementById('retailProductSubtotal').textContent = '$0.00';
        document.getElementById('retailShippingTotal').textContent = '$0.00';
        document.getElementById('retailOrderTotal').textContent = '$0.00';
        
        // Reset bulk order summary
        document.getElementById('bulkUnitCost').textContent = '$0.00';
        document.getElementById('bulkQuantity').textContent = '0';
        document.getElementById('bulkDiscount').textContent = '0%';
        document.getElementById('bulkProductTotal').textContent = '$0.00';
        document.getElementById('freightCost').textContent = '$0.00';
        document.getElementById('bulkOrderTotal').textContent = '$0.00';
        
        document.getElementById('savingsBox').style.display = 'none';
        return;
    }
    
    // Calculate retail pricing (price already includes shipping)
    const retailUnitPrice = productConfig.retailPrice; // This already includes shipping
    const retailTotal = retailUnitPrice * quantity;
    
    // Calculate bulk pricing with discounts (minimum 10% for wholesale)
    let discount = 0; // No default discount, use tiers
    for (const tier of config.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    // For bulk, we need to remove shipping from retail price before applying discount
    const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
    const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
    const bulkProductTotal = bulkUnitPrice * quantity;
    
    // Calculate freight cost based on pallets
    const { freightCost, palletsNeeded, unitsPerPallet } = calculateFreightCost(productConfig.sku, quantity);
    const bulkTotal = bulkProductTotal + freightCost;
    
    // Update retail displays
    document.getElementById('retailUnitPrice').textContent = `$${retailUnitPrice.toFixed(2)}`;
    const retailPriceNoShip = retailUnitPrice - productConfig.smallParcelShipping;
    document.getElementById('retailBreakdown').textContent = `$${retailPriceNoShip.toFixed(2)} + $${productConfig.smallParcelShipping.toFixed(2)} shipping`;
    
    // Update bulk displays
    document.getElementById('bulkUnitPrice').textContent = `$${bulkUnitPrice.toFixed(2)}`;
    document.getElementById('bulkBreakdown').innerHTML = `$${retailPriceWithoutShipping.toFixed(2)} - ${discount}% discount<br><span style="font-size: 12px;">(freight not included)</span>`;
    
    // Update retail order summary
    document.getElementById('retailUnitCost').textContent = `$${retailPriceNoShip.toFixed(2)}`;
    document.getElementById('retailQuantity').textContent = quantity;
    document.getElementById('retailDiscount').textContent = '0%';
    document.getElementById('retailProductSubtotal').textContent = `$${(retailPriceNoShip * quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    document.getElementById('retailShippingTotal').textContent = `$${(productConfig.smallParcelShipping * quantity).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    document.getElementById('retailOrderTotal').textContent = `$${retailTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Update bulk order summary
    document.getElementById('bulkUnitCost').textContent = `$${retailPriceWithoutShipping.toFixed(2)}`;
    document.getElementById('bulkQuantity').textContent = quantity;
    document.getElementById('bulkDiscount').textContent = `${discount}%`;
    document.getElementById('bulkProductTotal').textContent = `$${bulkProductTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Show freight with pallet count
    document.getElementById('freightCost').textContent = `$${freightCost.toFixed(2)} (${palletsNeeded} pallet${palletsNeeded > 1 ? 's' : ''})`;
    document.getElementById('bulkOrderTotal').textContent = `$${bulkTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    
    // Show comparison message
    const savingsBox = document.getElementById('savingsBox');
    if (bulkTotal < retailTotal) {
        const savings = retailTotal - bulkTotal;
        savingsBox.textContent = `Bulk pricing saves $${savings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (${((savings/retailTotal)*100).toFixed(1)}%)`;
        savingsBox.style.backgroundColor = '#e8f5e9'; // Same light green as bulk order summary
        savingsBox.style.color = '#388e3c'; // Dark green text
        savingsBox.style.display = 'block';
    } else {
        const extra = bulkTotal - retailTotal;
        savingsBox.textContent = `Retail is cheaper by $${extra.toFixed(2)} at this quantity`;
        savingsBox.style.backgroundColor = '#ffebee'; // Same light red as retail order summary
        savingsBox.style.color = '#d32f2f'; // Dark red text
        savingsBox.style.display = 'block';
    }
    
    // Add detailed comparison
    const retailUnitWithShipping = retailTotal / quantity;
    const bulkUnitWithFreight = bulkTotal / quantity;
    
    const textColor = bulkTotal < retailTotal ? '#388e3c' : '#d32f2f';
    const comparisonHTML = `
        <div style="font-size: 12px; margin-top: 10px; color: ${textColor};">
            Per unit all-in: Retail $${retailUnitWithShipping.toFixed(2)} | Bulk $${bulkUnitWithFreight.toFixed(2)}
        </div>
    `;
    
    if (!document.getElementById('unitComparison')) {
        savingsBox.insertAdjacentHTML('beforeend', `<div id="unitComparison">${comparisonHTML}</div>`);
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

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
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
    const { freightCost } = calculateFreightCost(productConfig.sku, quantity);
    const totalCost = productTotal + freightCost;
    
    // Check if bulk is actually cheaper
    const retailTotal = productConfig.retailPrice * quantity; // Retail price already includes shipping
    const isBulkCheaper = totalCost < retailTotal;
    
    // Create cart item
    const cartItem = {
        sku: productConfig.sku,
        name: productConfig.name,
        quantity: quantity,
        unitPrice: bulkUnitPrice,
        productTotal: productTotal,
        freightCost: freightCost,
        totalCost: totalCost,
        discount: discount,
        isBulkOrder: true,
        isBulkCheaper: isBulkCheaper
    };
    
    // Show appropriate message
    if (isBulkCheaper) {
        alert(`Added to cart (Bulk Pricing):\n${quantity} x ${productConfig.name}\nSKU: ${productConfig.sku}\nUnit Price: $${bulkUnitPrice.toFixed(2)} (${discount}% off)\nTotal: $${totalCost.toFixed(2)} (includes freight)`);
    } else {
        alert(`Note: Retail pricing would be cheaper for this quantity.\nBulk Total: $${totalCost.toFixed(2)}\nRetail Total: $${retailTotal.toFixed(2)}\n\nConsider ordering ${Math.ceil(config.baseLtlFreight / productConfig.smallParcelShipping)} or more units for bulk savings.`);
    }
}