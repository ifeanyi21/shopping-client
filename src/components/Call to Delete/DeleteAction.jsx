import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { FaTrash } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function DeleteAction({ addressId, mountAgain }) {
  const [open, setOpen] = React.useState(false);
  const token = localStorage.getItem("token");

  const handleDeleteAddress = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}deleteAddress/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      }
    );

    const data = await response.json();
    if (data.status) {
      mountAgain("delete");
      window.location.reload();
    } else {
      mountAgain("error");
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color="error" onClick={handleClickOpen}>
        <FaTrash />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Address"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You're about to delete an address
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleDeleteAddress}
            variant="contained"
            color="error"
            startIcon={<FaTrash />}
            size="small"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
