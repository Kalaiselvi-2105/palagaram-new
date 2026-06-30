export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

export interface OrderAddress {
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | "Pending"
  | "Accepted"
  | "Preparing"
  | "Ready"
  | "Packed"
  | "Out For Delivery"
  | "Delivered"
  | "Cancelled"
  | "Refunded"
  | "Returned"
  | "Completed";

export interface Order {
  id: string;
  date: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  gst: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
  invoiceNumber: string;
  estimatedDelivery: string;
  specialInstructions?: string;
  couponUsed?: string;
  address: OrderAddress;
  trackingNumber: string;
  customerNotes?: string;
  ratingGiven?: number;
}

export interface Notification {
  id: string;
  type: "order" | "offer" | "reservation" | "festival" | "reward";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
  available: boolean;
}

export interface SavedAddress {
  id: string;
  type: "Home" | "Office" | "Other";
  label: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface SavedPayment {
  id: string;
  type: "UPI" | "Card" | "Wallet";
  label: string;
  details: string;
  isDefault: boolean;
}

export const MOCK_PROFILE = {
  name: "Arjun Krishnamurthy",
  email: "arjun.k@email.com",
  phone: "+91 98765 43210",
  birthday: "1992-06-15",
  avatar: null as string | null,
  memberSince: "January 2023",
  membershipLevel: "Gold",
  loyaltyPoints: 2840,
  totalSpent: 18650,
  totalOrders: 47,
};

export const MOCK_ORDERS: Order[] = [
  {
    id: "PAL-2024-001",
    date: "2024-06-28",
    time: "7:45 PM",
    status: "Out For Delivery",
    items: [
      { id: "d1", name: "Chettinad Chicken Curry", price: 420, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop", category: "Main Course" },
      { id: "d2", name: "Garlic Naan", price: 60, quantity: 4, imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop", category: "Breads" },
      { id: "d3", name: "Mango Lassi", price: 120, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=200&h=200&fit=crop", category: "Beverages" },
    ],
    subtotal: 1200,
    gst: 72,
    deliveryCharge: 40,
    discount: 100,
    total: 1212,
    paymentMethod: "UPI",
    transactionId: "TXN8472910234",
    invoiceNumber: "INV-PAL-2024-001",
    estimatedDelivery: "8:15 PM",
    specialInstructions: "Please add extra pickle",
    couponUsed: "WELCOME50",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "42, Nungambakkam High Road",
      line2: "Apartment 3B",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600034",
    },
    trackingNumber: "TRK847291023",
    customerNotes: "Leave at door",
  },
  {
    id: "PAL-2024-002",
    date: "2024-06-25",
    time: "1:20 PM",
    status: "Delivered",
    items: [
      { id: "d4", name: "Mutton Biryani", price: 550, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop", category: "Biryani" },
      { id: "d5", name: "Raita", price: 80, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&h=200&fit=crop", category: "Sides" },
      { id: "d6", name: "Gulab Jamun", price: 120, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1601303516534-bf4524f0a0fd?w=200&h=200&fit=crop", category: "Desserts" },
    ],
    subtotal: 870,
    gst: 52,
    deliveryCharge: 40,
    discount: 0,
    total: 962,
    paymentMethod: "Credit Card",
    transactionId: "TXN1920374856",
    invoiceNumber: "INV-PAL-2024-002",
    estimatedDelivery: "2:00 PM",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "42, Nungambakkam High Road",
      line2: "Apartment 3B",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600034",
    },
    trackingNumber: "TRK192037485",
    ratingGiven: 5,
  },
  {
    id: "PAL-2024-003",
    date: "2024-06-20",
    time: "8:00 PM",
    status: "Completed",
    items: [
      { id: "d7", name: "Paneer Tikka", price: 320, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop", category: "Starters" },
      { id: "d8", name: "Dal Makhani", price: 280, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&h=200&fit=crop", category: "Main Course" },
      { id: "d9", name: "Butter Naan", price: 70, quantity: 3, imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop", category: "Breads" },
    ],
    subtotal: 1130,
    gst: 68,
    deliveryCharge: 0,
    discount: 150,
    total: 1048,
    paymentMethod: "Paytm Wallet",
    transactionId: "TXN5647382910",
    invoiceNumber: "INV-PAL-2024-003",
    estimatedDelivery: "8:40 PM",
    specialInstructions: "No onions please",
    couponUsed: "FLAT150",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "Sector 5, OMR",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600119",
    },
    trackingNumber: "TRK564738291",
    ratingGiven: 4,
  },
  {
    id: "PAL-2024-004",
    date: "2024-06-15",
    time: "12:45 PM",
    status: "Cancelled",
    items: [
      { id: "d10", name: "Fish Curry", price: 480, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop", category: "Main Course" },
      { id: "d11", name: "Appam", price: 60, quantity: 3, imageUrl: "https://images.unsplash.com/photo-1630409346824-4f5e15c93b3f?w=200&h=200&fit=crop", category: "Breads" },
    ],
    subtotal: 660,
    gst: 40,
    deliveryCharge: 40,
    discount: 0,
    total: 740,
    paymentMethod: "Credit Card",
    transactionId: "TXN7382910456",
    invoiceNumber: "INV-PAL-2024-004",
    estimatedDelivery: "1:30 PM",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "42, Nungambakkam High Road",
      line2: "Apartment 3B",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600034",
    },
    trackingNumber: "TRK738291045",
  },
  {
    id: "PAL-2024-005",
    date: "2024-06-10",
    time: "7:30 PM",
    status: "Refunded",
    items: [
      { id: "d12", name: "Chettinad Prawn Masala", price: 520, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=200&h=200&fit=crop", category: "Main Course" },
      { id: "d13", name: "Tandoori Roti", price: 50, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop", category: "Breads" },
    ],
    subtotal: 620,
    gst: 37,
    deliveryCharge: 40,
    discount: 0,
    total: 697,
    paymentMethod: "UPI",
    transactionId: "TXN2910456738",
    invoiceNumber: "INV-PAL-2024-005",
    estimatedDelivery: "8:10 PM",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "42, Nungambakkam High Road",
      line2: "Apartment 3B",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600034",
    },
    trackingNumber: "TRK291045673",
  },
  {
    id: "PAL-2024-006",
    date: "2024-05-28",
    time: "2:00 PM",
    status: "Delivered",
    items: [
      { id: "d14", name: "Veg Biryani", price: 320, quantity: 2, imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=200&fit=crop", category: "Biryani" },
      { id: "d15", name: "Halwa", price: 150, quantity: 1, imageUrl: "https://images.unsplash.com/photo-1601303516534-bf4524f0a0fd?w=200&h=200&fit=crop", category: "Desserts" },
    ],
    subtotal: 790,
    gst: 47,
    deliveryCharge: 40,
    discount: 80,
    total: 797,
    paymentMethod: "Debit Card",
    transactionId: "TXN4567382910",
    invoiceNumber: "INV-PAL-2024-006",
    estimatedDelivery: "2:40 PM",
    couponUsed: "WEEKEND20",
    address: {
      name: "Arjun Krishnamurthy",
      phone: "+91 98765 43210",
      line1: "Tech Park, OMR",
      city: "Chennai",
      state: "Tamil Nadu",
      pincode: "600119",
    },
    trackingNumber: "TRK456738291",
    ratingGiven: 5,
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "n1", type: "order", title: "Order Out for Delivery!", message: "Your order PAL-2024-001 is on the way. Expected in 30 mins.", time: "2 mins ago", read: false, icon: "🛵" },
  { id: "n2", type: "offer", title: "Weekend Special — 20% Off!", message: "Use code WEEKEND20 on your next order. Valid until Sunday.", time: "1 hour ago", read: false, icon: "🎉" },
  { id: "n3", type: "reward", title: "150 Points Credited!", message: "You earned 150 loyalty points from your last order.", time: "2 hours ago", read: false, icon: "⭐" },
  { id: "n4", type: "reservation", title: "Reservation Confirmed", message: "Your table for 4 on June 30 at 7:30 PM is confirmed.", time: "Yesterday", read: true, icon: "🪑" },
  { id: "n5", type: "festival", title: "Eid Special Menu is Live!", message: "Celebrate with our exclusive Eid special dishes. Limited time only.", time: "2 days ago", read: true, icon: "🌙" },
  { id: "n6", type: "order", title: "Order Delivered", message: "Your order PAL-2024-002 has been delivered. Rate your experience!", time: "3 days ago", read: true, icon: "✅" },
  { id: "n7", type: "offer", title: "New Combo Deal Alert!", message: "Try our new Family Feast Combo — 4 dishes + 4 drinks at ₹999.", time: "4 days ago", read: true, icon: "🍽️" },
];

export const MOCK_WISHLIST: WishlistItem[] = [
  { id: "w1", name: "Chettinad Chicken Curry", price: 420, imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=300&fit=crop", category: "Main Course", description: "Aromatic Chettinad spices with tender chicken in rich gravy", available: true },
  { id: "w2", name: "Mutton Biryani", price: 550, imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop", category: "Biryani", description: "Slow-cooked dum biryani with premium mutton and saffron", available: true },
  { id: "w3", name: "Prawn Pepper Masala", price: 520, imageUrl: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=300&h=300&fit=crop", category: "Seafood", description: "Fresh tiger prawns tossed in freshly ground pepper masala", available: true },
  { id: "w4", name: "Gulab Jamun", price: 120, imageUrl: "https://images.unsplash.com/photo-1601303516534-bf4524f0a0fd?w=300&h=300&fit=crop", category: "Desserts", description: "Soft milk-solid dumplings soaked in rose-flavored sugar syrup", available: true },
  { id: "w5", name: "Mango Sarbath", price: 90, imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&h=300&fit=crop", category: "Beverages", description: "Fresh Alphonso mango cooler with a hint of cardamom", available: false },
];

export const MOCK_ADDRESSES: SavedAddress[] = [
  {
    id: "a1", type: "Home", label: "Home",
    name: "Arjun Krishnamurthy", phone: "+91 98765 43210",
    line1: "42, Nungambakkam High Road", line2: "Apartment 3B",
    city: "Chennai", state: "Tamil Nadu", pincode: "600034", isDefault: true,
  },
  {
    id: "a2", type: "Office", label: "Office",
    name: "Arjun Krishnamurthy", phone: "+91 98765 43210",
    line1: "Tech Park, Sholinganallur", line2: "Block C, 2nd Floor",
    city: "Chennai", state: "Tamil Nadu", pincode: "600119", isDefault: false,
  },
  {
    id: "a3", type: "Other", label: "Mom's Place",
    name: "Meena Krishnamurthy", phone: "+91 91234 56789",
    line1: "18, Anna Nagar 3rd Street",
    city: "Chennai", state: "Tamil Nadu", pincode: "600040", isDefault: false,
  },
];

export const MOCK_SAVED_PAYMENTS: SavedPayment[] = [
  { id: "p1", type: "UPI", label: "Google Pay", details: "arjun@okaxis", isDefault: true },
  { id: "p2", type: "Card", label: "HDFC Credit Card", details: "•••• •••• •••• 4521", isDefault: false },
  { id: "p3", type: "Wallet", label: "Paytm Wallet", details: "₹850 Balance", isDefault: false },
];

export const STATUS_COLORS: Record<OrderStatus, { bg: string; text: string; border: string }> = {
  Pending: { bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200" },
  Accepted: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  Preparing: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  Ready: { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  Packed: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Out For Delivery": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  Delivered: { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  Cancelled: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  Refunded: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  Returned: { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" },
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};
