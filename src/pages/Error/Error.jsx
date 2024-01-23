import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from 'react-router-dom'
import Title from "../../components/Title/Title";

function Error() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen">
      <Title text={'Error'}/>
      <lottie-player
        src="https://assets7.lottiefiles.com/packages/lf20_suhe7qtm.json"
        background="transparent"
        speed="1"
        style={{ width: "50%", height: "50%", margin:"auto" }}
        loop
        autoplay
      ></lottie-player>
      <div className="text-center">
        <Button onClick={()=> navigate(-1)} size="large" variant="contained">Go Back</Button>
      </div>
    </div>
  );
}

export default Error;
