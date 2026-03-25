import { Injectable, inject } from '@angular/core';
import { StorageService } from '../../../core/services/storage/storage.service';
import { CartItemResponse, CartResponse } from '../../../models/cart.model';

/** localStorage key for the guest cart */
const GUEST_CART_KEY = 'guest_cart';

/**
 * A guest cart item carries the minimum info needed to display the cart
 * and to POST to the server merge endpoint after login.
 */
export interface GuestCartItem {
  /** Stable identifier for the guest cart (== variantId, since there's one item per variant). */
  id:          number;   // == variantId (used as item key in the guest cart)
  variantId:   number;
  productId:   number;
  productName: string;
  sku:         string;
  size:        string | null;
  color:       string | null;
  imageUrl:    string | null;
  price:       number;
  quantity:    number;
}

@Injectable({ providedIn: 'root' })
export class GuestCartService {
  private readonly storage = inject(StorageService);

  // ── Read ──────────────────────────────────────────────────────────────────

  getItems(): GuestCartItem[] {
    return this.storage.getLocal<GuestCartItem[]>(GUEST_CART_KEY) ?? [];
  }

  /** Builds a CartResponse-shaped object from localStorage so components can use one model. */
  asCartResponse(): CartResponse {
    const items = this.getItems();
    const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
    return {
      id:         0,
      items:      items.map(i => this.toCartItemResponse(i)),
      totalItems: items.reduce((s, i) => s + i.quantity, 0),
      totalPrice,
    };
  }

  // ── Write ─────────────────────────────────────────────────────────────────

  /**
   * Adds a variant to the guest cart.  If the variant already exists the
   * quantities are merged.  Returns the updated CartResponse-shaped object.
   */
  addItem(item: Omit<GuestCartItem, 'id'>): CartResponse {
    const items = this.getItems();
    const idx   = items.findIndex(i => i.variantId === item.variantId);

    if (idx !== -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push({ ...item, id: item.variantId });
    }

    this.save(items);
    return this.asCartResponse();
  }

  /**
   * Replaces the quantity of an item.  `id` here is the guest item id (== variantId).
   * Returns the updated CartResponse-shaped object.
   */
  updateItem(guestItemId: number, quantity: number): CartResponse {
    const items = this.getItems();
    const idx   = items.findIndex(i => i.id === guestItemId);

    if (idx !== -1) {
      if (quantity < 1) {
        items.splice(idx, 1);
      } else {
        items[idx].quantity = quantity;
      }
    }

    this.save(items);
    return this.asCartResponse();
  }

  removeItem(guestItemId: number): CartResponse {
    const items = this.getItems().filter(i => i.id !== guestItemId);
    this.save(items);
    return this.asCartResponse();
  }

  clear(): void {
    this.storage.removeLocal(GUEST_CART_KEY);
  }

  isEmpty(): boolean {
    return this.getItems().length === 0;
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private save(items: GuestCartItem[]): void {
    this.storage.setLocal(GUEST_CART_KEY, items);
  }

  private toCartItemResponse(g: GuestCartItem): CartItemResponse {
    return {
      id:            g.id,
      variantId:     g.variantId,
      sku:           g.sku,
      size:          g.size,
      color:         g.color,
      productId:     g.productId,
      productName:   g.productName,
      brand:         null,
      imageUrl:      g.imageUrl,
      quantity:      g.quantity,
      priceSnapshot: g.price,
      subtotal:      g.price * g.quantity,
    };
  }
}
