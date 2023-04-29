import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/context";

const UpdateProfile = () => {
  const { user, updateProfile } = useGlobalContext();

  const [updateUser, setUpdateUser] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
  });

  const handleChange = (e) =>
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  return (
    <div className="container mt-4">
      <h1 className="text-center fs-1 fw-bold mb-3">Update Profile</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateProfile(user._id, updateUser);
              setUpdateUser({
                name: user.name,
                email: user.email,
                address: user.address,
              });
            }}
          >
            <div className="mb-4">
              <label htmlFor="name" className="fs-6 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={updateUser.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="fs-6 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={updateUser.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="fs-6 mb-2">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                className="form-control"
                value={updateUser.address}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary d-block mx-auto mt-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
