import classes from "./ProductForm.module.css";
import Card from "../../UI/Card";
import useInput from "../../hooks/use-input";
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { serverUrl } from "../../utils/auth";
import { getToken } from "../../utils/auth";

const ProductForm = function () {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");
  const isEdit = searchParams.get("mode") === "edit";

  const [formError, setFormError] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoaing] = useState(false);
  const [httpError, setHtppError] = useState(null);
  const [successNoti, setSucessNoti] = useState(false);

  const url = serverUrl;
  const token = getToken();

  //Hàm check input rỗng
  const isEmpty = function (value) {
    return value.trim() !== "";
  };

  //Sử dụng custom hook useInput cho các input
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    setEnteredValue: setNameValue,
    reset: resetNameValue,
  } = useInput(isEmpty);

  const {
    value: categoryInputValue,
    isValid: categoryInputIsValid,
    hasError: categoryInputHasError,
    valueChangeHandler: categoryInputChangeHandler,
    inputBlurHandler: categoryInputBlurHandler,
    setEnteredValue: setCategoryValue,
    reset: resetCategoryValue,
  } = useInput(isEmpty);

  const {
    value: priceInputValue,
    isValid: priceInputIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceInputChangeHandler,
    inputBlurHandler: priceInputBlurHandler,
    setEnteredValue: setPriceValue,
    reset: resetPriceValue,
  } = useInput(isEmpty);

  const {
    value: stockInputValue,
    isValid: stockInputIsValid,
    hasError: stockInputHasError,
    valueChangeHandler: stockInputChangeHandler,
    inputBlurHandler: stockInputBlurHandler,
    setEnteredValue: setStockValue,
    reset: resetStockValue,
  } = useInput(isEmpty);

  const {
    value: shortDescInputValue,
    isValid: shortDescInputIsValid,
    hasError: shortDescInputHasError,
    valueChangeHandler: shortDescInputChangeHandler,
    inputBlurHandler: shortDescInputBlurHandler,
    setEnteredValue: setShortDescValue,
    reset: resetShortDescValue,
  } = useInput(isEmpty);

  const {
    value: longDescInputValue,
    isValid: longDescInputIsValid,
    hasError: longDescInputHasError,
    valueChangeHandler: longDescInputChangeHandler,
    inputBlurHandler: longDescInputBlurHandler,
    setEnteredValue: setLongDescValue,
    reset: resetLongDescValue,
  } = useInput(isEmpty);

  // Check valid form và submit
  let formIsValid = false;
  if (
    nameInputIsValid &&
    priceInputIsValid &&
    stockInputIsValid &&
    categoryInputIsValid &&
    shortDescInputIsValid &&
    longDescInputIsValid
  ) {
    formIsValid = true;
  }

  // Hàm gửi request tạo hotel mới
  const addNewProduct = async function (requestData) {
    setIsLoaing(true);
    setHtppError(null);
    setSucessNoti(false);

    //Set url theo trạng thái edit hoặc tạo mới
    let url = `${url}admin/new-product`;
    if (isEdit) {
      url = `${url}admin/edit-product/${productId}`;
    }

    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: requestData,
      });

      const data = await req.json();
      if (req.status === 401) {
        setHtppError(data);
      }
      if (req.status === 422 || req.status === 500) {
        throw new Error(data.message);
      }

      // Nếu request thành công thì thông báo lại ở dưới
      if (req.status === 201) {
        // navigate("/hotels");
        // Thông báo tạo sản phẩm thành công
        setSucessNoti(true);

        // Clear input
        resetNameValue();
        resetCategoryValue();
        resetPriceValue();
        resetStockValue();
        resetShortDescValue();
        resetLongDescValue();
      }
    } catch (err) {
      setHtppError(err.message);
    }

    setIsLoaing(false);
  };

  // Xử lý sự kiện nhấn submit
  const addNewProductHandler = function () {
    setFormError(false);

    // Nếu form invalid thì báo lỗi
    if (!formIsValid) {
      setFormError(true);
      return;
    }

    console.log("stock", stockInputValue);

    //Thu thập data để gửi request
    const requestData = new FormData();
    requestData.append("name", nameInputValue);
    requestData.append("category", categoryInputValue);
    requestData.append("price", priceInputValue);
    requestData.append("stock", stockInputValue);
    requestData.append("short_desc", shortDescInputValue);
    requestData.append("long_desc", longDescInputValue);
    // Append nhiều file ảnh vào formData
    for (let i = 0; i < images.length; i++) {
      requestData.append("images", images[i]);
    }

    addNewProduct(requestData);
  };

  // FETCH PRODUCT DETAIL ĐỂ EDIT
  const fetchProductDetail = useCallback(async function () {
    try {
      const res = await fetch(`${url}admin/product-detail/${productId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await res.json();

      setNameValue(data.product_detail.name);
      setCategoryValue(data.product_detail.category);
      setPriceValue(data.product_detail.price.toString());
      setStockValue(data.product_detail.stock.toString());
      setShortDescValue(data.product_detail.short_desc);
      setLongDescValue(data.product_detail.long_desc);
    } catch (err) {
      setHtppError(err.message);
    }
  }, []);

  //Nếu mode = edit thì fetch data của hotel đó đưa vào input
  useEffect(() => {
    if (isEdit) {
      fetchProductDetail();
    }
  }, [isEdit]);

  function imagesChange(e) {
    setImages(e.target.files);
  }

  return (
    <>
      <Card>
        <h1 className={classes.title}>
          {isEdit ? "Edit Product" : "Add New Product"}
        </h1>
      </Card>

      <Card className={classes["form-card"]}>
        <div className={classes["form-container"]}>
          <form>
            <div className={classes["form-flexbox"]}>
              <div className={classes["form-flexbox-left"]}>
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="name">Product Name</label>
                  </p>
                  <input
                    className={`${nameInputHasError && classes.error}`}
                    type="text"
                    id="name"
                    placeholder="Enter Product Name"
                    value={nameInputValue}
                    onChange={nameInputChangeHandler}
                    onBlur={nameInputBlurHandler}
                  />
                  {nameInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="category">Category</label>
                  </p>
                  <input
                    className={`${categoryInputHasError && classes.error}`}
                    type="text"
                    id="category"
                    placeholder="Enter Category"
                    value={categoryInputValue}
                    onChange={categoryInputChangeHandler}
                    onBlur={categoryInputBlurHandler}
                  />
                  {categoryInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="price">Price</label>
                  </p>
                  <input
                    className={`${priceInputHasError && classes.error}`}
                    type="text"
                    id="price"
                    placeholder="Enter Product Price"
                    value={priceInputValue.toLocaleString("de-DE")}
                    onChange={priceInputChangeHandler}
                    onBlur={priceInputBlurHandler}
                  />
                  {priceInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                {/* HERE */}
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="stock">Stock</label>
                  </p>
                  <input
                    className={`${stockInputHasError && classes.error}`}
                    type="text"
                    id="stock"
                    placeholder="Enter Product Stock"
                    value={stockInputValue}
                    onChange={stockInputChangeHandler}
                    onBlur={stockInputBlurHandler}
                  />
                  {stockInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                {/* HERE */}
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="short-desc">Short Description</label>
                  </p>
                  <textarea
                    className={`${classes["short-desc-textarea"]} ${
                      shortDescInputHasError && classes["error-textarea"]
                    }`}
                    id="short-desc"
                    placeholder="Enter Short Description"
                    value={shortDescInputValue}
                    onChange={shortDescInputChangeHandler}
                    onBlur={shortDescInputBlurHandler}
                  ></textarea>
                  {shortDescInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                <div className={classes["form-item"]}>
                  <p className={classes.label}>
                    <label htmlFor="short-desc">Long Description</label>
                  </p>
                  <textarea
                    className={`${classes["long-desc-textarea"]} ${
                      longDescInputHasError && classes["error-textarea"]
                    }`}
                    id="short-desc"
                    placeholder="Enter Long Description"
                    value={longDescInputValue}
                    onChange={longDescInputChangeHandler}
                    onBlur={longDescInputBlurHandler}
                  ></textarea>
                  {longDescInputHasError && (
                    <span className={classes["error-dot"]}>*</span>
                  )}
                </div>
                {/* Không hiện chọn ảnh nếu đang edit */}
                {!isEdit && (
                  <div className={classes["form-item"]}>
                    <p className={classes.label}>
                      <label htmlFor="images">Upload Images (4 Images)</label>
                    </p>
                    <input
                      onChange={imagesChange}
                      className={classes["img-input"]}
                      type="file"
                      id="images"
                      name="images"
                      multiple
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={classes["btn-submit"]}>
              <button type="button" onClick={addNewProductHandler}>
                {isLoading ? "Loading..." : "Submit"}
              </button>
              {formError && (
                <span className={classes["error-submit"]}>
                  Form chưa có đầy đủ thông tin. Hãy điền đầy đủ thông tin vào
                  những trường màu đỏ trước khi submit.
                </span>
              )}
              {httpError && (
                <span className={classes["error-submit"]}>{httpError}</span>
              )}
              {successNoti && !isEdit && (
                <p className={classes.success}>Tạo sản phẩm thành công</p>
              )}
              {successNoti && isEdit && (
                <p className={classes.success}>Cập nhật sản phẩm thành công</p>
              )}
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default ProductForm;
