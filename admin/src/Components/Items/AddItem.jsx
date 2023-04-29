import React from "react";
import { useGlobalContext } from "../../Contexts/FoodContext";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const AddItem = () => {
  const { categories, addItem, editItem, isEditingItem, editItemCard } =
    useGlobalContext();

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  /* -------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) =>
    setItem({ ...item, [e.target.name]: e.target.value });

  /* -------------- HANDLE SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    isEditingItem ? editItemCard(item, editItem._id) : addItem(item, image);

    setItem({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
    });

    setImage("");
  };

  /* -------------- UPLOAD IMAGE ---------------- */
  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error("Please upload!", {
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
      toast.error("Onlu JPEG or PNG images are accepted", {
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
      data.append("upload_preset", "food-app-item-image");
      data.append("cloud", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (result) {
        toast.success("Image uploaded successfully.", {
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
        setImage(result.url);
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

  useEffect(() => {
    isEditingItem
      ? setItem(editItem)
      : setItem({
          name: "",
          description: "",
          price: "",
          quantity: "",
          category: "",
        });
  }, [editItem]);

  return (
    <div className="container mt-4 pb-5">
      <div className="mb-5 text-center">
        <h1>Add Food Item</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fs-5 mb-3">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type.."
                required
                name="name"
                value={item.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fs-5 mb-3">Price per item</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Type.."
                  required
                  name="price"
                  value={item.price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fs-5 mb-3">Description</label>
              <textarea
                type="text"
                className="form-control"
                required
                name="description"
                rows={5}
                value={item.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              {!isEditingItem ? (
                <>
                  <label className="form-label fs-5 mb-3">Category</label>
                  <select
                    name="category"
                    className="form-select"
                    onChange={handleChange}
                  >
                    {categories.map((e) => {
                      if (e.active) {
                        return (
                          <option key={e._id} value={e._id}>
                            {e.name}
                          </option>
                        );
                      }
                    })}
                  </select>
                </>
              ) : (
                ""
              )}
            </div>

            <div className="mb-4">
              <label className="form-label fs-5 mb-3">Quantity</label>
              <input
                type="number"
                className="form-control"
                required
                name="quantity"
                value={item.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              {!isEditingItem ? (
                <>
                  <label className="form-label">Image</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={(e) => handleUpload(e.target.files[0])}
                  />
                </>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className={`mt-5 d-block mx-auto btn btn-outline-${
                isEditingItem ? "warning" : "success"
              } fw-bold`}
              disabled={loading}
            >
              {isEditingItem ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
