import React, { lazy, Suspense, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import Title from "../../Components/Title/Title";
import { Search } from "lucide-react";

const Slider = lazy(() => import("../../Components/Slider/Slider"));

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    document.title = "Home";
    AOS.init({ duration: 800, once: false, offset: 120, easing: "ease-in-out" });

    async function fetchProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortOption === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sortOption === "name-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortOption]);

  useEffect(() => {
    if (products.length > 0) {
      setTimeout(() => {
        AOS.refreshHard();
      }, 500);
    }
  }, [products]);

  if (loading)
    return (
      <div className="loading bg-slate-300 dark:bg-gray-800 min-h-[80vh]">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 py-10">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Welcome to Gallery! Discover deals on clothing, electronics, and home essentials all in one place." />
      </Helmet>
      <div className="bg-slate-300 dark:bg-gray-800 min-h-[80vh] overflow-hidden">
        <div className="py-7 container px-6 sm:px-8 lg:px-20 max-w-7xl mx-auto">
          <div className="overflow-hidden mb-6">
            <Suspense fallback={<div>Loading slider...</div>}>
              <Slider />
            </Suspense>
          </div>
          <Title>Products</Title>
          {/* Filter and Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 my-8">
            <div className="relative flex items-center flex-1">
              <input id="search-products" name="search-products"  type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="input w-full p-3 pr-10 rounded border border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none"  />
              <Search size={20} className="absolute right-3 text-gray-400 dark:text-gray-500 pointer-events-none"/>
            </div>
            <select id="sort-products" name="sort-products" value={sortOption} onChange={e => setSortOption(e.target.value)}
              className="p-3 rounded border border-gray-400 bg-slate-200 dark:border-gray-500 dark:bg-gray-700 dark:text-white cursor-pointer w-40" >
              <option value="">Sort By</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A - Z</option>
            </select>
          </div>
          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-300">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 py-7 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((item, index) => (
                <ProductCard key={item.id || index} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
