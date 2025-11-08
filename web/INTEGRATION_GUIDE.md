# Bulk Pricing Calculator - Website Integration Guide

## Overview

This calculator helps customers see real-time bulk pricing based on quantity, including:
- Regular retail price vs bulk price comparison
- Freight costs included in bulk orders
- Automatic discount tiers
- Total savings calculation

## Features

1. **Non-bulk pricing**: Shows regular price × quantity
2. **Bulk pricing**: Shows discounted unit price × quantity
3. **Freight cost**: Automatically included for bulk orders (MOQ 100+)
4. **Real-time updates**: Price changes as quantity is adjusted
5. **Add to cart**: Direct integration with your e-commerce cart

## Integration Options

### Option 1: Vanilla JavaScript (Any Platform)

1. Include the HTML structure in your product page
2. Add the JavaScript file to your site
3. Initialize with your product data:

```javascript
const productConfig = {
    sku: 'YOUR-SKU',
    name: 'Product Name',
    retailPrice: 299.99,
    productCost: 100.00,  // Your internal cost
    avgLtlFreight: 361.24,  // Average freight cost
    moq: 100,  // Minimum order quantity
    pricingTiers: [
        { minQty: 100, maxQty: 199, discount: 15 },
        { minQty: 200, maxQty: 299, discount: 20 },
        // Add more tiers as needed
    ]
};
```

### Option 2: React Component

For React-based sites (Next.js, Gatsby, etc.):

```jsx
import BulkPricingCalculator from './BulkPricingCalculator';

function ProductPage({ product }) {
  return (
    <BulkPricingCalculator 
      product={{
        sku: product.sku,
        name: product.name,
        retailPrice: product.price,
        productCost: product.cost,
        // ... other config
      }}
    />
  );
}
```

### Option 3: Shopify Integration

For Shopify stores, create a custom product template:

1. Add calculator script to theme assets
2. Create product metafields for:
   - `bulk_pricing_enabled` (boolean)
   - `minimum_order_quantity` (number)
   - `freight_cost` (number)

3. Add to product template:
```liquid
{% if product.metafields.custom.bulk_pricing_enabled %}
  <div id="bulk-calculator"></div>
  <script>
    window.bulkProduct = {
      sku: "{{ product.variants.first.sku }}",
      name: "{{ product.title }}",
      retailPrice: {{ product.price | divided_by: 100.0 }},
      moq: {{ product.metafields.custom.minimum_order_quantity | default: 100 }}
    };
  </script>
  <script src="{{ 'bulk-calculator.js' | asset_url }}"></script>
{% endif %}
```

## Backend API Requirements

Your backend should provide:

1. **Product pricing endpoint**:
```json
GET /api/products/{sku}/bulk-pricing

Response:
{
  "sku": "ABC123",
  "retailPrice": 299.99,
  "moq": 100,
  "freightCost": 361.24,
  "tiers": [
    { "minQty": 100, "maxQty": 199, "discount": 15 },
    { "minQty": 200, "maxQty": 299, "discount": 20 }
  ]
}
```

2. **Add to cart endpoint**:
```json
POST /api/cart/add

Request:
{
  "sku": "ABC123",
  "quantity": 150,
  "isBulkOrder": true,
  "unitPrice": 254.99,
  "freightCost": 361.24
}
```

## Customization

### Styling

The calculator uses CSS variables for easy theming:

```css
:root {
  --calc-primary: #007bff;
  --calc-success: #4caf50;
  --calc-warning: #ff9800;
  --calc-border-radius: 8px;
}
```

### Pricing Logic

Modify the pricing tiers in your configuration:

```javascript
pricingTiers: [
  { minQty: 50, maxQty: 99, discount: 10 },    // 10% off 50-99 units
  { minQty: 100, maxQty: 199, discount: 15 },  // 15% off 100-199 units
  { minQty: 200, maxQty: null, discount: 20 }  // 20% off 200+ units
]
```

### Freight Calculation

Currently uses a flat freight rate. Can be modified for:
- Zone-based pricing
- Weight-based calculation
- Multiple freight options

## Testing

Test with various scenarios:
- Below MOQ (should show warning)
- At MOQ threshold (100 units)
- Different tier boundaries
- Very large quantities (500+)

## Security Considerations

- Never expose internal cost data to frontend
- Validate all pricing on backend before checkout
- Use HTTPS for all API calls
- Implement rate limiting on pricing endpoints