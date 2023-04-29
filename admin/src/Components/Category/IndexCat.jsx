import React from "react";
import Add from "./Add";
import View from "./View";

const IndexCat = () => {
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-4">
          <Add />
        </div> 
        <div className="col-md-6 mt-4">
          <View />
        </div>
      </div>
    </div>
  );
};

export default IndexCat;
