import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../utils/auth";

const MainNavigation = function () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.email);
  const url = serverUrl;

  // Gửi request logout
  const logoutRequest = async function () {
    const res = await fetch(`${url}logout`, {
      method: "POST",
    });
    const data = res.json();

    if (res.status === 201) {
      navigate("/login");
    }
  };

  const logoutHandler = function () {
    const confirm = window.confirm("Bạn chắc chắn muốn đăng xuất chứ ?");

    if (confirm) {
      logoutRequest();
      dispatch(authActions.logOut());
    }
  };

  return (
    <nav>
      <h3>MAIN</h3>
      <NavLink to="/">
        <i className="fa-solid fa-database"></i>
        <span>Dashboard</span>
      </NavLink>

      <h3>LISTS</h3>
      <NavLink to="/products">
        <i className="fa-solid fa-mobile"></i> <span>Products</span>
      </NavLink>

      <h3>NEW</h3>
      <NavLink to="/new-product">
        <i className="fa-solid fa-mobile"></i> <span>New Product</span>
      </NavLink>

      <h3>USER</h3>
      {email && (
        <div className={classes.user}>
          {/* <i className="fa-regular fa-user"></i> */}
          <span>{email}</span>
        </div>
      )}
      <button
        type="button"
        className={classes["btn-logout"]}
        onClick={logoutHandler}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>
      </button>
    </nav>
  );
};

export default MainNavigation;
