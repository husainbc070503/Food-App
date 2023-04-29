import React from "react";
import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../Controllers/API";

const Context = createContext();
const FoodContext = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [editCat, setEditCat] = useState({});
  const [isEditingCat, setIsEditingCat] = useState(false);

  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [isEditingItem, setIsEditingItem] = useState(false);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  /* -------------- ADD CATEGORY -------------- */
  const addCategory = async ({ name, active }) => {
    try {
      const res = await fetch(`${url}/api/category/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, active }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Category added successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setCategories([...categories, data.cat]);
        return;
      } else {
        toast.error(`${data.error}`, {
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

  /* -------------- EDIT CATEGORY -------------- */
  const editCategory = async ({ name, active }, id) => {
    const res = await fetch(`${url}/api/category/editCategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, active }),
    });

    const data = await res.json();
    if (data.success) {
      console.log(data.cat);
      toast.success("Category updated successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      for (let i of categories) {
        if (i._id === id) {
          i.name = name;
          i.active = active;
        }
      }

      setCategories(categories);
      setIsEditingCat(false);
      setEditCat({});
      return;
    } else {
      toast.error(`${data.error}`, {
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

  /* -------------- DELETE CATEGORY -------------- */
  const deleteCategory = async (id) => {
    const res = await fetch(`${url}/api/category/deleteCategory/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Category deleted successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      const newCategories = categories.filter((item) => item._id !== id);
      setCategories(newCategories);
      return;
    } else {
      toast.error(`${data.error}`, {
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

  /* -------------- GET ALL CATEGORIES -------------- */
  const getAllCategories = async () => {
    const res = await fetch(`${url}/api/category/getCategories`);
    const data = await res.json();

    setCategories(data);
  };

  /* -------------- ADD FOOD ITEM -------------- */
  const addItem = async (item, image) => {
    const { name, description, category, quantity, price } = item;

    try {
      const res = await fetch(`${url}/api/fooditem/addItem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseInt(price),
          category,
          description,
          quantity: parseInt(quantity),
          image,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Food item added successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setItems([...items, data.item]);
        navigate("/");

        return;
      } else {
        toast.error(`${data.error}`, {
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

  /* -------------- EDIT FOOD ITEM -------------- */
  const editItemCard = async (item, id) => {
    const { name, description, quantity, price } = item;

    try {
      const res = await fetch(`${url}/api/fooditem/editItem/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: parseInt(price),
          description,
          quantity: parseInt(quantity),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Food item updated successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        for (let i of items) {
          if (i._id === id) {
            i.name = name;
            i.description = description;
            i.price = price;
            i.quantity = quantity;
          }
        }

        setItems(items);
        setEditItem({});
        setIsEditingItem(false);
        navigate("/");

        return;
      } else {
        toast.error(`${data.error}`, {
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

  /* -------------- DELETE FOOD ITEM -------------- */
  const deleteItemCard = async (id) => {
    try {
      const res = await fetch(`${url}/api/fooditem/deleteItem/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Item deleted successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const newItems = items.filter((item) => item._id !== id);
        setItems(newItems);

        return;
      } else {
        toast.error(`${data.error}`, {
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
    }
  };

  /* -------------- GET ALL FOOD ITEMS -------------- */
  const fetchItems = async () => {
    try {
      const res = await fetch(`${url}/api/fooditem/getAllItems`);
      const data = await res.json();
      setItems(data);
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
    getAllCategories();
  }, [categories]);

  useEffect(() => {
    fetchItems();
  }, [items]);

  return (
    <Context.Provider
      value={{
        categories,
        addCategory,
        isEditingCat,
        setIsEditingCat,
        editCat,
        setEditCat,
        editCategory,
        deleteCategory,

        items: items.filter((item) => item.name.toLowerCase().includes(search)),
        addItem,
        isEditingItem,
        setIsEditingItem,
        editItem,
        setEditItem,
        editItemCard,
        deleteItemCard,

        search,
        setSearch,
      }}
    >
      {children}
      <ToastContainer />
    </Context.Provider>
  );
};

const useGlobalContext = () => useContext(Context);

export { useGlobalContext, FoodContext };
