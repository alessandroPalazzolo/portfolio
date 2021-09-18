import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

const Backdrop = props => {

   const elem = <div className="backdrop" onClick={props.onClick}>{props.children}</div>

   return(
      ReactDOM.createPortal(elem, document.getElementById("backdrop-hook"))
   );
}

export default Backdrop;