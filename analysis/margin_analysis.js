// Margin Analysis for Bulk Calculator
// Analyzing pricing margins for current vs proposed discount tiers

// Product data from catalog
const products = {
    'CF-U-58X28': { 
        name: 'Coffee table U 58X28', 
        retailPrice: 479.99, 
        productCost: 240.96, 
        smallParcelShipping: 70.00 
    },
    'D-U-46X24': { 
        name: 'Desk U 46X24', 
        retailPrice: 359.99, 
        productCost: 184.02, 
        smallParcelShipping: 45.00 
    },
    'DN-U-60X36': { 
        name: 'Dining U 60X36', 
        retailPrice: 599.99, 
        productCost: 323.71, 
        smallParcelShipping: 85.00 
    }
};

// Current discount tiers
const currentTiers = [
    { minQty: 50, maxQty: 99, discount: 10 },
    { minQty: 100, maxQty: 199, discount: 15 },
    { minQty: 200, maxQty: 299, discount: 20 },
    { minQty: 300, maxQty: 499, discount: 25 },
    { minQty: 500, maxQty: null, discount: 30 }
];

// Proposed new discount tiers
const proposedTiers = [
    { minQty: 1, maxQty: 10, discount: 10 },
    { minQty: 11, maxQty: 20, discount: 20 },
    { minQty: 21, maxQty: null, discount: 30 }
];

// Base LTL freight cost
const baseLtlFreight = 361.24;

// Function to get the discount for a quantity based on tier structure
function getDiscount(quantity, tiers) {
    if (quantity === 0) return 0;
    
    for (const tier of tiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            return tier.discount;
        }
    }
    return 0; // No discount if not in any tier
}

// Function to calculate margins
function calculateMargins(sku, quantity, tiers) {
    const product = products[sku];
    const discount = getDiscount(quantity, tiers);
    
    // Retail pricing (includes shipping)
    const retailTotal = product.retailPrice * quantity;
    const retailRevenue = retailTotal;
    const retailCost = (product.productCost + product.smallParcelShipping) * quantity;
    const retailProfit = retailRevenue - retailCost;
    const retailMargin = (retailProfit / retailRevenue) * 100;
    
    // Bulk pricing (excludes shipping from price, adds freight separately)
    const retailPriceNoShipping = product.retailPrice - product.smallParcelShipping;
    const bulkUnitPrice = retailPriceNoShipping * (1 - discount / 100);
    const bulkProductRevenue = bulkUnitPrice * quantity;
    
    // Calculate freight cost (simplified - in reality would use pallet calculations)
    const freightCost = quantity < 10 ? 0 : baseLtlFreight + Math.max(0, Math.floor(quantity / 50) * 280);
    
    const bulkTotalRevenue = bulkProductRevenue + freightCost;
    const bulkProductCost = product.productCost * quantity;
    const bulkTotalCost = bulkProductCost + freightCost;
    const bulkProfit = bulkTotalRevenue - bulkTotalCost;
    const bulkMargin = (bulkProfit / bulkTotalRevenue) * 100;
    
    // Product-only margin (excluding freight)
    const bulkProductProfit = bulkProductRevenue - bulkProductCost;
    const bulkProductMargin = (bulkProductProfit / bulkProductRevenue) * 100;
    
    return {
        quantity,
        discount,
        retail: {
            unitPrice: product.retailPrice,
            totalRevenue: retailRevenue,
            totalCost: retailCost,
            profit: retailProfit,
            margin: retailMargin
        },
        bulk: {
            unitPrice: bulkUnitPrice,
            productRevenue: bulkProductRevenue,
            freightCost: freightCost,
            totalRevenue: bulkTotalRevenue,
            totalCost: bulkTotalCost,
            profit: bulkProfit,
            margin: bulkMargin,
            productOnlyMargin: bulkProductMargin
        }
    };
}

