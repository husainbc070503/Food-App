import { Carousel } from "bootstrap";
import React, { useEffect } from "react";
import Carousels from "./Index/Carousels";
import Items from "./Index/Items";
import { useGlobalContext } from "../Contexts/context";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Index = () => {
  const navigate = useNavigate();

  useEffect((e) => {
    const u = JSON.parse(localStorage.getItem('food-purchase-user'));
    if (!u) navigate('/login')
  })

  return (
    <div className="container-fluid">
      <Carousels />
      <Items />
      <Footer />
    </div>
  );
};

export default Index;
