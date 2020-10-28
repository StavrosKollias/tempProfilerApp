import React from "react";
import SideBarComponent from "../SideBarComponent/SideBarComponent";

import './MainContainerComponent.scss';

const MainContainerComponent: React.FC<{}>= (props)=>{
    return(
        <div className="main-wrapper" data-role="page" data-theme="light">
           <SideBarComponent/>
        </div>
    )
} 


export default MainContainerComponent