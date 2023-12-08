import React, { useState } from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../hooks/use-input";
import { useSelector } from "react-redux";

// import { userArr } from "../../users/userData";

const SignUpForm = function () {
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
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

  //Xử lý input Password
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(checkPasswordLength);

  //Xử lý input số điện thoại
  const {
    value: phoneNumberValue,
    isValid: phoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
    reset: resetPhoneNumber,
  } = useInput(checkPhoneNumberLength);

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

  // Hàm kiểm tra email
  function checkEmail(value) {
    //Báo lỗi nếu không chứa @
    if (!value.includes("@")) {
      return {
        status: false,
        error: " Bạn không được để trống email. Email cần đúng cú pháp",
      };
    } else {
      return {
        status: true,
      };
    }
  }

  //Hàm kiểm tra password
  function checkPasswordLength(value) {
    if (value.trim().length >= 6) {
      return { status: true };
    } else {
      return { status: false };
    }
  }

  //Hàm ki ểm tra số điện thoại
  function checkPhoneNumberLength(value) {
    if (value.trim().length === 10 || value.trim().length === 11) {
      return { status: true };
    } else {
      return { status: false };
    }
  }

  //Check valid toàn bộ form
  let formIsValid = false;
  if (
    fullNameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneNumberIsValid
  ) {
    formIsValid = true;
  }

  // Hàm gửi request Sign Up
  const signupRequest = async function (formData) {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok && !data.message) {
        throw new Error("Something went wrong");
      } else if (!res.ok && data.message) {
        throw new Error(data.message);
      } else if (res.status === 201) {
        //Clear input
        resetFullName();
        resetEmail();
        resetPassword();
        resetPhoneNumber();

        // Chuyển sang page login
        navigate("/login");
      }

      setIsLoading(false);
    } catch (err) {
      setHttpError(err.message);
    }
  };

  //Hàm xử lý sự kiện Submit
  const signUpSubmithandler = function (e) {
    e.preventDefault();

    //Nếu form không valid thì return
    if (!formIsValid) {
      return;
    }

    const formData = {
      // id: Math.trunc(Math.random() * 10000 + 1),
      fullname: fullNameValue,
      email: emailValue,
      password: passwordValue,
      phone: phoneNumberValue,
    };

    signupRequest(formData);
  };

  return (
    <React.Fragment>
      <div className={classes.login}>
        <div className={classes.card}>
          <h1>Sign Up</h1>

          {!isLoggedin && (
            <form className={classes.form} onSubmit={signUpSubmithandler}>
              <input
                type="text"
                value={fullNameValue}
                placeholder="Full Name"
                onChange={fullNameChangeHandler}
                onBlur={fullNameBlurHandler}
              />
              {fullNameHasError && (
                <p className={classes.error}>Bạn không được để trống tên.</p>
              )}
              <input
                type="email"
                value={emailValue}
                placeholder="Email"
                required
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
              />

              {emailHasError && (
                <p className={classes.error}>{emailIsValid.error}</p>
              )}
              <input
                type="password"
                value={passwordValue}
                placeholder="Password"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              {passwordHasError && (
                <p className={classes.error}>
                  Password cần có tối thiểu 8 kí tự
                </p>
              )}
              <input
                type="text"
                value={phoneNumberValue}
                placeholder="Phone"
                onChange={phoneNumberChangeHandler}
                onBlur={phoneNumberBlurHandler}
              />
              {phoneNumberHasError && (
                <p className={classes.error}>
                  Số điện thoại cần có 10 hoặc 11 số
                </p>
              )}
              <button>{`${
                isLoading ? "CREATING ACCOUNT ..." : "SIGN UP"
              }`}</button>
            </form>
          )}
          {isLoggedin && (
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              Bạn đang đăng nhập. Hãy Logout để đăng kí tài khoản mới
            </p>
          )}

          <div className={classes.action}>
            <span>Login ? </span>
            <Link to="/login">Click</Link>
          </div>
          {httpError && <p>{httpError}</p>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpForm;
