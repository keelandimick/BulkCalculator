# Bulk Calculator - Future Enhancements TODO

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

## Technical Notes
- All images should be optimized for web (compressed, proper dimensions)
- Consider lazy loading for product images
- Email client preference could be stored in localStorage
- Catalog PDF should be hosted on GitHub or company website

## Priority Order
1. Product images (biggest visual impact)
2. Email client selection (improves user experience)
3. Transparency blurb (builds trust)
4. Catalog feature (nice to have)