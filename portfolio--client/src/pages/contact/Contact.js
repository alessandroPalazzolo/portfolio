import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import Parallax from "parallax-js";
import ReactGA from "react-ga";

import Button from "../../shared/FormElements/Button";
import Audio from "../../shared/sys/Audio";
import useAudio from "../../shared/hooks/audio-hook";
import Modal from "../../shared/UIElements/Modal";
import ContactForm from "../contact/components/ContactForm";
import PageTransition from "../../shared/UIElements/PageTransition";
import useTransition from "../../shared/hooks/transition-hook";
import { AppContext } from "../../shared/sys/context";

import markerOver from "../../shared/assets/audio/marker-over.ogg";
import markerOut from "../../shared/assets/audio/marker-out.ogg";
import clickAudio from "../../shared/assets/audio/click-audio.mp3";
import contactAudio from "../../shared/assets/audio/contact-audio.mp3";

import "./Contact.scss";
import "./ContactMobile.scss";

const Contact = () => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);
   const wrapperStyle = {
      height: isMobile ? window.innerHeight : "100vh"
   }

   // MOBILE ICONS STATE
   const [ iconsShowState, setIconsShowState ] = useState(true);
   const iconStyle = {
      opacity: iconsShowState ? 1 : 0
   }

   // MSG
   const [ msgState, setMsgState ] = useState("CONTACT");

   const handleMsgEvents = useCallback(e => {
      switch(e.currentTarget.id) {
         case "msg--marker":
            if (e.type == "mouseenter")
               setMsgState("CLICK!");
            else 
               setMsgState("CONTACT");
            break;
         case "msg--github":
            if (e.type == "mouseenter")
               setMsgState("GITHUB");
            break;
         case "msg--freelance":
            if (e.type == "mouseenter")
               setMsgState("FREELANCE");
               break;
         case "msg--mail":
            if (e.type == "mouseenter")
               setMsgState("E-MAIL");
            if (e.type == "click")
               if (isMobile) {
                  ReactGA.event({
                     category: "/contact click",
                     action: "/Contact form displayed"
                  });
                  setShowModal(true);
                  setIconsShowState(false);
               }
               else 
                  setMsgState("alessandrorochepalazzolo@gmail.com");
            break;
         default:
            return;
      }
   }, [setMsgState]);

   // PARALLAX
   const contactWrapper = useRef();

   useEffect(() => {
      const contactAnim = new Parallax(contactWrapper.current, {
         scalarX: 20.0,
         scalarY: isMobile ? 20.0 : 10.0
      });
      return () => contactAnim.disable();
   }, [contactWrapper])

   // MODAL
   const [ showModal, setShowModal ] = useState(false);

   const handleModalEvents = useCallback(e => {
      switch(e.target.className) {
         case "contact__marker":
            ReactGA.event({
               category: "/contact click",
               action: "/Contact form displayed"
            })
            setShowModal(true);
            break;
         case "backdrop":
            setShowModal(false);
            setIconsShowState(true);
            break;
         case "contact-form":
            setShowModal(false);
            setIconsShowState(true);
            break;
         default:
            return;
      }
   }, [showModal, setShowModal])

   // AUDIO
   const [ isActive, handleAudioEvent ] = useAudio({
      "mouseenter": handleMsgEvents,
      "mouseleave": handleMsgEvents,
      "click": handleModalEvents
   });

   // HANDLE TRANSITION

   const [ transState, transitionHandler ] = useTransition();

   return (
      <>
         <PageTransition className={transState.class} activeAudio={!transState.audio}/>
         {
            showModal && ( 
               <Modal onClick={handleModalEvents}>
                  <ContactForm onClick={handleModalEvents}></ContactForm>
               </Modal> )
         }
         <div className="contact-wrapper" ref={contactWrapper} style={wrapperStyle}>
            <div className="contact__bg" data-depth=".05"></div>
            <h1 className="contact__msg" 
               data-depth=".1" 
               style={{
                  "font-size": msgState == "alessandrorochepalazzolo@gmail.com" ? "5vw" : "11.5vw",
                  "letter-spacing": msgState == "alessandrorochepalazzolo@gmail.com" ? "-4px" : "-8px"
               }}
            >
               {msgState}
            </h1>
            <div className="contact__birds--1" data-depth=".7"></div>
            <div className="contact__birds--2" data-depth=".5"></div>
            <div className="contact__birds--3" data-depth=".2"></div>
            <div
               className="contact__leaves contact__leaves--1"
               data-depth=".5"
            ></div>
            <div
               className="contact__leaves contact__leaves--2"
               data-depth="1"
            ></div>
            <div
               className="contact__leaves contact__leaves--3"
               data-depth=".3"
            ></div>
            <div className="contact__hand--left" data-depth=".3"></div>
            <div className="contact__hand--right" data-depth=".4">
               <div 
                  className="contact__marker"
                  id="msg--marker" 
                  onClick={handleAudioEvent} 
                  onMouseEnter={handleAudioEvent} 
                  onMouseLeave={handleAudioEvent}
               >
                  <Audio src={markerOver} type="active" active={isActive.over}></Audio>
                  <Audio src={markerOut} type="active" active={isActive.out}></Audio>
                  <Audio src={clickAudio} type="active" active={isActive.click}></Audio>
               </div>
            </div>
            <div className="contact__footer" data-depth="0">
               <Button to="/" className="link-btn--contact" onUnmount={transitionHandler}>HOME</Button>
               <Button 
                  href="https://github.com/alessandroPalazzolo" 
                  className="external-link-btn--contact"
                  id="msg--github" 
                  callbacks={{
                     "mouseenter": handleMsgEvents,
                     "mouseleave": handleMsgEvents
                  }}
                  style={iconStyle}
               >
                  <svg
                     viewBox="0 0 24 24"
                     width="40"
                     height="40"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     class="contact__footer__icons"
                  >
                     <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
               </Button>

               <Button 
                  href="https://www.upwork.com/freelancers/~010fb3cba7122b47ed?viewMode=1" 
                  className="external-link-btn--contact"
                  id="msg--freelance"
                  callbacks={{
                     "mouseenter": handleMsgEvents,
                     "mouseleave": handleMsgEvents
                  }}
                  style={iconStyle}
                  >
                  <svg
                     viewBox="0 0 24 24"
                     width="40"
                     height="40"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     class="contact__footer__icons"
                  >
                     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                     <rect x="2" y="9" width="4" height="12"></rect>
                     <circle cx="4" cy="4" r="2"></circle>
                  </svg>
               </Button>

               <Button 
                  className="external-link-btn--contact"
                  id="msg--mail" 
                  callbacks={{
                     "mouseenter": handleMsgEvents,
                     "click": handleMsgEvents
                  }}
                  style={iconStyle}
               >
                  <svg
                     viewBox="0 0 24 24"
                     width="40"
                     height="40"
                     fill="none"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     class="contact__footer__icons"
                  >
                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                     <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
               </Button>

               {
                  transState.audio &&
                  <Audio
                     type="background"
                     src={contactAudio}
                     className="audio-back--contact"
                  ></Audio>
               }
            </div>

            <div className="about__icon__bg" data-depth="0"></div>
         </div>
      </>
   );
}

export default Contact;