import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
            <li className="nav-item">
              <NavLink className="nav-link" to="item">
                Add Item
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                View Items
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="category">
                Category
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <p className="fw-bold fs-5 my-2 text-light">Welcome, Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
