#!/usr/bin/env python3
import pandas as pd
import os
from glob import glob
from datetime import datetime

def examine_excel_structure(file_path):
    """Examine the structure of an Excel file to understand sheets and columns"""
    try:
        xls = pd.ExcelFile(file_path)
        print(f"\nExamining file: {file_path}")
        print(f"Sheets available: {xls.sheet_names}")
        
        if 'LTL' in xls.sheet_names:
            df = pd.read_excel(file_path, sheet_name='LTL')
            print(f"\nLTL sheet columns: {df.columns.tolist()}")
            print(f"Number of rows in LTL sheet: {len(df)}")
            print(f"\nFirst few rows of LTL sheet:")
            print(df.head())
        else:
            print("No LTL sheet found in this file")
            
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")

def extract_ltl_data():
    """Extract LTL data from all Excel files in the 2025 directory"""
    base_dir = "/Users/keelandimick/2025"
    all_ltl_data = []
    
    # Find all Excel files
    excel_files = glob(os.path.join(base_dir, "*/*Client Detail.xlsx"))
    print(f"Found {len(excel_files)} Excel files")
    
    # First, examine the structure of one file
    if excel_files:
        examine_excel_structure(excel_files[0])
    
    # Process each file
    for file_path in sorted(excel_files):
        try:
            # Extract folder name for date information
            folder_name = os.path.basename(os.path.dirname(file_path))
            
            # Try to read LTL sheet
            try:
                df = pd.read_excel(file_path, sheet_name='LTL', header=0)
                if not df.empty:
                    
                    # Add source file information
                    df['Source_File'] = os.path.basename(file_path)
                    df['Week_Folder'] = folder_name
                    all_ltl_data.append(df)
                    print(f"✓ Extracted {len(df)} LTL records from {folder_name}")
            except ValueError as e:
                # LTL sheet might not exist in this file
                print(f"⚠ No LTL sheet in {folder_name}: {e}")
                
        except Exception as e:
            print(f"✗ Error processing {file_path}: {e}")
    
    # Combine all data
    if all_ltl_data:
        combined_df = pd.concat(all_ltl_data, ignore_index=True)
        
        # Save combined data
        output_file = "/Users/keelandimick/combined_ltl_fees.xlsx"
        with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
            combined_df.to_excel(writer, sheet_name='All_LTL_Data', index=False)
            
            # Create summary sheet
            summary_data = create_summary(combined_df)
            summary_data.to_excel(writer, sheet_name='Summary', index=False)
        
        print(f"\n✓ Combined data saved to: {output_file}")
        print(f"Total LTL records: {len(combined_df)}")
        
        # Display summary statistics
        print("\nSummary Statistics:")
        print(f"\nColumns in combined data: {combined_df.columns.tolist()}")
        print_summary_stats(combined_df)
        
    else:
        print("\n✗ No LTL data found in any files")

def create_summary(df):
    """Create summary statistics from the combined LTL data"""
    summary = {}
    
    # Find columns that might contain cost/fee information
    cost_columns = [col for col in df.columns if isinstance(col, str) and any(keyword in col.lower() 
                   for keyword in ['cost', 'fee', 'charge', 'amount', 'price', 'total'])]
    
    if cost_columns:
        print(f"\nFound cost-related columns: {cost_columns}")
        
        for col in cost_columns:
            if pd.api.types.is_numeric_dtype(df[col]):
                summary[f"{col}_Average"] = [df[col].mean()]
                summary[f"{col}_Total"] = [df[col].sum()]
                summary[f"{col}_Min"] = [df[col].min()]
                summary[f"{col}_Max"] = [df[col].max()]
    
    summary['Total_Records'] = [len(df)]
    summary['Unique_Weeks'] = [df['Week_Folder'].nunique()]
    
    return pd.DataFrame(summary)

def print_summary_stats(df):
    """Print summary statistics for numeric columns"""
    # Look for the Total Charges column
    total_charges_col = None
    for col in df.columns:
        if isinstance(col, str) and 'total' in col.lower() and 'charge' in col.lower():
            total_charges_col = col
            break
    
    if total_charges_col:
        # Convert to numeric, handling any non-numeric values
        df[total_charges_col] = pd.to_numeric(df[total_charges_col], errors='coerce')
        
        print(f"\nLTL Fee Statistics (from '{total_charges_col}' column):")
        print(f"  Average LTL Cost: ${df[total_charges_col].mean():,.2f}")
        print(f"  Total LTL Costs: ${df[total_charges_col].sum():,.2f}")
        print(f"  Minimum LTL Cost: ${df[total_charges_col].min():,.2f}")
        print(f"  Maximum LTL Cost: ${df[total_charges_col].max():,.2f}")
        print(f"  Number of LTL Shipments: {df[total_charges_col].notna().sum()}")
        print(f"  Standard Deviation: ${df[total_charges_col].std():,.2f}")
    else:
        print("\nNo 'Total Charges' column found. Showing all numeric columns:")
        numeric_columns = df.select_dtypes(include=['float64', 'int64']).columns
        
        for col in numeric_columns:
            if col not in ['Source_File', 'Week_Folder'] and df[col].notna().any():
                print(f"\n{col}:")
                print(f"  Average: ${df[col].mean():,.2f}")
                print(f"  Total: ${df[col].sum():,.2f}")
                print(f"  Min: ${df[col].min():,.2f}")
                print(f"  Max: ${df[col].max():,.2f}")
                print(f"  Count: {df[col].notna().sum()}")

if __name__ == "__main__":
    print("LTL Fee Extraction Script")
    print("=" * 50)
    extract_ltl_data()