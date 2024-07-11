import React from "react";
import { useNavigate } from "react-router-dom";

export function Navbar({ account }) {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("account");
    navigate("/");
  };

  return (
    <div className="w-100 bg-dark mb-3">
      <nav className="navbar navbar-expand-lg navbar-dark float-end">
        <div
          className="container-fluid"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <p className="navbar-brand m-0 py-3">
            Tài Khoản: {account ? account.username : ""}
          </p>
        </div>
        <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-center">
          <li className="dropdown-item text-center" onClick={logOut}>
            Đăng Xuất
          </li>
        </ul>
      </nav>
    </div>
  );
}
