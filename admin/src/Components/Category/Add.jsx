import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../../Contexts/FoodContext";
import { useEffect } from "react";

const Add = () => {
  const { addCategory, isEditingCat, editCat, editCategory } =
    useGlobalContext();

  const [cat, setCat] = useState({
    name: "",
    active: true,
  });

  const handleChange = (e) =>
    setCat({ ...cat, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditingCat ? editCategory(cat, editCat._id) : addCategory(cat);

    setCat({
      name: "",
      active: true,
    });
  };

  useEffect(() => {
    isEditingCat
      ? setCat(editCat)
      : setCat({
        name: "",
        active: true,
      });
  }, [editCat]);

  return (
    <div className="container">
      <div className="mb-4">
        <h2>Add Category</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cat-name" className="form-label fs-5 mb-3">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="cat-name"
            placeholder="Type.."
            required
            name="name"
            value={cat.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cat-name" className="form-label fs-5 mb-3">
            Status
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            name="active"
            value={cat.active}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className={`btn btn-md fw-bold mt-4 btn-outline-${isEditingCat ? "warning" : "success"
            }`}
        >
          {!isEditingCat ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Add;
