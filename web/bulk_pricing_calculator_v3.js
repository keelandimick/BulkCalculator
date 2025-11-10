// Helper function to format currency with commas
function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Furniture type categories
const furnitureTypes = {
    'Living': ['Benches', 'Coffee Tables', 'Console Tables', 'Side Tables'],
    'Working': ['Accessories', 'Desks', 'Shelves'],
    'Dining': ['Chairs', 'Dining Tables'],
    'Other': ['Tabletops']
};

// Product categories with alphabetically sorted items
const productCategories = {
    'Accessories': ['DRAWER', 'KEYBOARD-TRAY', 'MONITOR-STAND-BK', 'MONITOR-STAND-WT', 'WHEELS'].sort(),
    'Benches': ['B-DN-46X14', 'B-DN-58X14', 'B-U-46X14', 'B-U-58X14'].sort(),
    'Chairs': ['CHAIR-WARMS', 'CHAIR-WOARMS'].sort(),
    'Coffee Tables': ['CF-SP-42X42', 'CF-U-36X22', 'CF-U-36X22-2C-TABLE', 'CF-U-36X22-C-TABLE', 'CF-U-36X22-DRAWER', 
                     'CF-U-46X24', 'CF-U-46X24-2C-TABLE', 'CF-U-46X24-C-TABLE', 'CF-U-46X24-DRAWER', 
                     'CF-U-58X28', 'CF-U-58X28-2C-TABLE', 'CF-U-58X28-C-TABLE', 'CF-U-58X28-DRAWER'].sort(),
    'Console Tables': ['CN-U-46X14', 'CN-U-46X14-DRAWER', 'CN-U-58X14', 'CN-U-58X14-DRAWER'].sort(),
    'Desks': ['D-HP-36X22', 'D-HP-36X22-DRAWER', 'D-HP-36X22-KEYBOARD-TRAY', 
             'D-HP-46X24', 'D-HP-46X24-DRAWER', 'D-HP-46X24-KEYBOARD-TRAY',
             'D-HP-58X28', 'D-HP-58X28-DRAWER', 'D-HP-58X28-KEYBOARD-TRAY',
             'D-SSB-46X24', 'D-SSB-46X24-DRAWER', 'D-SSB-46X24-KEYBOARD-TRAY', 
             'D-SSB-58X28', 'D-SSB-58X28-DRAWER', 'D-SSB-58X28-KEYBOARD-TRAY',
             'D-SSW-46X24', 'D-SSW-46X24-DRAWER', 'D-SSW-46X24-KEYBOARD-TRAY', 
             'D-SSW-58X28', 'D-SSW-58X28-DRAWER', 'D-SSW-58X28-KEYBOARD-TRAY',
             'D-U-36X22', 'D-U-36X22-DRAWER', 'D-U-36X22-KEYBOARD-TRAY', 
             'D-U-46X24', 'D-U-46X24-DRAWER', 'D-U-46X24-KEYBOARD-TRAY',
             'D-U-58X28', 'D-U-58X28-DRAWER', 'D-U-58X28-KEYBOARD-TRAY'].sort(),
    'Dining Tables': ['DN-U-48X36', 'DN-U-60X36', 'DN-U-60X36-2B-DN-46X14', 'DN-U-60X36-B-DN-46X14', 
                     'DN-U-72X36', 'DN-U-72X36-2B-DN-58X14', 'DN-U-72X36-B-DN-58X14'].sort(),
    'Shelves': ['18X7-SHELF', '30X7-SHELF', '42X8-SHELF', '54X8-SHELF'].sort(),
    'Side Tables': ['C-TABLE', 'END-TABLE', 'END-X-TABLE'].sort(),
    'Tabletops': ['36X22', '42X42', '46X14', '46X24', '58X14', '58X28'].sort()
};

