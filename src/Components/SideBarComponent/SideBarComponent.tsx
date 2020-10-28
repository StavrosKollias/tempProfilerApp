
import React from "react";

import "./SideBarComponent.scss"

interface ISideBarComponentState{
    active:boolean;
}

class  SideBarComponent extends React.Component<{},ISideBarComponentState>{
    constructor(props:ISideBarComponentState ){
        super(props);
        this.state={
            active:true,
        }
    }


    render(){
        return(
            <section className="side-bar toggle-left" data-role="side-bar" data-theme="dark" >
            <div className="side-bar-logo">
            <div className="logo"><i className="fas fa-cube"></i> Profiler</div>
            </div>

            
            </section>

        )
    }
}


export default SideBarComponent;