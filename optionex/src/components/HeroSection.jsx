import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

export default function Example() {
  return (
    <div className="bg-white">
      <div className="fixed left-0 right-0 py-3 bg-white/30 backdrop-blur-md z-50 ">
        <div className="flex justify-center items-center gap-1">
          <div className="w-7 h-7">
            <img
              src={require("../images/optionex_logo.png")}
              alt="Optionex logo"
              className="object-contain"
            />
          </div>
          <h1 className="text-slate-800 text-lg">
            Optio
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-semibold ">
              NEX
            </span>
          </h1>
        </div>
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-500 to-violet-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-32 lg:py-40">
          <div class="w-40 mx-auto mb-5">
            <div class="relative group">
              <div class="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div class="relative px-1 bg-opacity-80 bg-white ring-1 ring-gray-900/5 rounded-2xl ">
                <p class="text-slate-700 gap-1 flex justify-center items-center">
                  Be your
                  <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500">
                    NEX
                  </span>
                  <span className="text-cyan-500">
                    <AllInclusiveIcon />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Elevate your trading to a whole new{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500">
                NEX
              </span>{" "}
              level
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Empower your market journey: Unveil an exceptional indicator that
              rhythms and swirls in harmony with the ebb and flow of financial
              tides, giving you the unmatched edge you seek
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-gradient-to-br from-sky-500 to-teal-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:shadow-lg"
              >
                Get started
              </a>
              <a
                href="#"
                className="text-sm font-semibold flex items-center gap-2 leading-6 text-gray-900"
              >
                <div className="w-10 h-10 rounded-full bg-slate-300 flex justify-center items-center hover:bg-slate-200">
                  <VideocamOutlinedIcon />
                </div>
                <span>How it works</span>
              </a>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-500 to-violet-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
