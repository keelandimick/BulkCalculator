# Bulk Pricing Calculator

A B2B bulk pricing calculator for furniture e-commerce that compares retail vs wholesale pricing with real-time freight calculations.

## Features

- 📊 **Price-based discount tiers** (10-20% based on order value)
- 🚚 **Real-time freight quotes** via Uber Freight API integration
- 📧 **Automated order notifications** via EmailJS
- 📦 **Multi-component product support** for furniture with multiple boxes
- 📈 **Side-by-side pricing comparison** showing retail vs bulk savings
- 📑 **Integrated product catalog** with PDF viewer and download
- 🎯 **37+ furniture SKUs** with accurate dimensions and weights

## Live Demo

Visit the calculator at: [https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html](https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html)

## How It Works

1. **Select a product** from the dropdown catalog
2. **Enter quantity** (minimum 100 units for bulk pricing)
3. **Enter delivery ZIP code** for freight calculation
4. **View instant comparison** of retail vs bulk pricing
5. **Submit order request** to receive email notification

## Pricing Structure

Price-based discount tiers:
- **$0 - $5,000**: 10% off retail
- **$5,001 - $10,000**: 15% off retail  
- **$10,001+**: 20% off retail

*Note: These are example tiers and can be customized*

## Technical Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Email Service**: EmailJS for order notifications
- **Freight API**: Uber Freight (via Node.js proxy)
- **Hosting**: GitHub Pages
- **Product Catalog**: Embedded PDF viewer

## Project Structure

```
BulkCalculator/
├── web/                           # Frontend files
│   ├── bulk_pricing_calculator.html    # Main calculator page
│   ├── bulk_pricing_calculator_v3.js   # Calculator logic
│   ├── order_email_form.html          # Order submission form
│   ├── 2025-catalog.pdf              # Product catalog
│   ├── ks-logo.jpg                   # Company logo
│   └── product-images/               # Product photos
├── server/                       # Backend proxy server
│   ├── freight-proxy.js         # Uber Freight API proxy
│   ├── package.json            # Node dependencies
│   └── .env                    # API credentials (not in repo)
└── README.md                   # This file
```

## Setup Instructions

### Frontend Only (No Freight Quotes)
1. Clone the repository
2. Open `web/bulk_pricing_calculator.html` in a browser
3. Calculator will work with simulated freight quotes

### With Real Freight Quotes
1. Set up the Node.js proxy server:
   ```bash
   cd server
   npm install
   ```
2. Add Uber Freight credentials to `.env`:
   ```
   FREIGHT_CLIENT_ID=your_client_id
   FREIGHT_CLIENT_SECRET=your_client_secret
   ```
3. Deploy proxy to a hosting service (Vercel, Railway, etc.)
4. Update `PROXY_URL` in `bulk_pricing_calculator_v3.js`

## Email Configuration

The calculator uses EmailJS for sending order notifications:
- Emails are sent to configured recipients when orders are submitted
- Customer email is set as reply-to for easy communication
- No backend email server required

## Customization

### Modify Discount Tiers
Edit the `pricingTiers` in `bulk_pricing_calculator_v3.js`:
```javascript
pricingTiers: [
    { minAmount: 0, maxAmount: 5000, discount: 10 },
    { minAmount: 5001, maxAmount: 10000, discount: 15 },
    { minAmount: 10001, maxAmount: null, discount: 20 }
]
```

### Add/Update Products
Products are defined in the `products` object in `bulk_pricing_calculator_v3.js`. Each product needs:
- SKU
- Name
- Retail price
- Shipping cost
- Warehouse locations

### Update Catalog
Replace `web/2025-catalog.pdf` with your updated catalog file.

## Browser Compatibility

- Chrome (recommended)
- Safari
- Firefox
- Edge
- Mobile browsers

## License

Private commercial project - all rights reserved

## Support

For issues or questions, contact keelandimick@gmail.com