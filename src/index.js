// @flow

import React from "react"
import ReactDOM from "react-dom"
import Theme from "./Theme"
import DemoSite from "./DemoSite"
import LandingPage from "./LandingPage"
import "./site.css"
import AddImages from "./Pages/Addimages/AddImages"
// import Login from "./Login/Login"
import Projects from "./LandingPage/Projects"
import  Training from "./Pages/Training/Training";
import Testing from "./Pages/Testing/Testing";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp"
// import Annotate from "./LandingPage/Annotate"
// import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


// const routes = (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/add-images" element={<AddImages />} />
//     </Routes>
//   </Router>
// );

const Site = () => {
  const path = window.location.pathname
    .replace(/\/$/, "")
    .split("/")
    .slice(-1)[0]
   return <Theme>
   {/* {path === "login" ? <Login /> : <LandingPage />}, */}
    {path === "demo" ? <DemoSite /> : ''}
  {path === "add-images" ? <AddImages /> : '' }
  
  {path === "projects" ? <Projects /> : '' }
  {path=== "training" ? <Training /> : ' '}
  {path=== "testing" ? <Testing /> : ' '}
  {path === "login" ? <Login /> : '' }
  {path === "signup" ? <SignUp /> : ''}
  {/* {path === "annotate" ? <Annotate /> : ''} */}
  {/* {routes} */}
  
  </Theme>;
}

ReactDOM.render(<Site />, document.getElementById("root"))
