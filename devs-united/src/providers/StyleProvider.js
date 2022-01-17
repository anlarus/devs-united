import React, { useContext, createContext, useState, useEffect } from "react";

const StyleContext = createContext();
export const useStyle = () => useContext(StyleContext);

const StyleProvider = ({ children }) => {
  const [width, setWidth] = useState(null);
  const [style, setStyle] = useState({
    deviceClass: null,
    widthValue: null,
  });
  useEffect(() => {
    function manageResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", manageResize);
    manageResize();
    setStyle((previousStyle) => ({
      ...previousStyle,
      widthValue: width,
      deviceClass: width > 700 ? "large" : "small",
    }));
  }, [style.deviceClass, width]);

  return (
    <StyleContext.Provider value={{ style }}>{children}</StyleContext.Provider>
  );
};

export default StyleProvider;
