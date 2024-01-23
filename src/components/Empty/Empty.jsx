import React from "react";

function Empty({ text }) {
  return (
    <div className="text-center">
      <lottie-player
        src="https://assets10.lottiefiles.com/private_files/lf30_e3pteeho.json"
        background="transparent"
        speed="1"
        style={{ width: "300px", height: "300px", margin: "auto" }}
        loop
        autoplay
      ></lottie-player>
      <div className="font-bold text-lg mt-8">{text}</div>
    </div>
  );
}

export default Empty;
