#!/usr/bin/env python3
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox
import pandas as pd

class B2BPricingCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("B2B Freight Pricing Calculator")
        self.root.geometry("900x700")
        
        # Set style
        style = ttk.Style()
        style.theme_use('aqua')  # macOS native style
        
        # Main frame
        main_frame = ttk.Frame(root, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Title
        title_label = ttk.Label(main_frame, text="B2B Bulk Pricing Calculator", 
                               font=('Helvetica', 24, 'bold'))
        title_label.grid(row=0, column=0, columnspan=3, pady=(0, 20))
        
        # Input section
        input_frame = ttk.LabelFrame(main_frame, text="Enter Your Product Details", padding="15")
        input_frame.grid(row=1, column=0, columnspan=3, sticky=(tk.W, tk.E), pady=(0, 20))
        
        # Input fields
        ttk.Label(input_frame, text="Cost per unit (production + import) $:").grid(row=0, column=0, sticky=tk.W, pady=5)
        self.unit_cost = ttk.Entry(input_frame, width=15)
        self.unit_cost.grid(row=0, column=1, sticky=tk.W, pady=5)
        self.unit_cost.insert(0, "10.00")
        
        ttk.Label(input_frame, text="Small parcel shipping per unit $:").grid(row=1, column=0, sticky=tk.W, pady=5)
        self.small_parcel = ttk.Entry(input_frame, width=15)
        self.small_parcel.grid(row=1, column=1, sticky=tk.W, pady=5)
        self.small_parcel.insert(0, "5.00")
        
        ttk.Label(input_frame, text="Current retail price per unit $:").grid(row=2, column=0, sticky=tk.W, pady=5)
        self.retail_price = ttk.Entry(input_frame, width=15)
        self.retail_price.grid(row=2, column=1, sticky=tk.W, pady=5)
        self.retail_price.insert(0, "25.00")
        
        ttk.Label(input_frame, text="Average LTL freight cost: $361.24", 
                 font=('Helvetica', 10, 'italic')).grid(row=3, column=0, columnspan=2, pady=(10, 0))
        
        # Calculate button
        calculate_btn = ttk.Button(main_frame, text="Calculate B2B Pricing", 
                                  command=self.calculate_pricing)
        calculate_btn.grid(row=2, column=0, columnspan=3, pady=(0, 20))
        
        # Results area
        self.results_text = scrolledtext.ScrolledText(main_frame, width=100, height=30, 
                                                     font=('Courier', 11))
        self.results_text.grid(row=3, column=0, columnspan=3, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Configure grid weights
        root.columnconfigure(0, weight=1)
        root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(0, weight=1)
        main_frame.rowconfigure(3, weight=1)
        
        # Add initial calculation
        self.calculate_pricing()
    
    def calculate_pricing(self):
        try:
            # Get input values
            unit_cost = float(self.unit_cost.get())
            small_parcel_shipping = float(self.small_parcel.get())
            retail_price = float(self.retail_price.get())
            avg_ltl_cost = 361.24
            
            # Clear results
            self.results_text.delete('1.0', tk.END)
            
            # Calculate retail margin
            retail_margin = ((retail_price - unit_cost - small_parcel_shipping) / retail_price) * 100
            
            # Header
            self.results_text.insert(tk.END, "B2B FREIGHT PRICING ANALYSIS\n")
            self.results_text.insert(tk.END, "="*80 + "\n\n")
            
            self.results_text.insert(tk.END, f"Your Inputs:\n")
            self.results_text.insert(tk.END, f"• Cost per unit: ${unit_cost:.2f}\n")
            self.results_text.insert(tk.END, f"• Small parcel shipping: ${small_parcel_shipping:.2f}\n")
            self.results_text.insert(tk.END, f"• Retail price: ${retail_price:.2f}\n")
            self.results_text.insert(tk.END, f"• Current retail margin: {retail_margin:.1f}%\n")
            self.results_text.insert(tk.END, f"• Average LTL freight: ${avg_ltl_cost:.2f}\n\n")
            
            # MOQ Analysis
            self.results_text.insert(tk.END, "MOQ ANALYSIS - How quantity affects your unit economics\n")
            self.results_text.insert(tk.END, "-"*80 + "\n\n")
            
            self.results_text.insert(tk.END, f"{'MOQ':<6} {'Freight/Unit':<13} {'Total Cost':<12} {'B2B Price':<12} ")
            self.results_text.insert(tk.END, f"{'vs Retail':<12} {'Margin %':<10} {'Order Total':<12}\n")
            self.results_text.insert(tk.END, "-"*85 + "\n")
            
            moq_options = [25, 50, 75, 100, 150, 200, 250, 300, 400, 500]
            sweet_spot_moq = None
            
            for moq in moq_options:
                freight_per_unit = avg_ltl_cost / moq
                total_cost = unit_cost + freight_per_unit
                
                # Try to maintain similar margin as retail
                target_margin = max(15, retail_margin - 5)
                b2b_price = total_cost / (1 - target_margin / 100)
                
                # Discount vs retail
                discount = ((retail_price - b2b_price) / retail_price) * 100
                
                # Actual margin
                actual_margin = ((b2b_price - total_cost) / b2b_price) * 100
                
                # Order total
                order_total = b2b_price * moq
                
                line = f"{moq:<6} ${freight_per_unit:<12.2f} ${total_cost:<11.2f} ${b2b_price:<11.2f} "
                line += f"{discount:>10.1f}% {actual_margin:>9.1f}% ${order_total:>11,.2f}"
                
                # Check if this is a good sweet spot
                if discount >= 15 and discount <= 25 and actual_margin >= 20 and sweet_spot_moq is None:
                    sweet_spot_moq = moq
                    line += " ← RECOMMENDED"
                
                self.results_text.insert(tk.END, line + "\n")
            
            # Freight Impact
            self.results_text.insert(tk.END, "\n\nFREIGHT IMPACT ANALYSIS\n")
            self.results_text.insert(tk.END, "-"*80 + "\n\n")
            self.results_text.insert(tk.END, "How freight affects your costs at different MOQs:\n")
            
            for moq in [50, 100, 200, 300, 500]:
                freight_per_unit = avg_ltl_cost / moq
                freight_percent = (freight_per_unit / (unit_cost + freight_per_unit)) * 100
                self.results_text.insert(tk.END, f"• MOQ {moq:>3}: Freight adds ${freight_per_unit:>5.2f}/unit ")
                self.results_text.insert(tk.END, f"({freight_percent:>4.1f}% of total cost)\n")
            
            # Recommended Tiers
            self.results_text.insert(tk.END, "\n\nRECOMMENDED TIERED PRICING STRUCTURE\n")
            self.results_text.insert(tk.END, "-"*80 + "\n\n")
            
            self.results_text.insert(tk.END, f"{'Quantity':<15} {'Discount':<12} {'Price/Unit':<12} ")
            self.results_text.insert(tk.END, f"{'Min Order':<15} {'Your Margin':<12}\n")
            self.results_text.insert(tk.END, "-"*70 + "\n")
            
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
                
                line = f"{tier['range']:<15} {tier['discount']:>10}% ${b2b_price:>10.2f} "
                line += f"${min_order:>14,.2f} {margin:>10.1f}%"
                self.results_text.insert(tk.END, line + "\n")
            
            # Recommendations
            self.results_text.insert(tk.END, "\n\nRECOMMENDATIONS\n")
            self.results_text.insert(tk.END, "-"*80 + "\n\n")
            
            if sweet_spot_moq:
                self.results_text.insert(tk.END, f"✓ Recommended MOQ: {sweet_spot_moq} units\n")
            else:
                self.results_text.insert(tk.END, f"✓ Recommended MOQ: 100 units (keeps freight under 30% of cost)\n")
            
            self.results_text.insert(tk.END, f"✓ Free freight threshold: ${avg_ltl_cost * 5:,.0f} (5x freight cost)\n")
            self.results_text.insert(tk.END, "✓ Offer tiered pricing to incentivize larger orders\n")
            self.results_text.insert(tk.END, "✓ Consider 'freight included' pricing for simplicity\n")
            self.results_text.insert(tk.END, "✓ Quote custom pricing for very large orders (1000+ units)\n")
            
        except ValueError:
            messagebox.showerror("Input Error", "Please enter valid numbers for all fields")

if __name__ == "__main__":
    root = tk.Tk()
    app = B2BPricingCalculator(root)
    root.mainloop()