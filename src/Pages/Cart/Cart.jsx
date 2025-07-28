import React, { useEffect } from "react";
import Loading from "../../Components/Loading/Loading";
import { CircleX, Trash, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/cartContext";
import AnimatedSVG from "../../Components/AnimatedSVG/AnimatedSVG";
import animationData from "../../assets/Images/zeroPurchase.json";

export default function Cart() {
  const {
    cart,
    loading,
    disabled,
    removeItemcart,
    clearCart,
    updateCartItem,
    getLogedCart,
  } = useCart();

  useEffect(() => {
    getLogedCart();
  }, []);

  if (loading) return <Loading />;

  if (!cart || cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-10 bg-gray-50 dark:bg-slate-700">
        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-4xl">
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
              Your Cart is Empty
            </h2>
            <Link
              to="/products"
              className="mt-4 flex items-center gap-3 bg-mainColor hover:bg-hoverColor text-white text-lg font-semibold px-8 py-3 rounded-xl shadow-lg transition"
            >
              <span>Browse Products</span>
              <ShoppingCart size={30} />
            </Link>
          </div>
          <AnimatedSVG animationData={animationData} style={{ width: 240, height: 240 }} />
        </div>
      </div>
    );

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-700 p-8">
      <div className="max-w-5xl mx-auto bg-slate-100 dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100">
          Your Cart
        </h1>

        <div className="space-y-6">
          {cart.map(({ productId, product, quantity }) => (
            <div
              key={productId}
              className="flex flex-col sm:flex-row items-center gap-6 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <img
                src={product?.image}
                alt={product?.title}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold text-mainColor dark:text-bgColor">
                  {product?.title || "No Title"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Price: <span className="font-medium">${product?.price.toFixed(2)}</span>
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Category: <span className="capitalize">{product?.category || "Unknown"}</span>
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateCartItem(productId, quantity - 1)}
                  disabled={quantity <= 1 || disabled}
                  className="px-3 py-1 bg-mainColor text-white rounded-md hover:bg-hoverColor disabled:opacity-50 transition"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  disabled={disabled}
                  onChange={(e) => updateCartItem(productId, Number(e.target.value))}
                  className="w-16 text-center border rounded-md px-2 py-1 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={() => updateCartItem(productId, quantity + 1)}
                  disabled={disabled}
                  className="px-3 py-1 bg-mainColor text-white rounded-md hover:bg-hoverColor transition"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <p className="text-lg font-bold text-gray-800 dark:text-gray-100 w-24 text-center">
                ${(product?.price * quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItemcart(productId)}
                disabled={disabled}
                className="text-red-600 hover:text-red-700 transition"
                aria-label="Remove item"
              >
                <CircleX size={28} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center border-t border-gray-300 dark:border-gray-700 pt-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Total: ${total.toFixed(2)}
          </h2>
          <button
            onClick={clearCart}
            disabled={disabled}
            className="mt-4 sm:mt-0 px-8 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg transition"
          >
            <Trash className="inline-block mr-2" size={20} />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
