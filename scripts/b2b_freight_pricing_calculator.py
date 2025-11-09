#!/usr/bin/env python3
import pandas as pd
import numpy as np
from typing import Dict, List, Tuple

class B2BFreightPricingCalculator:
    def __init__(self, avg_ltl_cost: float = 361.24):
        self.avg_ltl_cost = avg_ltl_cost
        
    def calculate_moq_scenarios(self, 
                               unit_cost: float,
                               small_parcel_shipping_per_unit: float,
                               target_margin_percent: float = 30.0,
                               units_per_pallet: int = 100) -> pd.DataFrame:
        """
        Calculate different MOQ scenarios and their impact on pricing
        
        Args:
            unit_cost: Your cost per unit (product cost)
            small_parcel_shipping_per_unit: Average shipping cost for small parcel
            target_margin_percent: Desired profit margin percentage
            units_per_pallet: How many units fit on a pallet
        """
        
        scenarios = []
        
        # Test different MOQ quantities
        moq_options = [25, 50, 75, 100, 150, 200, 250, 300, 400, 500]
        
        for moq in moq_options:
            # Calculate freight cost per unit
            freight_per_unit = self.avg_ltl_cost / moq
            
            # Total cost per unit (product + freight)
            total_cost_per_unit = unit_cost + freight_per_unit
            
            # Price needed to achieve target margin
            price_with_margin = total_cost_per_unit / (1 - target_margin_percent / 100)
            
            # Compare to small parcel pricing
            small_parcel_total = unit_cost + small_parcel_shipping_per_unit
            small_parcel_price = small_parcel_total / (1 - target_margin_percent / 100)
            
            # Calculate discount percentage vs small parcel
            discount_vs_retail = ((small_parcel_price - price_with_margin) / small_parcel_price) * 100
            
            # Total order value
            total_order_value = price_with_margin * moq
            
            # Number of pallets (rough estimate)
            pallets = moq / units_per_pallet
            
            scenarios.append({
                'MOQ': moq,
                'Freight_Per_Unit': round(freight_per_unit, 2),
                'Total_Cost_Per_Unit': round(total_cost_per_unit, 2),
                'B2B_Price_Per_Unit': round(price_with_margin, 2),
                'Small_Parcel_Price': round(small_parcel_price, 2),
                'Discount_vs_Retail': round(discount_vs_retail, 1),
                'Total_Order_Value': round(total_order_value, 2),
                'Approx_Pallets': round(pallets, 1),
                'Freight_as_Percent_of_Cost': round((freight_per_unit / total_cost_per_unit) * 100, 1)
            })
        
        return pd.DataFrame(scenarios)
    
    def calculate_break_even_moq(self,
                                 unit_cost: float,
                                 small_parcel_shipping_per_unit: float,
                                 desired_b2b_discount: float = 20.0) -> int:
        """
        Calculate the MOQ needed to offer a specific discount vs retail pricing
        """
        # Calculate small parcel price (assuming same margin)
        margin = 0.30  # 30% margin
        small_parcel_total = unit_cost + small_parcel_shipping_per_unit
        small_parcel_price = small_parcel_total / (1 - margin)
        
        # Target B2B price with desired discount
        target_b2b_price = small_parcel_price * (1 - desired_b2b_discount / 100)
        
        # Work backwards to find required cost
        required_total_cost = target_b2b_price * (1 - margin)
        
        # Maximum freight cost per unit allowed
        max_freight_per_unit = required_total_cost - unit_cost
        
        # MOQ needed
        moq_needed = self.avg_ltl_cost / max_freight_per_unit
        
        return int(np.ceil(moq_needed))
    
    def tiered_pricing_structure(self,
                                unit_cost: float,
                                small_parcel_shipping_per_unit: float,
                                base_margin: float = 30.0) -> pd.DataFrame:
        """
        Create a tiered pricing structure with different discounts for different quantities
        """
        tiers = []
        
        # Define quantity tiers
        tier_configs = [
            {'min_qty': 50, 'max_qty': 99, 'discount': 10},
            {'min_qty': 100, 'max_qty': 199, 'discount': 15},
            {'min_qty': 200, 'max_qty': 299, 'discount': 20},
            {'min_qty': 300, 'max_qty': 499, 'discount': 25},
            {'min_qty': 500, 'max_qty': None, 'discount': 30}
        ]
        
        # Calculate base retail price
        small_parcel_total = unit_cost + small_parcel_shipping_per_unit
        retail_price = small_parcel_total / (1 - base_margin / 100)
        
        for tier in tier_configs:
            # Use midpoint for calculations (or min for open-ended tier)
            qty = tier['min_qty'] if tier['max_qty'] is None else (tier['min_qty'] + tier['max_qty']) // 2
            
            # B2B price with discount
            b2b_price = retail_price * (1 - tier['discount'] / 100)
            
            # Calculate actual margin with freight
            freight_per_unit = self.avg_ltl_cost / qty
            total_cost = unit_cost + freight_per_unit
            actual_margin = ((b2b_price - total_cost) / b2b_price) * 100
            
            # Minimum order value
            min_order_value = b2b_price * tier['min_qty']
            
            tier_range = f"{tier['min_qty']}+"
            if tier['max_qty']:
                tier_range = f"{tier['min_qty']}-{tier['max_qty']}"
            
            tiers.append({
                'Quantity_Tier': tier_range,
                'Discount_Percent': f"{tier['discount']}%",
                'B2B_Price': f"${b2b_price:.2f}",
                'Freight_Per_Unit': f"${freight_per_unit:.2f}",
                'Actual_Margin': f"{actual_margin:.1f}%",
                'Min_Order_Value': f"${min_order_value:,.2f}",
                'Profitable': 'Yes' if actual_margin > 0 else 'No'
            })
        
        return pd.DataFrame(tiers)

