import React from "react";
import { useGlobalContext } from "../../Contexts/context";

const Carousels = () => {
  const { search, setSearch } = useGlobalContext();
  const items = [
    {
      image:
        "https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350",
      name: "Burger",
    },
    {
      image:
        "https://c.ndtvimg.com/2023-02/m6pfvf0o_nachos_625x300_02_February_23.jpg",
      name: "Pizza",
    },
    {
      image:
        "https://c.ndtvimg.com/2023-01/ip1ulv0o_hot-pot_625x300_25_January_23.jpg",
      name: "Noodless",
    },
    {
      image:
        "https://maunikagowardhan.co.uk/wp-content/uploads/2014/11/Indo-Chinese-Chilli-Chicken1-1024x683.jpg",
      name: "Chicken Chilly",
    },
  ];

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {items.map((elem, index) => {
          return (
            <div
              className="carousel-item active"
              key={index}
              id="carousel-item"
            >
              <img
                src={elem.image}
                className="d-block w-100"
                alt={elem.name}
                style={{ filter: "blur(2px) brightness(70%)" }}
              />

              <div className="carousel-caption d-md-block">
                <form className="d-flex justify-content-center">
                  <input
                    type="text"
                    className="form-control w-75"
                    placeholder="Search food.."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button className="btn btn-success ms-3">Search</button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousels;