// Product catalog with names
const productCatalog = {
    // Tabletops
    '36X22': { name: '36X22 Tabletop', retailPrice: 179.99, productCost: 92.33, smallParcelShipping: 30.00, description: 'Compact 36" x 22" solid wood tabletop perfect for small desks, side tables, or custom furniture projects. Features a durable finish and pre-drilled mounting points for easy leg attachment.' },
    '42X42': { name: '42X42 Tabletop', retailPrice: 449.99, productCost: 282.87, smallParcelShipping: 65.00, description: 'Large round 42" diameter tabletop ideal for dining tables, game tables, or collaborative workspaces. The circular design promotes conversation and offers equal access from all sides.' },
    '46X14': { name: '46X14 Tabletop', retailPrice: 149.99, productCost: 78.50, smallParcelShipping: 25.00, description: 'Narrow 46" x 14" tabletop designed for console tables, floating shelves, or bench tops. Its slim profile makes it perfect for hallways, entryways, or behind sofas.' },
    '46X24': { name: '46X24 Tabletop', retailPrice: 239.99, productCost: 128.12, smallParcelShipping: 40.00, description: 'Versatile 46" x 24" tabletop suitable for desks, coffee tables, or custom furniture builds. Offers an ideal balance of workspace and compact footprint for home offices or living areas.' },
    '58X14': { name: '58X14 Tabletop', retailPrice: 209.99, productCost: 110.50, smallParcelShipping: 35.00, description: 'Extra-long 58" x 14" narrow tabletop perfect for console tables, display shelves, or custom bench projects. The extended length provides maximum surface area while maintaining a space-saving profile.' },
    '58X28': { name: '58X28 Tabletop', retailPrice: 359.99, productCost: 198.45, smallParcelShipping: 60.00, description: 'Spacious 58" x 28" tabletop offering generous workspace for executive desks, large dining tables, or conference tables. Premium solid wood construction ensures durability and professional appearance.' },
    
    // Shelves
    '18X7-SHELF': { name: '18X7 Shelf', retailPrice: 59.99, productCost: 35.48, smallParcelShipping: 12.00, description: 'Compact 18" x 7" wall-mounted shelf perfect for displaying small items, books, or decor. Easy to install with invisible mounting hardware included for a clean, floating appearance.' },
    '30X7-SHELF': { name: '30X7 Shelf', retailPrice: 89.99, productCost: 55.67, smallParcelShipping: 20.00, description: 'Medium 30" x 7" floating shelf ideal for living rooms, bedrooms, or offices. Provides ample display space while maintaining a minimalist aesthetic with hidden bracket system.' },
    '42X8-SHELF': { name: '42X8 Shelf', retailPrice: 119.99, productCost: 76.92, smallParcelShipping: 25.00, description: 'Large 42" x 8" wall shelf offering generous storage and display space. The wider depth accommodates larger items, books, and decorative pieces with sturdy weight capacity.' },
    '54X8-SHELF': { name: '54X8 Shelf', retailPrice: 119.99, productCost: 96.42, smallParcelShipping: 25.00, description: 'Extra-long 54" x 8" floating shelf perfect for creating gallery walls or maximizing wall storage. Premium construction supports heavy items while maintaining a sleek, modern profile.' },
    
    // Benches
    'B-DN-46X14': { name: 'Bench DN 46X14', retailPrice: 239.99, productCost: 121.44, smallParcelShipping: 40.00, description: 'Classic 46" dining-height bench with sturdy dowel legs perfect for dining tables or entryways. Seats 2-3 people comfortably and pairs beautifully with matching dining tables.' },
    'B-DN-58X14': { name: 'Bench DN 58X14', retailPrice: 299.99, productCost: 161.23, smallParcelShipping: 65.00, description: 'Extended 58" dining-height bench ideal for larger families or commercial settings. The longer length accommodates 3-4 people while maintaining stability with reinforced dowel leg construction.' },
    'B-U-46X14': { name: 'Bench U 46X14', retailPrice: 239.99, productCost: 121.44, smallParcelShipping: 40.00, description: 'Modern 46" bench featuring sleek U-shaped metal legs for contemporary spaces. Perfect for dining rooms, entryways, or bedroom foot-of-bed placement with versatile styling.' },
    'B-U-58X14': { name: 'Bench U 58X14', retailPrice: 299.99, productCost: 161.23, smallParcelShipping: 65.00, description: 'Spacious 58" bench with minimalist U-frame design offering seating for 3-4 people. The industrial-modern aesthetic complements both residential and commercial interiors.' },
    
    // Side Tables
    'C-TABLE': { name: 'C Table', retailPrice: 149.99, productCost: 89.39, smallParcelShipping: 30.00, description: 'Innovative C-shaped side table that slides under sofas and beds for convenient surface access. Perfect for laptops, drinks, or snacks with a space-saving cantilever design.' },
    'END-TABLE': { name: 'End Table', retailPrice: 119.99, productCost: 69.73, smallParcelShipping: 25.00, description: 'Classic end table perfect for living room or bedroom use. Features a compact footprint with ample surface area for lamps, books, and personal items.' },
    'END-X-TABLE': { name: 'End X Table', retailPrice: 209.99, productCost: 122.56, smallParcelShipping: 40.00, description: 'Distinctive X-frame end table combining style and stability. The architectural base adds visual interest while providing a sturdy platform for lamps and decor.' },
    
    // Coffee Tables
    'CF-SP-42X42': { name: 'Coffee SP 42X42', retailPrice: 479.99, productCost: 303.56, smallParcelShipping: 85.00, description: 'Statement 42" square coffee table featuring split-panel design for visual interest. The generous surface area and unique aesthetic make it a perfect centerpiece for modern living rooms.' },
    'CF-U-36X22': { name: 'Coffee U 36X22', retailPrice: 269.99, productCost: 146.17, smallParcelShipping: 40.00, description: 'Compact 36" x 22" coffee table with sleek U-frame legs ideal for smaller living spaces. The minimalist design provides functionality without overwhelming the room.' },
    'CF-U-36X22-2C-TABLE': { name: 'Coffee U 36X22 2 C-Tables', retailPrice: 599.99, productCost: 370.95, smallParcelShipping: 100.00, description: 'Versatile set including a 36" x 22" coffee table with two matching C-tables that nest underneath. Perfect for flexible entertaining and maximizing functionality in modern living spaces.' },
    'CF-U-36X22-C-TABLE': { name: 'Coffee U 36X22 C-Table', retailPrice: 449.99, productCost: 258.57, smallParcelShipping: 70.00, description: 'Space-saving 36" x 22" coffee table with integrated C-table that slides out for additional surface area. Ideal for apartments or rooms where flexibility is essential.' },
    'CF-U-36X22-DRAWER': { name: 'Coffee U 36X22 Drawer', retailPrice: 389.99, productCost: 200.59, smallParcelShipping: 60.00, description: 'Functional 36" x 22" coffee table featuring a built-in drawer for hidden storage. Perfect for keeping remotes, magazines, and living room essentials organized and accessible.' },
    'CF-U-46X24': { name: 'Coffee U 46X24', retailPrice: 329.99, productCost: 175.84, smallParcelShipping: 45.00, description: 'Mid-size 46" x 24" coffee table with modern U-frame design offering ample surface area. The perfect balance of style and functionality for medium to large living rooms.' },
    'CF-U-46X24-2C-TABLE': { name: 'Coffee U 46X24 2 C-Tables', retailPrice: 659.99, productCost: 400.63, smallParcelShipping: 105.00, description: 'Premium set featuring a 46" x 24" coffee table with two nesting C-tables for ultimate versatility. Create multiple surface levels for entertaining or everyday convenience.' },
    'CF-U-46X24-C-TABLE': { name: 'Coffee U 46X24 C-Table', retailPrice: 509.99, productCost: 288.24, smallParcelShipping: 75.00, description: 'Innovative 46" x 24" coffee table with integrated pull-out C-table for extended functionality. The dual-surface design adapts to your needs while maintaining a cohesive look.' },
    'CF-U-46X24-DRAWER': { name: 'Coffee U 46X24 Drawer', retailPrice: 449.99, productCost: 230.27, smallParcelShipping: 65.00, description: 'Stylish 46" x 24" coffee table with integrated storage drawer for a clutter-free living space. The concealed compartment keeps essentials handy while maintaining clean lines.' },
    'CF-U-58X28': { name: 'Coffee U 58X28', retailPrice: 479.99, productCost: 240.96, smallParcelShipping: 70.00, description: 'Large 58" x 28" coffee table perfect for spacious living rooms or open floor plans. The expansive surface accommodates decorative displays, books, and entertaining essentials.' },
    'CF-U-58X28-2C-TABLE': { name: 'Coffee U 58X28 2 C-Tables', retailPrice: 779.99, productCost: 465.75, smallParcelShipping: 130.00, description: 'Luxury set combining a substantial 58" x 28" coffee table with two versatile C-tables. Perfect for large gatherings with flexible surface options that tuck away when not needed.' },
    'CF-U-58X28-C-TABLE': { name: 'Coffee U 58X28 C-Table', retailPrice: 629.99, productCost: 353.36, smallParcelShipping: 100.00, description: 'Executive-size 58" x 28" coffee table with integrated C-table extension for added functionality. The sophisticated design suits both residential and commercial settings.' },
    'CF-U-58X28-DRAWER': { name: 'Coffee U 58X28 Drawer', retailPrice: 569.99, productCost: 295.39, smallParcelShipping: 90.00, description: 'Premium 58" x 28" coffee table featuring a spacious drawer for organized storage. The generous proportions and hidden compartment make it ideal for busy family rooms.' },
    
    // Chairs
    'CHAIR-WARMS': { name: 'Chair with Arms', retailPrice: 419.99, productCost: 264.12, smallParcelShipping: 90.00, description: 'Ergonomic dining chair with comfortable armrests for extended seating comfort. The solid wood construction and contoured design provide excellent support for dining or desk use.' },
    'CHAIR-WOARMS': { name: 'Chair without Arms', retailPrice: 239.99, productCost: 146.67, smallParcelShipping: 50.00, description: 'Streamlined armless dining chair perfect for maximizing seating around tables. The space-saving design allows for easy storage while maintaining comfort and style.' },
    
    // Console Tables
    'CN-U-46X14': { name: 'Console U 46X14', retailPrice: 239.99, productCost: 130.34, smallParcelShipping: 40.00, description: 'Sleek 46" x 14" console table with modern U-frame legs perfect for entryways or behind sofas. The narrow profile maximizes floor space while providing display and storage surface.' },
    'CN-U-46X14-DRAWER': { name: 'Console U 46X14 Drawer', retailPrice: 359.99, productCost: 184.77, smallParcelShipping: 60.00, description: 'Functional 46" x 14" console table featuring a discrete drawer for storing keys, mail, and essentials. Ideal for organized entryways or as a stylish hallway accent piece.' },
    'CN-U-58X14': { name: 'Console U 58X14', retailPrice: 329.99, productCost: 170.13, smallParcelShipping: 65.00, description: 'Extended 58" x 14" console table offering generous display space for decorative items. The longer length makes it perfect for larger entryways or as a room divider in open spaces.' },
    'CN-U-58X14-DRAWER': { name: 'Console U 58X14 Drawer', retailPrice: 419.99, productCost: 224.56, smallParcelShipping: 85.00, description: 'Premium 58" x 14" console table with integrated storage drawer for maximum functionality. Combines elegant styling with practical storage for sophisticated interiors.' },
    
    // Desks
    'D-HP-36X22': { name: 'Desk HP 36X22', retailPrice: 269.99, productCost: 146.17, smallParcelShipping: 40.00, description: 'Compact 36" x 22" desk with hairpin legs perfect for small home offices or student rooms. The minimalist design maximizes legroom while providing essential workspace for laptops and accessories.' },
    'D-HP-36X22-DRAWER': { name: 'Desk HP 36X22 Drawer', retailPrice: 389.99, productCost: 200.59, smallParcelShipping: 60.00, description: 'Space-efficient 36" x 22" desk with hairpin legs and built-in drawer for organized storage. Ideal for keeping office supplies accessible while maintaining a clean, modern aesthetic.' },
    'D-HP-36X22-KEYBOARD-TRAY': { name: 'Desk HP 36X22 Keyboard Tray', retailPrice: 389.99, productCost: 222.38, smallParcelShipping: 65.00, description: 'Ergonomic 36" x 22" desk featuring hairpin legs and pull-out keyboard tray for proper typing position. Perfect for computer workstations in compact spaces.' },
    'D-HP-46X24': { name: 'Desk HP 46X24', retailPrice: 329.99, productCost: 175.84, smallParcelShipping: 45.00, description: 'Versatile 46" x 24" desk with stylish hairpin legs suitable for home offices or creative spaces. The medium size offers ample workspace while maintaining a light, airy appearance.' },
    'D-HP-46X24-DRAWER': { name: 'Desk HP 46X24 Drawer', retailPrice: 449.99, productCost: 230.27, smallParcelShipping: 65.00, description: 'Functional 46" x 24" desk combining hairpin leg style with practical drawer storage. Perfect for professionals who need both workspace and organization in a modern package.' },
    'D-HP-46X24-KEYBOARD-TRAY': { name: 'Desk HP 46X24 Keyboard Tray', retailPrice: 449.99, productCost: 252.05, smallParcelShipping: 70.00, description: 'Comfortable 46" x 24" workstation with hairpin legs and ergonomic keyboard tray. Reduces wrist strain while providing generous desk surface for monitors and accessories.' },
    'D-HP-58X28': { name: 'Desk HP 58X28', retailPrice: 449.99, productCost: 240.96, smallParcelShipping: 70.00, description: 'Spacious 58" x 28" executive desk with elegant hairpin legs for serious work environments. The generous surface accommodates multiple monitors, documents, and professional equipment.' },
    'D-HP-58X28-DRAWER': { name: 'Desk HP 58X28 Drawer', retailPrice: 569.99, productCost: 295.39, smallParcelShipping: 90.00, description: 'Premium 58" x 28" desk featuring hairpin legs and integrated drawer for executive offices. Combines sophisticated style with practical storage for a complete workspace solution.' },
    'D-HP-58X28-KEYBOARD-TRAY': { name: 'Desk HP 58X28 Keyboard Tray', retailPrice: 569.99, productCost: 317.17, smallParcelShipping: 95.00, description: 'Professional 58" x 28" desk with hairpin legs and full-size keyboard tray for ergonomic computing. Ideal for long work sessions with proper positioning and ample surface space.' },
    'D-SSB-46X24': { name: 'Desk SSB 46X24', retailPrice: 479.99, productCost: 251.75, smallParcelShipping: 70.00, description: 'Height-adjustable 46" x 24" sit-stand desk in sleek black finish for healthier work habits. Easily transition between sitting and standing throughout the day to improve posture and energy.' },
    'D-SSB-46X24-DRAWER': { name: 'Desk SSB 46X24 Drawer', retailPrice: 569.99, productCost: 306.17, smallParcelShipping: 90.00, description: 'Ergonomic 46" x 24" sit-stand desk in black with convenient drawer storage. Combines the health benefits of standing with organized workspace for optimal productivity.' },
    'D-SSB-46X24-KEYBOARD-TRAY': { name: 'Desk SSB 46X24 Keyboard Tray', retailPrice: 569.99, productCost: 327.96, smallParcelShipping: 95.00, description: 'Advanced 46" x 24" sit-stand desk in black featuring adjustable keyboard tray. Maintains proper ergonomics whether sitting or standing for all-day comfort.' },
    'D-SSB-58X28': { name: 'Desk SSB 58X28', retailPrice: 599.99, productCost: 316.86, smallParcelShipping: 95.00, description: 'Large 58" x 28" height-adjustable sit-stand desk in professional black finish. The expansive surface accommodates multiple monitors and equipment for dynamic workstations.' },
    'D-SSB-58X28-DRAWER': { name: 'Desk SSB 58X28 Drawer', retailPrice: 689.99, productCost: 371.29, smallParcelShipping: 115.00, description: 'Premium 58" x 28" sit-stand desk in black with integrated storage drawer. Perfect for executives who want health benefits without sacrificing organization or style.' },
    'D-SSB-58X28-KEYBOARD-TRAY': { name: 'Desk SSB 58X28 Keyboard Tray', retailPrice: 689.99, productCost: 393.07, smallParcelShipping: 120.00, description: 'Top-tier 58" x 28" sit-stand desk in black with full ergonomic keyboard support. The complete solution for professionals spending long hours at their workstation.' },
    'D-SSW-46X24': { name: 'Desk SSW 46X24', retailPrice: 479.99, productCost: 251.75, smallParcelShipping: 70.00, description: 'Modern 46" x 24" sit-stand desk in crisp white finish for bright, contemporary offices. Promotes wellness with smooth height adjustment for alternating work positions.' },
    'D-SSW-46X24-DRAWER': { name: 'Desk SSW 46X24 Drawer', retailPrice: 569.99, productCost: 306.17, smallParcelShipping: 90.00, description: 'Stylish 46" x 24" sit-stand desk in white with built-in drawer organization. Combines health-conscious design with practical storage in a clean aesthetic.' },
    'D-SSW-46X24-KEYBOARD-TRAY': { name: 'Desk SSW 46X24 Keyboard Tray', retailPrice: 569.99, productCost: 327.96, smallParcelShipping: 95.00, description: 'Functional 46" x 24" sit-stand desk in white with ergonomic keyboard positioning. Ensures proper alignment for typing comfort in both sitting and standing positions.' },
    'D-SSW-58X28': { name: 'Desk SSW 58X28', retailPrice: 599.99, productCost: 316.86, smallParcelShipping: 95.00, description: 'Spacious 58" x 28" height-adjustable sit-stand desk in bright white finish. Creates an energizing workspace that adapts to your needs throughout the workday.' },
    'D-SSW-58X28-DRAWER': { name: 'Desk SSW 58X28 Drawer', retailPrice: 689.99, productCost: 371.29, smallParcelShipping: 115.00, description: 'Executive 58" x 28" sit-stand desk in white with premium drawer storage. The perfect blend of wellness features and organizational capability for modern professionals.' },
    'D-SSW-58X28-KEYBOARD-TRAY': { name: 'Desk SSW 58X28 Keyboard Tray', retailPrice: 689.99, productCost: 393.07, smallParcelShipping: 120.00, description: 'Complete 58" x 28" sit-stand workstation in white with adjustable keyboard support. Maximizes ergonomic benefits for intensive computer work in any position.' },
    'D-U-36X22': { name: 'Desk U 36X22', retailPrice: 299.99, productCost: 164.71, smallParcelShipping: 50.00, description: 'Compact 36" x 22" desk with modern U-frame legs ideal for small spaces. The minimalist design provides essential workspace without overwhelming your room.' },
    'D-U-36X22-DRAWER': { name: 'Desk U 36X22 Drawer', retailPrice: 419.99, productCost: 219.13, smallParcelShipping: 70.00, description: 'Space-saving 36" x 22" desk with U-frame legs and handy drawer storage. Perfect for home offices where every inch counts but organization is essential.' },
    'D-U-36X22-KEYBOARD-TRAY': { name: 'Desk U 36X22 Keyboard Tray', retailPrice: 419.99, productCost: 240.92, smallParcelShipping: 75.00, description: 'Ergonomic 36" x 22" desk featuring U-frame support and pull-out keyboard tray. Maximizes comfort and usable surface area in compact workspaces.' },
    'D-U-46X24': { name: 'Desk U 46X24', retailPrice: 359.99, productCost: 194.38, smallParcelShipping: 55.00, description: 'Versatile 46" x 24" desk with sleek U-frame design for modern home offices. Offers generous workspace while maintaining clean lines and open aesthetics.' },
    'D-U-46X24-DRAWER': { name: 'Desk U 46X24 Drawer', retailPrice: 449.99, productCost: 248.81, smallParcelShipping: 75.00, description: 'Functional 46" x 24" desk combining U-frame stability with integrated drawer storage. Keeps supplies organized while preserving the minimalist design aesthetic.' },
    'D-U-46X24-KEYBOARD-TRAY': { name: 'Desk U 46X24 Keyboard Tray', retailPrice: 449.99, productCost: 270.59, smallParcelShipping: 80.00, description: 'Comfortable 46" x 24" workstation with U-frame legs and ergonomic keyboard support. Creates an efficient workspace that promotes proper posture and productivity.' },
    'D-U-58X28': { name: 'Desk U 58X28', retailPrice: 479.99, productCost: 259.50, smallParcelShipping: 80.00, description: 'Executive 58" x 28" desk with contemporary U-frame design for professional spaces. The substantial surface accommodates multiple monitors and work materials with style.' },
    'D-U-58X28-DRAWER': { name: 'Desk U 58X28 Drawer', retailPrice: 569.99, productCost: 313.93, smallParcelShipping: 100.00, description: 'Premium 58" x 28" desk featuring U-frame construction and spacious drawer storage. Perfect for executives who demand both form and function in their workspace.' },
    'D-U-58X28-KEYBOARD-TRAY': { name: 'Desk U 58X28 Keyboard Tray', retailPrice: 569.99, productCost: 335.71, smallParcelShipping: 105.00, description: 'Professional 58" x 28" desk with U-frame support and full-size keyboard tray. Delivers maximum comfort and efficiency for intensive computer-based work.' },
    
    // Dining Tables
    'DN-U-48X36': { name: 'Dining U 48X36', retailPrice: 539.99, productCost: 283.56, smallParcelShipping: 80.00, description: 'Intimate 48" x 36" dining table with elegantly angled legs perfect for small families or breakfast nooks. Comfortably seats 4 people while maintaining a space-efficient footprint.' },
    'DN-U-60X36': { name: 'Dining U 60X36', retailPrice: 599.99, productCost: 323.71, smallParcelShipping: 85.00, description: 'Versatile 60" x 36" dining table with sleek angled legs accommodating 6 people comfortably. The ideal size for family meals and entertaining in medium-sized dining rooms.' },
    'DN-U-60X36-2B-DN-46X14': { name: 'Dining U 60X36 2 Benches DN 46X14', retailPrice: 1049.99, productCost: 566.59, smallParcelShipping: 165.00, description: 'Complete dining set featuring a 60" x 36" table with two matching 46" benches. This space-saving combination seats 6 people while offering flexible seating arrangements.' },
    'DN-U-60X36-B-DN-46X14': { name: 'Dining U 60X36 Bench DN 46X14', retailPrice: 839.99, productCost: 445.15, smallParcelShipping: 125.00, description: 'Practical dining set combining a 60" x 36" table with one 46" bench. Perfect for creating a casual dining atmosphere with mixed seating options.' },
    'DN-U-72X36': { name: 'Dining U 72X36', retailPrice: 659.99, productCost: 362.02, smallParcelShipping: 90.00, description: 'Spacious 72" x 36" dining table with contemporary angled legs for larger gatherings. Comfortably seats 8 people, making it perfect for family celebrations and dinner parties.' },
    'DN-U-72X36-2B-DN-58X14': { name: 'Dining U 72X36 2 Benches DN 58X14', retailPrice: 1259.99, productCost: 684.48, smallParcelShipping: 220.00, description: 'Grand dining set featuring a 72" x 36" table with two 58" benches for maximum seating. This complete solution accommodates 8 people with a cohesive, modern aesthetic.' },
    'DN-U-72X36-B-DN-58X14': { name: 'Dining U 72X36 Bench DN 58X14', retailPrice: 959.99, productCost: 523.25, smallParcelShipping: 155.00, description: 'Flexible dining combination with a 72" x 36" table and one 58" bench. Ideal for mixing bench and chair seating to create a dynamic dining environment.' },
    
    // Accessories
    'KEYBOARD-TRAY': { name: 'Keyboard Tray', retailPrice: 119.99, productCost: 76.21, smallParcelShipping: 25.00, description: 'Adjustable keyboard tray attachment that mounts under any desk for ergonomic typing position. Features smooth glide mechanism and ample space for keyboard and mouse.' },
    'MONITOR-STAND-BK': { name: 'Monitor Stand Black', retailPrice: 119.99, productCost: 65.33, smallParcelShipping: 20.00, description: 'Sleek black monitor stand that elevates screens to eye level for improved posture. The elevated design creates valuable storage space underneath for desk organization.' },
    'MONITOR-STAND-WT': { name: 'Monitor Stand White', retailPrice: 119.99, productCost: 65.33, smallParcelShipping: 20.00, description: 'Modern white monitor stand designed to reduce neck strain by positioning screens at optimal height. Includes cable management features for a clean workspace.' },
    'WHEELS': { name: 'Wheels', retailPrice: 29.99, productCost: 17.56, smallParcelShipping: 7.00, description: 'Set of 4 heavy-duty locking caster wheels that attach to any furniture piece for easy mobility. Perfect for creating mobile workstations or flexible room arrangements.' },
    'DRAWER': { name: 'Drawer', retailPrice: 119.99, productCost: 54.43, smallParcelShipping: 20.00, description: 'Universal drawer attachment that adds convenient storage to any desk or table. Features smooth ball-bearing slides and ample compartment space for office essentials.' }
};

