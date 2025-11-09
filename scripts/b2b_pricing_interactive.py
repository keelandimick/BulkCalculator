#!/usr/bin/env python3
import pandas as pd

def analyze_b2b_pricing():
    print("B2B FREIGHT PRICING CALCULATOR")
    print("=" * 50)
    
    # Get user inputs
    print("\nPlease enter your product details:")
    unit_cost = float(input("Your cost per unit ($): "))
    small_parcel_shipping = float(input("Average small parcel shipping per unit ($): "))
    retail_price = float(input("Current retail price per unit ($): "))
    
    avg_ltl_cost = 361.24
    
    print(f"\nUsing average LTL freight cost: ${avg_ltl_cost}")
    
    # Calculate current retail margin
    retail_margin = ((retail_price - unit_cost - small_parcel_shipping) / retail_price) * 100
    print(f"Your current retail margin: {retail_margin:.1f}%")
    
    # MOQ Analysis
    print("\n" + "="*80)
    print("MOQ ANALYSIS - How quantity affects your unit economics")
    print("="*80)
    
    moq_options = [25, 50, 75, 100, 150, 200, 250, 300, 400, 500]
    
    print(f"\n{'MOQ':<6} {'Freight/Unit':<13} {'Total Cost':<12} {'B2B Price':<12} {'vs Retail':<10} {'Margin %':<10} {'Order Total':<12}")
    print("-" * 90)
    
    sweet_spot_moq = None
    
    for moq in moq_options:
        freight_per_unit = avg_ltl_cost / moq
        total_cost = unit_cost + freight_per_unit
        
        # Try to maintain similar margin as retail
        target_margin = max(15, retail_margin - 5)  # Slightly lower margin for B2B
        b2b_price = total_cost / (1 - target_margin / 100)
        
        # Discount vs retail
        discount = ((retail_price - b2b_price) / retail_price) * 100
        
        # Actual margin
        actual_margin = ((b2b_price - total_cost) / b2b_price) * 100
        
        # Order total
        order_total = b2b_price * moq
        
        # Check if this is a good sweet spot (15-25% discount with decent margin)
        if discount >= 15 and discount <= 25 and actual_margin >= 20 and sweet_spot_moq is None:
            sweet_spot_moq = moq
            print(f"{moq:<6} ${freight_per_unit:<12.2f} ${total_cost:<11.2f} ${b2b_price:<11.2f} {discount:>9.1f}% {actual_margin:>9.1f}% ${order_total:>11,.2f} ← RECOMMENDED")
        else:
            print(f"{moq:<6} ${freight_per_unit:<12.2f} ${total_cost:<11.2f} ${b2b_price:<11.2f} {discount:>9.1f}% {actual_margin:>9.1f}% ${order_total:>11,.2f}")
    
    # Freight impact analysis
    print("\n" + "="*80)
    print("FREIGHT IMPACT ANALYSIS")
    print("="*80)
    
    print(f"\nHow freight affects your costs at different MOQs:")
    for moq in [50, 100, 200, 300, 500]:
        freight_per_unit = avg_ltl_cost / moq
        freight_percent = (freight_per_unit / (unit_cost + freight_per_unit)) * 100
        print(f"• MOQ {moq:>3}: Freight adds ${freight_per_unit:>5.2f}/unit ({freight_percent:>4.1f}% of total cost)")
    
    # Recommended pricing structure
    print("\n" + "="*80)
    print("RECOMMENDED TIERED PRICING STRUCTURE")
    print("="*80)
    
    print(f"\nBased on your costs and maintaining healthy margins:")
    print(f"\n{'Quantity':<15} {'Discount':<12} {'Price/Unit':<12} {'Min Order':<15} {'Your Margin':<12}")
    print("-" * 70)
    
    tiers = [
        {'range': '50-99', 'discount': 10, 'min_qty': 50},
        {'range': '100-199', 'discount': 15, 'min_qty': 100},
        {'range': '200-299', 'discount': 20, 'min_qty': 200},
        {'range': '300-499', 'discount': 25, 'min_qty': 300},
        {'range': '500+', 'discount': 30, 'min_qty': 500}
    ]
    
    for tier in tiers:
        b2b_price = retail_price * (1 - tier['discount'] / 100)
        freight_per_unit = avg_ltl_cost / tier['min_qty']
        total_cost = unit_cost + freight_per_unit
        margin = ((b2b_price - total_cost) / b2b_price) * 100
        min_order = b2b_price * tier['min_qty']
        
        print(f"{tier['range']:<15} {tier['discount']:>10}% ${b2b_price:>10.2f} ${min_order:>14,.2f} {margin:>10.1f}%")
    
    # Strategic recommendations
    print("\n" + "="*80)
    print("STRATEGIC RECOMMENDATIONS")
    print("="*80)
    
    print("\n1. MINIMUM ORDER QUANTITY (MOQ)")
    if sweet_spot_moq:
        print(f"   • Recommended MOQ: {sweet_spot_moq} units")
    else:
        print(f"   • Recommended MOQ: 100 units (keeps freight under 30% of cost)")
    
    print("\n2. PRICING STRATEGY")
    print("   • Offer tiered pricing to incentivize larger orders")
    print("   • Consider 'freight included' pricing for simplicity")
    print(f"   • Set a free freight threshold at ${avg_ltl_cost * 5:,.0f} (5x freight cost)")
    
    print("\n3. MARGIN PROTECTION")
    print("   • Don't go below 20% margin on any order")
    print("   • Add a freight surcharge for orders under MOQ")
    print("   • Quote custom pricing for very large orders (1000+ units)")
    
    print("\n4. COMPETITIVE POSITIONING")
    print("   • Emphasize value of bulk ordering (cost savings)")
    print("   • Highlight faster delivery vs. small parcel")
    print("   • Offer payment terms (NET 30) for qualified B2B customers")

if __name__ == "__main__":
    analyze_b2b_pricing()