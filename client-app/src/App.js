import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import LoadingIndicator from "./UI/LoadingIndicator";
// import ShopPage, { loader as shopProductsLoader } from "./pages/ShopPage";
// import DetailPage, { loader as productDetailLoader } from "./pages/DetailPage";

//Lazy Loading
const ShopPage = lazy(() => import("./pages/ShopPage"));
const DetailPage = lazy(() => import("./pages/DetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "shop",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ShopPage />
          </Suspense>
        ),
        loader: () =>
          import("./pages/ShopPage").then((module) => module.loader()),
      },
      {
        path: "detail/:productId",
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <DetailPage />
          </Suspense>
        ),
        loader: (meta) =>
          import("./pages/DetailPage").then((module) => module.loader(meta)),
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
