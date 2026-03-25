import { environment } from '../../../environments/environment';

const API_BASE   = `${environment.apiUrl}/api/v1`;
const PUBLIC_BASE = `${environment.apiUrl}/api/v1/public`;
const ADMIN_BASE  = `${environment.apiUrl}/api/v1/admin`;

// ── Auth ──────────────────────────────────────────────────────────────────────

export const AUTH_API = {
  LOGIN:    `${API_BASE}/auth/login`,
  REGISTER: `${API_BASE}/auth/register`,
  LOGOUT:   `${API_BASE}/auth/logout`,
  REFRESH:  `${API_BASE}/auth/refresh-token`,
  ME:       `${API_BASE}/auth/me`,
} as const;

// ── User ──────────────────────────────────────────────────────────────────────

export const USER_API = {
  BASE:            `${API_BASE}/users`,
  BY_ID:           (id: number | string) => `${API_BASE}/users/${id}`,
  PROFILE:         `${API_BASE}/users/profile`,
  CHANGE_PASSWORD: `${API_BASE}/users/change-password`,
  AVATAR:          (id: number | string) => `${API_BASE}/users/${id}/avatar`,
} as const;

// ── Public products (no auth required, always ACTIVE) ─────────────────────────

export const PUBLIC_PRODUCT_API = {
  BASE:    `${PUBLIC_BASE}/products`,
  BY_ID:   (id: number | string) => `${PUBLIC_BASE}/products/${id}`,
  BY_SLUG: (slug: string) => `${PUBLIC_BASE}/products/slug/${slug}`,
} as const;

// ── Admin products (ROLE_ADMIN required) ──────────────────────────────────────

export const ADMIN_PRODUCT_API = {
  BASE:           `${ADMIN_BASE}/products`,
  BY_ID:          (id: number | string) => `${ADMIN_BASE}/products/${id}`,
  EXPORT:         `${ADMIN_BASE}/products/export`,
  IMAGES:         (productId: number | string) => `${ADMIN_BASE}/products/${productId}/images`,
  IMAGE_BY_ID:    (productId: number | string, imageId: number | string) =>
                    `${ADMIN_BASE}/products/${productId}/images/${imageId}`,
  IMAGE_MAIN:     (productId: number | string, imageId: number | string) =>
                    `${ADMIN_BASE}/products/${productId}/images/${imageId}/main`,
  VARIANTS:       (productId: number | string) => `${ADMIN_BASE}/products/${productId}/variants`,
  VARIANT_BY_ID:  (productId: number | string, variantId: number | string) =>
                    `${ADMIN_BASE}/products/${productId}/variants/${variantId}`,
} as const;

// ── Public categories (no auth required) ──────────────────────────────────────

export const PUBLIC_CATEGORY_API = {
  TREE:    `${PUBLIC_BASE}/categories/tree`,
  BY_ID:   (id: number | string) => `${PUBLIC_BASE}/categories/${id}`,
  BY_SLUG: (slug: string) => `${PUBLIC_BASE}/categories/slug/${slug}`,
  LEVEL2:  `${PUBLIC_BASE}/categories/level2`,
  LEVEL3:  `${PUBLIC_BASE}/categories/level3`,
} as const;

// ── Admin categories (ROLE_ADMIN required) ────────────────────────────────────

export const ADMIN_CATEGORY_API = {
  BASE:   `${ADMIN_BASE}/categories`,
  FLAT:   `${ADMIN_BASE}/categories/flat`,
  ALL:    `${ADMIN_BASE}/categories/all`,
  TREE:   `${ADMIN_BASE}/categories/tree`,
  BY_ID:  (id: number | string) => `${ADMIN_BASE}/categories/${id}`,
  LEVEL1: `${ADMIN_BASE}/categories/level1`,
  LEVEL2: `${ADMIN_BASE}/categories/level2`,
  LEVEL3: `${ADMIN_BASE}/categories/level3`,
} as const;

// ── Order ─────────────────────────────────────────────────────────────────────

export const ORDER_API = {
  BASE:       `${API_BASE}/orders`,
  BY_ID:      (id: number | string) => `${API_BASE}/orders/${id}`,
  BY_NUMBER:  (orderNumber: string) => `${API_BASE}/orders/number/${orderNumber}`,
  CANCEL:     (id: number | string) => `${API_BASE}/orders/${id}`,   // DELETE
} as const;

export const ADMIN_ORDER_API = {
  BASE:       `${ADMIN_BASE}/orders`,
  BY_ID:      (id: number | string) => `${ADMIN_BASE}/orders/${id}`,
  STATUS:     (id: number | string) => `${ADMIN_BASE}/orders/${id}/status`,
} as const;

// ── Cart ──────────────────────────────────────────────────────────────────────

export const CART_API = {
  BASE:   `${API_BASE}/cart`,
  ADD:    `${API_BASE}/cart/items`,
  UPDATE: (itemId: number | string) => `${API_BASE}/cart/items/${itemId}`,
  REMOVE: (itemId: number | string) => `${API_BASE}/cart/items/${itemId}`,
  MERGE:  `${API_BASE}/cart/merge`,
} as const;

// ── Review ────────────────────────────────────────────────────────────────────

export const REVIEW_API = {
  BASE:       `${API_BASE}/reviews`,
  BY_PRODUCT: (productId: number | string) => `${API_BASE}/products/${productId}/reviews`,
  BY_ID:      (id: number | string) => `${API_BASE}/reviews/${id}`,
} as const;

// ── Admin misc ────────────────────────────────────────────────────────────────

export const ADMIN_API = {
  DASHBOARD:       `${ADMIN_BASE}/dashboard/stats`,
  USERS:           `${ADMIN_BASE}/users`,
  USER_BY_ID:      (id: number | string) => `${ADMIN_BASE}/users/${id}`,
  PRODUCTS:        `${ADMIN_BASE}/products`,
  ORDERS:          `${ADMIN_BASE}/orders`,
  REPORTS_SALES:   `${ADMIN_BASE}/reports/sales`,
  REPORTS_PRODUCTS:`${ADMIN_BASE}/reports/products`,
} as const;

// ── Legacy aliases (kept for gradual migration) ───────────────────────────────

/** @deprecated use PUBLIC_PRODUCT_API or ADMIN_PRODUCT_API */
export const PRODUCT_API = {
  BASE:        PUBLIC_PRODUCT_API.BASE,
  BY_ID:       PUBLIC_PRODUCT_API.BY_ID,
  EXPORT:      ADMIN_PRODUCT_API.EXPORT,
  SEARCH:      `${PUBLIC_BASE}/products/search`,
  BY_CATEGORY: (categoryId: number | string) => `${PUBLIC_BASE}/products/category/${categoryId}`,
  FEATURED:    `${PUBLIC_BASE}/products/featured`,
} as const;

/** @deprecated use PUBLIC_CATEGORY_API or ADMIN_CATEGORY_API */
export const CATEGORY_API = {
  BASE:   ADMIN_CATEGORY_API.BASE,
  FLAT:   ADMIN_CATEGORY_API.FLAT,
  ALL:    ADMIN_CATEGORY_API.ALL,
  BY_ID:  ADMIN_CATEGORY_API.BY_ID,
  TREE:   PUBLIC_CATEGORY_API.TREE,
  LEVEL1: ADMIN_CATEGORY_API.LEVEL1,
  LEVEL2: PUBLIC_CATEGORY_API.LEVEL2,
  LEVEL3: PUBLIC_CATEGORY_API.LEVEL3,
} as const;
