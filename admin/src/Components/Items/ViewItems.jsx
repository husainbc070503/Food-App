import React from "react";
import { useGlobalContext } from "../../Contexts/FoodContext";
import ItemCard from "./ItemCard";
import { useState } from "react";

const ViewItems = () => {
  const { items, categories, setSearch, search } = useGlobalContext();
  const [condition, setCondition] = useState("");

  const filterItems = () => {
    let newItems = items;

    if (condition === "sbp")
      newItems = newItems.sort((a, b) => a.price - b.price);

    if (condition === "sbq")
      newItems = newItems.sort((a, b) => a.quantity - b.quantity);

    return newItems;
  };

  return (
    <div className="container">
      <div className="mt-5">
        <div className="header mb-5 d-md-flex align-items-center justify-content-between flex-wrap d-sm-block">
          <h2 className="fw-bold">All Food Items</h2>
          <form>
            {condition === "search" ? (
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search.."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="ms-2 btn btn-sm btn-danger"
                  onClick={() => {
                    setCondition("");
                    setSearch("");
                  }}
                >
                  <i className="fa fa-xmark"></i>
                </button>
              </div>
            ) : (
              <select
                className="form-select"
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="0">--Filter--</option>
                <option value="sbp">Sort By Price</option>
                <option value="sbq">Sort By Quantity</option>
                <option value="search">Search</option>
              </select>
            )}
          </form>
        </div>

        {categories.map((cat) => {
          return (
            <div className="mb-5" key={cat._id}>
              <div className="mb-3">
                <h2>{cat.name}</h2>
              </div>
              <div className="row">
                {filterItems().map((item) => {
                  return item.category.name === cat.name ? (
                    <div key={item._id} className="col-md-4 mt-4 col-sm-1">
                      <ItemCard item={item} />
                    </div>
                  ) : (
                    ""
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewItems;
