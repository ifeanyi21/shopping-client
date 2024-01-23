import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form, Row, Col } from "react-bootstrap";
import AlertNotification from "../Alert/Alert";
import { ProgressUpdate } from "../Table/Table";
import { useLocation } from "react-router-dom";
import Rerender from "../../services/context/rerender";
import { ACTION_TYPES } from "../../services/actions/actions";

export default function AddAddressModal({ mountAgain }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [, dispatch] = useContext(Rerender);
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    state: "",
    city: "",
    number: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}add/address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          firstName: address.firstName,
          lastName: address.lastName,
          street: address.street,
          state: address.state,
          city: address.city,
          number: address.number,
        }),
      }
    );

    const data = await response.json();

    if (data.status === "ok") {
      setAddress({
        firstName: "",
        lastName: "",
        street: "",
        state: "",
        city: "",
        number: "",
      });
      setNotification(true);
      setTimeout(() => setNotification(false), 4000);
      if (!location.pathname.includes("checkout")) {
        mountAgain("add");
      } else {
        dispatch({ type: ACTION_TYPES.RERENDER_START });
      }
    } else {
      console.log(data.message);
    }

    setOpen(false);
    setLoading(false);
  };

  return (
    <div>
      <AlertNotification
        severity="success"
        message="Record Updated"
        show={notification}
      />
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Add New Address
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>Add Address</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md="6" className="mb-2">
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    onChange={handleChange}
                    value={address.firstName}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>

              <Col md="6" className="mb-2">
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    onChange={handleChange}
                    value={address.lastName}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md="6" className="mb-2">
                <Form.Group controlId="formGridAddress1">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    placeholder="Enter Phone Number"
                    type="number"
                    name="number"
                    onChange={handleChange}
                    value={address.number}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>

              <Col md="6" className="mb-2">
                <Form.Group>
                  <label className="mb-2">Street</label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Street"
                    name="street"
                    onChange={handleChange}
                    value={address.street}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col md="6" className="mb-2">
                <Form.Group controlId="formGridZip">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    onChange={handleChange}
                    value={address.city}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md="6" className="mb-2">
                <Form.Group controlId="formGridZip">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    placeholder="Enter State"
                    onChange={handleChange}
                    value={address.state}
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {loading ? (
                <Button
                  sx={{
                    "& .MuiCircularProgress-root": {
                      height: "20px !important",
                      width: "20px !important",
                    },
                  }}
                >
                  <ProgressUpdate />
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Add Address
                </Button>
              )}
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