// Component data with actual volumes from pallet data and weights
const componentData = {
    // Top/surface components
    '46X14': { unitsPerPallet: 36, volume: 38530, palletVolume: 1387094, weight: 20.2 },
    '58X14': { unitsPerPallet: 36, volume: 47935, palletVolume: 1725676, weight: 26.7 },
    '36X22': { unitsPerPallet: 36, volume: 45251, palletVolume: 1629029, weight: 26.65 },
    '46X24': { unitsPerPallet: 18, volume: 61380, palletVolume: 1104837, weight: 35.75 },
    '58X28': { unitsPerPallet: 18, volume: 90376, palletVolume: 1626768, weight: 54 },
    '42X42': { unitsPerPallet: 18, volume: 97606, palletVolume: 1756909, weight: 52.8 },
    '48X36': { unitsPerPallet: 18, volume: 91936, palletVolume: 1654853, weight: 57.6 },
    '60X36': { unitsPerPallet: 18, volume: 113365, palletVolume: 2040570, weight: 78 },
    '72X36': { unitsPerPallet: 18, volume: 133066, palletVolume: 2395181, weight: 80 },
    
    // Leg/base components
    'B-U': { unitsPerPallet: 63, volume: 27863, palletVolume: 1755400, weight: 12.31 },
    'CF-U': { unitsPerPallet: 42, volume: 45139, palletVolume: 1895832, weight: 16.91 },
    'CN-U': { unitsPerPallet: 42, volume: 43843, palletVolume: 1841400, weight: 14.67 },
    'D-HP': { unitsPerPallet: 36, volume: 62766, palletVolume: 2259564, weight: 24 },
    'D-SSB': { unitsPerPallet: 21, volume: 75900, palletVolume: 1593900, weight: 49 },
    'D-SSW': { unitsPerPallet: 21, volume: 75900, palletVolume: 1593900, weight: 48 },
    'D-U': { unitsPerPallet: 28, volume: 77005, palletVolume: 2156129, weight: 21.67 },
    'B-DN': { unitsPerPallet: 63, volume: 28487, palletVolume: 1794700, weight: 10.925 },
    'DN-U': { unitsPerPallet: 14, volume: 118162, palletVolume: 1654268, weight: 31.4 },
    
    // Complete products and accessories
    'C-TABLE': { unitsPerPallet: 12, volume: 144040, palletVolume: 1728480, weight: 14.575 },
    'DRAWER': { unitsPerPallet: 54, volume: 37945, palletVolume: 2049024, weight: 8.74 },
    'END-TABLE': { unitsPerPallet: 60, volume: 30470, palletVolume: 1828200, weight: 15.695 },
    'MONITOR-STAND-BK': { unitsPerPallet: 32, volume: 55082, palletVolume: 1762625, weight: 10.95 },
    
    // New components
    'CF-SP': { unitsPerPallet: 14, volume: 118162, palletVolume: 1654268, weight: 20.01 },
    'MONITOR-STAND-WT': { unitsPerPallet: 32, volume: 55082, palletVolume: 1762625, weight: 10.95 },
    'KEYBOARD-TRAY': { unitsPerPallet: 54, volume: 37522, palletVolume: 2026203, weight: 6.35 },
    'WHEELS': { unitsPerPallet: 400, volume: 3985, palletVolume: 1593900, weight: 0.67 },
    '18X7-SHELF': { unitsPerPallet: 96, volume: 16301, palletVolume: 1564875, weight: 2.76 },
    '30X7-SHELF': { unitsPerPallet: 60, volume: 24475, palletVolume: 1468500, weight: 4.14 },
    '42X8-SHELF': { unitsPerPallet: 48, volume: 35948, palletVolume: 1725500, weight: 6.09 },
    '54X8-SHELF': { unitsPerPallet: 18, volume: 91936, palletVolume: 1654853, weight: 15.57 },
    'CHAIR-WARMS': { unitsPerPallet: 1, volume: 259920, palletVolume: 259920, weight: 44.02 },
    'CHAIR-WOARMS': { unitsPerPallet: 1, volume: 196800, palletVolume: 196800, weight: 33.33 },
    'END-X-TABLE': { unitsPerPallet: 1, volume: 144755, palletVolume: 144755, weight: 24.51 }
};

