import classes from "./Root.module.css";

import { Outlet, Link } from "react-router-dom";
import MainNavigation from "../components/Navigation/MainNavigation";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { serverUrl } from "../utils/auth";
import { getToken } from "../utils/auth";

const RootLayout = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = serverUrl;
  const token = getToken();

  // Lấy email của active user bằng API
  const getUserProfile = useCallback(
    async function () {
      try {
        const res = await fetch(`${url}user-profile`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const data = await res.json();

        if (res.status === 401 || res.status === 555) {
          navigate("/login");
        }

        if (res.status === 200) {
          dispatch(
            authActions.logIn({
              email: data.user.email,
            })
          );
        }
      } catch (err) {
        console.log(err);
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
