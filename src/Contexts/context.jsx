import React, { createContext, useContext, useEffect, useState } from "react";
import { Slide, ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { url } from "../controllers/API";

const FoodContext = createContext();
const ContextState = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (localStorage.getItem("food-purchase-user"))
      setUser(JSON.parse(localStorage.getItem("food-purchase-user")));
  }, [navigate]);

  const registerUser = async ({ name, email, password, address }, pic) => {
    try {
      const res = await fetch(`${url}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, pic, address }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Registered Successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        navigate("/login");
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

  const loginUser = async ({ email, password }) => {
    try {
      const res = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Login Successfull.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("food-purchase-user", JSON.stringify(data.user));
        navigate("/");
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

  /* --------------- UPDATE USER --------------------- */
  const updateProfile = async (id, { name, email, address }) => {
    try {
      const res = await fetch(`${url}/api/user/updateProfile/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, address }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("food-purchase-user", JSON.stringify(data.user));
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

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${url}/api/category/getCategories`);
      const data = await res.json();

      setCategories(data);
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
    }
  };

  /* --------------- ADD TO CART ------------------ */
  const addToCart = (item) => setCart([...cart, item]);

  /* --------------- REMOVE FROM CART ------------------  */
  const removeFromCart = (id) =>
    setCart(cart.filter((item) => item._id !== id));

  /* --------------- UPDATE QUANTITY ------------------  */
  const updateQuantity = (id, value) =>
    setCart(
      cart.filter((item) =>
        item._id === id ? (item.quantity = value) : item.quantity
      )
    );

  useEffect(() => {
    fetchCategories();
    fetchItems();
  });

  return (
    <FoodContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        updateProfile,
        categories,
        items: items.filter((item) => item.name.toLowerCase().includes(search)),
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        search,
        setSearch,
      }}
    >
      {children}
      <ToastContainer transition={Zoom} />
    </FoodContext.Provider>
  );
};

const useGlobalContext = () => useContext(FoodContext);

export { ContextState, useGlobalContext };
