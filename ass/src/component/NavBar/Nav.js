import { useNavigate } from "react-router-dom";


export function Navbar() {
  const navigate = useNavigate();

  const storedAccount = localStorage.getItem("account");
  let account;
  if (storedAccount) {
    account = JSON.parse(storedAccount);
  }
  const logOut = () => {
    localStorage.removeItem("account");
    navigate("/");

  };
  return (
    <div className="w-100 bg-dark mb-3 ">
      <nav class="navbar navbar-expand-lg navbar-dark float-end ">
        <div
          class="container-fluid"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <p class="navbar-brand m-0 py-3">Tài Khoản: {account.fullName}</p>
        </div>
        <ul
          class="dropdown-menu dropdown-menu-dark dropdown-menu-center"
          onClick={logOut}
        >
          <li className="dropdown-item text-center ">Đăng Xuất</li>
        </ul>
      </nav>
    </div>
  );
}