// Average pallet volume for freight calculation (cubic cm)
const AVERAGE_PALLET_VOLUME = 1800000;

// Warehouse locations
const warehouses = {
    'UT': { zip: '84116', city: 'Salt Lake City', state: 'UT', lat: 40.7608, lng: -111.8910 },
    'TN': { zip: '37874', city: 'Sweetwater', state: 'TN', lat: 35.6012, lng: -84.4611 }
};

// Map SKUs to their components
const skuComponents = {
    // Tabletops (single component)
    '36X22': ['36X22'],
    '42X42': ['42X42'],
    '46X14': ['46X14'],
    '46X24': ['46X24'],
    '58X14': ['58X14'],
    '58X28': ['58X28'],
    
    'B-DN-46X14': ['B-DN', '46X14'],
    'B-DN-58X14': ['B-DN', '58X14'],
    'C-TABLE': ['C-TABLE'],
    'CF-U-36X22': ['CF-U', '36X22'],
    'CF-U-36X22-DRAWER': ['CF-U', '36X22', 'DRAWER'],
    'CF-U-46X24': ['CF-U', '46X24'],
    'CF-U-46X24-DRAWER': ['CF-U', '46X24', 'DRAWER'],
    'CF-U-58X28': ['CF-U', '58X28'],
    'CF-U-58X28-DRAWER': ['CF-U', '58X28', 'DRAWER'],
    'CN-U-46X14': ['CN-U', '46X14'],
    'CN-U-58X14': ['CN-U', '58X14'],
    'D-HP-36X22': ['D-HP', '36X22'],
    'D-HP-36X22-DRAWER': ['D-HP', '36X22', 'DRAWER'],
    'D-HP-46X24': ['D-HP', '46X24'],
    'D-HP-46X24-DRAWER': ['D-HP', '46X24', 'DRAWER'],
    'D-HP-58X28': ['D-HP', '58X28'],
    'D-HP-58X28-DRAWER': ['D-HP', '58X28', 'DRAWER'],
    'D-SSB-46X24': ['D-SSB', '46X24'],
    'D-SSB-46X24-DRAWER': ['D-SSB', '46X24', 'DRAWER'],
    'D-SSB-58X28': ['D-SSB', '58X28'],
    'D-SSB-58X28-DRAWER': ['D-SSB', '58X28', 'DRAWER'],
    'D-SSW-46X24': ['D-SSW', '46X24'],
    'D-SSW-46X24-DRAWER': ['D-SSW', '46X24', 'DRAWER'],
    'D-SSW-58X28': ['D-SSW', '58X28'],
    'D-SSW-58X28-DRAWER': ['D-SSW', '58X28', 'DRAWER'],
    'D-U-36X22': ['D-U', '36X22'],
    'D-U-36X22-DRAWER': ['D-U', '36X22', 'DRAWER'],
    'D-U-46X24': ['D-U', '46X24'],
    'D-U-46X24-DRAWER': ['D-U', '46X24', 'DRAWER'],
    'D-U-58X28': ['D-U', '58X28'],
    'D-U-58X28-DRAWER': ['D-U', '58X28', 'DRAWER'],
    'DN-U-48X36': ['DN-U', '48X36'],
    'DN-U-60X36': ['DN-U', '60X36'],
    'DN-U-72X36': ['DN-U', '72X36'],
    'END-TABLE': ['END-TABLE'],
    'MONITOR-STAND-BK': ['MONITOR-STAND-BK'],
    
    // New SKUs
    'B-U': ['B-U'],
    'B-U-46X14': ['B-U', '46X14'],
    'B-U-58X14': ['B-U', '58X14'],
    'CF-SP-42X42': ['CF-SP', '42X42'],
    'CF-U-36X22-2C-TABLE': ['CF-U', '36X22', 'C-TABLE', 'C-TABLE'],
    'CF-U-36X22-C-TABLE': ['CF-U', '36X22', 'C-TABLE'],
    'CF-U-46X24-2C-TABLE': ['CF-U', '46X24', 'C-TABLE', 'C-TABLE'],
    'CF-U-46X24-C-TABLE': ['CF-U', '46X24', 'C-TABLE'],
    'CF-U-58X28-2C-TABLE': ['CF-U', '58X28', 'C-TABLE', 'C-TABLE'],
    'CF-U-58X28-C-TABLE': ['CF-U', '58X28', 'C-TABLE'],
    'CN-U-46X14-DRAWER': ['CN-U', '46X14', 'DRAWER'],
    'CN-U-58X14-DRAWER': ['CN-U', '58X14', 'DRAWER'],
    'D-HP-36X22-KEYBOARD-TRAY': ['D-HP', '36X22', 'KEYBOARD-TRAY'],
    'D-HP-46X24-KEYBOARD-TRAY': ['D-HP', '46X24', 'KEYBOARD-TRAY'],
    'D-HP-58X28-KEYBOARD-TRAY': ['D-HP', '58X28', 'KEYBOARD-TRAY'],
    'D-SSB-46X24-KEYBOARD-TRAY': ['D-SSB', '46X24', 'KEYBOARD-TRAY'],
    'D-SSB-58X28-KEYBOARD-TRAY': ['D-SSB', '58X28', 'KEYBOARD-TRAY'],
    'D-SSW-46X24-KEYBOARD-TRAY': ['D-SSW', '46X24', 'KEYBOARD-TRAY'],
    'D-SSW-58X28-KEYBOARD-TRAY': ['D-SSW', '58X28', 'KEYBOARD-TRAY'],
    'D-U-36X22-KEYBOARD-TRAY': ['D-U', '36X22', 'KEYBOARD-TRAY'],
    'D-U-46X24-KEYBOARD-TRAY': ['D-U', '46X24', 'KEYBOARD-TRAY'],
    'D-U-58X28-KEYBOARD-TRAY': ['D-U', '58X28', 'KEYBOARD-TRAY'],
    'DN-U-60X36-2B-DN-46X14': ['DN-U', '60X36', 'B-DN', 'B-DN', '46X14', '46X14'],
    'DN-U-60X36-B-DN-46X14': ['DN-U', '60X36', 'B-DN', '46X14'],
    'DN-U-72X36-2B-DN-58X14': ['DN-U', '72X36', 'B-DN', 'B-DN', '58X14', '58X14'],
    'DN-U-72X36-B-DN-58X14': ['DN-U', '72X36', 'B-DN', '58X14'],
    'END-X-TABLE': ['END-X-TABLE'],
    'MONITOR-STAND-WT': ['MONITOR-STAND-WT'],
    'KEYBOARD-TRAY': ['KEYBOARD-TRAY'],
    'WHEELS': ['WHEELS'],
    'DRAWER': ['DRAWER'],
    'CHAIR-WARMS': ['CHAIR-WARMS'],
    'CHAIR-WOARMS': ['CHAIR-WOARMS'],
    '18X7-SHELF': ['18X7-SHELF'],
    '30X7-SHELF': ['30X7-SHELF'],
    '42X8-SHELF': ['42X8-SHELF'],
    '54X8-SHELF': ['54X8-SHELF']
};

