import React from "react";
import ButtonComponent from "../../Peripherals/ButtonComponent/ButtonComponent";
import InputComponent from "../../Peripherals/InputComponent/InputComponent";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import SelectComponent from "../../Peripherals/SelectComponent/SelectComponent";
import { setVisibilityToInput, testFunction } from "../../../functions/toolkit";
import "./RegisterFormComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const lockIcon=
const userIcon = <FontAwesomeIcon className="txt-dark" icon={faUser} />;
const lockIcon = <FontAwesomeIcon className="txt-dark" icon={faLock} />;
const atIcon = <FontAwesomeIcon className="txt-dark" icon={faAt} />;

const eyeSlashIcon = <FontAwesomeIcon className="txt-dark" data-role="visibility-icon" onClick={(e) => setVisibilityToInput(e)} icon={faEyeSlash} />;
const eyeIcon = (
   <FontAwesomeIcon
      className="txt-dark"
      data-role="visibility-icon"
      onClick={(e) => {
         setVisibilityToInput(e);
         console.log("hey");
      }}
      icon={faEye}
   />
);
const RegisterFormComponent: React.FC<{}> = () => {
   return (
      <div className="register-form">
         <h2 className="register-form-title">Register Form</h2>
         <InputComponent type="text" label="Enter username" className="input-light" placeholder="Enter UserName" containerClassName="important" icon={userIcon} />
         <InputComponent type="email" label="Enter email" className="input-light" placeholder="Enter Email" containerClassName="important" icon={atIcon} />
         <InputComponent
            type="password"
            label="Password"
            className="input-light"
            placeholder="Enter Password"
            containerClassName="important"
            icon={lockIcon}
            visibilityIcon={eyeSlashIcon}
         />
         <InputComponent
            type="password"
            label="Repeat Password"
            className="input-light"
            placeholder="Repeat Password"
            containerClassName="important"
            icon={lockIcon}
            visibilityIcon={eyeIcon}
         />
         <SelectComponent
            options={["Operator", "Engineer", "Supervisor"]}
            className="select-dark"
            name="select-user-type"
            id="register-user-type"
            label="Type"
            containerClassName="important"
         />
         <div className="form-buttons-container">
            <ButtonComponent className="btn-secondary" id="log-in-btn" innerText="Register" />
            <LinkComponent className="btn btn-danger" id="open-login-btn" innerText="Back" to={"/"} />
         </div>
      </div>
   );
};

export default RegisterFormComponent;
