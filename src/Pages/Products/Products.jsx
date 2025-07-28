import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Loading from "../../Components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import Title from "../../Components/Title/Title";
import { Search } from "lucide-react";

export default function Products() {
    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["allProducts"],
        queryFn: async () => {
            const { data } = await axios.get("https://fakestoreapi.com/products");
            return data;
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        document.title = "Products";
        AOS.init({ duration: 800, once: false, offset: 120, easing: "ease-in-out" });
    }, []);

    useEffect(() => {
        if (products && products.length > 0) {
            setTimeout(() => {
                AOS.refreshHard();
            }, 500);
        }
    }, [products]);

    useEffect(() => {
        if (!products) return;

        let filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === "price-asc") filtered.sort((a, b) => a.price - b.price);
        else if (sortOption === "price-desc") filtered.sort((a, b) => b.price - a.price);
        else if (sortOption === "name-asc") filtered.sort((a, b) => a.title.localeCompare(b.title));

        setFilteredProducts(filtered);
    }, [products, searchTerm, sortOption]);

    if (isLoading) return <div className="loading bg-slate-300 dark:bg-gray-800 min-h-[80vh]"><Loading /></div>;
    if (isError) return <div className="text-center text-red-500 py-10"><p>Error at Fetch Data From Api</p></div>;

    return (
        <>
            <Helmet>
                <title>Products</title>
                <meta name="description" content="Browse all products available at Gallery. Find your favorites in electronics, fashion, home essentials, and more." />
            </Helmet>
            <div className="bg-slate-300 dark:bg-gray-800 min-h-[80vh] overflow-hidden">
                <div className="py-10 container px-6 sm:px-8 lg:px-20 max-w-7xl mx-auto">
                    <Title>Products</Title>
                    <div className="flex flex-col sm:flex-row items-center gap-4 my-8">
                        <div className="relative flex items-center flex-1">
                            <input id="search-products" name="search-products" type="text" placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                                className="input w-full p-3 pr-10 rounded border border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none" />
                            <Search size={20} className="absolute right-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
                        </div>
                        <select id="sort-products" name="sort-products" value={sortOption} onChange={e => setSortOption(e.target.value)}
                            className="p-3 rounded border border-gray-400 bg-slate-200 dark:border-gray-500 dark:bg-gray-700 dark:text-white cursor-pointer w-40"  >
                            <option value="">Sort By</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A - Z</option>
                        </select>
                    </div>
                    {filteredProducts.length === 0 ? (
                        <p className="text-center text-gray-700 dark:text-gray-300">No products found.</p>
                    ) : (
                        <div className="grid grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
