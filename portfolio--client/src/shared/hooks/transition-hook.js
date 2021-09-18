import {useState, useEffect, useCallback} from "react";

const useTransition = () => {
   const [ transState, setTransState ] = useState({
      class: "",
      audio: false
   });

   useEffect(() => {
      var myTimeout = setTimeout(() => setTransState({
         class: "page-transition__wrapper--enter",
         audio: true
      }), 700);
      return () => clearTimeout(myTimeout);
   }, [ setTransState ]);

   const transitionHandler = useCallback(() => {
      setTransState({
         class: "page-transition__wrapper--exit",
         audio: false
      });
   }, [ setTransState ]);

   return [
      transState,
      transitionHandler
   ]
}

export default useTransition;