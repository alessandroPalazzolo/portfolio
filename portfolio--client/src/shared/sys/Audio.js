import React, { useState, useCallback, useRef, useEffect } from "react";

import "./Audio.scss";

const Audio = props => {

   const [volumeState, setVolumeSate] = useState("on");

   const handleVolume = useCallback(e => {
      const newVolumeState = volumeState == "on" ? "off" : "on";
      setVolumeSate(newVolumeState);
   })

   const activeAudio = useRef();
   const backAudio = useRef();

   useEffect(() => {
      if (props.type == "background") {
         backAudio.current.volume = 0.4;
      }
      if (props.active) {
         activeAudio.current.play();
      }
      if (!props.active && props.className == "radio-audio") {
         activeAudio.current.pause();
      }
   }, [props.active])

   return (
      <>
         {props.type == "active" && (
            <audio ref={activeAudio} className={props.className}>
               <source src={props.src} />
            </audio>
         )}
         {props.type == "background" && (
            <>
               <audio
                  autoplay={props.type == "background" && "autoplay"}
                  loop={props.type == "background" && "loop"}
                  muted={props.type == "background" && volumeState == "off"}
                  ref={backAudio}
               >
                  <source src={props.src} />
               </audio>
               <svg
                  viewBox="0 0 24 24"
                  width="2.56rem"
                  height="2.56rem"
                  stroke={props.stroke || "white"}
                  stroke-width="2"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class={`audio-back ${props.className}`}
                  onClick={handleVolume}
               >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  {volumeState == "off" ? (
                     <>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                     </>
                  ) : (
                     <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  )}
               </svg>
            </>
         )}
      </>
   );
}

export default Audio;