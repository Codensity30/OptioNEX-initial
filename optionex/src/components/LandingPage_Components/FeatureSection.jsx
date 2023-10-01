import React from "react";
import {
  InsertChartOutlinedRounded,
  QueryStatsRounded,
  StackedLineChartRounded,
} from "@mui/icons-material";

function FeatureSection() {
  return (
    <div className="py-10 mt-10">
      <div className="text-center">
        <h2 className="text-4xl font-Poppins">
          Optio
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-semibold ">
            NXT
          </span>{" "}
          highlights
        </h2>
        <div className="w-11/12 md:w-2/3 lg:w-1/2 pt-5 pb-11 text-sm md:text-md font-Raleway text-slate-500 mx-auto">
          Embark on a modern trading odyssey with OptioNXT, your all-inclusive
          destination for navigating today's markets. behold the spotlight on
          three key features, merely a glimpse of the abundant treasures that
          await.
        </div>
      </div>
      <div className="flex gap-5 lg:gap-20 px-7 lg:justify-center items-center overflow-x-auto no-scrollbar">
        <div className="bg-gradient-to-br from-slate-100 to-red-200 rounded-xl p-3 px-5 min-w-[18rem] h-80 shadow ">
          <div className="text-xl flex justify-between items-center font-medium text-red-700 border-b-2 py-2 border-red-300 font-Poppins">
            <h1>Open Interest</h1>
            <InsertChartOutlinedRounded />
          </div>
          <div className="mt-5 flex flex-col gap-7">
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                1
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Analyse live open interest
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                2
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Get live change in open interest
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                3
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Auto refreshed data
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-100 to-indigo-200 rounded-xl p-3 px-5 min-w-[18rem] h-80 shadow  ">
          <div className="text-xl flex justify-between items-center font-medium text-indigo-700 border-b-2 py-2 border-indigo-300 font-Poppins">
            <h1>Buildup vs Time</h1>
            <QueryStatsRounded />
          </div>
          <div className="mt-5 flex flex-col gap-7">
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                1
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Get data buildup every 5 min
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                2
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Put and Call writing with time
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                3
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Visualize pcr vs spot
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-slate-100 to-orange-200 rounded-xl p-3 px-5 min-w-[18rem] h-80 shadow  ">
          <div className="text-xl flex justify-between items-center font-medium text-orange-700 border-b-2 py-2 border-orange-300 font-Poppins">
            <h1>Multistrike COI</h1>
            <StackedLineChartRounded />
          </div>
          <div className="mt-5 flex flex-col gap-7">
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                1
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Strikewise put - call COI
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                2
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Analyse multiple strikes data
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-6 w-6 flex justify-center items-center rounded-full text-white text-sm bg-green-600">
                3
              </div>
              <div className="text-slate-600 text-sm font-semibold">
                Data is recorded every 5 min
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
