import React, { useContext } from "react";

import Button from "../../shared/FormElements/Button";
import homeAudio from "../../shared/assets/audio/home-audio.mp3"
import Audio from "../../shared/sys/Audio";
import BackgroundText from "./components/BackgroundText";
import PageTransition from "../../shared/UIElements/PageTransition";
import useTransition from "../../shared/hooks/transition-hook";
import { AppContext } from "../../shared/sys/context";

import radioAudio from "../../shared/assets/audio/radio-audio.mp3";
import radioAudio1 from "../../shared/assets/audio/radio-audio1.wav";
import radioAudio2 from "../../shared/assets/audio/radio-audio2.wav";

import "./Home.scss";
import "./HomeMobile.scss";

const Home = () => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);
   const wrapperStyle = {
      height: isMobile ? window.innerHeight : "100vh"
   }

   const [ transState, transitionHandler ] = useTransition();

   var firstPageLoad = true; 
   var preloadAudios = <></>;

   if (sessionStorage.getItem("pageLoads")) 
      firstPageLoad = false;

   // AUDIO PRELOAD
   if (firstPageLoad){
      preloadAudios = (
         <>
            <Audio type="active" className="audio-preload" src={radioAudio}/>
            <Audio type="active" className="audio-preload" src={radioAudio1}/>
            <Audio type="active" className="audio-preload" src={radioAudio2}/>
         </>
      );
   }

   return (
      <>
      {
         !firstPageLoad 
         ? <PageTransition className={transState.class} activeAudio={!transState.audio}/>
         : preloadAudios
      }
         <div className="home-wrapper" style={wrapperStyle}>
            <div className="back-icon "></div>

            <nav className="menu">
               <h1 className="mobile-title">Alessandro Palazzolo</h1>

               <section className="menu__buttons">
                  <Button
                     to="/work"
                     className="link-btn--menu"
                     id="projects"
                     onUnmount={transitionHandler}
                  >
                     WORK
                  </Button>
                  <Button
                     to="/skills"
                     className="link-btn--menu"
                     id="skills"
                     onUnmount={transitionHandler}
                  >
                     SKILLS
                  </Button>
                  <Button
                     to="/about"
                     className="link-btn--menu"
                     id="about"
                     onUnmount={transitionHandler}
                  >
                     ABOUT
                  </Button>
                  <Button
                     to="/contact"
                     className="link-btn--menu"
                     id="contact"
                     onUnmount={transitionHandler}
                  >
                     CONTACT
                  </Button>
               </section>
               {
                  transState.audio &&
                  <Audio
                     type="background"
                     src={homeAudio}
                     className="audio-back--home"
                  ></Audio>
               }

               <section className="copyright">
                  <h4 className="copyright__line">2021</h4>
                  <h4 className="copyright__line"> © Copyright </h4>
                  <h4 className="copyright__line">Alessandro Palazzolo</h4>
                  <h4 className="copyright__line">All Rights Reserved.</h4>
               </section>
            </nav>

            <BackgroundText />
         </div>
      </>
   );
}

export default Home;