import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage, { loader as homeProductLoader } from "./pages/HomePage";
import ShopPage, { loader as shopProductsLoader } from "./pages/ShopPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DetailPage, { loader as productDetailLoader } from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: homeProductLoader },
      {
        path: "shop",
        element: <ShopPage />,
        loader: shopProductsLoader,
      },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: productDetailLoader,
      },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
      { path: "/orders", element: <OrdersPage /> },
      { path: "/orders/:orderId", element: <OrderDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