// Configuration
const config = {
    minFreightCost: 250,  // Minimum freight charge
    
    // Tiered pricing structure (discounts)
    pricingTiers: [
        { minQty: 1, maxQty: 10, discount: 10 },
        { minQty: 11, maxQty: 20, discount: 15 },
        { minQty: 21, maxQty: null, discount: 20 }
    ]
};

// Current product configuration
let productConfig = {};


// Calculate total weight for shipment
function calculateTotalWeight(sku, quantity) {
    const components = skuComponents[sku];
    if (!components) return 0;
    
    let totalWeight = 0;
    for (const component of components) {
        const componentInfo = componentData[component];
        if (componentInfo && componentInfo.weight) {
            totalWeight += componentInfo.weight * quantity;
        }
    }
    
    return totalWeight;
}

// Get closest warehouse based on zip code (simplified distance calculation)
function getClosestWarehouse(destinationZip) {
    // This is a simplified version - in production you'd use a proper geocoding API
    // For now, we'll use a basic zip code prefix approach
    // Eastern zips (0-5) go to TN, Western zips (6-9) go to UT
    const firstDigit = destinationZip.toString().charAt(0);
    
    // More accurate regional mapping
    const zipPrefix = destinationZip.toString().substring(0, 3);
    
    // TN warehouse serves: Eastern and Southern states
    // UT warehouse serves: Western and Northwestern states
    const tnRegions = [
        // Northeast
        '010', '011', '012', '013', '014', '015', '016', '017', '018', '019', // MA
        '020', '021', '022', '023', '024', '025', '026', '027', '028', '029', // MA/RI
        '030', '031', '032', '033', '034', '035', '036', '037', '038', '039', // NH
        '040', '041', '042', '043', '044', '045', '046', '047', '048', '049', // ME
        '050', '051', '052', '053', '054', '055', '056', '057', '058', '059', // VT
        // Mid-Atlantic
        '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', // NY
        '070', '071', '072', '073', '074', '075', '076', '077', '078', '079', '080', '081', '082', '083', '084', '085', '086', '087', '088', '089', // NJ
        '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '196', // PA
        // Southeast
        '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220', '221', // DC/MD/VA
        '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', // NC
        '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', // SC
        '300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', // GA
        '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', // FL
        '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365', '366', '367', '368', '369', // AL
        '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '380', '381', '382', '383', '384', '385', '386', '387', '388', '389', // TN
        '390', '391', '392', '393', '394', '395', '396', '397', '398', '399', // MS
        '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420', '421', '422', '423', '424', '425', '426', '427', // KY
        '430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459' // OH
    ];
    
    return tnRegions.includes(zipPrefix) ? 'TN' : 'UT';
}

// Fetch real-time freight quote
async function fetchFreightQuote(destinationZip) {
    if (!productConfig.sku || !destinationZip) {
        alert('Please select a product and enter a destination zip code');
        return;
    }
    
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    if (quantity === 0) {
        alert('Please enter a quantity');
        return;
    }
    
    // Show loading state
    const freightButton = document.getElementById('getFreightQuote');
    const originalText = freightButton.textContent;
    freightButton.textContent = 'Fetching quote...';
    freightButton.disabled = true;
    
    try {
        // Calculate shipment details
        const totalWeight = calculateTotalWeight(productConfig.sku, quantity);
        const { totalVolume, cubicFeet } = calculateFreightCost(productConfig.sku, quantity);
        
        // Get closest warehouse
        const warehouseKey = getClosestWarehouse(destinationZip);
        const warehouse = warehouses[warehouseKey];
        
        // Log freight request data for debugging
        console.log('Freight Quote Request:', {
            origin_zip: warehouse.zip,
            destination_zip: destinationZip,
            weight: Math.ceil(totalWeight),
            cubic_feet: Math.ceil(cubicFeet),
            freight_class: totalWeight < 150 ? '85' : '70',
            accessorials: ['LIFTGATE_DELIVERY', 'INSIDE_DELIVERY']
        });
        
        // Call our proxy server to avoid CORS issues
        // For production, deploy the proxy server and update this URL
        // For now, fallback to simulation if proxy not available
        const PROXY_URL = 'http://localhost:3001/api/freight-quote';
        
        let response;
        try {
            response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origin_zip: warehouse.zip,
                destination_zip: destinationZip,
                weight: Math.ceil(totalWeight),
                height: Math.ceil(cubicFeet * 12 / (48 * 40 / 144)), // Calculate height based on volume
                freight_class: totalWeight < 150 ? '85' : '70',
                product_name: productConfig.name
            })
        });
        } catch (fetchError) {
            // If proxy server is not running, use simulation
            console.warn('Proxy server error:', fetchError.message);
            
            // Simulate a realistic freight quote
            const baseRate = 3.50; // $ per mile
            const estimatedMiles = warehouseKey === 'TN' ? 800 : 1200;
            const weightCharge = Math.ceil(totalWeight / 100) * baseRate * estimatedMiles / 100;
            const accessorials = 180; // Liftgate + inside delivery
            const simulatedTotal = weightCharge + accessorials;
            
            // Create a simulated response
            response = {
                ok: true,
                json: async () => ({
                    success: true,
                    cheapest: {
                        total_cost: Math.max(simulatedTotal, config.minFreightCost),
                        carrier_name: 'Estimated Quote (API Key Required)',
                        transit_days: '3-5'
                    }
                })
            };
        }
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to get freight rates');
        }
        
        const data = await response.json();
        
        if (!data.success || !data.cheapest) {
            // If API fails, use simulated quote
            const baseRate = 3.50;
            const estimatedMiles = warehouseKey === 'TN' ? 800 : 1200;
            const weightCharge = Math.ceil(totalWeight / 100) * baseRate * estimatedMiles / 100;
            const accessorials = 180;
            const simulatedTotal = weightCharge + accessorials;
            
            // Check for specific error messages
            let errorMessage = 'Estimated Quote';
            if (data.error && data.error.includes('Unverified account')) {
                errorMessage = 'Estimated Quote (FreightView Account Verification Required)';
            } else if (data.error) {
                errorMessage = 'Estimated Quote (API Error)';
            }
            
            data.success = true;
            data.cheapest = {
                total_cost: Math.max(simulatedTotal, config.minFreightCost),
                carrier_name: errorMessage,
                transit_days: '3-5'
            };
        }
        
        // Use the cheapest rate from our proxy
        const freightQuote = parseFloat(data.cheapest.total_cost);
        const carrierName = data.cheapest.carrier_name;
        const transitDays = data.cheapest.transit_days;
        
        const finalQuote = Math.max(freightQuote, config.minFreightCost);
        
        // Update freight cost display with carrier info
        const freightCostElement = document.getElementById('freightCost');
        freightCostElement.innerHTML = `${formatCurrency(finalQuote)} <span style="font-size: 12px; color: #666;">(${carrierName})</span>`;
        
        // Update the stored freight cost for calculations
        window.lastFreightQuote = finalQuote;
        window.lastCarrierInfo = {
            name: carrierName,
            transitDays: transitDays,
            originalQuote: freightQuote
        };
        
        // Recalculate pricing with new freight cost
        calculatePricing();
        
        // Show success message with carrier details
        const quoteInfo = document.getElementById('freightQuoteInfo');
        quoteInfo.innerHTML = `
            <div style="background: #e8f5e9; padding: 10px; border-radius: 4px; margin-top: 10px;">
                ✓ Best rate: ${carrierName} - ${transitDays} transit days<br>
                <span style="font-size: 12px; color: #666;">From ${warehouse.city}, ${warehouse.state} to ${destinationZip}</span>
            </div>
        `;
        
    } catch (error) {
        console.error('Freight quote error:', error);
        alert('Unable to fetch freight quote. Please try again.');
    } finally {
        freightButton.textContent = originalText;
        freightButton.disabled = false;
    }
}

