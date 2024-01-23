import { Rating } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductRatings() {
  const { id } = useParams();
  const [ratings, setRatings] = useState([]);
  const getRatings = useCallback(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}ratings/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    setRatings(data.data);
  }, [id]);

  useEffect(() => {
    getRatings();
  }, [getRatings]);

  return (
    <div>
      {ratings.length > 0 && (
        <>
          <h3 className="text-center mb-8">Ratings</h3>
          <div className="bg-white p-3">
            <div className="row">
              {ratings.map((rating) => {
                return (
                  <div className="col-lg-12 mb-8" key={rating._id}>
                    <div className="row">
                      <div className="col-lg-4">
                        <Rating readOnly value={rating.rating} />
                      </div>
                      <div className="col-lg-4">{rating.feedback}</div>
                      <div className="col-lg-4 text-muted">
                        {new Date(rating.createdAt).toDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductRatings;
