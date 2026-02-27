/**
 * Dummy data for local/dev showcase when backend is not available.
 * Used when REACT_APP_BYPASS_LOGIN=true
 */

// Plan status - all features enabled to hide "Unlock Premium Features" modal
export const DUMMY_PLAN_STATUS = {
  analytics_dashboard: true,
  business_health_dashoard: true,
  report_schedular: true,
  rate_calculator: true,
  advanced_courier_rule: true,
  custom_branding_page_with_nps: true,
  multiple_user_login_role_management: true,
  label_customization: true,
  reporting: true,
  api_access: true,
  whatsapp_notification: true,
  billing_management: true,
  dedicated_key_account_manager_for_tiers: true,
  ndr_rto_management: true,
  order_verification: true,
  international_shipping: true,
  autosync_channel_orders: true,
  bulk_order_upload_processing: true,
  label_invoices_creation: true,
  product_weight_freeze: true,
  bulk_shipping_manifests: true,
  split_shipment: true,
  merge_shipment: true,
  enable_pickup_address: true,
  enable_sales_channel: true,
  courier_selection: true,
  courier_priority: true,
};

// Shipment card - TotalShipment component (values as % for progress bar width, total=100)
export const DUMMY_SHIPMENT_CARD = {
  yet_to_pick_orders: 5,
  delivered_orders: 38,
  intransit_orders: 10,
  ndr_orders: 2,
  out_for_delivery: 7,
  picked_up_orders: 9,
  rto_orders: 3,
  shipped_orders: 26,
};

// Counter card - TotalInfoDashboard
export const DUMMY_COUNTER_CARD = {
  total_customers: 1247,
  daily_shipment: 156,
  avg_selling_price: 849,
  today_revenue: 45230,
};

// COD, NDR, RTO details - OverviewStatusCard
export const DUMMY_COD_DETAILS = {
  total_cod: 285000,
  remitted_cod: 212000,
  cod_pending: 73000,
  todays_remittance: 45000,
  next_remit_amount: 38000,
  next_remit_date: new Date().toISOString(),
};

export const DUMMY_NDR_DETAILS = {
  total_ndr: 45,
  action_required: 12,
  action_requested: 8,
  ndr_delivered: 18,
  ndr_rto: 7,
};

export const DUMMY_RTO_DETAILS = {
  rto_orders: 28,
  rto_inititated: 15,
  rto_intransit: 6,
  rto_delivered: 7,
};

// Revenue card
export const DUMMY_REVENUE_CARD = {
  cod_revenue: 125000,
  prepaid_revenue: 87500,
  total_delivered_orders: 450,
};

// Last orders - table format (matches TableDashboard structure)
export const DUMMY_LAST_ORDERS = [
  { customer_order_number: 'ORD-001', awb_number: 'AWB123456', courier_partner: 'delhivery', charge_detail__shipping_charges: 65, charge_detail__total_charges: 420, dimension_detail__weight: 500, status: 'Delivered' },
  { customer_order_number: 'ORD-002', awb_number: 'AWB123457', courier_partner: 'bluedart', charge_detail__shipping_charges: 85, charge_detail__total_charges: 650, dimension_detail__weight: 1200, status: 'In Transit' },
  { customer_order_number: 'ORD-003', awb_number: 'AWB123458', courier_partner: 'ekart', charge_detail__shipping_charges: 55, charge_detail__total_charges: 380, dimension_detail__weight: 400, status: 'Out for Delivery' },
  { customer_order_number: 'ORD-004', awb_number: 'AWB123459', courier_partner: 'dtdc', charge_detail__shipping_charges: 72, charge_detail__total_charges: 510, dimension_detail__weight: 800, status: 'Delivered' },
  { customer_order_number: 'ORD-005', awb_number: 'AWB123460', courier_partner: 'xpressbees', charge_detail__shipping_charges: 45, charge_detail__total_charges: 299, dimension_detail__weight: 300, status: 'NDR' },
];

