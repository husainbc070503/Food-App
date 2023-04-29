import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Contexts/FoodContext";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const { setEditItem, setIsEditingItem, deleteItemCard } = useGlobalContext();

  const handleEdit = (item) => {
    setIsEditingItem(true);
    setEditItem(item);
    navigate("/item");
  };

  const { name, image, description, price, quantity, _id } = item;

  return (
    <div className="card shadow" style={{ width: "20rem" }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5
          className="card-title fw-bold text-center"
          style={{ textTransform: "capitalize" }}
        >
          {name}
        </h5>
        <p className="card-text my-3">{description}</p>
        <div className="my-1">
          <p className="fw-bold fs-5 d-inline-block">Price: </p>
          <span className="badge bg-info fs-6 ms-2">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            {price}
          </span>
        </div>
        <div className="my-1">
          <p className="fw-bold fs-5 d-inline-block">Quantity: </p>
          <span className="badge bg-warning fs-6 ms-2">{quantity}</span>
        </div>

        <div className="m-3 text-end fs-5">
          <i
            className="fa fa-edit text-success mx-2"
            onClick={() => handleEdit(item)}
            title="Edit Note"
          ></i>
          <i
            className="fa fa-trash text-danger mx-2"
            title="Delete Note"
            onClick={() => deleteItemCard(_id)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
