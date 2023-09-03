import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {
  DarkModeOutlined,
  LightModeOutlined,
  AutoStoriesOutlined,
  RateReviewOutlined,
} from "@mui/icons-material";

function Header({ handleModeChange, mode, objective }) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 py-1 md:py-3 backdrop-blur ${
        mode === "light" ? "bg-white/30" : "bg-black/30"
      } z-50`}
    >
      <div
        className={`flex ${
          objective === "landing" ? "justify-center" : "justify-between"
        }  items-center px-4`}
      >
        {objective === "terminal" && <div></div>}
        <div
          className={`flex items-center gap-1 ${
            objective === "terminal" ? "ml-32" : ""
          }`}
        >
          <div className="w-7 h-7">
            <img
              src={require("../../images/optionex_logo.png")}
              alt="Optionex logo"
              className="object-contain"
            />
          </div>
          <h1
            className={`${
              mode === "light" ? "text-slate-800" : "text-slate-200"
            } text-lg font-Raleway`}
          >
            Optio
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-sky-500 to-teal-500 font-semibold">
              NXT
            </span>
          </h1>
        </div>
        {objective === "terminal" && (
          <div className="flex gap-3">
            <div
              className={`border ${
                mode === "light" ? "border-slate-200" : "border-slate-500"
              } rounded-xl w-9 h-9 flex justify-center items-center shadow-sm ${
                mode === "light" ? "" : "shadow-gray-500"
              }`}
            >
              <Tooltip
                title={
                  mode === "light"
                    ? "Turn off the lights!"
                    : "Turn on the lights!"
                }
              >
                <IconButton
                  aria-label="mode"
                  onClick={handleModeChange}
                  sx={{ color: "#0ea5e9" }}
                >
                  {mode === "light" ? (
                    <DarkModeOutlined fontSize="small" />
                  ) : (
                    <LightModeOutlined fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </div>
            <div
              className={`border ${
                mode === "light" ? "border-slate-200" : "border-slate-500"
              } rounded-xl w-9 h-9 flex justify-center items-center shadow-sm ${
                mode === "light" ? "" : "shadow-gray-500"
              }`}
            >
              <Tooltip title="Check out the tutorial, it's super helpful!">
                <IconButton
                  aria-label="mode"
                  onClick={handleModeChange}
                  sx={{ color: "#0ea5e9" }}
                >
                  <AutoStoriesOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <div
              className={`border ${
                mode === "light" ? "border-slate-200" : "border-slate-500"
              } rounded-xl w-9 h-9 flex justify-center items-center shadow-sm ${
                mode === "light" ? "" : "shadow-gray-500"
              }`}
            >
              <Tooltip title="We'd love to hear your feedback!">
                <IconButton
                  aria-label="mode"
                  onClick={handleModeChange}
                  sx={{ color: "#0ea5e9" }}
                >
                  <RateReviewOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
