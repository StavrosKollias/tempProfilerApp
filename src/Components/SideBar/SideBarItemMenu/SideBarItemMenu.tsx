import React, { useState } from "react";
import { ISideBarItemProps ,IMenuObject } from "./ISideBarItemProps";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";

import SideBarItemList from "../SideBarItemList/SideBarItemList";

// React hooks for stateless component
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const SideBarItemMenu:React.FC<ISideBarItemProps>=(props)=>{
    const [sideBarItems,setMyValues] = useState(props.sideBarItems);
    const forceUpdate = useForceUpdate();

    const handleClickSideMenuButton=(obj:IMenuObject)=>{
        const propsSideBarItems= props.sideBarItems;
        const sideBarItemActive= propsSideBarItems.filter(x=> x.active);
            if(obj.subMenu){
                const sideBarItemUsed= propsSideBarItems.filter(x=> x.label==obj.label);
                if(obj.active){
                    sideBarItemUsed[0].active=false;
                    console.log(propsSideBarItems);
                    setMyValues(propsSideBarItems);
                    forceUpdate()
                }else{
                    if(sideBarItemActive.length>0)sideBarItemActive[0].active=false;
                    sideBarItemUsed[0].active=true;
                    setMyValues(propsSideBarItems);
                    forceUpdate();
                }
            }else{
                if(sideBarItemActive.length>0)sideBarItemActive[0].active=false;
                setMyValues(propsSideBarItems);
                forceUpdate();
            }
    }
    
    return(
        <ul className="side-bar-item">
            {props.sideBarItems.map((item,i)=>{
                return  (<li key={i}>
                      <LinkComponent to={item.subMenu?"":`/${item.label}`} handleClick={()=>handleClickSideMenuButton(item)} className={item.active?"current":""} children={item.subMenu?[item.icon,item.label,props.arrowIcon]:[item.icon,item.label]}/>
                      {item.subMenu &&  <SideBarItemList subMenu={item.subMenu} active={item.active}/>}
                      </li>)
            })}
        </ul>
    )
} 

export default SideBarItemMenu;