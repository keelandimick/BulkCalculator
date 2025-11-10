import React, { useState, useEffect } from 'react';

const BulkPricingCalculator = ({ product }) => {
  const [quantity, setQuantity] = useState(100);
  const [pricing, setPricing] = useState({});
  
  // Configuration from product prop
  const {
    sku,
    name,
    retailPrice,
    productCost,
    moq = 100,
    avgLtlFreight = 361.24,
    pricingTiers = [
      { minQty: 50, maxQty: 99, discount: 10 },
      { minQty: 100, maxQty: 199, discount: 15 },
      { minQty: 200, maxQty: 299, discount: 20 },
      { minQty: 300, maxQty: 499, discount: 25 },
      { minQty: 500, maxQty: null, discount: 30 }
    ]
  } = product;

  useEffect(() => {
    calculatePricing();
  }, [quantity]);

  const calculatePricing = () => {
    // Calculate retail pricing (no bulk discount)
    const retailTotal = retailPrice * quantity;
    
    // Calculate bulk pricing
    let discount = 0;
    let bulkUnitPrice = retailPrice;
    let freightCost = 0;
    
    if (quantity >= moq) {
      // Find applicable discount tier
      for (const tier of pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
          discount = tier.discount;
          break;
        }
      }
      
      // Calculate bulk unit price with discount
      bulkUnitPrice = retailPrice * (1 - discount / 100);
      
      // Calculate freight cost
      freightCost = avgLtlFreight;
    }
    
    // Calculate totals
    const productTotal = bulkUnitPrice * quantity;
    const totalCost = productTotal + freightCost;
    const savings = retailTotal - productTotal;
    
    setPricing({
      retailUnitPrice: retailPrice,
      retailTotal,
      bulkUnitPrice,
      productTotal,
      freightCost,
      totalCost,
      discount,
      savings,
      freightPerUnit: quantity >= moq ? freightCost / quantity : 0
    });
  };

  const addToCart = () => {
    if (quantity < moq) {
      alert(`Please order at least ${moq} units for bulk pricing.`);
      return;
    }
    
    const cartItem = {
      sku,
      name,
      quantity,
      unitPrice: pricing.bulkUnitPrice,
      productTotal: pricing.productTotal,
      freightCost: pricing.freightCost,
      totalCost: pricing.totalCost,
      discount: pricing.discount,
      isBulkOrder: true
    };
    
    // Call your add to cart function
    if (window.addToCart) {
      window.addToCart(cartItem);
    } else {
      console.log('Adding to cart:', cartItem);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bulk-calculator">
      <div className="product-header">
        <h3>{name}</h3>
        <div className="retail-price">{formatCurrency(retailPrice)}</div>
      </div>

      {quantity < moq && quantity > 0 && (
        <div className="moq-notice">
          ⚠️ Minimum order quantity for bulk pricing: {moq} units
        </div>
      )}

      <div className="quantity-input">
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
          min="1"
          step="1"
        />
      </div>

      <div className="price-comparison">
        <div className="price-box retail">
          <h4>Retail Price</h4>
          <div className="unit-price">{formatCurrency(pricing.retailUnitPrice)}/unit</div>
          <div className="total-price">Total: {formatCurrency(pricing.retailTotal)}</div>
        </div>
        
        <div className="price-box bulk">
          <h4>Bulk Price</h4>
          <div className="unit-price">{formatCurrency(pricing.bulkUnitPrice)}/unit</div>
          <div className="total-price">Total: {formatCurrency(pricing.productTotal)}</div>
          {quantity >= moq && (
            <div className="discount-badge">{pricing.discount}% OFF</div>
          )}
        </div>
      </div>

      {quantity >= moq && (
        <>
          <div className="pricing-breakdown">
            <h4>Order Summary</h4>
            <div className="pricing-row">
              <span>Product Cost:</span>
              <span>{formatCurrency(pricing.productTotal)}</span>
            </div>
            <div className="pricing-row">
              <span>Freight Cost:</span>
              <span>{formatCurrency(pricing.freightCost)}</span>
            </div>
            <div className="pricing-row freight-per-unit">
              <span>(Freight per unit: {formatCurrency(pricing.freightPerUnit)})</span>
            </div>
            <div className="pricing-row total">
              <span>Total Order:</span>
              <span>{formatCurrency(pricing.totalCost)}</span>
            </div>
          </div>

          <div className="savings-box">
            You save {formatCurrency(pricing.savings)} ({pricing.discount}%) with bulk pricing!
          </div>
        </>
      )}

      <button 
        className={`add-to-cart-btn ${quantity < moq ? 'disabled' : ''}`}
        onClick={addToCart}
      >
        Add to Cart
      </button>

      <style jsx>{`
        .bulk-calculator {
          max-width: 500px;
          padding: 20px;
          background: #f4f2ed;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .product-header {
          margin-bottom: 20px;
        }
        
        .retail-price {
          font-size: 24px;
          color: #384637;
          text-decoration: line-through;
        }
        
        .moq-notice {
          background: #fff3cd;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 15px;
          color: #856404;
        }
        
        .quantity-input {
          margin-bottom: 20px;
        }
        
        .quantity-input label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }
        
        .quantity-input input {
          width: 100%;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 6px;
          font-size: 16px;
        }
        
        .price-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .price-box {
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        
        .price-box.retail {
          background: #ffebee;
        }
        
        .price-box.bulk {
          background: #e8f5e9;
          position: relative;
        }
        
        .price-box h4 {
          margin: 0 0 10px 0;
          color: #384637;
        }
        
        .unit-price {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .total-price {
          color: #888;
          font-size: 14px;
        }
        
        .discount-badge {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #384637;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        
        .pricing-breakdown {
          background: #f4f2ed;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        
        .pricing-breakdown h4 {
          margin: 0 0 15px 0;
        }
        
        .pricing-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .pricing-row.freight-per-unit {
          font-size: 12px;
          color: #384637;
          font-style: italic;
        }
        
        .pricing-row.total {
          border-top: 2px solid #384637;
          padding-top: 10px;
          margin-top: 10px;
          font-weight: bold;
          font-size: 18px;
        }
        
        .savings-box {
          background: #384637;
          color: white;
          padding: 15px;
          border-radius: 6px;
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
        }
        
        .add-to-cart-btn {
          width: 100%;
          padding: 15px;
          background: #384637;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .add-to-cart-btn:hover {
          background: #2a3329;
        }
        
        .add-to-cart-btn.disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BulkPricingCalculator;