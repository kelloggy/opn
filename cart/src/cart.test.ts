import { Cart, DiscountType } from "./cart";

describe("Cart Class", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  test("should add an item to the cart", () => {
    cart.addItem(1, 2, 100);
    expect(cart.listItems()).toEqual([
      { productId: 1, quantity: 2, price: 100 },
    ]);
  });

  test("should update an item in the cart", () => {
    cart.addItem(1, 2, 100);
    cart.updateItem(1, 5, 200);
    expect(cart.listItems()).toEqual([
      { productId: 1, quantity: 5, price: 200 },
    ]);
  });

  test("should remove an item from the cart", () => {
    cart.addItem(1, 2, 100);
    cart.removeProduct(1);
    expect(cart.isCartEmpty()).toBe(true);
  });

  test("should get total amount", () => {
    cart.addItem(1, 2, 100);
    cart.addItem(5, 2, 100);
    expect(cart.totalAmount()).toBe(400);
  });

  test("should apply a percent discount with maxAmount", () => {
    cart.addItem(1, 2, 100);
    cart.applyDiscount("DISCOUNT10", DiscountType.PERCENT, 0, 5, 5);
    expect(cart.totalAmount()).toBe(195);
  });

  test("should apply a fixed discount", () => {
    cart.addItem(1, 10, 100);
    cart.applyDiscount("DISCOUNT10", DiscountType.FIXED, 100, 0, 0);
    expect(cart.totalAmount()).toBe(900);
  });

  test("should count unique items in the cart", () => {
    cart.addItem(1, 2, 100);
    cart.addItem(1, 2, 100);
    cart.addItem(2, 1, 200);
    expect(cart.countUniqueItems()).toBe(2);
  });

  test("should check if a product exists in the cart", () => {
    cart.addItem(1, 2, 100);
    expect(cart.isProductExist(1)).toBe(true);
    expect(cart.isProductExist(2)).toBe(false);
  });

  test("should check if the cart is empty", () => {
    expect(cart.isCartEmpty()).toBe(true);
    cart.addItem(1, 2, 100);
    expect(cart.isCartEmpty()).toBe(false);
  });

  test("should list all items in the cart", () => {
    cart.addItem(1, 2, 100);
    cart.addItem(2, 1, 200);
    expect(cart.listItems()).toEqual([
      { productId: 1, quantity: 2, price: 100 },
      { productId: 2, quantity: 1, price: 200 },
    ]);
  });

  test("should destroy the cart", () => {
    cart.addItem(1, 2, 100);
    cart.destroyCart();
    expect(cart.isCartEmpty()).toBe(true);
  });

  test("should apply freebie when product is added to the cart", () => {
    cart.addItem(1, 1, 100);
    cart.applyFreebie(1, 2);
    expect(cart.listItems()).toEqual([
      { productId: 1, quantity: 1, price: 100 },
      { productId: 2, quantity: 1, price: 0 },
    ]);
  });

  test("should not apply freebie if the purchased product is not in the cart", () => {
    cart.addItem(2, 1, 100);
    cart.applyFreebie(1, 2);
    expect(cart.isProductExist(1)).toBe(false);
  });

  test("should update freebies when a product is removed from the cart", () => {
    cart.addItem(1, 1, 100);
    cart.applyFreebie(1, 2);
    cart.removeProduct(1);
    expect(cart.isProductExist(2)).toBe(false);
  });

  test("should apply multiple freebies for different products", () => {
    cart.addItem(1, 1, 100);
    cart.addItem(3, 1, 50);

    cart.applyFreebie(1, 2);
    cart.applyFreebie(3, 4);

    expect(cart.isProductExist(2)).toBe(true);
    expect(cart.isProductExist(4)).toBe(true);

    expect(cart.listItems()).toEqual([
      { productId: 1, quantity: 1, price: 100 },
      { productId: 3, quantity: 1, price: 50 },
      { productId: 2, quantity: 1, price: 0 },
      { productId: 4, quantity: 1, price: 0 },
    ]);
  });
});