// Top selling products
export const DUMMY_TOP_SELL = [
  { product_name: 'Wireless Earbuds Pro', total: 456, delivered: 412, rto_count: 28 },
  { product_name: 'Smart Watch Series 5', total: 323, delivered: 298, rto_count: 15 },
  { product_name: 'Laptop Stand Aluminum', total: 287, delivered: 271, rto_count: 12 },
  { product_name: 'Mobile Phone Case Premium', total: 534, delivered: 502, rto_count: 22 },
  { product_name: 'USB-C Hub 7-in-1', total: 198, delivered: 185, rto_count: 8 },
];

// State-wise split (India states)
export const DUMMY_STATEWISE_DATA = {
  Maharashtra: 1250,
  Karnataka: 892,
  'Tamil Nadu': 756,
  'Uttar Pradesh': 634,
  Delhi: 521,
  Gujarat: 445,
  Rajasthan: 387,
  'West Bengal': 312,
  Kerala: 289,
  Telangana: 256,
};

// Courier wise allocation
export const DUMMY_COURIER_WISE = [
  { courier_name: 'delhivery', value: 1250 },
  { courier_name: 'bluedart', value: 890 },
  { courier_name: 'ekart', value: 645 },
  { courier_name: 'dtdc', value: 423 },
  { courier_name: 'xpressbees', value: 312 },
];

// Most popular customers
export const DUMMY_MOST_POPULAR_CUSTOMERS = [
  { recipient_name: 'Rajesh Kumar', count: 24, order_id: ['O1', 'O2'], rating_percentage: 85 },
  { recipient_name: 'Priya Sharma', count: 18, order_id: ['O3'], rating_percentage: 72 },
  { recipient_name: 'Amit Singh', count: 15, order_id: ['O4'], rating_percentage: 68 },
  { recipient_name: 'Sneha Patel', count: 12, order_id: ['O5'], rating_percentage: 55 },
  { recipient_name: 'Vikram Reddy', count: 9, order_id: ['O6'], rating_percentage: 42 },
];

// Delivery performance - { on_time_orders: [{count}], late_orders: [{count}] }
export const DUMMY_DELIVERY_PERFORMANCE = {
  on_time_orders: [{ count: 85 }, { count: 92 }, { count: 78 }, { count: 88 }, { count: 95 }],
  late_orders: [{ count: 15 }, { count: 8 }, { count: 22 }, { count: 12 }, { count: 5 }],
};

// Weight discrepancies - array of { total_order, disputed_order }
export const DUMMY_WEIGHT_DISCREPANCIES = [
  { total_order: 120, disputed_order: 8 },
  { total_order: 145, disputed_order: 12 },
  { total_order: 132, disputed_order: 6 },
  { total_order: 158, disputed_order: 15 },
  { total_order: 167, disputed_order: 9 },
];

// Shipment graph (5 days) - used by ShipmentGraph
export const DUMMY_SHIPMENT_GRAPH = {
  data: [
    { name: 'Shipped', data: [45, 52, 48, 61, 55] },
    { name: 'Delivered', data: [38, 44, 42, 50, 48] },
    { name: 'In Transit', data: [25, 30, 28, 35, 32] },
    { name: 'NDR', data: [3, 5, 4, 6, 4] },
  ],
  date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
};

// Tickets/Support chart
export const DUMMY_TICKETS_CHART = {
  open_tickets: [12, 15, 10, 18],
  closed_tickets: [8, 12, 15, 10],
  closed_within_tat: [6, 9, 12, 8],
};

