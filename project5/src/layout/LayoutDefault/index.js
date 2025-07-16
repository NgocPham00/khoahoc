import React from "react";
import "./LayoutDefault.css";
import { NavLink, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer)
  console.log("isLogin:", isLogin);

  console.log(token);
  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">
            <NavLink to="/">Quiz</NavLink>
          </div>

          <nav className="menu">
            {token && (
              <>
                <NavLink to="/home">Trang chủ</NavLink>
                <NavLink to="/topics">Sản phẩm</NavLink>
                <NavLink to="/favorites">Yêu thích</NavLink>
                <NavLink to="/view-history">Lịch sử xem</NavLink>

              </>
            )}
          </nav>

          <div className="auth-links">
            {token ? (
              <>
                <NavLink to="/logout">Đăng xuất</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login">Đăng nhập</NavLink>
                <NavLink to="/register">Đăng kí</NavLink>
              </>
            )}
          </div>
        </header>

        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @2025 by Google
        </footer>
      </div>
    </>
  );
}
export default LayoutDefault;
