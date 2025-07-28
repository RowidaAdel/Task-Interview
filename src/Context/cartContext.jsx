import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
const userId = 1;

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const saveToLocalStorage = (data) => {
    try {
      localStorage.setItem("cart", JSON.stringify(data));
    } catch (e) {
      console.error("❌ Failed to save cart", e);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("❌ Failed to load cart", e);
      return null;
    }
  };

  const getLoggedCart = async () => {
    setLoading(true);
    try {
      const localCart = loadFromLocalStorage();
      if (localCart) {
        setCart(localCart);
        setLoading(false);
        return;
      }

      const { data } = await axios.get("https://fakestoreapi.com/carts");
      const userCart = data.find((cart) => cart.userId === userId);

      if (userCart) {
        const productsWithDetails = await Promise.all(
          userCart.products.map(async (item) => {
            const res = await axios.get(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            return {
              ...item,
              product: res.data,
            };
          })
        );
        setCart(productsWithDetails);
        saveToLocalStorage(productsWithDetails);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    const loadingToast = toast.loading("Adding product...");
    setLoading(true);
    try {
      const res = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );

      const existingItem = cart.find((item) => item.productId === productId);
      let updatedCart;

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        updatedCart = cart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        toast.success(`🔄 Increased quantity to ${newQuantity}`);
      } else {
        const newItem = {
          productId,
          quantity,
          product: res.data,
        };
        updatedCart = [...cart, newItem];
        toast.success(`✅ Added ${quantity} item(s)`);
      }

      setCart(updatedCart);
      saveToLocalStorage(updatedCart);
    } catch (error) {
      console.error("❌ Error adding to cart:", error);
      toast.error("Error adding product");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    saveToLocalStorage(updatedCart);
    toast.success("🗑️ Product removed from cart");
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity < 1) return;
    setDisabled(true);
    const updatedCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    saveToLocalStorage(updatedCart);
    toast.success(`✅ Quantity updated to ${quantity}`);
    setTimeout(() => setDisabled(false), 300);
  };

  const clearCart = () => {
    setCart([]);
    saveToLocalStorage([]);
    toast.info("🧹 Cart cleared");
  };

  useEffect(() => {
    getLoggedCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, disabled, addToCart, removeItemcart: removeItem, updateCartItem, clearCart }} >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
