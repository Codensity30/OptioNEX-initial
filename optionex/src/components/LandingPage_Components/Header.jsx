import IconButton from "@mui/material/IconButton";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

function Header({ handleModeChange, mode }) {
  return (
    <div
      className={`fixed left-0 right-0 top-0 py-1 md:py-3 backdrop-blur ${
        mode === "light" ? "bg-white/30" : "bg-black/30"
      } z-50`}
    >
      <div className="flex justify-between items-center px-4">
        <div></div>
        <div className="flex items-center gap-1">
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

        <div
          className={`border ${
            mode === "light" ? "border-slate-200" : "border-slate-500"
          } rounded-xl w-9 h-9 flex justify-center items-center shadow-sm ${
            mode === "light" ? "" : "shadow-gray-500"
          }`}
        >
          <IconButton
            aria-label="mode"
            onClick={handleModeChange}
            size="small"
            color="primary"
          >
            {mode === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
