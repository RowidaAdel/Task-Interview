import React from 'react';
import { Outlet } from 'react-router-dom';
import Offline from '../../Pages/Offline/Offline';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import useTheme from '../../Hooks/useTheme';
import { useCart } from '../../Context/cartContext';
import ScrollToTopButton from '../ScrollBtn/ScrollBtn';
import Loading from '../Loading/Loading';

export default function Layout({ isOnline }) {
  const { theme, toggleTheme } = useTheme();
  const { cart, loading } = useCart();

  if (loading) {
    return <div className="loading bg-slate-300 dark:bg-gray-800 min-h-[80vh]"><Loading /></div>;
  }

  const cartCount = cart.length;

  return (
    <div className={theme}>
      <div className="flex flex-col bg-slate-300 dark:bg-slate-900 transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} cartCount={cartCount} />
        <main className="flex-grow pt-[80px] bg-slate-300 dark:bg-slate-800 min-h-screen">
          {!isOnline ? <Offline /> : <Outlet />}
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
}
