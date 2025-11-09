#!/usr/bin/env python3
import pandas as pd
import os
from glob import glob
from datetime import datetime

def extract_ltl_data():
    """Extract LTL data from all Excel files in the 2025 directory"""
    base_dir = "/Users/keelandimick/2025"
    all_ltl_data = []
    
    # Find all Excel files
    excel_files = glob(os.path.join(base_dir, "*/*Client Detail.xlsx"))
    print(f"Found {len(excel_files)} Excel files")
    
    # Process each file
    for file_path in sorted(excel_files):
        try:
            # Extract folder name for date information
            folder_name = os.path.basename(os.path.dirname(file_path))
            
            # Try to read LTL sheet
            try:
                # Read with first row as header
                df = pd.read_excel(file_path, sheet_name='LTL')
                
                if not df.empty:
                    # Find the Total Charges column (it might have different names)
                    total_col = None
                    for col in df.columns:
                        if isinstance(col, str) and ('total' in col.lower() or 'charge' in col.lower()):
                            total_col = col
                            break
                    
                    # If no string column found, look for numeric column in last position
                    if total_col is None and len(df.columns) > 0:
                        # Often the total is in the last column
                        last_col = df.columns[-1]
                        if pd.api.types.is_numeric_dtype(df[last_col]) or isinstance(last_col, (int, float)):
                            total_col = last_col
                    
                    if total_col is not None:
                        # Create a clean dataframe with essential information
                        clean_df = pd.DataFrame()
                        
                        # Get order information if available
                        order_col = None
                        for col in df.columns:
                            if isinstance(col, str) and 'order' in col.lower():
                                order_col = col
                                break
                        
                        if order_col:
                            clean_df['Order'] = df[order_col]
                        
                        # Add the total charges
                        clean_df['LTL_Charge'] = pd.to_numeric(df[total_col], errors='coerce')
                        clean_df['Week_Folder'] = folder_name
                        clean_df['Source_File'] = os.path.basename(file_path)
                        
                        # Extract month and week number from folder name
                        parts = folder_name.split('_')
                        if len(parts) == 2:
                            clean_df['Month'] = int(parts[0])
                            clean_df['Week_Number'] = int(parts[1])
                        
                        all_ltl_data.append(clean_df)
                        print(f"✓ Extracted {len(clean_df)} LTL records from {folder_name} (Total: ${clean_df['LTL_Charge'].sum():,.2f})")
                    else:
                        print(f"⚠ No total charges column found in {folder_name}")
                        
            except ValueError as e:
                # LTL sheet might not exist in this file
                print(f"⚠ No LTL sheet in {folder_name}: {e}")
                
        except Exception as e:
            print(f"✗ Error processing {file_path}: {e}")
    
    # Combine all data
    if all_ltl_data:
        combined_df = pd.concat(all_ltl_data, ignore_index=True)
        
        # Sort by month and week
        if 'Month' in combined_df.columns and 'Week_Number' in combined_df.columns:
            combined_df = combined_df.sort_values(['Month', 'Week_Number'])
        
        # Save combined data
        output_file = "/Users/keelandimick/combined_ltl_fees_v2.xlsx"
        with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
            # Write all data
            combined_df.to_excel(writer, sheet_name='All_LTL_Data', index=False)
            
            # Create summary by week
            if 'Week_Folder' in combined_df.columns:
                weekly_summary = combined_df.groupby('Week_Folder').agg({
                    'LTL_Charge': ['count', 'sum', 'mean', 'min', 'max']
                }).round(2)
                weekly_summary.columns = ['Shipment_Count', 'Total_Cost', 'Average_Cost', 'Min_Cost', 'Max_Cost']
                weekly_summary = weekly_summary.reset_index()
                
                # Add month column for better sorting
                weekly_summary['Month'] = weekly_summary['Week_Folder'].str.split('_').str[0].astype(int)
                weekly_summary['Week'] = weekly_summary['Week_Folder'].str.split('_').str[1].astype(int)
                weekly_summary = weekly_summary.sort_values(['Month', 'Week'])
                weekly_summary = weekly_summary.drop(['Month', 'Week'], axis=1)
                
                weekly_summary.to_excel(writer, sheet_name='Weekly_Summary', index=False)
            
            # Create overall summary
            summary = pd.DataFrame({
                'Metric': ['Total LTL Shipments', 'Total LTL Cost', 'Average LTL Cost per Shipment', 
                          'Minimum LTL Cost', 'Maximum LTL Cost', 'Standard Deviation',
                          'Number of Weeks with LTL'],
                'Value': [
                    combined_df['LTL_Charge'].count(),
                    f"${combined_df['LTL_Charge'].sum():,.2f}",
                    f"${combined_df['LTL_Charge'].mean():,.2f}",
                    f"${combined_df['LTL_Charge'].min():,.2f}",
                    f"${combined_df['LTL_Charge'].max():,.2f}",
                    f"${combined_df['LTL_Charge'].std():,.2f}",
                    combined_df['Week_Folder'].nunique()
                ]
            })
            summary.to_excel(writer, sheet_name='Overall_Summary', index=False)
        
        print(f"\n✓ Combined data saved to: {output_file}")
        print(f"\n📊 LTL SHIPPING SUMMARY:")
        print(f"{'='*50}")
        print(f"Total LTL Shipments: {combined_df['LTL_Charge'].count()}")
        print(f"Total LTL Cost: ${combined_df['LTL_Charge'].sum():,.2f}")
        print(f"Average LTL Cost per Shipment: ${combined_df['LTL_Charge'].mean():,.2f}")
        print(f"Minimum LTL Cost: ${combined_df['LTL_Charge'].min():,.2f}")
        print(f"Maximum LTL Cost: ${combined_df['LTL_Charge'].max():,.2f}")
        print(f"Standard Deviation: ${combined_df['LTL_Charge'].std():,.2f}")
        print(f"Number of Weeks with LTL shipments: {combined_df['Week_Folder'].nunique()}")
        
    else:
        print("\n✗ No LTL data found in any files")

if __name__ == "__main__":
    print("LTL Fee Extraction Script V2")
    print("=" * 50)
    extract_ltl_data()