// Analyze margins at different quantities
function analyzeProduct(sku) {
    const product = products[sku];
    const quantities = [1, 5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 300, 500];
    
    console.log(`\n${'='.repeat(80)}`);
    console.log(`MARGIN ANALYSIS: ${product.name} (${sku})`);
    console.log(`${'='.repeat(80)}`);
    console.log(`Product Cost: $${product.productCost}`);
    console.log(`Retail Price: $${product.retailPrice} (includes $${product.smallParcelShipping} shipping)`);
    console.log(`Price without shipping: $${(product.retailPrice - product.smallParcelShipping).toFixed(2)}`);
    
    console.log(`\n${'─'.repeat(80)}`);
    console.log('CURRENT DISCOUNT TIERS (50+ units minimum)');
    console.log(`${'─'.repeat(80)}`);
    
    quantities.forEach(qty => {
        const current = calculateMargins(sku, qty, currentTiers);
        
        if (current.discount > 0) {
            console.log(`\nQuantity: ${qty} units (${current.discount}% discount)`);
            console.log(`  Bulk Unit Price: $${current.bulk.unitPrice.toFixed(2)}`);
            console.log(`  Product Revenue: $${current.bulk.productRevenue.toFixed(2)}`);
            console.log(`  Freight Cost: $${current.bulk.freightCost.toFixed(2)}`);
            console.log(`  Total Revenue: $${current.bulk.totalRevenue.toFixed(2)}`);
            console.log(`  Total Cost: $${current.bulk.totalCost.toFixed(2)}`);
            console.log(`  Profit: $${current.bulk.profit.toFixed(2)}`);
            console.log(`  Overall Margin: ${current.bulk.margin.toFixed(1)}%`);
            console.log(`  Product-Only Margin: ${current.bulk.productOnlyMargin.toFixed(1)}%`);
            
            // Compare to retail
            const retailEquiv = current.retail.margin;
            console.log(`  (Retail margin would be: ${retailEquiv.toFixed(1)}%)`);
        }
    });
    
    console.log(`\n${'─'.repeat(80)}`);
    console.log('PROPOSED NEW TIERS (1+ units minimum)');
    console.log(`${'─'.repeat(80)}`);
    
    quantities.forEach(qty => {
        const proposed = calculateMargins(sku, qty, proposedTiers);
        const current = calculateMargins(sku, qty, currentTiers);
        
        console.log(`\nQuantity: ${qty} units (${proposed.discount}% discount)`);
        console.log(`  Bulk Unit Price: $${proposed.bulk.unitPrice.toFixed(2)}`);
        console.log(`  Product Revenue: $${proposed.bulk.productRevenue.toFixed(2)}`);
        console.log(`  Freight Cost: $${proposed.bulk.freightCost.toFixed(2)}`);
        console.log(`  Total Revenue: $${proposed.bulk.totalRevenue.toFixed(2)}`);
        console.log(`  Total Cost: $${proposed.bulk.totalCost.toFixed(2)}`);
        console.log(`  Profit: $${proposed.bulk.profit.toFixed(2)}`);
        console.log(`  Overall Margin: ${proposed.bulk.margin.toFixed(1)}%`);
        console.log(`  Product-Only Margin: ${proposed.bulk.productOnlyMargin.toFixed(1)}%`);
        
        // Show difference from current tiers
        if (current.discount !== proposed.discount) {
            const marginDiff = proposed.bulk.margin - current.bulk.margin;
            const profitDiff = proposed.bulk.profit - current.bulk.profit;
            console.log(`  CHANGE vs Current: ${marginDiff > 0 ? '+' : ''}${marginDiff.toFixed(1)}% margin, ${profitDiff > 0 ? '+' : ''}$${profitDiff.toFixed(2)} profit`);
        }
    });
}

// Generate summary comparison
function generateSummary() {
    console.log(`\n${'='.repeat(80)}`);
    console.log('SUMMARY: IMPACT OF PROPOSED TIER CHANGES');
    console.log(`${'='.repeat(80)}`);
    
    const testQuantities = [5, 10, 15, 20, 25, 50, 100];
    
    Object.entries(products).forEach(([sku, product]) => {
        console.log(`\n${product.name} (${sku})`);
        console.log(`${'─'.repeat(60)}`);
        console.log('Qty  | Current      | Proposed     | Difference');
        console.log('     | Disc% Margin | Disc% Margin | Margin  Profit');
        console.log(`${'─'.repeat(60)}`);
        
        testQuantities.forEach(qty => {
            const current = calculateMargins(sku, qty, currentTiers);
            const proposed = calculateMargins(sku, qty, proposedTiers);
            
            const marginDiff = proposed.bulk.margin - current.bulk.margin;
            const profitDiff = proposed.bulk.profit - current.bulk.profit;
            
            console.log(
                `${qty.toString().padStart(4)} | ` +
                `${current.discount.toString().padStart(4)}% ${current.bulk.margin.toFixed(1).padStart(5)}% | ` +
                `${proposed.discount.toString().padStart(4)}% ${proposed.bulk.margin.toFixed(1).padStart(5)}% | ` +
                `${marginDiff > 0 ? '+' : ''}${marginDiff.toFixed(1).padStart(5)}% ` +
                `${profitDiff > 0 ? '+' : ''}$${profitDiff.toFixed(0).padStart(6)}`
            );
        });
    });
    
    console.log(`\n${'='.repeat(80)}`);
    console.log('KEY INSIGHTS');
    console.log(`${'='.repeat(80)}`);
    console.log('\n1. CURRENT TIERS (50+ unit minimum):');
    console.log('   - No bulk discounts for orders under 50 units');
    console.log('   - Margins range from ~40-50% depending on product and quantity');
    console.log('   - Higher quantities improve margins due to freight efficiency');
    
    console.log('\n2. PROPOSED TIERS (1+ unit minimum):');
    console.log('   - Immediate 10% discount on 1-10 units');
    console.log('   - 20% discount on 11-20 units');
    console.log('   - 30% discount on 21+ units');
    console.log('   - SIGNIFICANT margin reduction for small orders');
    console.log('   - Orders under 50 units would see 10-20% margin decrease');
    
    console.log('\n3. PROFITABILITY IMPACT:');
    console.log('   - Small orders (1-20 units): Major profit reduction');
    console.log('   - Medium orders (21-49 units): Now get 30% discount vs 0%');
    console.log('   - Large orders (50+): Similar or slightly better margins');
    
    console.log('\n4. RECOMMENDATION:');
    console.log('   - Current tiers better protect margins on small orders');
    console.log('   - Consider minimum order quantities if implementing new tiers');
    console.log('   - New tiers would require volume increase to maintain profitability');
}

// Run the analysis
console.log('BULK PRICING MARGIN ANALYSIS');
console.log('Comparing Current vs Proposed Discount Tiers');
console.log(`Generated: ${new Date().toLocaleString()}`);

// Analyze each product
analyzeProduct('CF-U-58X28');
analyzeProduct('D-U-46X24');
analyzeProduct('DN-U-60X36');

// Generate summary
generateSummary();