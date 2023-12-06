import React, { useState } from "react";
import classes from "./CheckoutForm.module.css";
import useInput from "../../hooks/use-input";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const CheckoutForm = function () {
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  //Hàm kiểm tra input empty
  function isNotEmpty(value) {
    if (value.trim() !== "") {
      return { status: true };
    } else {
      return {
        status: false,
      };
    }
  }

  //Hàm kiểm tra email
  function checkEmail(value) {
    //Báo lỗi nếu không chứa @
    if (!value.includes("@")) {
      return {
        status: false,
      };
    } else {
      return {
        status: true,
      };
    }
  }

  //Hàm kiểm tra số điện thoại
  function checkPhoneNumberLength(value) {
    if (value.trim().length === 10 || value.trim().length === 11) {
      return { status: true };
    } else {
      return {
        status: false,
      };
    }
  }

  // Xử lý input Fullname
  const {
    value: fullNameValue,
    isValid: fullNameIsValid,
    hasError: fullNameHasError,
    valueChangeHandler: fullNameChangeHandler,
    inputBlurHandler: fullNameBlurHandler,
    reset: resetFullName,
  } = useInput(isNotEmpty);

  //Xử lý input Email
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(checkEmail);

  //Xử lý input số điện thoại
  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(checkPhoneNumberLength);

  // Xử lý input Address
  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: resetAddress,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (
    fullNameIsValid.status &&
    emailIsValid.status &&
    phoneNumberIsValid.status &&
    addressIsValid.status
  ) {
    formIsValid = true;
  }

  const addOrderRequest = async function (orderData) {
    setIsLoading(true);

    try {
      const request = await fetch("http://localhost:5000/products/add-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
        credentials: "include",
      });

      const data = await request.json();
      console.log(data);

      if (!request.ok && !data && !data.message) {
        throw new Error("Không thể tạo đơn hàng, vui lòng thử lại");
      }
      if (!request.ok && data.message) {
        throw new Error(data.message);
      }
      if (request.ok && request.status === 201) {
        dispatch(cartActions.clearCart());
        navigate("/orders");
      }
    } catch (err) {
      setHttpError(err.message);
    }

    setIsLoading(false);
  };

  const submitOrderHandler = function () {
    if (!formIsValid) {
      // Hiện và ẩn thông báo sau 3s
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      return;
    }
    // Gom data của người đặt hàng
    const customerData = {
      fullname: fullNameValue,
      email: emailValue,
      phone: phoneNumberValue,
      address: addressValue,
    };
    // Data của order là data của cart hiện tại
    const uploadItems = cart.items.map((item) => {
      return {
        productId: item.id,
        amount: item.amount,
        name: item.name,
        img: item.img,
        price: item.price,
      };
    });

    const orderProducts = {
      items: uploadItems,
      totalAmount: cart.totalAmount,
    };
    // Tạo object chứa Order Data: Gồm thông tin người order và sản phẩm(như cart)
    const orderData = {
      orderer: customerData,
      products: orderProducts,
    };
    // Request và clear cart
    addOrderRequest(orderData);
  };

  return (
    <form className={classes.form}>
      <label htmlFor="fullName">FULL NAME:</label>
      {fullNameHasError && (
        <p className={classes.error}>Không được để trống nhé bạn ơi</p>
      )}
      <input
        className={`${fullNameHasError ? classes.invalid : ""}`}
        type="text"
        id="fullName"
        placeholder="Enter Your Full Name Here!"
        value={fullNameValue}
        onChange={fullNameChangeHandler}
        onBlur={fullNameBlurHandler}
      />

      <label htmlFor="email">EMAIL:</label>
      {emailHasError && (
        <p className={classes.error}>Nhập đúng cú pháp nhé bạn ơi</p>
      )}
      <input
        className={`${emailHasError ? classes.invalid : ""}`}
        type="email"
        id="email"
        placeholder="Enter Your Email Here!"
        value={emailValue}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
      />

      <label htmlFor="phone">PHONE NUMBER:</label>
      {phoneNumberHasError && (
        <p className={classes.error}>Nhập đúng số vào bạn ơi</p>
      )}
      <input
        className={`${phoneNumberHasError ? classes.invalid : ""}`}
        type="text"
        id="phone"
        placeholder="Enter Your Phone Number Here!"
        value={phoneNumberValue}
        onChange={phoneNumberChangeHandler}
        onBlur={phoneNumberBlurHandler}
      />

      <label htmlFor="address">ADDRESS:</label>
      {addressHasError && (
        <p className={classes.error}>Không được để trống nhé</p>
      )}
      <input
        className={`${addressHasError ? classes.invalid : ""}`}
        type="text"
        id="address"
        placeholder="Enter Your Address Here!"
        value={addressValue}
        onChange={addressChangeHandler}
        onBlur={addressBlurHandler}
      />

      {formError && (
        <p className={classes.error}>Vui lòng điền đầy đủ thông tin vào form</p>
      )}
      <button type="button" onClick={submitOrderHandler}>
        {isLoading ? "Loading..." : "Place order"}
      </button>
      {httpError && <p className={classes.error}>{httpError}</p>}
    </form>
  );
};

export default CheckoutForm;
