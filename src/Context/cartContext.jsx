import axios from "axios";
import React, { createContext, useEffect, useState, useCallback, useMemo, useContext } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const saveToLocalStorage = useCallback((data) => {
    localStorage.setItem("cart", JSON.stringify(data));
  }, []);

  const loadFromLocalStorage = useCallback(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }, []);

  const getLogedCart = useCallback(async () => {
    setLoading(true);
    try {
      const localCart = loadFromLocalStorage();
      setCart(localCart);
    } catch (error) {
      console.error("❌ Error fetching cart:", error);
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [loadFromLocalStorage]);

  const getaddToCart = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    const loadingToast = toast.loading("Adding product...");
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${productId}`);

      setCart((prevCart) => {
        const existingItem = prevCart.find(item => item.productId === productId);
        let updatedCart;

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          updatedCart = prevCart.map(item =>
            item.productId === productId ? { ...item, quantity: newQuantity } : item
          );
          toast.success(`🔄 Increased quantity to ${newQuantity}`);
        } else {
          const newItem = { productId, quantity, product: res.data };
          updatedCart = [...prevCart, newItem];
          toast.success(`✅ Added ${quantity} item to cart`);
        }

        saveToLocalStorage(updatedCart);
        return updatedCart;
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("❌ Error adding product");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  }, [saveToLocalStorage]);

  const removeItemcart = useCallback((productId) => {
    const loadingToast = toast.loading("Removing item...");
    setTimeout(() => {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(item => item.productId !== productId);
        saveToLocalStorage(updatedCart);
        toast.dismiss(loadingToast);
        toast.success("Product removed from cart");
        return updatedCart;
      });
    }, 500);
  }, [saveToLocalStorage]);

  const clearCart = useCallback(() => {
    setCart([]);
    saveToLocalStorage([]);
    toast.success("🧹 Cart cleared");
  }, [saveToLocalStorage]);

  const updateCartItem = useCallback((productId, quantity) => {
    if (quantity < 1) return;
    setDisabled(true);

    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      saveToLocalStorage(updatedCart);
      toast.success(`✅ Quantity updated to ${quantity}`);
      return updatedCart;
    });

    setTimeout(() => {
      setDisabled(false);
    }, 300);
  }, [saveToLocalStorage]);

  useEffect(() => {
    getLogedCart();
  }, [getLogedCart]);

  const contextValue = useMemo(() => ({
    cart,
    loading,
    disabled,
    getaddToCart,
    removeItemcart,
    clearCart,
    updateCartItem,
    getLogedCart,
  }), [cart, loading, disabled, getaddToCart, removeItemcart, clearCart, updateCartItem, getLogedCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
