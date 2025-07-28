import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../../Context/cartContext";
import { toast } from "react-toastify";

export default function RelatedProductCard({ item }) {
    const { id, title, image, price, rating, category } = item;
    const [isHovered, setIsHovered] = useState(false);
    const { cart, addToCart } = useCart();
    const shortTitle = title.split(" ").slice(0, 3).join(" ");

    const handleAddToCart = () => {
        const exists = cart.find((product) => product.id === id);
        if (exists) {
            toast.info("Product already in cart. Quantity increased.");
        } else {
            toast.success("Product added to cart!");
        }
        addToCart(id, 1);
    };

    return (
        <div className="group bg-slate-100 dark:bg-slate-700 rounded-2xl shadow-lg p-4 flex flex-col justify-between overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
            data-aos="fade-up" data-aos-duration="700" data-aos-offset="120" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <div className="relative rounded-xl mb-4 overflow-hidden">
                <img src={image} alt={title} loading="lazy" className={`w-full h-48 object-contain transition-transform duration-500 ${isHovered ? "scale-105" : ""}`} />
                <div className={`absolute inset-0 bg-black/30 dark:bg-white/20 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}>
                    <Link to={`/products/${id}`} aria-label="Details" className="bg-mainColor hover:bg-hoverColor p-2 rounded-full text-white" >
                        <Eye className="w-5 h-5" />
                    </Link>
                    <button onClick={handleAddToCart} aria-label="Add To Cart" className="bg-bgColor hover:bg-hoverColor p-2 rounded-full text-white" >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-between gap-2 z-0">
                <div>
                    <h3 className="text-lg font-bold line-clamp-2 dark:text-white">
                        {shortTitle}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                        {category}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-mainColor dark:text-bgColor font-bold text-lg">
                        {price} $
                    </p>
                    {rating?.rate && (
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <span>{rating.rate.toFixed(1)}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
