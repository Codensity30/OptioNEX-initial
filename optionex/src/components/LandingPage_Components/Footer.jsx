import React from "react";

function Footer() {
  return (
    <>
      <footer className="relative bg-slate-200 pt-8 pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-Poppins text-slate-700">
                Let's keep in touch!
              </h4>
              <h5 className="mt-0 mb-2 text-slate-500 font-Raleway">
                Hit us up on any of these platforms and we'll gladly hook you
                up!
              </h5>
              <div className="mt-6 lg:mb-0 mb-6">
                <button className="bg-slate-100  shadow-lg font-normal h-10 w-10 p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                  <img
                    src={require("../../images/tradingview.png")}
                    alt="Trading View icon"
                    className="object-contain rounded-full"
                  />
                </button>
                <button className="bg-slate-100  shadow-lg font-normal h-10 w-10 p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                  <img
                    src={require("../../images/telegram.png")}
                    alt="Telegram icon"
                    className="object-contain "
                  />
                </button>
                <button className="bg-slate-100  shadow-lg font-normal h-10 w-10 p-2 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2">
                  <img
                    src={require("../../images/twitter.png")}
                    alt="Twitter icon"
                    className="object-contain rounded-full"
                  />
                </button>
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div className="flex gap-2 items-center">
                <div className="w-10 h-10">
                  <img
                    src={require("../../images/feedback.png")}
                    alt="feedback"
                    className="object-contain"
                  />
                </div>
                <h2 className="font-Poppins text-2xl text-slate-700">
                  Got a question or suggestion?
                </h2>
              </div>
              <div>
                <p className=" text-slate-500 font-Raleway">
                  Don't hesitate to drop us a line at{" "}
                  <a href="#" className="text-slate-700 font-Poppins">
                    xyz@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-6 border-slate-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-slate-500 py-1">
                © 2023 All Right Reserved.{" "}
                <span className="font-Raleway">Optio</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-semibold ">
                  NXT
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