// Orders table - full order structure for Orders page
const createDummyOrder = (id, overrides = {}) => {
  const baseDate = new Date();
  const orderDate = new Date(baseDate.getTime() - id * 86400000);
  return {
    id,
    customer_order_number: `ORD-${1000 + id}`,
    order_date: orderDate.toISOString(),
    created_at: orderDate.toISOString(),
    channel: 'amazon',
    order_type: 'Forward',
    is_mps: false,
    order_tag: [],
    invoice_amount: 599 + (id * 150),
    payment_type: id % 3 === 0 ? 'COD' : 'Prepaid',
    status: overrides.status || 'pending',
    order_courier_status: overrides.order_courier_status || 'Processing',
    awb_number: overrides.awb_number || (id <= 5 ? `AWB${123450 + id}` : null),
    courier_partner: overrides.courier_partner || (id <= 5 ? 'delhivery' : null),
    manifest_status: overrides.manifest_status || null,
    awb_assigned_date: overrides.awb_assigned_date || null,
    pickup_generate_datetime: overrides.pickup_generate_datetime || null,
    shipping_detail: {
      recipient_name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy', 'Anita Desai', 'Rahul Verma', 'Kavita Nair'][id % 8],
      mobile_number: `98765${43210 + id}`,
      address: `${100 + id} Main Street, Block ${id}`,
      landmark: 'Near City Mall',
      city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'][id % 8],
      state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'West Bengal', 'Gujarat'][id % 8],
      pincode: `${400000 + id * 100}`,
    },
    pickup_details: {
      p_warehouse_name: `Warehouse ${((id % 3) + 1)}`,
      p_address_line1: `${200 + id} Industrial Area`,
      p_address_line2: 'Sector 5',
      p_city: 'Mumbai',
      p_state: 'Maharashtra',
      p_pincode: '400001',
    },
    order_products: [
      { product_name: ['Wireless Earbuds', 'Smart Watch', 'Laptop Stand', 'Phone Case', 'USB Hub', 'Power Bank', 'Bluetooth Speaker', 'Tablet Cover'][id % 8], sku: `SKU-${1000 + id}`, quantity: 1 + (id % 3) },
    ],
    dimension_detail: {
      weight: 300 + (id * 100),
      vol_weight: 350 + (id * 100),
      length: 20 + id,
      breadth: 15 + id,
      height: 5 + (id % 5),
    },
    other_details: {
      channel_name: ['Amazon', 'Flipkart', 'Myntra', 'Meesho', 'Shopify'][id % 5],
      is_verified: id % 4 === 0,
      order_risk: ['Low', 'Medium', 'High'][id % 3],
    },
    ...overrides,
  };
};

export const DUMMY_ORDERS = [
  createDummyOrder(1, { order_courier_status: 'Processing', status: 'pending' }),
  createDummyOrder(2, { order_courier_status: 'Processing', status: 'pending' }),
  createDummyOrder(3, { order_courier_status: 'Ready_to_ship', status: 'pickup_requested', awb_number: 'AWB123456', courier_partner: 'delhivery', manifest_status: false }),
  createDummyOrder(4, { order_courier_status: 'Ready_to_ship', status: 'shipped', awb_number: 'AWB123457', courier_partner: 'bluedart' }),
  createDummyOrder(5, { order_courier_status: 'manifest', status: 'shipped', awb_number: 'AWB123458', courier_partner: 'ekart', manifest_status: true }),
  createDummyOrder(6, { order_courier_status: 'manifest', status: 'out_for_delivery', awb_number: 'AWB123459', courier_partner: 'dtdc' }),
  createDummyOrder(7, { order_courier_status: 'Returns', status: 'rto_initiated', awb_number: 'AWB123460', courier_partner: 'xpressbees' }),
  createDummyOrder(8, { order_courier_status: 'Processing', status: 'pending' }),
  createDummyOrder(9, { order_courier_status: 'Unprocessable', status: 'pending', order_type: 'Forward' }),
  createDummyOrder(10, { order_courier_status: 'Unprocessable', status: 'pending' }),
];

export const DUMMY_ORDERS_COUNT = 10;

