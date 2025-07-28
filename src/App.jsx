import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NetworkStatusWrapper from "./Components/NetworkStatusWrapper/NetworkStatusWrapper";
import Layout from "./Components/Layout/Layout";
import Home from './Pages/Home/Home';
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Notfound from "./Pages/Error/Error";
import Products from "./Pages/Products/Products";
import CartContextProvider from "./Context/cartContext";

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <NetworkStatusWrapper>
        {(isOnline) => <Layout isOnline={isOnline} />}
      </NetworkStatusWrapper>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'products/:id', element: <ProductDetails /> },
      { path: 'products', element: <Products /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <RouterProvider router={routes} />
        <ToastContainer position="top-right" />
      </CartContextProvider>
    </QueryClientProvider>
  );
}
