import { Alert, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { ProgressUpdate } from "../../components/Table/Table";

function RateForm({ orderId }) {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { product } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleRating = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}rate/${product}/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          rating,
          feedbackText,
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      navigate(`/account/orders/order/${orderId}`);
    } else {
      setMessage(data.message);
    }

    setLoading(false);
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        {message ? (
          <Alert sx={{ mt: 2 }} severity="error">
            {message}
          </Alert>
        ) : null}
        <Rating
          sx={{
            marginBottom: 3,
            marginTop: 3,
            fontSize: 40,
          }}
          defaultValue={0}
          value={rating}
          onChange={handleRating}
        />
        <Form.Control
          onChange={handleChange}
          type="text"
          placeholder="Type in your feedback..."
          required
          as={"textarea"}
          row={6}
          style={{ height: "250px" }}
          disabled={loading}
        />
        {loading ? (
          <Button
            variant="contained"
            color="info"
            sx={{
              width: "100%",
              marginTop: 4,
              "& .MuiCircularProgress-root": {
                height: "23px !important",
                width: "23px !important",
              },
            }}
          >
            <ProgressUpdate />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            color="info"
            sx={{ width: "100%", marginTop: 4 }}
          >
            Submit
          </Button>
        )}
      </Form>
    </>
  );
}

export default RateForm;