// Calculate freight cost based on total volume
function calculateFreightCost(sku, quantity) {
    const components = skuComponents[sku];
    if (!components) {
        // Fallback for unmapped SKUs
        return {
            freightCost: 0,
            totalVolume: 0,
            cubicFeet: 0,
            needsQuote: true
        };
    }
    
    // Calculate total volume for all components
    let totalVolume = 0;
    
    for (const component of components) {
        const componentInfo = componentData[component];
        if (componentInfo) {
            // Add volume for this component multiplied by quantity
            totalVolume += componentInfo.volume * quantity;
        }
    }
    
    // Convert to cubic feet (from cubic cm)
    const cubicFeet = totalVolume / 28316.8;
    
    // Always use real-time quote if available, otherwise freight is 0 (needs quote)
    const freightCost = window.lastFreightQuote || 0;
    const needsQuote = !window.lastFreightQuote;
    
    return {
        freightCost,
        totalVolume,
        cubicFeet,
        needsQuote
    };
}

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Add product selector to the page
    addProductSelector();
    
    // Don't select a product by default - user must choose
    // Clear any default values
    resetPricingDisplay();
    
    // Set up event listener for quantity
    document.getElementById('quantity').addEventListener('input', calculatePricing);
});

function addProductSelector() {
    // Find the product info div
    const productInfo = document.querySelector('.product-info');
    
    // Create three-dropdown selector HTML with button-style furniture type selector
    const selectorHTML = `
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Select Furniture Type:</label>
            <div id="furnitureTypeButtons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px;">
                <button type="button" class="furniture-type-btn" data-type="Living" style="padding: 10px 15px; border: 2px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s;">Living</button>
                <button type="button" class="furniture-type-btn" data-type="Working" style="padding: 10px 15px; border: 2px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s;">Working</button>
                <button type="button" class="furniture-type-btn" data-type="Dining" style="padding: 10px 15px; border: 2px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s;">Dining</button>
                <button type="button" class="furniture-type-btn" data-type="Other" style="padding: 10px 15px; border: 2px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s;">Other</button>
            </div>
            
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Select Product Category:</label>
            <div id="categoryButtons" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin-bottom: 20px; min-height: 44px;">
                <span style="color: #999; font-size: 14px; padding: 10px;">-- First select a furniture type --</span>
            </div>
            
            <label for="productSelector" style="display: block; margin-bottom: 5px; font-weight: 500;">Select Product Variation:</label>
            <select id="productSelector" style="width: 100%; padding: 8px; border: 2px solid #e0e0e0; border-radius: 6px; font-size: 14px;" disabled>
                <option value="">-- First select a product category --</option>
            </select>
        </div>
    `;
    
    // Insert at the beginning of product info
    productInfo.insertAdjacentHTML('afterbegin', selectorHTML);
    
    // Add furniture type button event listeners
    const furnitureButtons = document.querySelectorAll('.furniture-type-btn');
    furnitureButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active state from all buttons
            furnitureButtons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = 'black';
                btn.style.borderColor = '#e0e0e0';
            });
            
            // Add active state to clicked button
            this.style.background = '#384637';
            this.style.color = 'white';
            this.style.borderColor = '#384637';
            
            // Update category dropdown
            updateCategoryDropdown(this.dataset.type);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (this.style.background !== 'rgb(56, 70, 55)') { // Not active
                this.style.borderColor = '#384637';
                this.style.background = '#f4f2ed';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.style.background !== 'rgb(56, 70, 55)') { // Not active
                this.style.borderColor = '#e0e0e0';
                this.style.background = 'white';
            }
        });
    });
    
    // Add product change event listener
    document.getElementById('productSelector').addEventListener('change', function(e) {
        if (e.target.value) {
            selectProduct(e.target.value);
        }
    });
}

function updateCategoryDropdown(furnitureType) {
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    const productSelect = document.getElementById('productSelector');
    
    // Reset both sections
    if (!furnitureType) {
        categoryButtonsContainer.innerHTML = '<span style="color: #999; font-size: 14px; padding: 10px;">-- First select a furniture type --</span>';
        productSelect.disabled = true;
        productSelect.innerHTML = '<option value="">-- First select a product category --</option>';
        return;
    }
    
    // Get categories for this furniture type and sort alphabetically
    const categories = furnitureTypes[furnitureType].sort();
    
    // Create category buttons
    categoryButtonsContainer.innerHTML = categories.map(cat => 
        `<button type="button" class="category-btn" data-category="${cat}" style="padding: 10px 15px; border: 2px solid #e0e0e0; background: white; border-radius: 6px; font-size: 14px; cursor: pointer; transition: all 0.2s;">${cat}</button>`
    ).join('');
    
    // Add event listeners to category buttons
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active state from all category buttons
            categoryButtons.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = 'black';
                btn.style.borderColor = '#e0e0e0';
            });
            
            // Add active state to clicked button
            this.style.background = '#384637';
            this.style.color = 'white';
            this.style.borderColor = '#384637';
            
            // Update product dropdown
            updateProductDropdown(this.dataset.category);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (this.style.background !== 'rgb(56, 70, 55)') { // Not active
                this.style.borderColor = '#384637';
                this.style.background = '#f4f2ed';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (this.style.background !== 'rgb(56, 70, 55)') { // Not active
                this.style.borderColor = '#e0e0e0';
                this.style.background = 'white';
            }
        });
    });
    
    // Reset product dropdown
    productSelect.disabled = true;
    productSelect.innerHTML = '<option value="">-- First select a product category --</option>';
}

function updateProductDropdown(category) {
    const productSelect = document.getElementById('productSelector');
    
    if (!category) {
        productSelect.disabled = true;
        productSelect.innerHTML = '<option value="">-- First select a product category --</option>';
        return;
    }
    
    // Get products for this category (already sorted in productCategories)
    const productSkus = productCategories[category];
    
    // Enable dropdown and populate with products
    productSelect.disabled = false;
    
    // Fix grammar for specific categories
    let categoryLabel = category.slice(0, -1); // Default: remove 's'
    if (category === 'Shelves') {
        categoryLabel = 'Shelf';
    } else if (category === 'Accessories') {
        categoryLabel = 'Accessory';
    } else if (category === 'Benches') {
        categoryLabel = 'Bench';
    }
    
    productSelect.innerHTML = `
        <option value="">-- Select a ${categoryLabel} --</option>
        ${productSkus.map(sku => {
            const product = productCatalog[sku];
            return `<option value="${sku}">${product.name}</option>`;
        }).join('')}
    `;
}

