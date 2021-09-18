import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { useMediaQuery } from "react-responsive";

import Home from "./pages/home/Home";
import Skills from "./pages/skills/Skills";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Projects from "./pages/projects/Projects";
import RouteTracker from "./shared/sys/route-tracker";
import { AppContext } from "./shared/sys/context";

function App() {

  // REACT GA
  const TRACKING_ID = "UA-182978747-1";
  ReactGA.initialize(TRACKING_ID, {
    gaOptions: {
      siteSpeedSampleRate: 100
    }
  });
  ReactGA.pageview(window.location.pathname + window.location.search);

  // PAGE LOAD TIMING GA
  if (window.performance){
    const pageLoadTime = Math.round(performance.now());
    
    ReactGA.timing({
        category: "Page Load Time",
        variable: "pageLoad",
        value: pageLoadTime,
        label: window.location.pathname
    });
  }

  // SET APP CONTEXT
  const isMobile = useMediaQuery({
    query: "(max-width: 1024px)"
  })

  return (
    <AppContext.Provider value={{isMobile}}>
      <RouteTracker />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/skills">
          <Skills />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/work">
          <Projects />
        </Route>
        <Redirect to="/" />
      </Switch>
    </AppContext.Provider>
  );
}

export default App;
