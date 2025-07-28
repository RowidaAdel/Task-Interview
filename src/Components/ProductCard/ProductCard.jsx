import React, { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../Context/cartContext";

function ProductCard({ item }) {
  const { getaddToCart } = useCart();
  const { id, title, image, price, rating, category } = item;
  const [isTouched, setIsTouched] = useState(false);
  const [adding, setAdding] = useState(false);

  const shortTitle = title.split(" ").slice(0, 3).join(" ");

  const handleAddToCart = useCallback(async () => {
    setAdding(true);
    try {
      await getaddToCart(id, 1);
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product.");
      console.error(error);
    } finally {
      setAdding(false);
    }
  }, [getaddToCart, id]);

  return (
    <div
      className="group bg-white dark:bg-slate-700 rounded-2xl shadow-lg p-4 flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-offset="120"
    >
      <div
        className="relative block overflow-hidden rounded-xl mb-4"
        onTouchStart={() => setIsTouched(prev => !prev)}
        onMouseLeave={() => setIsTouched(false)}
      >
        <div
          className={`absolute inset-0 bg-black/30 dark:bg-white/10 backdrop-blur-[1px] z-10 transition-opacity duration-300 ${isTouched ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } flex items-center justify-center`}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={handleAddToCart}
              disabled={adding}
              aria-label="Add To Cart"
              className={`flex items-center gap-1 bg-bgColor hover:bg-hoverColor text-white text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 delay-100 ${isTouched
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                } ${adding ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <ShoppingCart className="w-4 h-4" />
              {adding ? "Adding..." : "Add to Cart"}
            </button>
            <Link
              to={`/products/${id}`}
              className={`flex items-center gap-1 bg-mainColor hover:bg-hoverColor text-white text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 delay-200 ${isTouched
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
            >
              <Eye className="w-4 h-4" />
              Show Details
            </Link>
          </div>
        </div>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-48 object-contain transform transition-transform duration-500 group-hover:scale-105 group-hover:blur-[1px]"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between gap-2 z-0">
        <div>
          <h3 className="text-lg font-bold line-clamp-2 dark:text-white">{shortTitle}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {category}
            {rating?.count && (
              <span className="ml-2 text-bgColor">| ({rating.count} reviews)</span>
            )}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-mainColor dark:text-bgColor font-bold text-lg">{price} $</p>
          {rating?.rate && (
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-500" />
              <span>{rating.rate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function areEqual(prevProps, nextProps) {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.rating?.rate === nextProps.item.rating?.rate &&
    prevProps.item.title === nextProps.item.title
  );
}

export default memo(ProductCard, areEqual);
