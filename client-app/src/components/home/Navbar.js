import React, { useEffect, useCallback } from "react";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Gửi request logout
  const logoutRequest = async function () {
    const res = await fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = res.json();
  };

  const logOutHandler = function () {
    const confirm = window.confirm("Bạn chắc chắn muốn đăng xuất chứ ?");

    if (confirm) {
      logoutRequest();
      dispatch(authActions.logOut());
      navigate("/");
    }
  };

  // Lấy email của active user bằng API
  const getUserProfile = useCallback(
    async function () {
      const res = await fetch("http://localhost:5000/user-profile", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 200) {
        dispatch(authActions.logIn(data.user));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <header>
      <nav className={classes["nav-container"]}>
        <div className={classes["nav-item"]}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/shop"
          >
            Shop
          </NavLink>
        </div>

        <h1 className={classes.title}>QUANG'S BOUTIQUE</h1>

        <div className={classes["nav-item"]}>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Orders</span>
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/login"
          >
            <i className="fa-solid fa-user"></i>
            <span className={classes.name}>
              {isLoggedIn ? user.fullname.split(" ").slice(-1)[0] : "Login"}
            </span>
            {isLoggedIn && <i className="fa-solid fa-caret-down"></i>}
          </NavLink>
          {isLoggedIn && <button onClick={logOutHandler}>{`(Logout)`}</button>}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
