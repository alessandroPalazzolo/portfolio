import React from "react";

import "./FinderWindow.scss";

const FinderWindow = props => {
   return (
      <div className="finder__window" style={props.style}>
         <span className="finder__window__btns window__btns--red"></span>
         <span className="finder__window__btns window__btns--yellow"></span>
         <span className="finder__window__btns window__btns--green"></span>
         <span className="finder__window__filename">{props.filename || ""}</span>
         <p className="finder__window__txt">{props.content}</p>
      </div>
   );
}

export default FinderWindow;