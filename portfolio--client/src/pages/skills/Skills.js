import React, { useState, useEffect, useCallback, useContext } from "react";

import SkillItem from "./components/skill-item";
import Button from "../../shared/FormElements/Button";
import skillsAudio from "../../shared/assets/audio/skills-audio.mp3";
import Audio from "../../shared/sys/Audio";
import PageTransition from "../../shared/UIElements/PageTransition";
import useTransition from "../../shared/hooks/transition-hook";
import { AppContext } from "../../shared/sys/context";

import "./Skills.scss";
import "./SkillsMobile.scss";

const Skills = () => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);
   const wrapperStyle = {
      height: isMobile ? window.innerHeight : "fit-content"
   }

   // PARALLAX
   const [posState, setPosState] = useState(0);

   const scrollHandler = useCallback(() => {
      const newTitlePos = posState + window.scrollY;
      setPosState(newTitlePos);
   }, []);

   useEffect(() => {
      window.addEventListener("scroll", scrollHandler, true)
      return () => window.removeEventListener("scroll", scrollHandler, true);
   }, [scrollHandler]) 

   const titlePos = {
      transform: isMobile ? "" : `translateY(${posState * .016 + "rem"})`
   }

   // PAGE_TRANSITION
   const [ transState, transitionHandler ] = useTransition();

   return (
      <>
         <PageTransition className={transState.class} activeAudio={!transState.audio}/>
         <article className="skills-wrapper" style={wrapperStyle}>
            {
               transState.audio &&
               <Audio src={skillsAudio} className="audio-back--skills" type="background"></Audio>
            }

            <section className="skills-section skills-section--lSide">
               <h2 className="skills-section__title" style={titlePos}>FRONTEND</h2>

               <div className="skills-section__data">
                  <SkillItem
                     data={{
                        title: "HTML5",
                        rating: "9",
                        details: [
                           "Wide web functioning knowledge",
                           "TCP/IP and HTTP",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "CSS3",
                        rating: "9",
                        details: [
                           "Sass and BEM paradigm",
                           "Css Animations, Flexbox and Grid",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "JavaScript",
                        rating: "10",
                        details: [
                           "1+ years of experience",
                           "ES6, JSON, AJAX and jQuery"
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "React",
                        rating: "10",
                        details: [
                           "I mostly use React for larger projects",
                           "I'm very familiar with react-router-dom, JSX and React Hooks"
                        ],
                     }}
                  ></SkillItem>
               </div>
            </section>

            <section className="skills-section skills-section--rSide">
               <h2 className="skills-section__title" style={titlePos}>backend</h2>

               <div className="skills-section__data">
                  <SkillItem
                     data={{
                        title: "Node.js",
                        rating: "7",
                        details: [
                           "Server side scripting",
                           "REST Api and Web Servers",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Express",
                        rating: "7",
                        details: [
                           "I use Express along with Node for",
                           "SSR and Middleware scripts",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "MongoDB",
                        rating: "7",
                        details: [
                           "NoSQL DBMS",
                           "I'm used to work with Mongo Atlas and Cloud clusters",
                        ],
                     }}
                  ></SkillItem>
               </div>
            </section>

            <section className="skills-section skills-section--lSide">
               <h2 className="skills-section__title" style={titlePos}>misc</h2>

               <div className="skills-section__data">
                  <SkillItem
                     data={{
                        title: "Bash Scripting",
                        rating: "8",
                        details: [
                           "Fluent with Unix Shells",
                           "I use GUI as CLI and TUI",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Git and GitHub",
                        rating: "8",
                        details: [
                           "All my projects are shared between local git repos and GitHub",
                           "You can find me on GitHub from the Contact section"
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "npm",
                        rating: "9",
                        details: [
                           "I love making my own code from scratch",
                           "Still, when needed, I make use of the node package ecosystem",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Webpack",
                        rating: "7",
                        details: [
                           "Along with webpack I always optimize my projects code",
                           "Code minification, bundling and assets optimization",
                        ],
                     }}
                  ></SkillItem>
               </div>
            </section>

            <section className="skills-section skills-section--rSide">
               <h2 className="skills-section__title" style={titlePos}>others</h2>

               <div className="skills-section__data">
                  <SkillItem
                     data={{
                        title: "C",
                        rating: "9",
                        details: [
                           "I've completed an university course in C using",
                           "File streams, pointers and memory management",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "C++",
                        rating: "6",
                        details: [
                           "Worked on small c++ game projects",
                           "Using the SDL library",
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Java",
                        rating: "6",
                        details: [
                           "I'm currently working with it at university"
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Assembly",
                        rating: "6",
                        details: [
                           "Made some small projects in RISC-V Assembly",
                           "I can deal with low level computer mechanisms"
                        ],
                     }}
                  ></SkillItem>
                  <SkillItem
                     data={{
                        title: "Arduino",
                        rating: "6",
                        details: [
                           "I use it as a spare time activity",
                           "Helps me understand the hardware/software link"
                        ],
                     }}
                  ></SkillItem>
               </div>
            </section>

            <section className="skills-footer">
                  <Button to="/" onUnmount={transitionHandler}>HOME</Button>
            </section>
         </article>
      </>
   );
}

export default Skills;