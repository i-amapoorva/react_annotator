import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import "../Header/Header.css";
import img from "../../assets/ai-icon.png"
 import profileimg from "../../assets/account.png";
import settings from "../../assets/settings.png";
 import TokenService from "../../Components/Service/TokenService";
//  import Profile from "./Profile";

function Header() {
  // const navigate = useNavigate();
   const projectDetails = TokenService.getProjectDetails();
  function logOut(){
       TokenService.clearStorage();
      //  navigate("/");
      window.location.replace('/login')

  }

//   const imageClick = () => {

//     console.log('Click!!!!');
//    return <Profile />;
//  } 

  return (
    <div className="header">
      <div className="header-element">
        <img src={img} className="logo" />
        <a href="/projects" className="logo-name">AI Studio</a>
        {/* <a href="/add-images" className="logo-name">AI Studio</a> */}
      </div>
      <div>
        <h3 className="header-project-name">
          { projectDetails ? projectDetails.projectName :" "}
          </h3>
      </div>
      <div className="header-element">
        <img src={profileimg} className="account-img"
        //  onClick={imageClick}
          />
          {/* <Profile className="account-img" /> */}
        <img src={settings} className="account-img" />
        <a className="link" onClick={logOut}>
                <LogoutOutlined /> Logout
              </a>
      </div>
    </div>
  );
}

export default Header;
