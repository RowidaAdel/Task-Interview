import React from "react";
import { CircleX, Trash, ShoppingCart } from "lucide-react";
import animationData from "../../assets/Images/zeroPurchase.json";
import AnimatedSVG from "../../Components/AnimatedSVG/AnimatedSVG";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useCart } from "../../Context/cartContext";

export default function Cart() {
  const { cart, removeItemcart, clearCart, updateCartItem, loading, disabled } = useCart();

  if (loading) return <Loading />;

  const safeCart = Array.isArray(cart) ? cart : [];

  const total = safeCart.reduce((acc, item) => {
    if (item.product && typeof item.product.price === "number") {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);

  if (safeCart.length === 0) {
    return (
      <div className="bg-slate-200 dark:bg-gray-800 py-10 min-h-[80vh] flex justify-center items-center">
        <div className="flex w-11/12 lg:w-3/4 items-center justify-center flex-col lg:flex-row gap-10">
          <div className="text-center lg:w-1/2" data-aos="fade-left">
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 leading-relaxed">
              Oops! Your Cart Is Empty. <br /> Start shopping now and find something you love! ❤
            </h3>
            <Link to="/" className="btn mt-6 inline-flex items-center gap-2 text-white text-lg bg-mainColor hover:bg-hoverColor px-6 py-3 rounded-xl transition">
              Start Shopping <ShoppingCart />
            </Link>
          </div>
          <div className="lg:w-1/2 w-full" data-aos="fade-right">
            <AnimatedSVG animationData={animationData} />
          </div>
        </div>
      </div>
    );
  }

  const handleUpdate = (productId, quantity) => {
    if (quantity < 1) return;
    updateCartItem(productId, quantity);
  };

  return (
    <div className="bg-slate-300 dark:bg-gray-800 min-h-[80vh] py-10">
      <div className="container mx-auto">
        {/* Summary */}
        <div data-aos="zoom-out" className="bg-white dark:bg-gray-700 border border-mainColor shadow-lg p-4 rounded-2xl max-w-sm mx-auto mb-8 text-center" >
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-100">
            <span className="text-mainColor dark:text-white me-2">💰</span>
            Total Price:{" "}
            <span className="text-mainColor dark:text-bgColor font-bold">
              {total.toFixed(2)} $
            </span>
          </h3>
          <h4 className="text-md mt-2 font-medium text-gray-600 dark:text-gray-300">
            Total Items: {safeCart.length}
          </h4>
        </div>
        {/* Items */}
        <div className="cart-items mt-5 grid grid-cols-1 gap-5">
          {safeCart.map(({ productId, product, quantity }, index) => (
            <div data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} key={productId || index}
              className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-gray-700 rounded-xl shadow-md p-5">
              <div className="w-full md:w-24 h-24 rounded-md overflow-hidden flex-shrink-0 border border-gray-500">
                {product && product.image ? (
                  <img loading="lazy" src={product.image} alt={product.title || "Product image"} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1 w-full md:px-4 text-center md:text-left">
                <h2 className="text-lg font-bold text-mainColor dark:text-bgColor">
                  {product && product.title
                    ? product.title.length > 40
                      ? product.title.slice(0, 30) + "..."
                      : product.title
                    : "No Title"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Category :{" "}
                  {product && product.category ? product.category : "Unknown"} |{" "}
                  <span className="text-green-600 ml-1">Available</span>
                </p>
                <p className="text-sm text-amber-600 font-semibold mt-1">
                  Rate: ⭐ 4.8
                </p>
                <p className="text-sm text-bgColor font-semibold mt-1">
                  Price:{" "}
                  {product && typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : "N/A"}{" "}
                  $
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden shadow-sm">
                  <button aria-label="decrease" onClick={() => handleUpdate(productId, quantity - 1)} disabled={quantity <= 1 || disabled}
                    className="bg-mainColor hover:bg-hoverColor text-white px-3 py-1 transition disabled:opacity-50">
                    −
                  </button>
                  <input id={`quantity-${productId}`} type="number" min="1" value={quantity} onChange={(e) =>
                    handleUpdate(productId, Number(e.target.value))}
                    className="w-12 text-center text-sm border-x border-gray-300 dark:border-gray-600 outline-none dark:bg-gray-700 dark:text-white" />
                  <button aria-label="increase" onClick={() => handleUpdate(productId, quantity + 1)}
                    disabled={disabled} className="bg-mainColor hover:bg-hoverColor text-white px-3 py-1 transition" >
                    +
                  </button>
                </div>
                <p className="text-mainColor dark:text-white font-semibold">
                  Total:{" "}
                  {product && typeof product.price === "number"
                    ? (product.price * quantity).toFixed(2)
                    : "N/A"}{" "}
                  $
                </p>
                <button className="cursor-pointer group order-last max-sm:order-first p-2 rounded-full border-2 border-transparent text-gray-500 hover:text-red-600 hover:border-red-600 transition-transform duration-300 ease-in-out"
                  onClick={() => removeItemcart(productId)} aria-label="Remove item"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "rotate(90deg)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "rotate(0deg)")
                  }
                  onFocus={(e) =>
                    (e.currentTarget.style.transform = "rotate(90deg)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.transform = "rotate(0deg)")
                  }
                >
                  <CircleX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={clearCart} className="btn bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl inline-flex items-center gap-2"  >
            <Trash />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
