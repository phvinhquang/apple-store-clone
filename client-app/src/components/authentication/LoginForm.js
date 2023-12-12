import React, { useState } from "react";
import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

import useInput from "../../hooks/use-input";

const LoginForm = function () {
  const [submitError, setSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    if (!formIsValid) {
      return;
    }

    if (formIsValid) {
      const loginRequest = async function () {
        setIsLoading(true);

        // "https://apple-store-server-0biu.onrender.com/login"
        try {
          const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailValue,
              password: passwordValue,
            }),
          });

          const data = await res.json();

          const token = data.token;
          if (token) {
            const remainingMilliseconds = 1000 * 60 * 60 * 24 * 2;
            const expiryDate = new Date(
              new Date().getTime() + remainingMilliseconds
            );

            localStorage.setItem("token", token);
            localStorage.setItem("tokenExpiryDate", expiryDate.toISOString());
            localStorage.setItem("userId", data.userData._id);
          }

          if (res.status === 401) {
            setSubmitError(data.message);
          }

          if (res.status === 200) {
            dispatch(authActions.logIn(data.userData));

            //Clear input
            resetEmail();
            resetPassword();

            //Điều hướng về trang chủ
            navigate("/");
          }

          setIsLoading(false);
        } catch (err) {
          setSubmitError(err.message);
        }
      };
      loginRequest();
    }
  }

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
              {`${!isLoading ? " SIGN IN" : "CHECKING CREDENTIALS ..."}`}
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
