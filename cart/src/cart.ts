export enum DiscountType {
  FIXED,
  PERCENT,
}

interface Discount {
  type: DiscountType;
  amount: number;
  percent?: number;
  maxAmount?: number;
}

interface Product {
  quantity: number;
  price: number;
}

export class Cart {
  items: Map<number, Product>; // productId => {quantity, price}
  discounts: Map<string, Discount>; // discountName => {type, amount, percent, maxAmount}
  freebies: Map<number, number>; // productId => productId

  constructor() {
    this.items = new Map<number, Product>();
    this.discounts = new Map<string, Discount>();
    this.freebies = new Map<number, number>();
  }

  createCart() {
    this.items.clear();
    this.discounts.clear();
    this.freebies.clear();
  }

  addItem(productId: number, quantity: number, price: number) {
    this.items.set(productId, { quantity, price });
    this.applyFreebies();
  }

  // absolute update
  updateItem(productId: number, quantity: number, price: number) {
    if (quantity <= 0) {
      this.items.delete(productId);
    } else {
      this.items.set(productId, { quantity, price });
    }
    this.applyFreebies();
  }

  removeProduct(productId: number) {
    this.items.delete(productId);
    this.applyFreebies();
  }

  destroyCart() {
    this.createCart();
  }

  isProductExist(productId: number) {
    return this.items.has(productId);
  }

  isCartEmpty() {
    return this.items.size === 0;
  }

  listItems() {
    return Array.from(this.items.entries()).map(([productId, details]) => ({
      productId,
      quantity: details.quantity,
      price: details.price,
    }));
  }

  countUniqueItems() {
    return this.items.size;
  }

  totalAmount() {
    let total = 0;
    for (const { quantity, price } of this.items.values()) {
      total += quantity * price;
    }
    total -= this.calculateTotalDiscount(total);
    return total;
  }

  applyDiscount(
    name: string,
    type: DiscountType,
    amount: number,
    percent: number,
    maxAmount: number,
  ) {
    this.discounts.set(name, { type, amount, percent, maxAmount });
  }

  removeDiscount(name: string) {
    this.discounts.delete(name);
  }

  calculateTotalDiscount(total: number) {
    let totalDiscount = 0;
    for (const discount of this.discounts.values()) {
      if (discount.type === DiscountType.FIXED) {
        totalDiscount += discount.amount;
      } else if (discount.type === DiscountType.PERCENT) {
        const percent = discount.percent ?? 0;
        const maxAmt = discount.maxAmount ?? 0;
        totalDiscount += Math.min((percent / 100) * total, maxAmt);
      }
    }
    return totalDiscount;
  }

  applyFreebie(purchasedProductId: number, freebieProductId: number) {
    this.freebies.set(purchasedProductId, freebieProductId);
    this.applyFreebies();
  }

  applyFreebies() {
    for (const [
      purchasedProductId,
      freebieProductId,
    ] of this.freebies.entries()) {
      // Check if the purchased product is in the cart
      if (this.items.has(purchasedProductId)) {
        this.items.set(freebieProductId, { quantity: 1, price: 0 });
      } else {
        this.items.delete(freebieProductId);
        this.freebies.delete(purchasedProductId);
      }
    }
  }
}
