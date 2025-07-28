import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import RelatedProductCard from "../../Components/RelatedProductCard/RelatedProductCard";
import { ShoppingCart, Star } from "lucide-react";
import { Helmet } from "react-helmet";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Title from "../../Components/Title/Title";
import { useCart } from "../../Context/cartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoadingProduct(true);
      try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoadingProduct(false);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchRelated() {
      if (!product || !product.category) return;
      setLoadingRelated(true);
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(product.category)}`
        );
        const filtered = data.filter((item) => item.id !== product.id);
        setRelated(filtered);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoadingRelated(false);
      }
    }

    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);
    toast.success("Product added to cart!");
  };

  if (loadingProduct) return (
    <div className="loading bg-slate-300 dark:bg-gray-800 min-h-[80vh]">
      <Loading />
    </div>
  );
  if (!product) return <p className="text-center py-10 text-red-500">The product is not available or an error occurred.</p>;

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <div className="bg-slate-300 dark:bg-gray-800 min-h-[80vh] py-10 px-4 ">
        <div className="container mx-auto">
          <Title>Products Details</Title>
          <div className="mt-16 max-w-6xl mx-auto bg-slate-100 dark:bg-slate-700 p-6 rounded-2xl shadow-xl grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center">
              <img src={product.image} alt={product.title} className="w-full max-w-xs h-64 md:h-72 lg:h-80 object-contain rounded-xl shadow-md" />
            </div>
            {/* Product Details */}
            <div className="flex flex-col justify-center gap-4">
              {/* Title & Description */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {product.title ? product.title.split(" ").slice(0, 4).join(" ") : ""}
                </h1>
                <p className="text-md font-semibold text-mainColor dark:text-bgColor capitalize my-3">Category: {product.category}</p>
                <p className="text-sm text-gray-700 dark:text-gray-200 mt-2 leading-snug">{product.description}</p>
              </div>
              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-mainColor dark:text-bgColor">{product.price} $</p>
                {product.rating?.rate && (
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-5 h-5 fill-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{product.rating.rate}</span>
                  </div>
                )}
              </div>
              {/* Add To Cart */}
              <button className="flex items-center justify-center gap-2 bg-bgColor hover:bg-hoverColor text-white py-2 rounded-lg font-semibold transition duration-300 mt-4" onClick={handleAddToCart}>
                Add To Cart
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Products Related */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-16 px-4">
            <div className="mb-15">
              <Title>Products Related</Title>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.map(item => (
                <RelatedProductCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