// Label customization - LabelCustomization page
export const DUMMY_LABEL_CUSTOMIZATION = {
  contact_mask: true,
  shipping_address_visibility: true,
  header_logo_visibility: true,
  shipment_detail_visibility: true,
  awb_barcode_visibility: true,
  s_contact_mask: true,
  s_gst_mask: true,
  order_detail_visibility: true,
  manifest_date_visibility: true,
  order_barcode_visibility: true,
  ordernumber_visibility: true,
  product_detail_visibility: true,
  invoice_value_visibility: true,
  gift_visibility: false,
  all_product_display: true,
  display_full_product_name: true,
  other_charges: true,
  disclaimer_text: true,
  footer_visibility: true,
  tabular_form_enabled: true,
  footer_customize_value: 'THIS IS AN AUTO-GENERATED LABEL AND DOES NOT NEED SIGNATURE',
  custom_footer_enable: true,
  section1: true,
  section2: true,
  section3: true,
  section4: true,
  section5: true,
  section6: true,
  dimension_visibility: true,
  product_price_visibility: true,
  product_name_as_sku: false,
  s_warehouse_visibility: true,
};

// Courier allocation - Preferences (courier-category-new API)
const COURIER_IMG = 'https://via.placeholder.com/40';
export const DUMMY_COURIER_CATEGORY = [
  {
    title: 'Buffer Pool',
    partners: [
      { id: 101, image: COURIER_IMG, title: 'ShadowFax', courier_category_id: null },
      { id: 102, image: COURIER_IMG, title: 'Ecom Express', courier_category_id: null },
    ],
  },
  {
    title: 'B2C',
    partners: [
      { id: 1, image: COURIER_IMG, title: 'Delhivery', courier_category_id: 1 },
      { id: 2, image: COURIER_IMG, title: 'BlueDart', courier_category_id: 1 },
      { id: 3, image: COURIER_IMG, title: 'Ekart', courier_category_id: 1 },
    ],
  },
  {
    title: 'B2B',
    partners: [
      { id: 4, image: COURIER_IMG, title: 'DTDC', courier_category_id: 2 },
      { id: 5, image: COURIER_IMG, title: 'XpressBees', courier_category_id: 2 },
    ],
  },
];

// Courier allocation - Partner list for Add Rule form (partner-list-seller API)
export const DUMMY_COURIER_PARTNERS = [
  { id: 1, keyword: 'delhivery', title: 'Delhivery', image: COURIER_IMG },
  { id: 2, keyword: 'bluedart', title: 'BlueDart', image: COURIER_IMG },
  { id: 3, keyword: 'ekart', title: 'Ekart', image: COURIER_IMG },
  { id: 4, keyword: 'dtdc', title: 'DTDC', image: COURIER_IMG },
  { id: 5, keyword: 'xpressbees', title: 'XpressBees', image: COURIER_IMG },
];

