import React from "react";
import { INavigationBarMenuProps } from "./INavigationBarMenuProps";
import { Link } from "react-router-dom";
import NavigationBarMenuList from "../NavigationBarMenuList/NavigationBarMenuList";




const NavigationBarMenu: React.FC<INavigationBarMenuProps>=(props)=>{
    return(
        <ul className="nav-bar-menu">
        {props.navMenuItems.map((item,i)=>{
              return  <li key={i}>
                        <Link to={item.subMenu?`/${props.userName}`:`/${props.userName}/${item.label}`}  title={item.label} onClick={()=>null} className={item.active?"current":""}>{item.icon}  {item.subMenu && props.arrowIcon}  </Link> 
                         {item.subMenu &&  <NavigationBarMenuList subMenu={item.subMenu} active={item.active} userName={props.userName}/>}
                     </li>
            })}
    </ul>
    )
}
export default NavigationBarMenu