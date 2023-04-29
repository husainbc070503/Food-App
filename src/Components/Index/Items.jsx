import React, { useState } from "react";
import { useGlobalContext } from "../../Contexts/context";
import ItemCard from "./ItemCard";

const Items = () => {
  const { categories, items } = useGlobalContext();

  const [filter, setFilter] = useState("");
  const filterQueries = () => {
    let newItems = items;

    if (filter === "sbp") newItems = newItems.sort((a, b) => a.price - b.price);

    if (filter === "sbq")
      newItems = newItems.sort((a, b) => a.quantity - b.quantity);

    return newItems;
  };

  return (
    <div className="container">
      <div className="my-4 mx-auto">
        <div className="d-md-flex align-items-center justify-content-between d-sm-block">
          <h2 className="fw-bold">Available Food Items</h2>
          <form>
            <select
              className="form-select"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="0">---Filter---</option>
              <option value="sbp">Sort By Price</option>
              <option value="sbq">Sort By Quantity</option>
            </select>
          </form>
        </div>
        <div className="mt-4">
          {categories.map((cat) => {
            return (
              <div className="mb-4" key={cat._id}>
                <div className="mb-3">
                  <h2>{cat.name}</h2>
                </div>

                <div className="row">
                  {filterQueries().map((item) => {
                    return item.category.name === cat.name ? (
                      <div className="col-md-4" key={item._id}>
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
    </div>
  );
};

export default Items;
