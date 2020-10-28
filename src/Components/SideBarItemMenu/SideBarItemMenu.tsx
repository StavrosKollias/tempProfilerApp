import React, { useState } from "react";
import { ISideBarItemProps ,IMenuObject } from "./ISideBarItemProps";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import SideBarItemMenuSubMenu from "../SideBarItemMenuSubMenu/SideBarItemMenuSubMenu";

// React hooks for stateless component
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const SideBarItemMenu:React.FC<ISideBarItemProps>=(props)=>{

    const [sideBarItems,setMyValues] = useState(props.sideBarItems);
    const forceUpdate = useForceUpdate();

    const handleClickSideMenuButton=(obj:IMenuObject)=>{
            if(obj.subMenu){
                const sideBarItemActive= sideBarItems.filter(x=> x.active);
                const sideBarItemUsed= sideBarItems.filter(x=> x.label==obj.label);
                console.log(sideBarItemUsed);
                if(obj.active){
                    sideBarItemUsed[0].active=false;
                    console.log(sideBarItems);
                    setMyValues(sideBarItems);
                    forceUpdate()
                }else{
                    if(sideBarItemActive.length>0)sideBarItemActive[0].active=false;
                    sideBarItemUsed[0].active=true;
                    setMyValues(sideBarItems);
                    forceUpdate();
                }
            }
    }
    


    return(
        <Router>
        <ul className="side-bar-item">
            {props.sideBarItems.map((item,i)=>{
                
                  return  <li key={i}><Link to={item.subMenu?"/":`/${item.label}`}  onClick={()=>handleClickSideMenuButton(item)} className={item.active?"current":""}>{item.icon} {item.label} {item.subMenu && props.arrowIcon}  </Link>  {item.subMenu &&  <SideBarItemMenuSubMenu subMenu={item.subMenu} active={item.active}/>}</li>
                })}
        </ul>
        </Router> 
    )
} 

export default SideBarItemMenu;