import React, { useRef, useEffect, useCallback, useContext} from "react";

import aboutAudio from "../../shared/assets/audio/about-audio.mp3";
import Audio from "../../shared/sys/Audio";
import Button from "../../shared/FormElements/Button";
import useAudio from "../../shared/hooks/audio-hook";
import BashPortrait from "./components/BashPortrait";
import FinderWindow from "./components/FinderWindow";
import PageTransition from "../../shared/UIElements/PageTransition";
import useTransition from "../../shared/hooks/transition-hook";
import { AppContext } from "../../shared/sys/context";

import markerOver from "../../shared/assets/audio/marker-over.ogg";
import markerOut from "../../shared/assets/audio/marker-out.ogg";

import "./About.scss";
import "./AboutMobile.scss";

const About = () => {

   // CONTEXT
   const { isMobile } = useContext(AppContext);

   // MARKER 
   const markerInfo = useRef();
   const [ isActive, handleAudioEvent ] = useAudio();

   const overHandler = useCallback(e => {

      handleAudioEvent(e);

      switch(e.type){
         case "mouseenter":
            markerInfo.current.classList.add("info--show");
            break;
         case "mouseleave":
            markerInfo.current.classList.remove("info--show");
            break;
         default:
            return;
      }
   },[markerInfo, handleAudioEvent]);

   // BASH
   const bash = useRef();
   const aboutWrapper = useRef();
   const marker = useRef();

   useEffect(() => {
      const container = isMobile ? aboutWrapper : bash;
      if (container.current) {
         var myInterval = setInterval(() => container.current.scrollTop += container.current.scrollHeight, 1);
         var myTimeout = setTimeout(() => clearInterval(myInterval), isMobile ? 35500 : 43000);
         if (isMobile)
            var mobileMarker = setTimeout(() => marker.current.style["opacity"] = 1, 35500);
         return () => {
            clearTimeout(myTimeout);
            if (myInterval)
               clearInterval(myInterval);
            if (mobileMarker)
               clearInterval(mobileMarker);
         }
      }
   }, [])

   // PAGE_TRANSITION
   const [ transState, transitionHandler ] = useTransition();

   // MOBILE VIEWPORT RESIZE
   const wrapperStyles = {
      height: isMobile ? window.innerHeight : "100vh"
   }
   
   return (
      <>
         <PageTransition className={transState.class} activeAudio={!transState.audio}/>
         <div className="about-wrapper" ref={aboutWrapper} style={wrapperStyles}>

            <article className="bash" ref={bash}>
               <section className="bash__line">
                  <p className="bash__script--init">{!isMobile && "Alessandros-Mac-Book-Air"}:~ AlessandroPalazzolo$</p>
                  <p className="bash__script" id="whoami">whoami</p>
               </section>
               <section className="bash__line" id="ln-1">
                  <p className="bash__output">AlessandroPalazzolo - 20y - Frontend Web Developer</p>
               </section>
               <section className="bash__line" id="ln-2">
                  <p className="bash__script--init">{!isMobile && "Alessandros-Mac-Book-Air"}:~ AlessandroPalazzolo$</p>
                  <p className="bash__script" id="ls">ls -a</p>
               </section>
               <section className="bash__line" id="ln-3">
                  <p className="bash__output">.</p>
                  <p className="bash__output">..</p>
                  <p className="bash__output">about.js</p>
                  <p className="bash__output">roswell-confidential.doc</p>
               </section>
               <section className="bash__line" id="ln-4">
                  <p className="bash__script--init">{!isMobile && "Alessandros-Mac-Book-Air"}:~ AlessandroPalazzolo$</p>
                  <p className="bash__script" id="node">node about.js</p>
               </section>

               {/* educazione */}

               <section className="bash__line" id="ln-5">
                  <p className="bash__output node__echo">Creating runtime environment</p>
               </section>
               <section className="bash__line" id="ln-5a">
                  <p className="bash__output node__echo">Pull education history...</p>
               </section>
               <section className="bash__line" id="ln-education">
                  <p className="bash__output">{"{"}</p>
               </section>

               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output node__key">universitaDegliStudiDiFirenze:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">date:</p>
                  <p className="bash__output node__val">{ "{ 2020, 2021 }," }</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">place:</p>
                  <p className="bash__output node__val">Italia/Firenze,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">corso:</p>
                  <p className="bash__output node__val">Laurea Triennale Informatica,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">course:</p>
                  <p className="bash__output node__val">Computer Science,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">ongoing:</p>
                  <p className="bash__output node__true">True</p>
               </section>
               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output node__key">universitaDegliStudiDiSiena:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">date:</p>
                  <p className="bash__output node__val">{ "{ 2019, 2020 }," }</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">place:</p>
                  <p className="bash__output node__val">Italia/Siena,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">corso:</p>
                  <p className="bash__output node__val">Laurea Triennale Ingegneria Informatica,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">course:</p>
                  <p className="bash__output node__val">Computer Engineering,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">ongoing:</p>
                  <p className="bash__output node__false">False</p>
               </section>
               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output node__key">liceoClassico:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">date:</p>
                  <p className="bash__output node__val">{ "{ 2014, 2019 }," }</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">place:</p>
                  <p className="bash__output node__val">Italia/Siena,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">corso:</p>
                  <p className="bash__output node__val">Maturita Classica,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">course:</p>
                  <p className="bash__output node__val">Classical Studies,</p>
               </section>
               <section className="bash__line i-2" id="ln-education">
                  <p className="bash__output node__key">ongoing:</p>
                  <p className="bash__output node__false">False</p>
               </section>
               <section className="bash__line i-1" id="ln-education">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line" id="ln-education">
                  <p className="bash__output">{"}"}</p>
               </section>

               {/* certificazioni */}

               <section className="bash__line" id="ln-6">
                  <p className="bash__output node__echo">Pull certifications history, done</p>
               </section>
               <section className="bash__line" id="ln-6a">
                  <p className="bash__output node__echo">Downloaded 2.8 KB in 0.326s</p>
               </section>

               <section className="bash__line" id="ln-certification">
                  <p className="bash__output">{"{"}</p>
               </section>

               <section className="bash__line i-1" id="ln-certification">
                  <p className="bash__output node__key">First Certificate in English:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">date:</p>
                  <p className="bash__output node__val">2018</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">place:</p>
                  <p className="bash__output node__val">Universita per Stranieri</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">score:</p>
                  <p className="bash__output node__val">171</p>
               </section>
               <section className="bash__line i-1" id="ln-certification">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-certification">
                  <p className="bash__output node__key">Preliminary English Test:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">date:</p>
                  <p className="bash__output node__val">2017</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">place:</p>
                  <p className="bash__output node__val">Universita per Stranieri</p>
               </section>
               <section className="bash__line i-2" id="ln-certification">
                  <p className="bash__output node__key">score:</p>
                  <p className="bash__output node__val">160 - Pass With Distinction</p>
               </section>
               <section className="bash__line i-1" id="ln-certification">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line" id="ln-certification">
                  <p className="bash__output">{"}"}</p>
               </section>

               {/* Lingue */}

               <section className="bash__line" id="ln-7">
                  <p className="bash__output node__echo">Fetch languages.db...</p>
               </section>

               <section className="bash__line" id="ln-lang">
                  <p className="bash__output">{"{"}</p>
               </section>

               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output node__key">Français:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-lang">
                  <p className="bash__output node__key">fluency:</p>
                  <p className="bash__output node__val">native</p>
               </section>
               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output node__key">English:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-lang">
                  <p className="bash__output node__key">fluency:</p>
                  <p className="bash__output node__val">conversational</p>
               </section>
               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output node__key">Italiano:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-lang">
                  <p className="bash__output node__key">fluency:</p>
                  <p className="bash__output node__val">native</p>
               </section>
               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output node__key">Español:</p>
                  <p className="bash__output">{"{"}</p>
               </section>
               <section className="bash__line i-2" id="ln-lang">
                  <p className="bash__output node__key">fluency:</p>
                  <p className="bash__output node__val">basic</p>
               </section>
               <section className="bash__line i-1" id="ln-lang">
                  <p className="bash__output">{"}"}</p>
               </section>

               <section className="bash__line" id="ln-lang">
                  <p className="bash__output">{"}"}</p>
               </section>

               {/* interessi */}

               <section className="bash__line" id="ln-8">
                  <p className="bash__output node__echo">Print wide-interests.json...</p>
               </section>

               <section className="bash__line" id="ln-interests">
                  <p className="bash__output">{"{"}</p>
               </section>

               <section className="bash__line i-2" id="ln-interests">
                  <p className="bash__output node__val">cyberSecurity,</p>
               </section>
               <section className="bash__line i-2" id="ln-interests">
                  <p className="bash__output node__val">algorythms {"&&"} dataStructures,</p>
               </section>
               <section className="bash__line i-2" id="ln-interests">
                  <p className="bash__output node__val">fullstack web development,</p>
               </section>
               <section className="bash__line i-2" id="ln-interests">
                  <p className="bash__output node__val">cinema,</p>
               </section>
               <section className="bash__line i-2" id="ln-interests">
                  <p className="bash__output node__val">hardware,</p>
               </section>

               <section className="bash__line" id="ln-interests">
                  <p className="bash__output">{"}"}</p>
               </section>

               {/* pic */}

               {
                  !isMobile && 
                  <>
                     <section className="bash__line" id="ln-9">
                        <p className="bash__output node__echo">{"-->"} Loading myFace.png... downloaded 67 of 67 KB, done</p>
                     </section>
                     <section className="bash__line" id="ln-9a">
                        <p className="bash__output node__echo">Convert to ascii...</p>
                     </section>
                     <section className="bash__line" id="ln-A">
                        <p className="bash__output node__echo">Render myFace.ascii</p>
                     </section>

                     <BashPortrait />
                  </>
               }

               {/* bash */}

               <section className="bash__line" id={isMobile ? "ln-9" : "ln-10"}>
                  <p className="bash__script--init">{!isMobile && "Alessandros-Mac-Book-Air"}:~ AlessandroPalazzolo$</p>
                  <p className="bash__script" id={isMobile ? "exit--mobile" : "exit"}>exit</p>
               </section>
            </article>

            <article className="about__GUI">
               <section className="about-data">
                  <FinderWindow filename="README.txt" content="I'm a Frontend developer" style={{"margin-top": "auto"}}/>
                  <FinderWindow filename="loc.txt" content="based in Siena, Italy"/>
                  <FinderWindow filename="work.txt" content="Currently working as a freelancer"/>
                  <FinderWindow filename="name.txt" content="Alessandro Palazzolo"/>
                  <FinderWindow filename="softSkill-A.txt" content="focused on details"/>
                  <FinderWindow filename="softSkill-B.txt" content="Willing to learn new technologies"/>
                  <FinderWindow filename="softSkill-C.txt" content="Visit the contact page to know more" style={{"margin-bottom": "auto"}}/>
               </section>
               <section className="about-map">
                  <div className="about-map__img"></div>
                  <div className="about-map__marker" ref={marker} onMouseEnter={overHandler} onMouseLeave={overHandler}>
                     <Audio src={markerOver} type="active" active={isActive.over}></Audio>
                     <Audio src={markerOut} type="active" active={isActive.out}></Audio>
                     <div className="about-map__marker--ring"></div>
                     <div className="info-wire">
                        <p className="info" ref={markerInfo}>Siena</p>
                     </div>
                  </div>
               </section>
            </article>

            <footer className="about-footer">
               <Button to="/" id="button--about" onUnmount={transitionHandler}>HOME</Button>
               {
                  transState.audio && 
                  <Audio src={aboutAudio} type="background" className="audio-back--about"></Audio>
               }
            </footer>
         </div>
      </>
   )
}

export default About;