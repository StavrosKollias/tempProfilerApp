import React from "react";
import ButtonComponent from "../../Peripherals/ButtonComponent/ButtonComponent";
import InputComponent from "../../Peripherals/InputComponent/InputComponent";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import { setVisibilityToInput } from "../../../functions/toolkit";
import "./LoginFormComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const lockIcon=
const userIcon = <FontAwesomeIcon className="txt-dark" icon={faUser} />;
const lockIcon = <FontAwesomeIcon className="txt-dark" icon={faLock} />;
const eyeIcon = <FontAwesomeIcon className="txt-dark" data-role="visibility-icon" onClick={(e) => setVisibilityToInput(e)} icon={faEye} />;
const eyeSlashIcon = <FontAwesomeIcon className="txt-dark" data-role="visibility-icon" onClick={(e) => setVisibilityToInput(e)} icon={faEyeSlash} />;
const LoginFormComponent: React.FC = (props) => {
   return (
      <div className="login-form">
         <h2 className="login-form-title">Login Form</h2>
         <InputComponent
            type="text"
            label="Enter username or Email"
            className="input-light"
            placeholder="Enter Username"
            containerClassName="important"
            icon={userIcon}
         />
         <InputComponent
            type="password"
            label="Password"
            className="input-light important"
            placeholder="Enter Password"
            containerClassName="important"
            icon={lockIcon}
            visibilityIcon={eyeIcon}
         />
         <div className="form-buttons-container">
            <ButtonComponent className="btn-primary" id="log-in-btn" innerText="Login" />
            <LinkComponent className="btn btn-danger" id="open-login-btn" innerText="Back" to={"/"} />
         </div>
      </div>
   );
};

export default LoginFormComponent;
