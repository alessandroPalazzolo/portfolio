import React from "react";

import "./TextRow.scss";

const TextRow = props => {
   return (
      <section
         className={`bgtext__row ${props.className}`}
         style={props.style}
      >
         {
            props.words.map((el,idx) => {
               return (
                  <h3
                     key={idx}
                     className={`bgtext__word ${el.className}`}
                     style={el.style}
                  >
                     {el.content}
                  </h3>
               );
            })
         }
      </section>
   );
}

export default TextRow;