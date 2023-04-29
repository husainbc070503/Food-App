import React from "react";
import { useGlobalContext } from "../../Contexts/FoodContext";

const View = () => {
  const { categories, setIsEditingCat, setEditCat, deleteCategory } =
    useGlobalContext();

  const handleEdit = (cat) => {
    setIsEditingCat(true);
    setEditCat(cat);
  };
  return (
    <div className="container">
      <div className="mb-4">
        <h2>View Categories</h2>
      </div>

      <div className="my-4">
        {categories.map((item) => {
          return (
            <div
              className="d-flex align-item-center justify-content-between my-4 shadow px-3 pt-3 rounded-3"
              key={item._id}
            >
              <div>
                <p className="fw-bold d-inline-block me-3">{item.name}</p>
                <span
                  className={`badge bg-${item.active ? "success" : "danger"}`}
                >
                  {item.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="icons">
                <i
                  className="fa fa-edit text-success me-3"
                  onClick={() => handleEdit(item)}
                ></i>
                <i
                  className="fa fa-trash text-danger"
                  onClick={() => deleteCategory(item._id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default View;
