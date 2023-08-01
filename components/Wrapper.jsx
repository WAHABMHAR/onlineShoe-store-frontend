import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-screen-xl mx-auto flex justify-between items-center px-5 md:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Wrapper;
