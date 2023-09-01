import React from "react";

function ComparisonSection() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-5">
      <div className="flex items-center gap-5">
        <div className="flex flex-col md:text-lg text-slate-600">
          <h3>😉 Experience</h3>
          <h3>🧐 Analysis</h3>
          <h3>😲 Simplicity</h3>
        </div>
        <div className="text-8xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-Raleway">
          NXT
        </div>
      </div>
      <div className="border border-l h-44 hidden md:block"></div>
      <div className="flex items-center gap-5">
        <div className="text-8xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-br from-violet-500 to-rose-500 font-Raleway">
          NO
        </div>
        <div className="flex flex-col md:text-lg text-slate-600 ">
          <h3>Pricing 🤩</h3>
          <h3>Ads 😀</h3>
          <h3>Credentials 😎</h3>
        </div>
      </div>
    </div>
  );
}

export default ComparisonSection;
