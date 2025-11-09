# WordPress Embedding Instructions

## Quick Setup (5 minutes)

### What You Need:
- WordPress admin access
- A page where you want the calculator

### Step-by-Step:

1. **Login to WordPress**
   - Go to: `yourwebsite.com/wp-admin`

2. **Create New Page**
   - Click: Pages → Add New
   - Title: "Bulk Pricing Calculator" (or whatever you prefer)

3. **Add the Calculator**
   - Click the **+** button
   - Type "html" in the search
   - Select **Custom HTML** block

4. **Copy & Paste This Code:**
```html
<div style="margin: 20px auto; max-width: 650px;">
    <iframe 
        src="https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html" 
        width="100%" 
        height="1400" 
        style="border: none; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);"
        title="Bulk Order Pricing Calculator">
    </iframe>
</div>
```

5. **Publish**
   - Click Preview to test
   - Click Publish when ready

## Troubleshooting

### Calculator Not Showing?
- Some security plugins block iframes
- Try deactivating security plugins temporarily
- Or add `keelandimick.github.io` to your whitelist

### Need Different Size?
- Change `height="1400"` to your preferred height
- Change `max-width: 650px` for wider/narrower display

### Want it in a Sidebar?
Use this shorter code for widgets:
```html
<iframe 
    src="https://keelandimick.github.io/BulkCalculator/web/bulk_pricing_calculator.html" 
    width="100%" 
    height="800" 
    style="border: none;">
</iframe>
```

## For Your Developer

When they're back, they can:
1. Create a custom WordPress plugin
2. Integrate with WooCommerce products
3. Pass product data dynamically
4. Add to cart functionality that connects to your store

For now, this standalone version works perfectly!