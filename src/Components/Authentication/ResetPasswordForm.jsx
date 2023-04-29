import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { url } from "../../controllers/API";

const ResetPasswordForm = ({ email }) => {
  const [user, setUser] = useState({
    otp: 0,
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.otp || !user.password || !user.confirmPassword) {
      toast.error("Please fill the required fields!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (user.password !== user.confirmPassword) {
      toast.error("Mismatch Password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/api/user/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token: user.otp,
          password: user.password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password Updated Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setUser({
          otp: 0,
          password: "",
          confirmPassword: "",
        });
        navigate("../login");
        return;

      } else {
        toast.error(`${data.error}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center fs-1 fw-bold mb-3">Change Password</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fs-6 mb-2">OTP Code</label>
              <input
                type="number"
                maxLength={4}
                placeholder="Type.."
                required
                className="form-control"
                name="otp"
                value={user.otp}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="fs-6 mb-2 ">
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
                      class={`fa-solid ${show ? "fa-eye-slash" : "fa-eye"}`}
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
              <label htmlFor="password" className="fs-6 mb-2 ">
                Confirm Password
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
                  name="confirmPassword"
                  placeholder="Type here.."
                  required
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-success me-3">
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
