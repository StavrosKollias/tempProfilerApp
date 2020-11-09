import React from "react";
import LinkComponent from "../Peripherals/LinkComponent/LinkComponent";

import "./LogInRegisterPopup.scss";

const LogInRegisterPopup: React.FC = (props) => {
   return (
      <div className="login-popup">
         <div className="buttons-container">
            <h2 className="login-popup-title">Login to use the software.</h2>
            <LinkComponent className="btn btn-primary" id="open-login-btn" innerText="Login" to={"/Login"} />
            <h2 className="login-popup-title">Register as a new user now!</h2>
            <LinkComponent className="btn btn-secondary" id="open-login-btn" innerText="Register" to={"/Register"} />
         </div>
      </div>
   );
};

export default LogInRegisterPopup;
