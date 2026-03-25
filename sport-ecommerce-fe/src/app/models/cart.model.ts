export interface CartItemResponse {
  id:            number;
  variantId:     number;
  sku:           string;
  size:          string | null;
  color:         string | null;
  productId:     number;
  productName:   string;
  brand:         string | null;
  imageUrl:      string | null;
  quantity:      number;
  priceSnapshot: number;
  subtotal:      number;
}

export interface CartResponse {
  id:         number;
  items:      CartItemResponse[];
  totalItems: number;
  totalPrice: number;
}
