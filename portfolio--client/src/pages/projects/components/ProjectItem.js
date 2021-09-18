import React, { useContext, useState } from "react";
import ReactGA from "react-ga";

import Button from "../../../shared/FormElements/Button";
import ExternalLinkIcon from "../../../shared/assets/icons/external-link";
import { AppContext } from "../../../shared/sys/context";

import "./ProjectItem.scss";
import "./ProjectItemMobile.scss";

const ProjectItem = React.forwardRef((props, ref) => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);

   const { data } = props;

   // HOVER PROJECT HANDLE
   const [ dataProjState, setDataProjState ] = useState(1);

   const overProjHandler = e => {
      switch(e.type) {
         case "mouseenter":
            setDataProjState(0);
            break;
         case "mouseleave":
            setDataProjState(1);
            break;
         default:
            return;
      }
   }

   const clickProjHandler = e => {
      ReactGA.event({
         category: "/work click",
         action: `/work '${data.title}' visited`
      })
   }

   return (
      <div className="project-item" style={props.style} ref={ref} id={props.order}>
         <Button href={data.redirect}>
            <div 
               className={`proj__img ${data.imageClass + " " + props.imageClass}`} 
               onMouseEnter={isMobile ? () => {} : overProjHandler} 
               onMouseLeave={isMobile ? () => {} : overProjHandler} 
               onClick={clickProjHandler}>
            </div>
         </Button>
         {
            isMobile
            ? 
            <Button href={data.redirect}>
               <div className={`proj__title-wrapper ${props.titleClass}`}>
                  <h2 className={`proj__title`} style={{opacity: dataProjState}}>{data.title}</h2>
                  <ExternalLinkIcon />
               </div>
            </Button>
            : 
            <h2 className={`proj__title ${props.titleClass}`} style={{opacity: dataProjState}}>{data.title}</h2>
         }
         <ul className={`proj__data ${props.dataClass}`} style={{opacity: dataProjState}}>
            {
               data.fields.map((el, idx) => {

                  const fieldData = el.data.map((el,idx) => {

                     const initialChar =  el.charAt(0);
                     const text = el.substr(1);
               
                     return (
                        <li className="proj__data__item" key={idx}>
                           <span className="proj__data__item__initial">{initialChar}</span>
                           {text}
                        </li>
                     )
                  })

                  return (
                     <>
                        <li className="proj__data__label" key={idx}>{el.label}</li> 
                        {fieldData}
                     </>             
                  )
               })
            }
         </ul>
   </div>
   )
})

export default ProjectItem;