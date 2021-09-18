import React, { useState, useEffect, useRef, useContext } from "react";

import ProjectItem from "./components/ProjectItem";
import projectsData from "./components/projects-data";
import PageTransition from "../../shared/UIElements/PageTransition";
import useTransition from "../../shared/hooks/transition-hook";
import Button from "../../shared/FormElements/Button";
import projectsAudio from "../../shared/assets/audio/projects-audio.mp3";
import Audio from "../../shared/sys/Audio";
import { AppContext } from "../../shared/sys/context";

import "./Projects.scss";
import "./ProjectsMobile.scss";

const Projects = () => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);
   const wrapperStyle = {
      height: isMobile ? window.innerHeight : "100vh"
   }

   // PAGE TRANSITION
   const [ transState, transitionHandler ] = useTransition();

   // INTERSECTION OBSERVERS
   const [ scrollState, setScrollState ] = useState(0);
   const [ animState, setAnimState ] = useState(0);

   const projElements = useRef(new Array());

   useEffect(() => {
      const domElements = projElements.current.slice(0, projectsData.length);

      const progrObsCallback = entries => {
         entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            if (ratio) {
               setScrollState(entry.target.id);
            }
            if (!ratio) return;
         })
      }

      const animObsCallback = entries => {
         entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            if (ratio < .1) {
               if (isMobile)
                  entry.target.children[1].children[2].classList.add("proj__title--enter");
               else
                  entry.target.children[1].classList.add("proj__title--enter");
               entry.target.children[2].classList.add("proj__data--enter");
               entry.target.children[0].children[2].classList.add("proj__img--enter");
            }
            if (ratio > .1) {
               setAnimState(entry.target.id);
               if (isMobile)
                  entry.target.children[1].children[2].classList.remove("proj__title--enter");
               else
                  entry.target.children[1].classList.remove("proj__title--enter");
               entry.target.children[2].classList.remove("proj__data--enter");
               entry.target.children[0].children[2].classList.remove("proj__img--enter");
               AnimationObserver.unobserve(entry.target);
            }
            if (!ratio) return;
         })
      }

      const ProgressionObserver = new IntersectionObserver(progrObsCallback, { threshold: .7 });
      domElements.forEach(el => ProgressionObserver.observe(el));
      const AnimationObserver = new IntersectionObserver(animObsCallback, {threshold: .6});
      domElements.forEach(el => AnimationObserver.observe(el));
   }, [ projElements, setScrollState ]);

   return (
      <>
         <PageTransition
            className={transState.class}
            activeAudio={!transState.audio}
         />
         <div className="projects-wrapper" style={wrapperStyle}>

            {
               projectsData.map((el, idx) => {

                  var style = {margin: "20vh auto"};
                  if (!idx)
                     style.margin = "5vh auto 10vh auto";
                  if (idx == projectsData.length-1)
                     style.margin = "15.5vh auto 7.5vh auto";

                  return <ProjectItem 
                           data={el} 
                           key={idx} 
                           order={idx} 
                           ref={elem => projElements.current.push(elem)}
                           titleClass={animState == idx && "proj__title--enter-active"}
                           imageClass={animState == idx && "proj__img--enter-active"}
                           dataClass={animState == idx && "proj__data--enter-active"}
                           style={style}
                        />;
               })
            }

            <div className="page-progression">
               {projectsData.map((el, idx) => {
                  var stepClass = "";

                  if (idx == scrollState) {
                     stepClass = "progression__step--focus";
                  }

                  var content = (
                     <>
                        <div
                           className={`progression__step ${stepClass}`}
                           key={idx}
                        ></div>
                        <div className="progression__path" key={idx - 1}></div>
                     </>
                  );

                  if (idx == projectsData.length - 1) {
                     content = (
                        <div
                           className={`progression__step ${stepClass}`}
                           key={idx}
                        ></div>
                     );
                  }

                  return content;
               })}
            </div>

            <div className="projects-footer">
               <svg
                  viewBox="0 0 24 24"
                  width="40"
                  height="40"
                  stroke="white"
                  stroke-width="1.5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className={
                     `proj__scroll-indicator ${
                        scrollState < projectsData.length-1 
                        ? "scroll-indicator--anim" 
                        : "scroll-indicator--end"
                     }`
                  }
               >
                  <polyline points="7 12 12 16 17 12"></polyline>
                  <line x1="12" y1="6" x2="12" y2="16"></line>
               </svg>
               <Button to="/" onUnmount={transitionHandler}>
                  HOME
               </Button>
               {transState.audio && (
                  <Audio
                     src={projectsAudio}
                     className="audio-back--projects"
                     type="background"
                  ></Audio>
               )}
            </div>
         </div>
      </>
   );
}

export default Projects;