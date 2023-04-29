import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/context";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useGlobalContext();

  const [show, setShow] = useState();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user);

    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center fs-1 fw-bold mb-3">Login</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="fs-6 mb-2">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Type here.."
                required
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="fs-6 mb-2">
                Password
              </label>
              <div className="input-group">
                <div className="input-group-text f">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setShow(!show)}
                  >
                    <i
                      className={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"}`}
                    ></i>
                  </button>
                </div>
                <input
                  type={show ? "text" : "password"}
                  className="form-control"
                  name="password"
                  placeholder="Type here.."
                  required
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Link
                to="sendLink"
                className="text-secondary"
                style={{ textDecoration: "none" }}
              >
                Forget Password
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-success d-block mx-auto mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
