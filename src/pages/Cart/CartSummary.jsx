import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useNavigate} from 'react-router-dom'

export default function CartSummary({summary}) {
  const navigate = useNavigate()
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {" "}
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Cart Summary
            </Typography>
            <div className="mt-2 mb-3 d-flex justify-between">
              <p>Subtotal</p>
              <p>₦ {summary?.toLocaleString()}</p>
            </div>
            <Typography sx={{ mb: 1.5, fontSize: 13 }} color="text.secondary">
              Delivery fees not included yet.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="text" onClick={()=> navigate("/checkout")}>Check Out</Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
