import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

import useInput from "../../hooks/use-input";

const LoginForm = function () {
  const [submitError, setSubmitError] = useState(false);
  const isLoggedin = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  } = useInput(checkPassword);

  function checkEmail(value) {
    if (value.includes("@")) {
      return { status: true };
    } else {
      return { status: false };
    }
  }

  function checkPassword(value) {
    if (value.trim() === "") {
      return { status: false };
    } else {
      return { status: true };
    }
  }

  //Check valid toàn bộ form
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  function signInHandler(e) {
    e.preventDefault();
    setSubmitError(false);
    console.log("form valid", formIsValid);
    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      const loginRequest = async function () {
        const res = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
            password: passwordValue,
          }),
          credentials: "include",
        });

        const data = await res.json();
        console.log(data);
        if (res.status === 401) {
          setSubmitError(data.message);
        }

        if (res.status === 200) {
          dispatch(authActions.logIn(data.user));

          //Clear input
          resetEmail();
          resetPassword();

          //Điều hướng về trang chủ
          navigate("/");
        }
      };
      loginRequest();

      // const logInUser = userArr.find((user) => user.email === emailValue);

      // if (!logInUser) {
      //   setSubmitError(true);
      //   return;
      // }

      // if (logInUser) {
      //   if (logInUser.password === passwordValue) {
      //     //Lưu người dùng đăng nhập xuống local storage
      //     currentUser[0] = logInUser;
      //     localStorage.setItem("currentUser", JSON.stringify(currentUser));

      //     // chuyển state thành logged in
      //     dispatch(authActions.logIn());
      //     console.log("Logged In");
      //   } else {
      //     resetPassword();
      //     setSubmitError(true);
      //     return;
      //   }
      // }
    }
  }

  // const testHandler = async function () {
  //   const loginRequest = async function () {
  //     const res = await fetch("http://localhost:5000/test-login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         smt: "empty",
  //       }),
  //       credentials: "include",
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //   };
  //   loginRequest();
  // };

  return (
    <div className={classes.login}>
      <div className={classes.card}>
        <h1>Login</h1>

        {!isLoggedin && (
          <form className={classes.form}>
            <input
              type="text"
              value={emailValue}
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailHasError && (
              <p className={classes.error}>Bạn cần nhập email đúng cú pháp</p>
            )}
            <input
              type="password"
              value={passwordValue}
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordHasError && (
              <p className={classes.error}>Bạn cần nhập password</p>
            )}
            {submitError && <p className={classes.error}>{submitError}</p>}
            <button
              type="button"
              className={classes.btn}
              onClick={signInHandler}
            >
              SIGN IN
            </button>
            {/* <button type="button" onClick={testHandler}>
              Test
            </button> */}
          </form>
        )}
        {isLoggedin && (
          <p style={{ textAlign: "center", fontSize: "20px" }}>
            Bạn đang đăng nhập. Hãy Logout để đăng nhập lại
          </p>
        )}

        <div className={classes.action}>
          <span>Create an account ? </span>
          <Link to="/register">Click</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
