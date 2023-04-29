import React from "react";
import { useGlobalContext } from "../../Contexts/context";

const ItemCard = ({ item }) => {
  const { addToCart, cart, removeFromCart } = useGlobalContext();

  const { name, description, _id, price, quantity, image } = item;
  return (
    <div className="card mt-3" style={{ width: "20rem" }}>
      <img src={image} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5
          className="card-title text-center fw-bold my-3"
          style={{ textTransform: "capitalize" }}
        >
          {name}
        </h5>
        <p className="card-text my-3 fs-5">{description}</p>
        <div className="my-1">
          <p className="fw-bold fs-6 d-inline-block">Price per {name}: </p>
          <span className="badge bg-info fs-6 ms-2">
            <i className="fa-solid fa-indian-rupee-sign"></i>
            {price}
          </span>
        </div>
        <div className="my-1">
          <p className="fw-bold fs-6 d-inline-block">Available Quantity: </p>
          <span className="badge bg-warning fs-6 ms-2">{quantity} pieces</span>
        </div>
        {cart.some((i) => i._id === _id) ? (
          <button
            className="btn d-block btn-danger btn-md w-100 my-3"
            onClick={() => removeFromCart(_id)}
          >
            Remove from Cart
          </button>
        ) : (
          <button
            className="btn d-block btn-info btn-md w-100 my-3"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
