import { useState, useCallback } from "react";

const useAudio = (cb = {}) => {
   const [ isActive, setIsActive ] = useState({
      over: false,
      out: false,
      click: false
   });

   const handleAudioEvent = useCallback(e => {
      switch(e.type) {
         case "mouseenter":
            setIsActive({
               over: true,
               out: false
            });
            cb.hasOwnProperty("mouseenter") && cb.mouseenter(e);
            break;
         case "mouseleave":
            setIsActive({
               over: false,
               out: !isActive.click
            });
            cb.hasOwnProperty("mouseleave") && cb.mouseleave(e);
            break;
         case "click":
            setIsActive({click: true});
            if (cb.hasOwnProperty("click")) {
               cb.click && e.preventDefault();
               cb.click && cb.click(e);
            }           
            break;
         default:
            return;
      }
   })
   
   return [ isActive, handleAudioEvent ]
}

export default useAudio;