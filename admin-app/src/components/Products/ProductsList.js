import classes from "./ProductsList.module.css";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { serverUrl } from "../../utils/auth";
import { getToken } from "../../utils/auth";
import Table from "../../UI/Table";
import LoadingIndicator from "../../UI/LoadingIndicator";

let firstTime = true;

const ProductsList = function () {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState({ delete: false, id: null });
  const [deleteSuccess, setDeleteSucess] = useState(false);

  const url = serverUrl;
  const token = getToken();

  const searchChangeHandler = function (e) {
    setQuery(e.target.value);
  };

  // Hàm fetch all products, sau nhớ thêm credentials
  const fetchProducts = useCallback(
    async function () {
      setIsLoading(true);

      try {
        const res = await fetch(`${url}admin/products?query=${query}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        const data = await res.json();

        setProducts(data);
      } catch (err) {}

      setIsLoading(false);
    },
    [query]
  );

  // Thực hiện fetch product
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch data 2s sau khi người dùng ngừng nhập search
    const timer = setTimeout(() => {
      fetchProducts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [fetchProducts]);

  // Hàm request xóa product
  const deleteProduct = async function (hotelId) {
    setIsDeleting({ delete: true, id: hotelId });

    try {
      const req = await fetch(`${url}admin/delete-product/${hotelId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await req.json();

      if (req.status === 409) {
        setError(data.message);
      }

      if (req.status === 500) {
        setError(data.message);
      }

      if (req.status === 200) {
        setDeleteSucess(true);
        fetchProducts();
      }
    } catch (err) {}

    setIsDeleting({ delete: false, id: null });
  };

  // Xóa thông báo lỗi sau 3s
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 3000);
    }

    if (deleteSuccess) {
      setTimeout(() => {
        setDeleteSucess(false);
      }, 3000);
    }
  }, [error, deleteSuccess]);

  // Xử lý sự kiện delete
  const productDeleteHandler = function (productId) {
    setError(null);

    const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này không ?");
    if (confirm) {
      deleteProduct(productId);
    } else {
      return;
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <div>
          <h1>Products</h1>
          <input
            className={classes.search}
            type="text"
            placeholder="Enter Search"
            onChange={searchChangeHandler}
          />
        </div>

        <div>
          <Link className={classes["btn-new"]} to="/new-product">
            Add New
          </Link>
        </div>
      </div>

      <div className={classes["hotels-list-container"]}>
        {isLoading && <LoadingIndicator />}
        {!isLoading && (
          <Table
            resultsPerPage={products.length}
            totalPage="1"
            className={classes.table}
          >
            <thead>
              <tr>
                {/* <th className={classes.checkbox}>
                  <input type="checkbox" />
                </th> */}
                <th>
                  <p>ID</p>
                </th>
                <th>
                  <p>Name</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th>
                  <p>Image</p>
                </th>
                <th>
                  <p>Category</p>
                </th>
                <th>
                  <p>Edit</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product, i) => (
                  <tr
                    key={product._id}
                    className={`${i % 2 === 0 ? classes.dark : ""}`}
                  >
                    {/* <td className={classes.checkbox}>
                    <input type="checkbox" />
                  </td> */}
                    <td className={classes["id-column"]}>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString("de-DE")} VNĐ</td>
                    <td className={classes["img-td"]}>
                      <img className={classes.img} src={product.img1} />
                    </td>
                    <td>{product.category}</td>
                    <td>
                      {/* Sửa link to này */}
                      <Link to={`/edit-product?mode=edit&id=${product._id}`}>
                        <button type="button" className={classes["btn-new"]}>
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={productDeleteHandler.bind(this, product._id)}
                        className={classes["btn-delete"]}
                      >
                        {isDeleting.delete && isDeleting.id === product._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                      {deleteSuccess && <span>Xóa thành công</span>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}

        {error && <p className={classes["error-delete"]}>{error}</p>}
      </div>
    </div>
  );
};

export default ProductsList;