// Product image mappings - group similar products
const productImageMap = {
    // Shelves
    '18X7-SHELF': 'SHELVES',
    '30X7-SHELF': 'SHELVES',
    '42X8-SHELF': 'SHELVES',
    '54X8-SHELF': 'SHELVES',
    
    // Tabletops
    '36X22': 'TABLETOP',
    '42X42': '42X42',
    '46X14': 'TABLETOP',
    '46X24': 'TABLETOP',
    '58X14': 'TABLETOP',
    '58X28': 'TABLETOP',
    
    // Benches
    'B-DN-46X14': 'BENCH DN',
    'B-DN-58X14': 'BENCH DN',
    'B-U-46X14': 'BENCH U',
    'B-U-58X14': 'BENCH U',
    
    // Side Tables
    'C-TABLE': 'C-TABLE',
    'END-TABLE': 'END TABLE',
    'END-X-TABLE': 'END X TABLE',
    
    // Coffee Tables
    'CF-SP-42X42': 'COFFEE SP',
    'CF-U-36X22': 'COFFEE U',
    'CF-U-36X22-2C-TABLE': 'COFFEE U',
    'CF-U-36X22-C-TABLE': 'COFFEE U',
    'CF-U-36X22-DRAWER': 'COFFEE U DRAWER',
    'CF-U-46X24': 'COFFEE U',
    'CF-U-46X24-2C-TABLE': 'COFFEE U',
    'CF-U-46X24-C-TABLE': 'COFFEE U',
    'CF-U-46X24-DRAWER': 'COFFEE U DRAWER',
    'CF-U-58X28': 'COFFEE U',
    'CF-U-58X28-2C-TABLE': 'COFFEE U',
    'CF-U-58X28-C-TABLE': 'COFFEE U',
    'CF-U-58X28-DRAWER': 'COFFEE U DRAWER',
    
    // Chairs
    'CHAIR-WARMS': 'CHAIR-WARMS',
    'CHAIR-WOARMS': 'CHAIR-WOARMS',
    
    // Console Tables
    'CN-U-46X14': 'CONSOLE U',
    'CN-U-46X14-DRAWER': 'CONSOLE U DRAWER',
    'CN-U-58X14': 'CONSOLE U',
    'CN-U-58X14-DRAWER': 'CONSOLE U DRAWER',
    
    // Desks
    'D-HP-36X22': 'DESK HP',
    'D-HP-36X22-DRAWER': 'DESK DRAWER',
    'D-HP-36X22-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-HP-46X24': 'DESK HP',
    'D-HP-46X24-DRAWER': 'DESK DRAWER',
    'D-HP-46X24-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-HP-58X28': 'DESK HP',
    'D-HP-58X28-DRAWER': 'DESK DRAWER',
    'D-HP-58X28-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    
    'D-SSB-46X24': 'DESK STANDING BK',
    'D-SSB-46X24-DRAWER': 'DESK DRAWER',
    'D-SSB-46X24-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-SSB-58X28': 'DESK STANDING BK',
    'D-SSB-58X28-DRAWER': 'DESK DRAWER',
    'D-SSB-58X28-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    
    'D-SSW-46X24': 'DESK STANDING WT',
    'D-SSW-46X24-DRAWER': 'DESK DRAWER',
    'D-SSW-46X24-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-SSW-58X28': 'DESK STANDING WT',
    'D-SSW-58X28-DRAWER': 'DESK DRAWER',
    'D-SSW-58X28-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    
    'D-U-36X22': 'DESK U',
    'D-U-36X22-DRAWER': 'DESK DRAWER',
    'D-U-36X22-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-U-46X24': 'DESK U',
    'D-U-46X24-DRAWER': 'DESK DRAWER',
    'D-U-46X24-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'D-U-58X28': 'DESK U',
    'D-U-58X28-DRAWER': 'DESK DRAWER',
    'D-U-58X28-KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    
    // Dining Tables
    'DN-U-48X36': 'DINING U',
    'DN-U-60X36': 'DINING U',
    'DN-U-60X36-2B-DN-46X14': 'DINING U BENCH',
    'DN-U-60X36-B-DN-46X14': 'DINING U BENCH',
    'DN-U-72X36': 'DINING U',
    'DN-U-72X36-2B-DN-58X14': 'DINING U BENCH',
    'DN-U-72X36-B-DN-58X14': 'DINING U BENCH',
    
    // Accessories
    'DRAWER': 'DESK DRAWER',
    'KEYBOARD-TRAY': 'DESK KEYBOARD TRAY',
    'MONITOR-STAND-BK': 'MONITOR STAND BK',
    'MONITOR-STAND-WT': 'MONITOR STAND WT',
    'WHEELS': 'WHEELS'
};

function updateProductImage(sku) {
    const imageContainer = document.getElementById('productImageContainer');
    const productImage = document.getElementById('productImage');
    const imageWrapper = imageContainer.querySelector('div');
    
    if (!sku) {
        imageContainer.style.display = 'none';
        return;
    }
    
    // Get mapped image name or use SKU directly
    const mappedImage = productImageMap[sku] || sku;
    
    // Check if this is a dining or bench image and adjust width
    if (mappedImage === 'DINING U' || mappedImage === 'DINING U BENCH' || 
        mappedImage === 'BENCH DN' || mappedImage === 'BENCH U') {
        imageWrapper.style.width = '400px';
        imageWrapper.style.maxWidth = '90%';
    } else {
        imageWrapper.style.width = '300px';
        imageWrapper.style.maxWidth = 'none';
    }
    
    // Set image source - images should be named by SKU or mapping
    const imagePath = `product-images/${mappedImage}.jpg`;
    
    // Create a new image to test if it exists
    const testImage = new Image();
    testImage.onload = function() {
        // Image exists, show it
        productImage.src = imagePath;
        productImage.alt = productCatalog[sku]?.name || 'Product Image';
        imageContainer.style.display = 'block';
    };
    testImage.onerror = function() {
        // Image doesn't exist, try PNG format
        const pngPath = `product-images/${mappedImage}.png`;
        const testPng = new Image();
        testPng.onload = function() {
            productImage.src = pngPath;
            productImage.alt = productCatalog[sku]?.name || 'Product Image';
            imageContainer.style.display = 'block';
        };
        testPng.onerror = function() {
            // Try WebP format
            const webpPath = `product-images/${mappedImage}.webp`;
            const testWebp = new Image();
            testWebp.onload = function() {
                productImage.src = webpPath;
                productImage.alt = productCatalog[sku]?.name || 'Product Image';
                imageContainer.style.display = 'block';
            };
            testWebp.onerror = function() {
                // Try AVIF format
                const avifPath = `product-images/${mappedImage}.avif`;
                const testAvif = new Image();
                testAvif.onload = function() {
                    productImage.src = avifPath;
                    productImage.alt = productCatalog[sku]?.name || 'Product Image';
                    imageContainer.style.display = 'block';
                };
                testAvif.onerror = function() {
                    // No image found, show placeholder
                    productImage.src = 'product-images/placeholder.svg';
                    productImage.onerror = function() {
                        productImage.src = 'product-images/placeholder.jpg';
                    };
                    productImage.alt = 'Product Image Not Available';
                    imageContainer.style.display = 'block';
                };
                testAvif.src = avifPath;
            };
            testWebp.src = webpPath;
        };
        testPng.src = pngPath;
    };
    testImage.src = imagePath;
}

function selectProduct(sku) {
    const product = productCatalog[sku];
    if (!product) return;
    
    // Update product config
    productConfig = {
        sku: sku,
        name: product.name,
        retailPrice: product.retailPrice,
        productCost: product.productCost,
        smallParcelShipping: product.smallParcelShipping
    };
    
    // Update display
    document.getElementById('productName').textContent = product.name;
    
    // Update product description if element exists
    const descriptionElement = document.getElementById('productDescription');
    if (descriptionElement && product.description) {
        descriptionElement.textContent = product.description;
        descriptionElement.style.display = 'block';
    }
    
    // Update product image
    updateProductImage(sku);
    
    // Clear real-time freight quote when product changes
    window.lastFreightQuote = null;
    const quoteInfo = document.getElementById('freightQuoteInfo');
    if (quoteInfo) {
        quoteInfo.innerHTML = '';
    }
    
    // No longer updating removed price display elements
    
    // Recalculate pricing
    calculatePricing();
}

