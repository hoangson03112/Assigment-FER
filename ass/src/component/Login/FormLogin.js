import "./FormLogin.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";

import lodash from "lodash";

export default function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const checkUserName = () => {
    return axios
      .get(`http://localhost:3000/accounts?username=${userName}`)
      .then((res) => {
        if (res.data.length > 0) {
          return res.data;
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };

  const checkPassword = () => {
    return axios
      .get(`http://localhost:3000/accounts?password=${passWord}`)
      .then((res) => {
        if (res.data.length > 0) {
          return res.data;
        } else {
          return false;
        }
      })
      .catch((e) => {
        return false;
      });
  };

  const CheckLogin = async (e) => {
    e.preventDefault();
    const UserNameValid = await checkUserName();
    const PasswordValid = await checkPassword();

    if (UserNameValid && !PasswordValid) {
      alert("Mật Khẩu sai!");
    } else if (!UserNameValid && PasswordValid) {
      alert("Tên đăng nhập sai!");
    } else if (
      UserNameValid &&
      PasswordValid &&
      lodash.isEqual(UserNameValid[0], PasswordValid[0])
    ) {
      localStorage.setItem("account", JSON.stringify(UserNameValid[0]));
      navigate("/Home");
    } else {
      alert("Tên đăng nhập và mật khẩu không chính xác!");
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card bg-dark " style={{ marginRight: "1em" }}>
              <div className="card-body p-5 text-center">
                <div className="md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold  text-uppercase text-white ">Login</h2>
                  <p className="text-light mb-5">Quản Lí Công Việc</p>
                  <div className="inputContainer">
                    <form onSubmit={CheckLogin}>
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingUser"
                          placeholder="User"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingUser">Tên Đăng Nhập</label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          value={passWord}
                          onChange={(e) => setPassWord(e.target.value)}
                          required
                        />
                        <label htmlFor="floatingPassword">Mật Khẩu</label>
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                  <Link to={"/register"}>Đăng ký</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
