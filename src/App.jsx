import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Index from "./Components/Index";
import Register from "./Components/Authentication/Register";
import Login from "./Components/Authentication/Login";
import { ContextState } from "./Contexts/context";
import MyCart from "./Components/Cart/MyCart";
import UpdateProfile from "./Components/Authentication/UpdateProfile";
import SendLink from "./Components/Authentication/SendLink";
import Contact from "./Components/Contact";

function App() {

  const loadScript = (url) => {
    return new Promise(async (resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    })
  }

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
      .then((data) => console.log("File uploaded", data))
      .catch((err) => console.log("Fail to upload file", err))
  })

  return (
    <BrowserRouter>
      <ContextState>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" index element={<Index />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="myCart" element={<MyCart />} />
            <Route path="updateProfile" element={<UpdateProfile />} />
            <Route path="login/sendLink" element={<SendLink />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </ContextState>
    </BrowserRouter>
  );
}

export default App;