// Courier allocation - Rules (GET courier-allocation/rules API returns { data: [...] })
export const DUMMY_COURIER_RULES = {
  data: [
    {
      id: 1,
      rule_name: 'Local Pincode - Metro Cities',
      priority: 1,
      status: true,
      preference_choices: [
        { condition_type: 'AND', criteria: 'Pincode', match_type: 'Starts with', match_value: '110,400,560' },
      ],
      priority_1: 'delhivery',
      priority_2: 'bluedart',
      priority_3: 'ekart',
      priority_4: 'dtdc',
      courier_image_1: COURIER_IMG,
      courier_title_1: 'Delhivery',
      courier_image_2: COURIER_IMG,
      courier_title_2: 'BlueDart',
      courier_image_3: COURIER_IMG,
      courier_title_3: 'Ekart',
      courier_image_4: COURIER_IMG,
      courier_title_4: 'DTDC',
    },
    {
      id: 2,
      rule_name: 'COD Orders - Tier 1',
      priority: 2,
      status: true,
      preference_choices: [
        { condition_type: 'AND', criteria: 'Payment Type', match_type: 'Equals', match_value: 'COD' },
        { condition_type: 'AND', criteria: 'Order Value', match_type: 'Greater than', match_value: '500' },
      ],
      priority_1: 'bluedart',
      priority_2: 'delhivery',
      priority_3: 'xpressbees',
      priority_4: '',
      courier_image_1: COURIER_IMG,
      courier_title_1: 'BlueDart',
      courier_image_2: COURIER_IMG,
      courier_title_2: 'Delhivery',
      courier_image_3: COURIER_IMG,
      courier_title_3: 'XpressBees',
      courier_image_4: COURIER_IMG,
      courier_title_4: '-',
    },
    {
      id: 3,
      rule_name: 'Express Delivery - Same Day',
      priority: 3,
      status: false,
      preference_choices: [
        { condition_type: 'AND', criteria: 'Shipping Type', match_type: 'Equals', match_value: 'Express' },
      ],
      priority_1: 'ekart',
      priority_2: 'bluedart',
      priority_3: '',
      priority_4: '',
      courier_image_1: COURIER_IMG,
      courier_title_1: 'Ekart',
      courier_image_2: COURIER_IMG,
      courier_title_2: 'BlueDart',
      courier_image_3: COURIER_IMG,
      courier_title_3: '-',
      courier_image_4: COURIER_IMG,
      courier_title_4: '-',
    },
  ],
};

// MIS Reports - 10 rows for Orders report (Reports tab)
const createMISReportOrder = (id) => ({
  id,
  customer_order_number: `ORD-${2000 + id}`,
  created_at: new Date(Date.now() - id * 86400000).toISOString(),
  channel: 'amazon',
  order_type: 'Forward',
  is_mps: false,
  invoice_amount: 599 + (id * 120),
  payment_type: id % 3 === 0 ? 'COD' : 'Prepaid',
  status: ['delivered', 'shipped', 'in_transit', 'out_for_delivery', 'pending'][id % 5],
  awb_number: `AWB${223456 + id}`,
  courier_partner: ['delhivery', 'bluedart', 'ekart', 'dtdc', 'xpressbees'][id % 5],
  shipping_detail: {
    recipient_name: ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy', 'Anita Desai', 'Rahul Verma', 'Kavita Nair', 'Suresh Iyer', 'Deepa Menon'][id - 1],
    mobile_number: `98765${43210 + id}`,
    address: `${100 + id} Park Street`,
    landmark: 'Near Metro',
    city: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'][id - 1],
    state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'West Bengal', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'][id - 1],
    pincode: `${400000 + id * 100}`,
  },
  pickup_details: {
    p_warehouse_name: `Warehouse ${((id % 3) + 1)}`,
    p_address_line1: `${200 + id} Industrial Area`,
    p_address_line2: 'Sector 5',
    p_city: 'Mumbai',
    p_state: 'Maharashtra',
    p_pincode: '400001',
  },
  order_products: [
    { product_name: ['Wireless Earbuds', 'Smart Watch', 'Laptop Stand', 'Phone Case', 'USB Hub', 'Power Bank', 'Bluetooth Speaker', 'Tablet Cover', 'Keyboard', 'Mouse'][id - 1], sku: `SKU-${2000 + id}`, quantity: 1 + (id % 2) },
  ],
  dimension_detail: {
    weight: 400 + (id * 80),
    length: 22 + id,
    breadth: 16 + id,
    height: 6 + (id % 4),
  },
});

export const DUMMY_MIS_REPORTS_ORDERS = {
  results: Array.from({ length: 10 }, (_, i) => createMISReportOrder(i + 1)),
  count: 10,
};

