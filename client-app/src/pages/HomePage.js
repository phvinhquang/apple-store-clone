import React, { useCallback, useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import Catergories from "../components/home/Categories";
import Products from "../components/home/Products";
import AdditionalInfo from "../components/home/AdditionalInfo";
import LoadingIndicator from "../UI/LoadingIndicator";
// import { useLoaderData } from "react-router-dom";

function HomePage() {
  // const { banner, category, products } = useLoaderData();
  const [banner, setBanner] = useState("");
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm fetch data cho Homapage
  const fetchHomePageData = useCallback(async function () {
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://apple-store-server-0biu.onrender.com/products/homepage"
      );
      const data = await res.json();

      setBanner(data.banner);
      setCategory(data.category);
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchHomePageData();
  }, [fetchHomePageData]);

  return (
    <React.Fragment>
      {isLoading && (
        <>
          <LoadingIndicator />
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            Due to Render free hosting service, this might take a minute or two.
            Please wait...
          </p>
        </>
      )}
      {!isLoading && <Banner img={banner} />}
      {!isLoading && <Catergories imgs={category} />}
      {!isLoading && <Products products={products} />}
      {!isLoading && <AdditionalInfo />}
    </React.Fragment>
  );
}

export default HomePage;

// export const loader = async function () {
//   const res = await fetch(
//     "https://apple-store-server-0biu.onrender.com/products/homepage"
//   );

//   const data = await res.json();
//   return data;
// };
