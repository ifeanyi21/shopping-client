import React from "react";

function Steps() {
  return (
    <div className="row">
      <div className="col-lg-4 col-md-4 p-3">
        <div className="bg-gray-200 rounded px-10 py-4 flex justify-between items-center shadow-sm">
          <div>
            <div className="text-2xl font-bold">Search</div>
            <span className="text-xs font-medium">
              So many gadgets to choose from
            </span>
          </div>
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_l3j1mflq.json"
            background="transparent"
            speed="1"
            style={{ height: "120px", width: "120px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 p-3">
        <div className="bg-gray-200 rounded px-10 py-4 flex justify-between items-center shadow-sm">
          <div>
            <div className="text-2xl font-bold">Check out</div>
            <span className="text-xs font-medium">Check out in seconds</span>
          </div>

          <lottie-player
            src="https://assets10.lottiefiles.com/private_files/lf30_x2lzmtdl.json"
            background="transparent"
            speed="1"
            style={{ height: "120px", width: "120px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="col-lg-4 col-md-4 p-3">
        <div className="bg-gray-200 rounded px-10 py-4 flex justify-between items-center shadow-sm">
          <div>
            <div className="text-2xl font-bold">Enjoy</div>
            <span className="text-xs font-medium">
              Get your product delivered and <b>Enjoy</b>
            </span>
          </div>

          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_ggw4qc1o.json"
            background="transparent"
            speed="1"
            style={{ height: "120px", width: "120px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
    </div>
  );
}

export default Steps;