// Rate card / Shipping rates - ShippingRates component
export const DUMMY_RATING_CARD = [
  { partner: 'Delhivery', partner_image: 'https://via.placeholder.com/40', zone_a: 45, zone_b: 55, zone_c: 65, zone_d: 75, zone_e: 85, cod_charge: 30, cod_maintenance: 1.5, extra_charge_a: 25, extra_charge_b: 30, extra_charge_c: 35, extra_charge_d: 40, extra_charge_e: 45, rto_charge_a: 50, rto_charge_b: 60, rto_charge_c: 70, rto_charge_d: 80, rto_charge_e: 90 },
  { partner: 'BlueDart', partner_image: 'https://via.placeholder.com/40', zone_a: 65, zone_b: 75, zone_c: 85, zone_d: 95, zone_e: 105, cod_charge: 35, cod_maintenance: 1.8, extra_charge_a: 30, extra_charge_b: 35, extra_charge_c: 40, extra_charge_d: 45, extra_charge_e: 50, rto_charge_a: 65, rto_charge_b: 75, rto_charge_c: 85, rto_charge_d: 95, rto_charge_e: 105 },
  { partner: 'Ekart', partner_image: 'https://via.placeholder.com/40', zone_a: 40, zone_b: 50, zone_c: 60, zone_d: 70, zone_e: 80, cod_charge: 25, cod_maintenance: 1.2, extra_charge_a: 20, extra_charge_b: 25, extra_charge_c: 30, extra_charge_d: 35, extra_charge_e: 40, rto_charge_a: 45, rto_charge_b: 55, rto_charge_c: 65, rto_charge_d: 75, rto_charge_e: 85 },
  { partner: 'DTDC', partner_image: 'https://via.placeholder.com/40', zone_a: 50, zone_b: 60, zone_c: 70, zone_d: 80, zone_e: 90, cod_charge: 28, cod_maintenance: 1.4, extra_charge_a: 22, extra_charge_b: 28, extra_charge_c: 32, extra_charge_d: 38, extra_charge_e: 42, rto_charge_a: 55, rto_charge_b: 65, rto_charge_c: 75, rto_charge_d: 85, rto_charge_e: 95 },
  { partner: 'XpressBees', partner_image: 'https://via.placeholder.com/40', zone_a: 42, zone_b: 52, zone_c: 62, zone_d: 72, zone_e: 82, cod_charge: 26, cod_maintenance: 1.3, extra_charge_a: 21, extra_charge_b: 26, extra_charge_c: 31, extra_charge_d: 36, extra_charge_e: 41, rto_charge_a: 48, rto_charge_b: 58, rto_charge_c: 68, rto_charge_d: 78, rto_charge_e: 88 },
];

