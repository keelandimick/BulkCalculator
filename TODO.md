# Bulk Calculator - Future Enhancements TODO

## IMMEDIATE PRIORITY - Deploy Freight API

### Deploy Proxy Server (Required for Real Quotes)
- [ ] Choose deployment platform:
  - Vercel (recommended - free, easy)
  - Render.com (free tier available)
  - Railway (simple deployment)
- [ ] Deploy the `/server` folder
- [ ] Get production URL (e.g., https://your-app.vercel.app)
- [ ] Update PROXY_URL in bulk_pricing_calculator_v3.js
- [ ] Test real FreightView quotes in production
- [ ] Remove "Simulated Quote" fallback once confirmed working

### Deployment Commands:
```bash
# For Vercel:
cd server
npm install -g vercel
vercel

# For Railway:
npm install -g @railway/cli
railway login
railway up
```

## 1. Add Product Catalog
- [ ] Create a viewable product catalog page/section
- [ ] Include all products with SKUs, names, and prices
- [ ] Add "Download Catalog" button for PDF version
- [ ] Consider adding catalog link in calculator interface

## 2. Add Transparency Blurb
- [ ] Write copy about commitment to transparency and showing the math
- [ ] Add section above or below calculator
- [ ] Example text: "At Keelan Scott, we believe in transparency. We show you exactly how our bulk pricing works, including all costs and savings calculations."
- [ ] Style to match brand aesthetic

## 3. Product Images
- [ ] Add product images for each SKU
- [ ] Display image when product is selected
- [ ] Images should update dynamically when user changes selection
- [ ] Consider placement: 
  - Above pricing comparison
  - In a sidebar
  - As background with overlay
- [ ] Need to source/organize product photos

## 4. Email Client Selection
- [ ] Add email client selector before submission
- [ ] Options:
  - Gmail (open gmail.com with pre-filled compose)
  - Apple Mail (mailto: link - current method)
  - Outlook (open outlook.live.com with pre-filled)
  - Other/Copy Details (show copyable text)
- [ ] Implement different methods:
  - Gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=...`
  - Outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=...`
  - Apple Mail: Current `mailto:` method
- [ ] Remember user's preference for future submissions

## Completed Features ✅
- [x] FreightView API integration (OAuth2 authentication)
- [x] Real-time LTL freight quotes with carrier names
- [x] Automatic warehouse selection (UT/TN) based on destination zip
- [x] Updated discount tiers: 1-10 (10%), 11-20 (15%), 21+ (20%)
- [x] Removed estimated quotes - real quotes only
- [x] Added actual component weights for accurate freight calculation
- [x] Created Node.js proxy server for API calls
- [x] CORS handling with fallback to simulation
- [x] Carrier name display (FedEx Freight, XPO, etc.)
- [x] Transit time display in quotes

## Technical Notes
- FreightView credentials stored in .env (git-ignored)
- Proxy server required due to CORS restrictions
- All images should be optimized for web (compressed, proper dimensions)
- Consider lazy loading for product images
- Email client preference could be stored in localStorage
- Catalog PDF should be hosted on GitHub or company website

## Priority Order
1. **Deploy proxy server** (critical for real freight quotes)
2. Product images (biggest visual impact)
3. Email client selection (improves user experience)
4. Transparency blurb (builds trust)
5. Catalog feature (nice to have)