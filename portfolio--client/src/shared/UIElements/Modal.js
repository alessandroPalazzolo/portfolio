import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import "./Modal.scss";

const Modal = props => {
   return (
      <Backdrop onClick={props.onClick}>
         <article className="modal">
            {props.children}
         </article>
      </Backdrop>
   );
}

export default Modal;