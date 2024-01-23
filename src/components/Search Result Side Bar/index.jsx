import React from "react";
import { Link, useLocation } from "react-router-dom";

function Index() {
  const location = useLocation();
  const categories = [
    "Dresses",
    "Jumpsuits",
    "Pants sets",
    "Play suits",
    "Short sets",
    "Skirt sets",
  ];
  return (
    <div className="card p-4">
      <h5 className="mb-3">Category</h5>
      {categories.map((category, index) => {
        return (
          <Link
            className={`nav-link mb-2 hover:bg-slate-300 rounded-xl p-2 ${
              location.pathname.includes(index) ? "bg-slate-300" : ""
            }`}
            to={`/cat/${index}`}
            key={index}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

export default Index;
