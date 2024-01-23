import React, { useCallback, useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "react-bootstrap";
import { ProgressUpdate } from "../Table/Table";
import { Card, Radio } from "@mui/material";
import Rerender from "../../services/context/rerender";
import { ACTION_TYPES } from "../../services/actions/actions";

export default function ShowAddress({ addresses, defaultAddressId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, dispatch] = useContext(Rerender);
  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedValue, setSelectedValue] = React.useState(defaultAddressId);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSetDefaultAddress = useCallback(
    async (e) => {
      e.preventDefault();
      if (selectedValue) {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/setDefaultAddress/${selectedValue}`,
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
          setOpen(false);
          setLoading(false);
          dispatch({ type: ACTION_TYPES.RERENDER_START });
        }
      }
    },
    [token, selectedValue, dispatch]
  );

  return (
    <div>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        Change Address
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle>Address Book</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleSetDefaultAddress}>
            {addresses.map((address) => {
              return (
                <Card
                  variant="elevation"
                  sx={{ display: "flex", marginBottom: 3 }}
                  key={address._id}
                >
                  <Radio
                    sx={{
                      "& .css-1570p70-MuiButtonBase-root-MuiRadio-root:hover": {
                        backgroundColor: "transparent !important",
                      },
                    }}
                    checked={selectedValue === address._id}
                    onChange={handleChange}
                    value={address._id}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                  />
                  <div className="p-3">
                    <div>
                      <div className="text-muted mt-2">
                        <p className="uppercase text-black text-base mb-0">
                          {`${address.firstName} ${address.lastName}`}
                        </p>
                        <p className="mb-1">
                          {`${address.street} ${address.city}, `}
                          {`${address.state}`}
                          {address.number}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}

            <DialogActions sx={{ marginTop: 6 }}>
              {loading ? (
                <Button
                  sx={{
                    "& .MuiCircularProgress-root": {
                      height: "20px !important",
                      width: "20px !important",
                    },
                    width: "100%",
                  }}
                >
                  <ProgressUpdate />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%" }}
                >
                  Use this address
                </Button>
              )}
            </DialogActions>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
