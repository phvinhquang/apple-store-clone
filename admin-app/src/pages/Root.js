import classes from "./Root.module.css";

import { Outlet, Link } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const RootLayout = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const token = tokenLoader();
  // const email = emailLoader();

  // useEffect(() => {
  //   if (token) {
  //     dispath(authActions.logIn({ token: token, email: email }));
  //   }

  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [token, email]);

  // Lấy email của active user bằng API
  const getUserProfile = useCallback(
    async function () {
      const res = await fetch(
        "https://app-store-server-242ec2432e8c.herokuapp.com/user-profile",
        {
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.status === 401) {
        navigate("/login");
      }

      if (res.status === 200) {
        dispatch(authActions.logIn({ email: data.user.email }));
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <main className={classes.main}>
      <h1 className={classes.title}>
        <Link to="/">Admin Page</Link>
      </h1>
      <div className={classes.vertical}></div>
      {/* <div></div> */}
      <div className={classes.line}></div>
      <MainNavigation />
      <div className={classes.vertical}></div>

      <div className={classes.outlet}>
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
