import { React, useContext } from "react";

import Audio from "../sys/Audio";

import radioAudio from "../assets/audio/radio-audio.mp3";
import radioAudio1 from "../assets/audio/radio-audio1.wav";
import radioAudio2 from "../assets/audio/radio-audio2.wav";
import { AppContext } from "../sys/context";

import "./PageTransition.scss";

const PageTransition = props => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);

   // RADIO SAMPLE MIX
   const radioTunes = [
      radioAudio,
      radioAudio1,
      radioAudio2
   ]

   const randomRadioTune = radioTunes[Math.round(Math.random() * 2)];
   var randomMsg = "";
   var firstChar = "";
   var label = "";
   if (sessionStorage.getItem("msg")) {
      randomMsg = JSON.parse(sessionStorage.getItem("msg"))[1].substr(1);
      firstChar = JSON.parse(sessionStorage.getItem("msg"))[1].charAt(0);
      label = JSON.parse(sessionStorage.getItem("msg"))[0];
   }

   // MOBILE RESIZE
   const wrapperStyles = {
      height: isMobile ? window.innerHeight : "100vh"
   }

   return (
      <div className={`page-transition__wrapper ${props.className}`} style={wrapperStyles}>
         <h3 className="page-transition__txt txt--label">{label}</h3>
         <h3 className="page-transition__txt txt--msg" init={firstChar}>{randomMsg}</h3>
            <Audio src={randomRadioTune} type="active" active={props.activeAudio} className="radio-audio"></Audio>
      </div>
   )
}

export default PageTransition;