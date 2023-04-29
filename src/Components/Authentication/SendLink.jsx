import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ResetPasswordForm from "./ResetPasswordForm";
import { url } from "../../controllers/API";

const SendLink = () => {
  const [showPassForm, setShowPassForm] = useState(false);
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email", {
        position: "top-center",
        autoClose: 5000,
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
      const res = await fetch(`${url}/api/user/sendMail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Check your mail!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setShowPassForm(true);
        return;
      } else {
        toast.error(`${data.error}`, {
          position: "top-center",
          autoClose: 5000,
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
        autoClose: 5000,
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
      {showPassForm ? (
        <ResetPasswordForm email={email} />
      ) : (
        <>
          <h1 className="text-center fs-1 fw-bold mb-3">Password Reset</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="fs-6 mb-2">
                    Email to Send Otp
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-success mx-auto mt-4 d-block"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </>
      )}
    </div>
  );
};

export default SendLink;
