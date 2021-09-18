import React, { useState, useCallback } from "react";

import TextRow from "./TextRow";

import "./BackgroundText.scss";

const BackgroundText = props => {

   // FADE TEXT
   const [ textState, setTextState ] = useState(1);

   const handleClick = useCallback(e => {
      setTextState(textState ? 0 : 1);
   }, [textState, setTextState]);

   return (
      <div className="bgtext-wrapper" onClick={handleClick}>
         <TextRow 
            className="bgtext__row--ls" 
            style={{opacity: textState}}
            words={[
               {
                  content: "UIdesign",
                  style: {},
                  className: ""
               },
               {
                  content: "Es6",
                  style: {},
                  className: "bgtext__word--thin"
               },
               {
                  content: "Webpack",
                  style: {},
                  className: ""
               },
               {
                  content: "React",
                  style: {color: "#8FB399"},
                  className: ""
               },
               {
                  content: "JSX",
                  style: {},
                  className: ""
               },
               {
                  content: "AJAX",
                  style: {},
                  className: ""
               }
            ]}
         ></TextRow>
         <TextRow 
            className="bgtext__row--rf" 
            style={{opacity: textState}}
            words={[
               {
                  content: "palacca",
                  style: {},
                  className: ""
               },
               {
                  content: "messi",
                  style: {},
                  className: "bgtext__word--roboto"
               },
               {
                  content: "plz",
                  style: {},
                  className: ""
               },
               {
                  content: "Alessandro",
                  style: {color: "#FFEDE6"},
                  className: ""
               },
               {
                  content: "enza",
                  style: {},
                  className: ""
               },
               {
                  content: "brik",
                  style: {},
                  className: "bgtext__word--roboto"
               },
               {
                  content: "lopsi",
                  style: {},
                  className: ""
               },
               {
                  content: "tummus",
                  style: {},
                  className: "bgtext__word--thin"
               }
            ]}
         ></TextRow>
         <TextRow    
            className="bgtext__row--lf" 
            style={{opacity: textState}}
            words={[
               {
                  content: "BVB",
                  style: {},
                  className: ""
               },
               {
                  content: "perro",
                  style: {},
                  className: "bgtext__word--thin"
               },
               {
                  content: "enemy",
                  style: {},
                  className: ""
               },
               {
                  content: "ipa",
                  style: {},
                  className: ""
               },
               {
                  content: "affleck",
                  style: {},
                  className: "bgtext__word--roboto"
               },
               {
                  content: "tea",
                  style: {},
                  className: ""
               },
               {
                  content: "buddha",
                  style: {},
                  className: "bgtext__word--thin"
               },
               {
                  content: "cs",
                  style: {},
                  className: "bgtext__word--roboto"
               }
            ]}
         ></TextRow>
         <TextRow 
            className="bgtext__row--rf" 
            style={{opacity: textState}}
            words={[
               {
                  content: "HTML",
                  style: {},
                  className: ""
               },
               {
                  content: "css",
                  style: {},
                  className: ""
               },
               {
                  content: "bem",
                  style: {},
                  className: "bgtext__word--roboto"
               },
               {
                  content: "flexbox",
                  style: {},
                  className: ""
               },
               {
                  content: "web",
                  style: {color: "#615761"},
                  className: ""
               },
               {
                  content: "http",
                  style: {},
                  className: ""
               },
               {
                  content: "git",
                  style: {},
                  className: "bgtext__word--thin"
               },
               {
                  content: "sass",
                  style: {},
                  className: "bgtext__word--roboto"
               }
            ]}
         ></TextRow>
         <TextRow 
            className="bgtext__row--rf" 
            style={{opacity: textState}}
            words={[
               {
                  content: "c",
                  style: {},
                  className: ""
               },
               {
                  content: "java",
                  style: {},
                  className: ""
               },
               {
                  content: "linux",
                  style: {},
                  className: ""
               },
               {
                  content: "developer",
                  style: {color: "#A1A1A1"},
                  className: ""
               },
               {
                  content: "kali",
                  style: {},
                  className: ""
               },
               {
                  content: "www",
                  style: {},
                  className: "bgtext__word--roboto"
               },
               {
                  content: "c++",
                  style: {},
                  className: ""
               },
               {
                  content: "arduino",
                  style: {},
                  className: ""
               }
            ]}
         ></TextRow> 
      </div>
   )
}

export default BackgroundText;