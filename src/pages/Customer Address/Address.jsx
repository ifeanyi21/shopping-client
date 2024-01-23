import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import DeleteAction from "../../components/Call to Delete/DeleteAction";

function Address({ address, mountAgain }) {
  const token = localStorage.getItem("token");
  const [editAddress, setEditAddress] = useState(address);

  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSetDefaultAddress = useCallback(async () => {
    setOpen(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/setDefaultAddress/${address._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await response.json();

    if (data.status) {
      mountAgain("set");
      window.location.reload();
    } else {
      mountAgain("error");
    }
    setOpen(false);
  }, [token, address._id, mountAgain]);

  const handleChange = (e) => {
    setEditAddress((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}updateAddress/${address._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({
          firstName: editAddress.firstName,
          lastName: editAddress.lastName,
          street: editAddress.street,
          city: editAddress.city,
          state: editAddress.state,
          number: editAddress.number,
          defaultAddress: editAddress.defaultAddress,
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      setModalOpen(false);
      mountAgain("update");
    } else {
      mountAgain("error");
    }
  };

  useEffect(() => {}, [mountAgain, address.defaultAddress]);

  return (
    <Card variant="elevation">
      <div className="p-3">
        <div>
          <div className="text-muted mt-2">
            <p className="uppercase mb-3 text-black text-lg">{`${address.firstName} ${address.lastName}`}</p>
            <p className="mb-1">{`${address.street} ${address.city}, `}</p>
            <p className="mb-1">{`${address.state}`}</p>
            <p>{address.number}</p>
          </div>
          <Divider color="black" />
          <div className="flex justify-between mt-2">
            {address.defaultAddress ? (
              <Button disabled>Set As Default</Button>
            ) : (
              <Button onClick={handleSetDefaultAddress}>Set As Default</Button>
            )}

            <div className="flex justify-end">
              <Button color="warning" onClick={handleClickOpen}>
                <FaPen />
              </Button>
              {!address.defaultAddress && (
                <DeleteAction addressId={address._id} mountAgain={mountAgain} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle>Update Address</DialogTitle>
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
                    value={editAddress.firstName}
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
                    value={editAddress.lastName}
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
                    value={editAddress.number}
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
                    value={editAddress.street}
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
                    onChange={handleChange}
                    value={editAddress.city}
                  />
                </Form.Group>
              </Col>
              <Col md="6" className="mb-2">
                <Form.Group controlId="formGridZip">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    name="state"
                    onChange={handleChange}
                    value={editAddress.state}
                  />
                </Form.Group>
              </Col>
            </Row>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Update
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Address;
