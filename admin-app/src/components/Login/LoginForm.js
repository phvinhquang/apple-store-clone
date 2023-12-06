import classes from "./LoginForm.module.css";
import Card from "../../UI/Card";
import useInput from "../../hooks/use-input";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";

const LoginForm = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [httpError, setHttpError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Hàm check input rỗng
  const isEmpty = function (value) {
    return value.trim() !== "";
  };

  const isEmail = function (value) {
    return value.includes("@");
  };

  //Sử dụng custom hook useInput cho các input
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isEmpty);

  let fomrIsValid = false;
  if (emailIsValid && passwordIsValid) {
    fomrIsValid = true;
  }

  const loginRequest = useCallback(async function (requestData) {
    setIsLoading(true);
    setHttpError(false);

    try {
      const req = await fetch(
        "https://app-store-server-242ec2432e8c.herokuapp.com/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          credentials: "include",
        }
      );

      const data = await req.json();

      if (req.status === 200) {
        dispatch(authActions.logIn({ email: data.user.email }));
        navigate("/");
      }

      if (req.status === 401) {
        setHttpError(data.message);
      }
    } catch (err) {
      setHttpError(err.message);
    }

    setIsLoading(false);
  }, []);

  const loginHandler = function () {
    if (!fomrIsValid) {
      return;
    }

    const formData = {
      email: emailValue.trim(),
      password: passwordValue.trim(),
    };

    //Gọi hàm gửi request
    loginRequest(formData);
  };

  return (
    <div className={classes["form-container"]}>
      <h1>Apple Store Admin</h1>
      <Card>
        <form className={classes.form}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="Email"
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={emailValue}
            />
            {emailHasError && (
              <p className={classes.error}>Bạn hãy nhập email đúng cú pháp</p>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              value={passwordValue}
            />
            {passwordHasError && (
              <p className={classes.error}>Bạn không được để trống password</p>
            )}

            <button
              type="button"
              className={classes["btn-login"]}
              onClick={loginHandler}
              disabled={!fomrIsValid}
            >
              Login
            </button>
            {httpError && <p className={classes.error}>{httpError}</p>}
            {isLoading && (
              <p className={classes.error}>
                Đang kiểm tra thông tin đăng nhập ...
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
