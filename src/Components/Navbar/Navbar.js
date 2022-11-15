import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import { NavLink, BrowserRouter as Router } from "react-router-dom";
import "../Navbar/Navbar.css";
import TokenService from "../../Components/Service/TokenService";

const classNameFunc = ({ isActive }) => (isActive ? "active_link" : "");

function Navbar() {

// const navLinkStyle = ({ isActive }) =>{
//   return{
//     backgroundcolor: isActive ? '#691b1b' : ' '
//   }

// }

  const projectDetails = TokenService.getProjectDetails();
  return (
    <div className="nav-container">
      <ul>
        <li>
          {/* <NavLink
            to={
              projectDetails ? "/add-images/" + projectDetails.id : "/projects"
            }
          >
            Images
          </NavLink> */}
          <a href={projectDetails ? "/add-images" : "/projects"}>Images </a>
        </li>
        <li>
          {/* <NavLink
            to={projectDetails ? "/annotate/" + projectDetails.id : "/projects"}
            activeClassName="active-link"
          >
            Annotate
          </NavLink> */}
          <a href="/demo">Annotate</a>
        </li>
        <li>
          {/* <NavLink
            to={projectDetails ? "/training/" + projectDetails.id : "/projects"}
            activeClassName="active-link"
          >
            Train
          </NavLink> */}
          <a href="/training">Train</a>
        </li>
        <li>
          {/* <NavLink
            to={projectDetails ? "/testing/" + projectDetails.id : "/projects"}
            activeClassName="active-link"
          >
            Test
          </NavLink> */}
          <a href="/testing">Test</a>
        </li>
        <li>
          {/* <NavLink
            to={projectDetails ? "/deploy/" + projectDetails.id : "/projects"}
            activeClassName="active-link"
          >
            Deploy
          </NavLink> */}
          <a href="">Deploy</a>
        </li>
        <li className="last-li">
          {/* <NavLink to="/download" activeClassName="active-link">
            Download
          </NavLink> */}
          <a href="">Download</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