// Shipments page - /Shipments (Action Required, Action Requested, RTO, Delivered tabs)
const createDummyShipment = (id, action, overrides = {}) => {
  const baseDate = new Date();
  const orderDate = new Date(baseDate.getTime() - id * 86400000);
  const ndrCount = action === 'pending' ? 2 : action === 'requested' ? 1 : action === 'rto' ? 3 : 0;
  const statusMap = {
    pending: 'ndr_pending',
    requested: 'ndr_requested',
    rto: 'rto_initiated',
    delivered: 'delivered',
  };
  const courierPartners = ['delhivery', 'bluedart', 'ekart', 'dtdc', 'xpressbees'];
  const productNames = ['Wireless Earbuds', 'Smart Watch', 'Laptop Stand', 'Phone Case', 'USB Hub', 'Power Bank', 'Bluetooth Speaker', 'Tablet Cover'];
  const recipientNames = ['Rajesh Kumar', 'Priya Sharma', 'Amit Singh', 'Sneha Patel', 'Vikram Reddy', 'Anita Desai', 'Rahul Verma', 'Kavita Nair'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'West Bengal', 'Gujarat'];

  const ndrDetails = Array.from({ length: ndrCount }, (_, i) => ({
    action_date: new Date(orderDate.getTime() - (ndrCount - i) * 86400000).toISOString(),
    action_by: ['Courier', 'Customer', 'System'][i % 3],
    reason: ['Address not found', 'Customer unavailable', 'Office closed'][i % 3],
    remark: ['Will retry', 'Callback requested', 'RTO requested'][i % 3],
    action_status: ['pending', 'requested', 'rto'][i % 3],
  }));

  return {
    id: 5000 + id,
    customer_order_number: `ORD-SHP-${1000 + id}`,
    order_date: orderDate.toISOString(),
    created_at: orderDate.toISOString(),
    awb_assigned_date: orderDate.toISOString(),
    channel: 'amazon',
    order_type: id % 5 === 0 ? 'Reverse' : 'Forward',
    is_mps: id % 7 === 0,
    awb_number: `AWB${523450 + id}`,
    courier_partner: courierPartners[id % courierPartners.length],
    status: overrides.status || statusMap[action],
    ndr_details: ndrDetails,
    order_products: [
      { product_name: productNames[id % productNames.length], sku: `SKU-${3000 + id}`, quantity: 1 + (id % 2) },
    ],
    dimension_detail: {
      weight: 350 + (id * 80),
      vol_weight: 400 + (id * 80),
      length: 20 + id,
      breadth: 14 + id,
      height: 6 + (id % 4),
    },
    shipping_detail: {
      recipient_name: recipientNames[id % recipientNames.length],
      mobile_number: `98765${43210 + id}`,
      email: `customer${id}@example.com`,
      address: `${100 + id} Park Street, Block ${id}`,
      landmark: 'Near Metro Station',
      city: cities[id % cities.length],
      state: states[id % states.length],
      pincode: `${400000 + id * 100}`,
    },
    other_details: {
      is_verified: id % 4 === 0,
      ndr_reason: ndrCount > 0 ? 'Customer unavailable' : null,
      ndr_action_date: ndrCount > 0 ? orderDate.toISOString() : null,
      ndr_action: ndrCount > 0 ? 'Reattempt' : null,
    },
    ...overrides,
  };
};

const ACTIONS = ['pending', 'requested', 'rto', 'delivered'];
export const DUMMY_SHIPMENTS = Object.fromEntries(
  ACTIONS.map((action) => [
    action,
    Array.from({ length: 8 }, (_, i) => createDummyShipment((ACTIONS.indexOf(action) * 10) + i + 1, action)),
  ])
);

export const DUMMY_SHIPMENT_COUNTER = {
  pending_order_count: 12,
  requested_order_count: 8,
  delivered_order_count: 156,
  rto_order_count: 28,
};

// Shipment-new page KPIs (top section)
export const DUMMY_SHIPMENT_NEW_KPI = {
  affected_shipments: 8,
  financial_impact: '₹127.3K',
  avg_resolution_time: '55h',
  sla_breach: '25%',
};

// Partner list for CourierWiseDashboard (localStorage key: partnerList)
export const DUMMY_PARTNER_LIST = {
  delhivery: { image: 'https://via.placeholder.com/40', title: 'Delhivery', ndr_rating: 4.2, rto_rating: 4.0, pickup_rating: 4.5, delivery_rating: 4.3 },
  bluedart: { image: 'https://via.placeholder.com/40', title: 'BlueDart', ndr_rating: 4.1, rto_rating: 3.9, pickup_rating: 4.4, delivery_rating: 4.2 },
  ekart: { image: 'https://via.placeholder.com/40', title: 'Ekart', ndr_rating: 4.0, rto_rating: 3.8, pickup_rating: 4.3, delivery_rating: 4.1 },
  dtdc: { image: 'https://via.placeholder.com/40', title: 'DTDC', ndr_rating: 3.9, rto_rating: 3.7, pickup_rating: 4.2, delivery_rating: 4.0 },
  xpressbees: { image: 'https://via.placeholder.com/40', title: 'XpressBees', ndr_rating: 4.3, rto_rating: 4.1, pickup_rating: 4.6, delivery_rating: 4.4 },
};
