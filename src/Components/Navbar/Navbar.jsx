import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Sun, Moon, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar({ theme, toggleTheme, cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shrink, setShrink] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 300);
    }
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setShrink(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinkClasses = ({ isActive }) =>
    `text-md transition hover:text-mainColor hover:font-bold ${isActive ? 'text-mainColor font-bold' : ''
    }`;

  return (
    <motion.nav initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }} className={`fixed w-full z-50 bg-slate-200 dark:bg-slate-900 shadow-md ${shrink ? 'py-1' : 'py-3' } transition-all`} >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl text-mainColor dark:text-white transition-transform duration-300 hover:scale-105" >
          <img width="64" height="64" src="https://img.icons8.com/nolan/64/gallery.png" alt="gallery" />
          Gallery
        </NavLink>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-gray-800 dark:text-white">
          <li>
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
          </li>
          <li className={`relative ${animateCart ? 'animate-bounce' : ''}`}>
            <NavLink to="/cart" className={(navData) => `text-md transition hover:text-mainColor hover:font-bold flex items-center gap-1 relative ${navData.isActive ? 'text-mainColor font-bold' : '' } ${animateCart ? 'animate-bounce' : ''}`}>
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-mainColor text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>
          <li>
            <button onClick={toggleTheme} aria-label="Toggle Theme" className="cursor-pointer">
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700 dark:text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 flex flex-col items-start gap-4 text-gray-800 dark:text-white bg-slate-200 dark:bg-slate-900">
          <NavLink to="/" onClick={toggleMenu} className={navLinkClasses}>Home</NavLink>
          <NavLink to="/products" onClick={toggleMenu} className={navLinkClasses}>Products</NavLink>
          <NavLink to="/cart" onClick={toggleMenu} className={(navData) =>
            `${navLinkClasses(navData)} relative flex items-center gap-1`}>
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-mainColor text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            Cart
          </NavLink>
          <button onClick={toggleTheme} className="mt-2">
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
        </div>
      )}
    </motion.nav>
  );
}

export default Navbar;