function calculatePricing() {
    if (!productConfig.sku) {
        resetPricingDisplay();
        return;
    }
    
    // Clear real-time quote if quantity changed
    const currentQuantity = parseInt(document.getElementById('quantity').value) || 0;
    if (window.lastQuantity && window.lastQuantity !== currentQuantity) {
        window.lastFreightQuote = null;
        const quoteInfo = document.getElementById('freightQuoteInfo');
        if (quoteInfo) {
            quoteInfo.innerHTML = '';
        }
    }
    window.lastQuantity = currentQuantity;
    
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (quantity === 0) {
        resetPricingDisplay();
        return;
    }
    
    // Calculate discount based on quantity
    let discount = 0; // No default discount, use tiers
    for (const tier of config.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    // Calculate pricing
    const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
    const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
    const retailProductTotal = retailPriceWithoutShipping * quantity;
    const bulkProductTotal = bulkUnitPrice * quantity;
    const retailShippingTotal = productConfig.smallParcelShipping * quantity;
    const { freightCost, cubicFeet, needsQuote } = calculateFreightCost(productConfig.sku, quantity);
    
    // Update displays
    // Removed line that was trying to update input element's textContent
    
    // Retail pricing
    document.getElementById('retailUnitCost').textContent = formatCurrency(retailPriceWithoutShipping);
    document.getElementById('retailQuantity').textContent = quantity;
    document.getElementById('retailProductSubtotal').textContent = formatCurrency(retailProductTotal);
    document.getElementById('retailShippingTotal').textContent = formatCurrency(retailShippingTotal);
    document.getElementById('retailOrderTotal').textContent = formatCurrency(retailProductTotal + retailShippingTotal);
    
    // Bulk pricing
    document.getElementById('bulkUnitCost').textContent = discount > 0 ? `${formatCurrency(bulkUnitPrice)} (${discount}% off)` : formatCurrency(bulkUnitPrice);
    document.getElementById('bulkQuantity').textContent = quantity;
    document.getElementById('bulkProductTotal').textContent = formatCurrency(bulkProductTotal);
    
    // Show freight cost or prompt for quote
    if (needsQuote) {
        // Check if we previously had a quote (quantity or product changed)
        const needsUpdate = window.lastQuantity && !window.lastFreightQuote;
        const message = needsUpdate ? 'Update quote' : 'Quote needed';
        document.getElementById('freightCost').innerHTML = `<span style="color: #ff9800;">${message}</span>`;
    } else {
        document.getElementById('freightCost').textContent = formatCurrency(freightCost);
    }
    
    document.getElementById('bulkOrderTotal').textContent = formatCurrency(bulkProductTotal + freightCost);
    
    // Calculate totals for comparison
    const retailTotal = retailProductTotal + retailShippingTotal;
    const bulkTotal = bulkProductTotal + freightCost;
    
    // Update savings box
    const savingsBox = document.getElementById('savingsBox');
    const savings = retailTotal - bulkTotal;
    const savingsPercent = ((savings / retailTotal) * 100).toFixed(0);
    
    // Update submit button state
    const submitButton = document.querySelector('.add-to-cart');
    
    if (needsQuote) {
        // Hide savings box until freight quote is obtained
        savingsBox.style.display = 'none';
        
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
    } else if (savings > 0) {
        savingsBox.style.display = 'block';
        savingsBox.textContent = `You save ${formatCurrency(savings).replace('$', '$')} (${savingsPercent}%) with bulk pricing`;
        savingsBox.style.background = '#4caf50';
        savingsBox.style.color = 'white';
        
        // Enable submit button when bulk is cheaper
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        submitButton.style.cursor = 'pointer';
    } else {
        savingsBox.style.display = 'block';
        savingsBox.textContent = 'Normal pricing is more economical for this quantity';
        savingsBox.style.background = '#f44336';
        savingsBox.style.color = 'white';
        
        // Disable submit button when retail is cheaper
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
    }
    
    // Show/hide MOQ notice
    const moqNotice = document.getElementById('moqNotice');
    if (quantity < 100) {
        moqNotice.style.display = 'none';
    } else {
        moqNotice.style.display = 'none';
    }
    
    // Add unit comparison only if we have freight quote
    if (!needsQuote) {
        const perUnitRetail = productConfig.retailPrice;
        const perUnitBulk = (bulkProductTotal + freightCost) / quantity;
        const textColor = savings > 0 ? '#4caf50' : '#ff5252';
        
        const comparisonHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                <div style="text-align: center;">
                    <div style="font-size: 12px; color: #666;">Per unit all-in:</div>
                    <div style="font-size: 14px;">Retail $${perUnitRetail.toFixed(2)}</div>
                </div>
                <div style="font-size: 20px; color: ${textColor};">→</div>
                <div style="text-align: center;">
                    <div style="font-size: 12px; color: #666;">Per unit all-in:</div>
                    <div style="font-size: 14px; font-weight: bold; color: ${textColor};">Bulk $${perUnitBulk.toFixed(2)}</div>
                </div>
            </div>
        `;
        
        if (!document.getElementById('unitComparison')) {
            document.getElementById('savingsBox').insertAdjacentHTML('afterend', `<div id="unitComparison">${comparisonHTML}</div>`);
        } else {
            document.getElementById('unitComparison').innerHTML = comparisonHTML;
        }
    } else {
        // Remove unit comparison if no freight quote
        const unitComparison = document.getElementById('unitComparison');
        if (unitComparison) unitComparison.remove();
    }
    
    // Calculate actual break-even quantity considering discounts
    let breakEvenQty = 0;
    for (let q = 1; q <= 500; q++) {
        // Calculate retail total
        const retailTotalTest = productConfig.retailPrice * q;
        
        // Calculate bulk total with discount
        let discountTest = 0; // No default discount, use tiers
        for (const tier of config.pricingTiers) {
            if (q >= tier.minQty && (tier.maxQty === null || q <= tier.maxQty)) {
                discountTest = tier.discount;
                break;
            }
        }
        const bulkUnitPriceTest = retailPriceWithoutShipping * (1 - discountTest / 100);
        const bulkProductTotalTest = bulkUnitPriceTest * q;
        const { freightCost: freightCostTest } = calculateFreightCost(productConfig.sku, q);
        const bulkTotalTest = bulkProductTotalTest + freightCostTest;
        
        if (bulkTotalTest < retailTotalTest) {
            breakEvenQty = q;
            break;
        }
    }
    
    // Add break-even info only if we have a freight quote and bulk is more expensive
    if (!needsQuote && savings <= 0) {
        const bulkOrderTotal = document.getElementById('bulkOrderTotal').parentElement;
        if (!document.getElementById('breakEvenInfo')) {
            const breakEvenHTML = `
                <div id="breakEvenInfo" style="font-size: 12px; color: #666; margin-top: 10px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center;">
                    Bulk savings start at: <strong>${breakEvenQty > 0 ? breakEvenQty : '>500'} units</strong>
                </div>
            `;
            bulkOrderTotal.insertAdjacentHTML('afterend', breakEvenHTML);
        }
    } else {
        // Remove break-even info if bulk is cheaper or no quote
        const breakEvenInfo = document.getElementById('breakEvenInfo');
        if (breakEvenInfo) breakEvenInfo.remove();
    }
}

function getBreakEvenQuantity() {
    if (!productConfig.sku) return 0;
    
    for (let q = 1; q <= 500; q++) {
        const retailTotal = productConfig.retailPrice * q;
        
        let discount = 0; // No default discount, use tiers
        for (const tier of config.pricingTiers) {
            if (q >= tier.minQty && (tier.maxQty === null || q <= tier.maxQty)) {
                discount = tier.discount;
                break;
            }
        }
        
        const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
        const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
        const bulkProductTotal = bulkUnitPrice * q;
        const { freightCost } = calculateFreightCost(productConfig.sku, q);
        const bulkTotal = bulkProductTotal + freightCost;
        
        if (bulkTotal < retailTotal) {
            return q;
        }
    }
    
    return '>500';
}

function resetPricingDisplay() {
    // Reset all displays to default
    document.getElementById('retailUnitCost').textContent = '$0';
    document.getElementById('retailQuantity').textContent = '0';
    document.getElementById('retailProductSubtotal').textContent = '$0';
    document.getElementById('retailShippingTotal').textContent = '$0';
    document.getElementById('retailOrderTotal').textContent = '$0';
    
    document.getElementById('bulkUnitCost').textContent = '$0';
    document.getElementById('bulkQuantity').textContent = '0';
    document.getElementById('bulkProductTotal').textContent = '$0';
    document.getElementById('freightCost').textContent = '$0';
    document.getElementById('bulkOrderTotal').textContent = '$0';
    
    const savingsBox = document.getElementById('savingsBox');
    
    // Only show "Select a product" message if no product is actually selected
    if (!productConfig.sku) {
        savingsBox.style.display = 'block';
        savingsBox.textContent = 'Select a product to see pricing comparison';
        savingsBox.style.background = '#f5f5f5';
        savingsBox.style.color = '#666';
    } else {
        // Hide savings box when product is selected but quantity is 0
        savingsBox.style.display = 'none';
    }
    
    // Disable submit button when no product selected
    const submitButton = document.querySelector('.add-to-cart');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.style.opacity = '0.5';
        submitButton.style.cursor = 'not-allowed';
    }
    
    // Remove unit comparison and break-even info if they exist
    const unitComparison = document.getElementById('unitComparison');
    if (unitComparison) unitComparison.remove();
    
    const breakEvenInfo = document.getElementById('breakEvenInfo');
    if (breakEvenInfo) breakEvenInfo.remove();
}

function submitOrderRequest() {
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    
    if (!productConfig.sku) {
        alert('Please select a product');
        return;
    }
    
    if (quantity === 0) {
        alert('Please enter a quantity');
        return;
    }
    
    // Check if we have a freight quote
    if (!window.lastFreightQuote) {
        alert('Please get a freight quote first');
        return;
    }
    
    // Calculate all values
    let discount = 0; // No default discount, use tiers
    for (const tier of config.pricingTiers) {
        if (quantity >= tier.minQty && (tier.maxQty === null || quantity <= tier.maxQty)) {
            discount = tier.discount;
            break;
        }
    }
    
    const retailPriceWithoutShipping = productConfig.retailPrice - productConfig.smallParcelShipping;
    const bulkUnitPrice = retailPriceWithoutShipping * (1 - discount / 100);
    const productTotal = bulkUnitPrice * quantity;
    const { freightCost } = calculateFreightCost(productConfig.sku, quantity);
    const totalCost = productTotal + freightCost;
    
    // Check if bulk is actually cheaper
    const retailTotal = productConfig.retailPrice * quantity;
    const isBulkCheaper = totalCost < retailTotal;
    
    // Create order details
    const carrierInfo = window.lastCarrierInfo || { name: 'Freight', transitDays: 'N/A' };
    const orderDetails = {
        product: productConfig.name,
        sku: productConfig.sku,
        quantity: quantity,
        unitPrice: formatCurrency(bulkUnitPrice),
        productSubtotal: formatCurrency(productTotal),
        freightCost: formatCurrency(freightCost),
        freightCarrier: carrierInfo.name,
        transitDays: carrierInfo.transitDays,
        totalCost: formatCurrency(totalCost),
        discount: `${discount}%`,
        retailComparison: isBulkCheaper ? 
            `Saves ${formatCurrency(retailTotal - totalCost)} vs retail` : 
            `Retail is cheaper by ${formatCurrency(totalCost - retailTotal)}`
    };
    
    // Create URL parameters for order details
    const params = new URLSearchParams({
        product: productConfig.name,
        sku: productConfig.sku,
        quantity: quantity.toString(),
        unitPrice: orderDetails.unitPrice,
        productSubtotal: orderDetails.productSubtotal,
        freightCost: orderDetails.freightCost,
        freightCarrier: orderDetails.freightCarrier,
        transitDays: orderDetails.transitDays,
        totalCost: orderDetails.totalCost,
        discount: orderDetails.discount,
        savings: isBulkCheaper ? 
            `Saves ${formatCurrency(retailTotal - totalCost)} vs retail` : 
            ''
    });
    
    // Redirect to email form page
    window.location.href = `order_email_form.html?${params.toString()}`;
}