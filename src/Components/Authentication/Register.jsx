import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGlobalContext } from "../../Contexts/context";

const Register = () => {
  const { registerUser } = useGlobalContext();

  const [show, setShow] = useState();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
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

    registerUser(user, pic);
  };

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error("Please upload your image", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    if (file.type != "image/png" && file.type != "image/jpeg") {
      toast.error("Please upload PNG or JPEG images", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-app-user-profile");
      data.append("cloud", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result) {
        setLoading(false);
        setPic(result.url);
        toast.success("Profile Pic uploaded successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Failed to upload image", {
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
      return;
    }
  };

  return (
    <div className="container mt-5 pb-3">
      <ToastContainer />
      <h1 className="text-center fs-1 fw-bold mb-3 ">Register</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="fs-6 mb-2 ">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Type here.."
                required
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="fs-6 mb-2 ">
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

            <div className="mb-3">
              <label htmlFor="address" className="fs-6 mb-2 ">
                Address
              </label>
              <textarea
                name="address"
                className="form-control"
                rows="5"
                placeholder="Type here.."
                value={user.address}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Profile Image
              </label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                id="formFile"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="btn btn-success d-block mx-auto mt-5"
              disabled={loading}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
