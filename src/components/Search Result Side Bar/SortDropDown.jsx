// import * as React from "react";
// import MenuItem from "@mui/material/MenuItem";
// import { Box, FormControl, Select } from "@mui/material";
// import { useState } from "react";

// export default function SortDropDown({ marginTop }) {
//   const [sortValue, setSortValue] = useState(0);

//   const handleChange = (e) => {
//     setSortValue(e.target.value);
//   };

//   return (
//     <Box sx={{ marginTop, border: 0 }}>
//       <FormControl fullWidth size="small">
//         <Select
//           sx={{
//             "& legend": { display: "none" },
//             "& fieldset": { top: 0 },
//           }}
//           name="gender"
//           onChange={handleChange}
//           defaultValue={0}
//           value={sortValue}
//         >
//           <MenuItem value={0}>Popularity</MenuItem>
//           <MenuItem value={1}>High to Low</MenuItem>
//           <MenuItem value={2}>Low to High</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Sort from "../../services/context/sort";
import { ACTION_TYPES } from "../../services/actions/actions";

export default function SortDropDown({ marginTop }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [, setSortValue] = React.useState(0);
  const [state, dispatch] = React.useContext(Sort);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    setSortValue(e.target.value);
    handleClose();
    if (e.target.value === 0) {
      dispatch({ type: ACTION_TYPES.SORT_POPULARITY });
    }

    if (e.target.value === 1) {
      dispatch({ type: ACTION_TYPES.SORT_HIGH_TO_LOW });
    }

    if (e.target.value === 2) {
      dispatch({ type: ACTION_TYPES.SORT_LOW_TO_HIGH });
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="warning"
        sx={{
          marginTop,
        }}
      >
        Sort By : {state.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleChange} value={0}>
          Popularity
        </MenuItem>
        <MenuItem onClick={handleChange} value={1}>
          High to Low
        </MenuItem>
        <MenuItem onClick={handleChange} value={2}>
          Low to High
        </MenuItem>
      </Menu>
    </div>
  );
}
