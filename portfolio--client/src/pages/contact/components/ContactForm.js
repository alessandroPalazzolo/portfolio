import React, { useState, useEffect } from "react";

import Audio from "../../../shared/sys/Audio";
import hoverAudio from "../../../shared/assets/audio/hover-audio.mp3";
import clickAudio from "../../../shared/assets/audio/click-audio.mp3";
import useAudio from "../../../shared/hooks/audio-hook";

import "./ContactForm.scss";

const ContactForm = props => {

   const [ isActive, handleAudioEvent ] = useAudio();

   const [ mailState, setMailState ] = useState({
      display: false,
      status: ""
   });

   const handleForm = e => {
      e.preventDefault();
      const data = new FormData(e.target);
      const contactFormData = {
         name: data.get("name").toString(),
         mail: data.get("e-mail").toString(),
         content: data.get("content").toString()
      };

      setMailState({display: true, status: "pending"});

      const SERVER_URL = "/mail"; //auto added to proxy server url in package.json

      fetch(SERVER_URL,{
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(contactFormData)
      })
      .then(res => res.json())
      .then(parsedRes => {
         if (parsedRes.mailStatus)
            setMailState({
               display: true,
               status: "sent"
            })
         else 
            setMailState({
               display: true,
               status: "error"
            })

         setTimeout(() => setMailState({display: false, status: ""}), 5000);
      })
      .catch(() => {
         setMailState({
            display: true,
            status: "server-error"
         });
         setTimeout(() => setMailState({display: false, status: ""}), 5000);
      });
   }

   var mailMsgStyles = {animation: "showMailMsg .2s ease-out"};
   var mailMsgContent = "";

   switch(mailState.status) {
      case "pending":
         mailMsgStyles["border-color"] = "rgb(200,200,200)";
         mailMsgContent = <p style={mailMsgStyles}>Sending mail...</p>
         break;
      case "sent":
         mailMsgStyles["border-color"] = "green";
         mailMsgContent = <p style={mailMsgStyles}>Mail was correctly sent.</p>
         break;
      case "error":
         mailMsgStyles["border-color"] = "red";
         mailMsgContent = <p style={mailMsgStyles}>Error! Couldn't send mail.</p>
         break;
      case "server-error":
         mailMsgStyles["border-color"] = "red";
         mailMsgContent = <p style={mailMsgStyles}>Server Error! Please contact me directly via e-mail or try later.</p>
         break;
   }

   const mailStatusMsg = (
      <div className="mail-status">
         {mailMsgContent}
      </div>
   )

   return(
      <>
         {
            mailState.display &&
            mailStatusMsg
         }
         <form className="contact-form" onClick={props.onClick} onSubmit={handleForm}>
            <label for="name" className="contact-form__label">Name</label>
            <input type="text" className="contact-form__input" id="name" name="name"></input>
            <label for="e-mail" className="contact-form__label">E-mail</label>
            <input type="text" className="contact-form__input" id="e-mail" name="e-mail"></input> 
            <label for="thoughts" className="contact-form__label">Thoughts</label>
            <textarea type="text" className="contact-form__input" id="thoughts" rows="5" name="content"></textarea>
            <input 
               type="submit" 
               className="contact-form__submit" 
               value="Send" 
               onMouseEnter={handleAudioEvent}
               onMouseLeave={handleAudioEvent}
               onClick={handleAudioEvent}>
            </input>  
            <Audio src={hoverAudio} type="active" active={isActive.over}></Audio>
            <Audio src={clickAudio} type="active" active={isActive.click}></Audio>
         </form>
      </>
   )
}

export default ContactForm;