# Example usage and analysis
if __name__ == "__main__":
    calculator = B2BFreightPricingCalculator(avg_ltl_cost=361.24)
    
    print("B2B FREIGHT PRICING ANALYSIS")
    print("=" * 80)
    
    # You'll need to adjust these values based on your actual costs
    unit_cost = 10.00  # Your cost per unit
    small_parcel_shipping = 5.00  # Average small parcel shipping per unit
    
    print(f"\nAssumptions:")
    print(f"- Average LTL freight cost: ${calculator.avg_ltl_cost}")
    print(f"- Product cost per unit: ${unit_cost}")
    print(f"- Small parcel shipping per unit: ${small_parcel_shipping}")
    print(f"- Target margin: 30%")
    
    # MOQ Analysis
    print("\n1. MOQ SCENARIOS ANALYSIS")
    print("-" * 80)
    moq_df = calculator.calculate_moq_scenarios(unit_cost, small_parcel_shipping)
    print(moq_df.to_string(index=False))
    
    # Break-even analysis
    print("\n2. BREAK-EVEN MOQ ANALYSIS")
    print("-" * 80)
    for discount in [10, 15, 20, 25, 30]:
        moq = calculator.calculate_break_even_moq(unit_cost, small_parcel_shipping, discount)
        print(f"To offer {discount}% discount vs retail: MOQ = {moq} units")
    
    # Tiered pricing
    print("\n3. TIERED PRICING STRUCTURE")
    print("-" * 80)
    tiers_df = calculator.tiered_pricing_structure(unit_cost, small_parcel_shipping)
    print(tiers_df.to_string(index=False))
    
    # Key insights
    print("\n4. KEY INSIGHTS")
    print("-" * 80)
    print(f"• With average LTL cost of ${calculator.avg_ltl_cost}:")
    print(f"  - At MOQ of 50: Freight = ${calculator.avg_ltl_cost/50:.2f}/unit ({(calculator.avg_ltl_cost/50)/(unit_cost+calculator.avg_ltl_cost/50)*100:.0f}% of total cost)")
    print(f"  - At MOQ of 100: Freight = ${calculator.avg_ltl_cost/100:.2f}/unit ({(calculator.avg_ltl_cost/100)/(unit_cost+calculator.avg_ltl_cost/100)*100:.0f}% of total cost)")
    print(f"  - At MOQ of 200: Freight = ${calculator.avg_ltl_cost/200:.2f}/unit ({(calculator.avg_ltl_cost/200)/(unit_cost+calculator.avg_ltl_cost/200)*100:.0f}% of total cost)")
    
    print("\n• Recommended approach:")
    print("  1. Set minimum MOQ at 100 units to keep freight reasonable")
    print("  2. Offer tiered discounts to incentivize larger orders")
    print("  3. Consider free freight threshold (e.g., orders over $2,000)")
    print("  4. Quote custom pricing for very large orders (500+ units)")