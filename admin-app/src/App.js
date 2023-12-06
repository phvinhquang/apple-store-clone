import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import NewProductPage from "./pages/NewProduct";
import EditProductPage from "./pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/products",
        element: <ProductsPage />,
      },
      { path: "/new-product", element: <NewProductPage /> },
      { path: "/edit-product", element: <EditProductPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
