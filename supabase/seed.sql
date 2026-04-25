-- Seed data for Prism Origin Dashboard
-- Generated from: Prism Origin Growth.xlsx (April 2025)

-- KPIs
insert into kpis (total_ordered, total_received, fill_rate, shortfall, unique_products, total_pos, total_line_items)
values (22820994, 17662119, 81.3, 5158875, 155, 445, 20783);

-- Warehouse Summary
insert into warehouse_summary (warehouse_name, revenue_received, revenue_ordered, qty_ordered, qty_received, pos, products, fill_rate, share) values
('NBOF1 - TIMAURD', 15682448, 19781362, 150055, 124178, 233, 155, 82.8, 88.8),
('NBOF3 - SAFARI',  1979671,  3039632,  21985,  15693,  212, 130, 71.4, 11.2);

-- Market Share Trend
insert into market_share_trend (period, supplier, revenue, share) values
('Early', 'Prism Origin Ltd',              5616738, 49.3),
('Early', 'Cyka Fresh Limited',            3890384, 34.1),
('Early', 'FARM TO FEED KENYA',            1318222, 11.6),
('Early', 'AAA Growers',                   415264,  3.6),
('Early', 'Evergreen Fresh Distribution Ltd', 152291, 1.3),
('Mid',   'Prism Origin Ltd',              4850081, 38.2),
('Mid',   'Cyka Fresh Limited',            5148716, 40.6),
('Mid',   'FARM TO FEED KENYA',            1528128, 12.0),
('Mid',   'AAA Growers',                   722124,  5.7),
('Mid',   'Evergreen Fresh Distribution Ltd', 437263, 3.4),
('Late',  'Prism Origin Ltd',              4393930, 22.3),
('Late',  'Cyka Fresh Limited',           11778190, 59.8),
('Late',  'FARM TO FEED KENYA',            1449366,  7.4),
('Late',  'AAA Growers',                   521032,  2.6),
('Late',  'Evergreen Fresh Distribution Ltd', 713795, 3.6);

-- Top Products
insert into top_products (product_name, revenue, qty, avg_price, pos) values
('Apple Pinklady 6pcs',           1307280, 5470,  234, 312),
('Grapes Local 500g',             1085660, 2847,  380, 327),
('Fresh Eggs 12 Pack',             678720, 3232,  210, 244),
('Ripe Sweet Bananas P/Kg',        658290, 4072,  161, 351),
('Organic Tomatoes p/kg',          652740, 2955,  220, 345),
('Fresh Eggs 20 Pack',             639765, 2031,  315, 208),
('Onions Red 1Kg',                 615242, 7944,   77, 148),
('Blueberry Punnet 125g',          463255, 1482,  311, 236),
('Cut Watermelon',                 432242, 5672,   76, 353),
('Fresh Strawberry Fruits 250g',   424570, 2228,  191, 192),
('Apple Green 1Kg',                381680, 1439,  266, 178),
('Grapes - Red Punnet 500g',       372110,  988,  376, 156),
('Organic Potatoes p/kg',          341880, 1548,  220, 309),
('Orange Local 1Kg',               331630, 3906,   85, 343),
('Pineapple Pc',                   329880, 3493,   95, 343),
('Tangerines Imported per kg',     313420,  662,  478, 197),
('Unripe Avocado 1Kg',             292880, 3634,   80, 340),
('Imported Lemon 0.5Kg',           290780, 1647,  178, 148),
('Full Watermelon 6kg',            288780,  981,  295, 123),
('Fresh Eggs 15 pack',             281650, 1077,  261, 122);

-- Warehouse Trend
insert into warehouse_trend (warehouse_name, period, revenue, qty, products) values
('NBOF1 - TIMAURD', 'Early', 5940472, 49098, 118),
('NBOF1 - TIMAURD', 'Mid',   5115192, 38363, 121),
('NBOF1 - TIMAURD', 'Late',  4626785, 36717, 106),
('NBOF3 - SAFARI',  'Early',  650717,  5447, 110),
('NBOF3 - SAFARI',  'Mid',    691069,  5024, 104),
('NBOF3 - SAFARI',  'Late',   637885,  5222,  80);

