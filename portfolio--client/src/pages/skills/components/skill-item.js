import React from "react";

import "./skill-item.scss";

const SkillItem = props => {

   const { data } = props;

   return ( 
      <div className="skill">
         <h3 className="skill__name">{data.title}</h3>
         <p className="skill__rating">{data.rating}/10</p>
         <ul>
            {
               data.details.map((el,idx) => {
                  return (
                     <p key={idx} className="skill__details">
                        {el}
                     </p>
                  );
               })
            }
         </ul>
      </div>
   );
}

export default SkillItem;