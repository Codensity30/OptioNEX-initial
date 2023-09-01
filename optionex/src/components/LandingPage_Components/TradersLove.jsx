import React from "react";

function TradersLove() {
  return (
    <div className="invest-ideas-container py-20 px-3">
      <h1 className="text-2xl text-center font-Poppins">
        What sparks the passion for Optio
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-semibold ">
          NXT
        </span>{" "}
        among traders?
      </h1>
      <h2 className="text-center w-10/12 md:w-10/12 lg:w-1/2 mx-auto text-sm mt-3 text-slate-500 font-Raleway">
        Don't drown in market information! OptioNXT helps you focus on what
        matters. Make informed decisions without the overload. Say goodbye to
        confusion and hello to clarity!
      </h2>
      <div className=" flex flex-col lg:flex-row gap-10 justify-center items-center mt-10">
        <div className="w-72 md:w-1/2 lg:w-60 h-52 bg-white shadow-md rounded-md p-5">
          <div className="w-16 h-16 bg-red-300 rounded-lg">
            <img
              src={require("../../images/free.png")}
              alt="free"
              className="object-contain"
            />
          </div>
          <h3 className="font-Poppins text-lg font-extralight mt-5 to-slate-600">
            Zero Charges
          </h3>
          <p className="text-sm font-Raleway mt-3 text-slate-600">
            No limits, no boundaries, just pure excitement!
          </p>
        </div>
        <div className="w-72 md:w-1/2 lg:w-60 h-52 bg-white shadow-md rounded-md p-5">
          <div className="w-16 h-16 p-1 bg-[#fcddbe] rounded-lg">
            <img
              src={require("../../images/ad-block.png")}
              alt="free"
              className="object-contain"
            />
          </div>
          <h3 className="font-Poppins text-lg font-extralight mt-5 to-slate-600">
            No interruptions
          </h3>
          <p className="text-sm font-Raleway mt-3 text-slate-600">
            No ads to disrupt your viewing pleasure!
          </p>
        </div>
        <div className="w-72 md:w-1/2 lg:w-60 h-52 bg-white shadow-md rounded-md p-5">
          <div className="w-16 h-16 p-1 bg-blue-300 rounded-lg">
            <img
              src={require("../../images/refresh.png")}
              alt="free"
              className="object-contain"
            />
          </div>
          <h3 className="font-Poppins text-lg font-extralight mt-5 to-slate-600">
            Realtime updates
          </h3>
          <p className="text-sm font-Raleway mt-3 text-slate-600">
            Stay in the loop with instant updates - never miss a beat!
          </p>
        </div>
        <div className="w-72 md:w-1/2 lg:w-60 h-52 bg-white shadow-md rounded-md p-5">
          <div className="w-16 h-16 p-1  bg-purple-300 rounded-lg">
            <img
              src={require("../../images/easy.png")}
              alt="free"
              className="object-contain"
            />
          </div>
          <h3 className="font-Poppins text-lg font-extralight mt-5 to-slate-600">
            Easy to use
          </h3>
          <p className="text-sm font-Raleway mt-3 text-slate-600">
            You'll feel like a tech wizard in no time!
          </p>
        </div>
      </div>
    </div>
  );
}

export default TradersLove;
