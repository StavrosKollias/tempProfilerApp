import React from "react";
import SideBarItemMenu from "../SideBarItemMenu/SideBarItemMenu";
import { ISideBarComponentProps } from "./ISideBarComponentProps";
import SideBarLogoComponent from "../SideBarLogoComponent/SideBarLogoComponent";
import "./SideBarComponent.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlidersH, faPager, faUser, faCogs, faAngleDown, faBookOpen, faWifi } from "@fortawesome/free-solid-svg-icons";
import SideBarUserStatus from "../SideBarUserStatus/SideBarUserStatus";

const slidersIcon = <FontAwesomeIcon icon={faSlidersH} />;
const arrowDownIcon = <FontAwesomeIcon icon={faAngleDown} />;
const pagerIcon = <FontAwesomeIcon icon={faPager} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const docIcon = <FontAwesomeIcon icon={faBookOpen} />;
const optionsIcon = <FontAwesomeIcon icon={faCogs} />;
const wifiIcon= <FontAwesomeIcon icon={faWifi} />;

const SideBarComponent: React.FC<ISideBarComponentProps> = (props) => {
   const menuArray = [
      { label: "Testing Com", icon: wifiIcon, active: false },
      { label: "DashBoard", icon: slidersIcon, active: false },
      { label: "Pages", icon: pagerIcon, subMenu: ["Temperature", "Zones"], active: false },
      { label: "Documentation", icon: docIcon, subMenu: ["Connection","Thresholds", "Zones", "Channels", "Templates"], active: false },
      { label: "Options", icon: optionsIcon, subMenu: ["Temperature", "Zones"], active: false },
      { label: "User", icon: userIcon, active: false },
   ];

   return (
      <section
         className={
            props.active ? (props.userName ? "side-bar" : "side-bar noPointerEvents") : props.userName ? "side-bar toggled-left" : "side-bar toggled-left noPointerEvents"
         }
         data-role="side-bar"
         data-theme="dark"
      >
         <div className="container">
            <SideBarLogoComponent />
            <h2 className="side-bar-section-title">Menu</h2>
            <SideBarItemMenu arrowIcon={arrowDownIcon} sideBarItems={menuArray} userName={props.userName} />

            <SideBarUserStatus active={false} />
         </div>
      </section>
   );
};

export default SideBarComponent;
