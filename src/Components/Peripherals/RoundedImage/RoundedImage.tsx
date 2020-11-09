import React from "react";
import { IRoundedImageProps } from "./IRoundedImageProps";



const RoundedImage:React.FC<IRoundedImageProps>=(props)=>{
    return(
        <div className={props.className}>
            {!props.url && props.icon}
            {!props.icon && <img  src={props.url} alt="user logged in"/> }
            {/* image-user-container-rounded-m" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80"  */}
        </div>
    )
}

export default RoundedImage