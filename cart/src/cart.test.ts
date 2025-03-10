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
});
