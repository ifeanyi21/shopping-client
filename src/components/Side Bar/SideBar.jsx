import React, { useState } from "react";
import CSS from "../../assests/styles/Style.module.css";
import SideBarContents from "./SideBarContents";
import { BottomNavigation, Card, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";

function SideBar() {
  const [value, setValue] = useState(0);
  return (
    <div className="col-lg-3 col-md-4 p-1">
      <div className="p-2">
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex:1 }}
          elevation={3}
          className={CSS.sideBarSmall}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <FixedMenu />
          </BottomNavigation>
        </Paper>
        <div id={CSS.sideBarLarge} className={`px-1`}>
          <Card variant="outlined" sx={{ minHeight: 570 }}>
            <SideBarContents />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FixedMenu() {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="warning" onClick={handleClickOpen} sx={{ marginTop: 1 }}>
        Menu
      </Button>
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent onClick={handleClose} sx={{px:1}}>
          <SideBarContents/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

