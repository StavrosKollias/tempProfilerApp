import React, { useState, useEffect } from "react";
import { ISideBarItemProps, IMenuObject } from "./ISideBarItemProps";
import LinkComponent from "../../Peripherals/LinkComponent/LinkComponent";
import SideBarItemList from "../SideBarItemList/SideBarItemList";

// React hooks external Function Simple for forcing update
function useForceUpdate() {
   const [value, setValue] = useState<number>(0); // integer state
   console.log(value);
   return () => setValue((value) => ++value); // update the state to force render
}

//

const SideBarItemMenu: React.FC<ISideBarItemProps> = (props) => {
   const forceUpdate = useForceUpdate();
   const handleClickSideMenuButton = (obj: IMenuObject) => {
      const propsSideBarItems = props.sideBarItems;
      const sideBarItemActive = propsSideBarItems.filter((x) => x.active);
      if (obj.subMenu) {
         const sideBarItemUsed = propsSideBarItems.filter((x) => x.label === obj.label);
         if (obj.active) {
            sideBarItemUsed[0].active = false;
            forceUpdate();
         } else {
            if (sideBarItemActive.length > 0) sideBarItemActive[0].active = false;
            sideBarItemUsed[0].active = true;
            forceUpdate();
         }
      } else {
         if (sideBarItemActive.length > 0) sideBarItemActive[0].active = false;
         forceUpdate();
      }
   };

   return (
      <ul className="side-bar-item">
         {props.sideBarItems.map((item, i) => {
            return (
               <li key={i}>
                  <LinkComponent
                     to={item.subMenu ? (props.userName ? `/${props.userName}` : "/") : props.userName ? `/${props.userName}/${item.label.toLocaleLowerCase()}` : "/"}
                     handleClick={() => handleClickSideMenuButton(item)}
                     className={item.active ? "current" : ""}
                     children={item.subMenu ? [item.icon, item.label, props.arrowIcon] : [item.icon, item.label]}
                  />
                  {item.subMenu && <SideBarItemList subMenu={item.subMenu} active={item.active} userName={props.userName} />}
               </li>
            );
         })}
      </ul>
   );
};

export default SideBarItemMenu;
