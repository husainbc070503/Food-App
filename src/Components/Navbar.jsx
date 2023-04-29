import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../Contexts/context";

const Navbar = () => {
  const { user, cart } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Go Food
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {
              localStorage.getItem("food-purchase-user") ?
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">
                      Avalaible Items
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="contact">
                      Contact
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="updateProfile">
                      Update Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem("food-purchase-user");
                        navigate("/");
                      }}
                    >
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </span>
                  </li>
                </> : ""}
          </ul>
          <div className="d-flex" role="search">
            {!localStorage.getItem("food-purchase-user") ? (
              <>
                <Link to="/register" className="btn btn-outline-warning me-3">
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-success">
                  Login
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="myCart" className="position-relative text-light me-3">
                  <i className="fa-solid fa-cart-shopping fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </Link>
                <span className="fs-4 me-3 text-light">Welcome,</span>
                <button className="d-flex btn btn-success align-items-center justify-content-center">
                  <img src={user.pic} alt={user.name} id="user-profile" />
                  <span className="fw-bold">{user.name}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
