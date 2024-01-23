import React from "react";
import { Link } from "react-router-dom";

const Jumbotron = () => {
  return (
    <div className="row">
      <div className="col-md-6 mb-3">
        <Link to={"/cat/0"}>
          <div className="relative jumbotronImages bg-slate-400">
            <img
              src="https://res.cloudinary.com/dg6rlyl1k/image/upload/v1680557497/285766C0-7301-40D7-882D-410E6B446F5B_vflbnq.jpg"
              className="w-full object-cover"
              style={{ height: 400, objectPosition: "top" }}
              alt=""
            />
            <div className="absolute uppercase bg-white text-black p-2 font-bold text-2xl bottom-2 right-4">
              Dresses
            </div>
          </div>
        </Link>
      </div>
      <div className="col-md-6 mb-3">
        <Link to={"/cat/2"}>
          <div className="bg-slate-400 relative jumbotronImages">
            <img
              src="https://res.cloudinary.com/dg6rlyl1k/image/upload/v1680815199/Capture-One-Catalog0041_iwnbb9.jpg"
              className="w-full object-cover"
              style={{ height: 400, objectPosition: "top" }}
              alt=""
            />
            <div className="absolute uppercase bg-white text-black p-2 font-bold text-2xl bottom-2 right-4">
              Pants sets
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Jumbotron;