-- Fill Rate Comparison
insert into fill_rate_comparison (supplier_name, qty_ordered, qty_received, rev_ordered, rev_received, fill_rate, shortfall) values
('Cyka Fresh Limited',            386933, 360392, 22825676, 20817290, 93.2, 2008386),
('Prism Origin Ltd',              172040, 139871, 22820994, 17662119, 82.7, 3370881),
('FARM TO FEED KENYA',             52311,  46619,  4986510,  4295716, 89.1,  690794),
('AAA Growers',                    23421,  13453,  2990744,  1658420, 57.4, 1332324),
('Evergreen Fresh Distribution Ltd', 14362, 8302,  2164008,  1303349, 57.8,  860659),
('Burton & Bamber Company Ltd',     2254,   1541,   424179,   326609, 68.4,   97370);

-- Dropped Products (top 15 by early revenue)
insert into dropped_products (product_name, early_revenue, early_qty) values
('Fresh Strawberry Fruits 250g',   274930, 1447),
('Grapes - Red Punnet 500g',       228380,  601),
('Fresh Chicken Capon Approx 1kg', 227000,  454),
('Raspberry Punnet 125g',          183000,  915),
('Orange Imported Per Kg',         152760,  728),
('Tomatoes 1kg',                   124950, 1666),
('Fresh Sweet Corn Tri-pack',       65410,  416),
('Unripe Avocado Hass 1Kg',         76120,  692),
('Fresh Carrot 1Kg',                72610, 1526),
('Long Ripe banana 1kg',            59605,  917),
('Banana 1/2kg',                    43200, 1440),
('Tangarine Imported 1 Pc',         41510,  593),
('Imported Orange 1 Pc',            39200, 1120),
('Potatoes White 1Kg',              34320,  572),
('Coriander - Dhania Bunch',         5550,  555);

-- Growing Products
insert into growing_products (product_name, early_qty, late_qty, late_rev, growth_pct) values
('Blueberry Punnet 125g',      65,   967, 301245, 1387.7),
('Capsicum Green 500g',       242,  1614,  82112,  566.9),
('Green Shelled Peas 500g',   320,   774, 119040,  141.9),
('Unripe Avocado 1Kg',        829,  1877, 152320,  126.4),
('Avocado 1 Pc',             1770,  3545, 107460,  100.3),
('Apple Pinklady 6pcs',      1298,  2482, 627750,   91.2),
('Ripe Sweet Bananas P/Kg',  1023,  1916, 313330,   87.3),
('Fresh Local SP. Papaya;500gms', 537, 992, 61598, 84.7),
('Spring Onion Bunch',       1048,  1793,  54600,   71.1),
('Cut Watermelon',           1511,  2303, 197988,   52.4);

-- Pricing Comparison
insert into pricing_comparison (product_name, prism_price, cyka_price, prism_rev, diff_pct) values
('Apple Pinklady 6pcs',           236.0, 246.0, 1307280,  4.2),
('Grapes Local 500g',             380.0, 392.0, 1085660,  3.2),
('Onions Red 1Kg',                 77.0,  91.0,  615242, 18.5),
('Blueberry Punnet 125g',         311.0, 364.0,  463255, 17.0),
('Fresh Strawberry Fruits 250g',  191.0, 230.0,  424570, 20.7),
('Grapes - Red Punnet 500g',      376.0, 386.0,  372110,  2.6),
('Orange Local 1Kg',               85.0, 100.0,  331630, 17.6),
('Imported Lemon 0.5Kg',          178.0, 180.0,  290780,  1.3),
('Full Watermelon 6kg',           295.0, 300.0,  288780,  1.6),
('Grapes - Green 500g',           394.0, 472.0,  250730, 19.7),
('Raspberry Punnet 125g',         200.0, 250.0,  242000, 25.0),
('Orange Imported Per Kg',        210.0, 261.0,  215340, 24.4),
('Avocado 1 Pc',                   29.0,  35.0,  214305, 19.0),
('Green Shelled Peas 500g',       148.0, 168.0,  200740, 13.6),
('Cucumber Local 1Kg',             94.0, 105.0,  171765, 12.3);
