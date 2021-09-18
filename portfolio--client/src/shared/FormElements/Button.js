import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Audio from "../sys/Audio";
import hoverAudio from "../assets/audio/hover-audio.mp3";
import clickAudio from "../assets/audio/click-audio.mp3";
import useAudio from "../../shared/hooks/audio-hook";
import msgs from "../UIElements/msgs";

import "./Button.scss";

const Button = props => {

   const history = useHistory();

   const preRedirectOps = () => {
      if (props.to) {
         const msgsRange = msgs.length - 1;
         const currentMsg = JSON.parse(sessionStorage.getItem("msg")) || "";
         var randomNum = Math.round(Math.random() * msgsRange);
         var randomMsg = msgs[randomNum];
         if (randomMsg[1] == currentMsg[1]) {
            randomNum = (randomNum+1)%msgsRange;
            randomMsg = msgs[randomNum];
         }
      }

      if (props.onUnmount)
         props.onUnmount();

      sessionStorage.setItem("pageLoads", "1");
      sessionStorage.setItem("msg", JSON.stringify(randomMsg));
      setTimeout(() => history.push(`${props.to}`), 400);
   }

   const [ isActive, handleAudioEvent ] = useAudio({
      click: props.to ? preRedirectOps : false,
      ...props.callbacks
   });

   if (props.to) {
      return (
         <button
            type="button"
            className={`link-btn ${props.className}`}
            id={props.id}
            style={props.style}
            onMouseEnter={handleAudioEvent}
            onMouseLeave={handleAudioEvent}
            onClick={handleAudioEvent}
         >
            <Audio src={hoverAudio} type="active" active={isActive.over}></Audio>
            <Audio src={clickAudio} type="active" active={isActive.click}></Audio>
            {props.children}
         </button>
      );
   }
   if (props.href) {
      return(
         <a 
            className={`external-link-btn ${props.className}`}
            id={props.id} 
            target={props.target || "_blank"}
            href={props.href}
            onMouseEnter={handleAudioEvent}
            onMouseLeave={handleAudioEvent}
            onClick={handleAudioEvent}
            style={props.style}
         >
            <Audio src={hoverAudio} type="active" active={isActive.over}></Audio>
            <Audio src={clickAudio} type="active" active={isActive.click}></Audio>
            {props.children}
         </a>
      )
   }
   return (
      <button
         className={`button-btn ${props.className}`}
         id={props.id}
         style={props.style}
         onMouseEnter={handleAudioEvent}
         onMouseLeave={handleAudioEvent}
         onClick={handleAudioEvent}
      >
         <Audio src={hoverAudio} type="active" active={isActive.over}></Audio>
         <Audio src={clickAudio} type="active" active={isActive.click}></Audio>
         {props.children}
      </button>
   );
};

export default Button;