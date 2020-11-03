import React from "react";
import { INavigationBarComponentMenuProps } from "./INavigationBarComponentMenuProps";
import { Link } from "react-router-dom";
import NavigationBarComponentMenuList from "../NavigationBarComponentMenuList/NavigationBarComponentMenuList";




const NavigationBarComponentMenu: React.FC<INavigationBarComponentMenuProps>=(props)=>{
    return(
   
        <ul className="nav-bar-menu">
                 {console.log(props.userName)}
        {props.navMenuItems.map((item,i)=>{
              return  <li key={i}><Link to={item.subMenu?`/${props.userName}`:`/${props.userName}/${item.label}`}  title={item.label} onClick={()=>null} className={item.active?"current":""}>{item.icon}  {item.subMenu && props.arrowIcon}  </Link>  {item.subMenu &&  <NavigationBarComponentMenuList subMenu={item.subMenu} active={item.active} userName={props.userName}/>}</li>
            })}
    </ul>
    )
}
export default NavigationBarComponentMenu