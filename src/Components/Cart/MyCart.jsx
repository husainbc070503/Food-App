import React from "react";
import { useGlobalContext } from "../../Contexts/context";
import Payment from "./Payment";
import { useNavigate } from "react-router-dom";

const MyCart = () => {
  const { cart, updateQuantity, items, removeFromCart, user, setCart } =
    useGlobalContext();

  const navigate = useNavigate();
  const getQuantity = (id) => {
    let qty = 0;
    for (let i of items) if (i._id === id) qty = i.quantity;
    return qty;
  };

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const handleClick = () => {
    Payment(user, cart, totalPrice);
    setTimeout(() => {
      setCart([]);
      navigate("/");
    }, 5000);
  };

  return (
    <div className="container mt-4 pb-4">
      <div className="my-4">
        <h4>My Cart Items</h4>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr className="fs-4">
              <th scope="col">#</th>
              <th scope="col" className="text-center">
                Details
              </th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => {
              const { name, description, image, price, quantity, _id } = item;

              return (
                <tr>
                  <th scope="row">
                    <p className="mt-5">{index + 1}</p>
                  </th>
                  <td>
                    <div className="row my-3">
                      <div className="col-md-4">
                        <img
                          src={image}
                          alt={name}
                          width="120"
                          height="120"
                          className="rounded-2 shadow"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="mb-3">
                          <h6 className="fw-bold d-inline-block">Name:</h6>
                          <span
                            className="ms-1"
                            style={{ textTransform: "capitalize" }}
                          >
                            {name}
                          </span>
                        </div>
                        <div className="mb-3">
                          <h6 className="fw-bold d-inline-block">
                            Description:
                          </h6>
                          <span className="mx-1">{description}</span>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(_id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    <form>
                      <select
                        className="form-select w-50 mt-5"
                        value={quantity}
                        onChange={(e) => updateQuantity(_id, e.target.value)}
                      >
                        {[...Array(getQuantity(_id))].map((_, index) => {
                          return <option value={index + 1}>{index + 1}</option>;
                        })}
                      </select>
                    </form>
                  </td>
                  <td>
                    <span className="badge bg-success fs-5 pb-0 mt-5">
                      <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                      <p className="d-inline-block">{price * quantity}</p>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-center fs-4 py-3 fw-bold">
                Total Price
              </td>
              <td>
                <span className="badge text-center d-inline-block mx-auto bg-primary fs-4">
                  <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                  {totalPrice}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>

        <button
          className="btn btn-warning float-end fw-bold"
          onClick={handleClick}
        >
          <i className="fa-brands fa-paypal me-2"></i>
          <span>Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default MyCart;
