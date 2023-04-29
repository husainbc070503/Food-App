import React, { useState } from "react";
import { useGlobalContext } from "../Contexts/context";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { url } from "../controllers/API";

const Contact = () => {
  const { user } = useGlobalContext();

  const [contact, setContact] = useState({
    name: user.name,
    email: user.email,
    message: "",
  });

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${url}/api/usercontact/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message: contact.message }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(
          `Message send successfully. Soon we will contact you. Thank you for contacting us!`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        console.log(data.contact);
        setContact({ ...contact, message: "" });
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
      <ToastContainer transition={Zoom} />
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-center fs-1 fw-bold mb-3">Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="fs-6 mb-3">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={contact.name}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="fs-6 mb-3">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={contact.email}
                onChange={handleChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="fs-6 mb-3">
                Message
              </label>
              <textarea
                type="text"
                className="form-control"
                name="message"
                value={contact.message}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>
            <div className="mt-4">
              <button
                className="d-block mx-auto btn btn-outline-dark"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-4 mt-5 ">
          <div className="p-3 shadow rounded-3">
            <div className="mb-3">
              <span className="fw-bold">Name: </span>
              <span>Husain Champawala</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Email: </span>
              <span>husainchampawala@gmail.com</span>
            </div>
            <div className="mb-3">
              <span className="fw-bold">Contact: </span>
              <span>+91-8879525311</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
