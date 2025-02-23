import React from "react";
import { BrowserRouter } from "react-router-dom";

type ProvidersProps = {
    children: React.ReactNode;
};

const Providers :React.FC<ProvidersProps> = ({children}) => {
  return (
    <BrowserRouter>
          {children}
    </BrowserRouter>
  )
}

export default Providers