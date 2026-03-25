// ── Enums ─────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SHIPPED'
  | 'COMPLETED'
  | 'CANCELLED';

// ── Request models ────────────────────────────────────────────────────────────

export interface ShippingAddressRequest {
  fullName:    string;
  phone:       string;
  addressLine: string;
  ward:        string;
  district:    string;
  province:    string;
}

export interface CheckoutRequest {
  shippingAddress: ShippingAddressRequest;
  notes?:          string;
  paymentMethod?:  string;
}

export interface OrderStatusUpdateRequest {
  status: OrderStatus;
}

// ── Response models ───────────────────────────────────────────────────────────

export interface ShippingAddress {
  fullName:    string;
  phone:       string;
  addressLine: string;
  ward:        string;
  district:    string;
  province:    string;
}

export interface OrderItemResponse {
  id:               number;
  productVariantId: number;
  productName:      string;
  variantSku:       string;
  variantSize:      string;
  variantColor:     string;
  productImageUrl:  string | null;
  price:            number;
  quantity:         number;
  subtotal:         number;
}

export interface OrderResponse {
  id:              number;
  orderNumber:     string;
  status:          OrderStatus;
  paymentStatus:   string;
  items:           OrderItemResponse[];
  subtotal:        number;
  discountAmount:  number;
  shippingFee:     number;
  totalPrice:      number;
  shippingAddress: ShippingAddress;
  notes:           string | null;
  createdAt:       string;
  updatedAt:       string | null;
}

export interface OrderSummaryResponse {
  id:            number;
  orderNumber:   string;
  status:        OrderStatus;
  paymentStatus: string;
  itemCount:     number;
  totalPrice:    number;
  createdAt:     string;
}
