# Bulk Pricing Calculator

A B2B bulk pricing calculator for furniture e-commerce that compares retail vs wholesale pricing with real-time freight calculations.

## Features

- 📊 **Real-time price comparison** between retail and bulk orders
- 🚚 **Smart freight calculation** based on pallet capacity
- 💰 **Tiered discount structure** (10-30% based on quantity)
- 📦 **Multi-component product support** (handles furniture with multiple boxes)
- 📈 **Break-even analysis** showing when bulk savings begin
- 🎯 **Product catalog** with 37+ furniture SKUs

## Live Demo

Visit the calculator at: [https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html](https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html)

## How It Works

1. **Select a product** from the dropdown menu
2. **Enter quantity** to see instant pricing comparison
3. **View side-by-side** retail vs bulk pricing
4. **See detailed breakdowns** including shipping/freight costs
5. **Identify savings** with color-coded indicators

## Discount Tiers

- 1-49 units: 10% off
- 50-99 units: 10% off  
- 100-199 units: 15% off
- 200-299 units: 20% off
- 300-499 units: 25% off
- 500+ units: 30% off

## Local Setup

1. Clone the repository
2. Open `web/bulk_pricing_calculator.html` in a web browser
3. Or use the Mac launcher: `./B2B_Calculator.command`

## Integration

To integrate into your website:
- Embed as an iframe
- Or copy the web folder contents to your site
- No server-side code required - runs entirely in the browser

## Files Structure

```
├── web/
│   ├── bulk_pricing_calculator.html    # Main calculator page
│   ├── bulk_pricing_calculator_v2.js   # Calculator logic
│   ├── BulkPricingCalculator.jsx      # React component version
│   └── INTEGRATION_GUIDE.md            # Detailed integration instructions
├── scripts/
│   ├── b2b_pricing_interactive.py      # Interactive CLI calculator
│   ├── b2b_calculator_gui.py          # GUI version
│   └── extract_ltl_fees.py            # Freight data extraction
├── data/
│   └── combined_ltl_fees.xlsx          # LTL freight data
├── analysis/
│   └── ltl_cost_summary.txt            # Freight cost analysis
├── B2B_Calculator.command              # Mac OS launcher
├── run_calculator.sh                   # Shell script launcher
└── *.csv                              # Product catalog and shipping data
```

## Data Sources

### Product Catalog
- `sku, sku name, cost, shipping, price.csv` - Complete product catalog with 37+ furniture SKUs
- `sku, pallet dims, units per pallet, unit dims.csv` - Pallet configuration data
- `order_items.csv` - Sample order data

### Freight Calculations
- Based on real LTL (Less Than Load) freight data
- Average freight cost: $361.24 per pallet
- Dynamic calculation based on pallet capacity

## Python Scripts

### Interactive Calculator (`b2b_pricing_interactive.py`)
```bash
python3 scripts/b2b_pricing_interactive.py
```
- Command-line interface
- Real-time price calculations
- Detailed freight breakdown

### GUI Calculator (`b2b_calculator_gui.py`)
- Desktop application with graphical interface
- Visual price comparison
- Export functionality

## Development

### Requirements
- Python 3.7+ (for scripts)
- Modern web browser (for web calculator)
- No external dependencies for web version

### Running Locally
```bash
# Web version
open web/bulk_pricing_calculator.html

# Python CLI version
./run_calculator.sh

# Mac app
./B2B_Calculator.command
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software for B2B furniture pricing calculations.