import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

function useResponsiveFontSize() {
  const theme = useTheme();
  const [fontSize, setFontSize] = useState(theme.typography.fontSize);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 400) {
        setFontSize(10); // Font size for screens with a maximum width of 600px
      } else if (screenWidth <= 800) {
        setFontSize(12); // Font size for screens with a maximum width of 400px
      } else {
        setFontSize(14); // Default font size
      }
    };

    // Initial call to set the font size
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return fontSize;
}

export default useResponsiveFontSize;
