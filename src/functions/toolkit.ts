export const setVisibilityToInput = (event:any) => {
   const target = event.currentTarget;
   const iconData = target.dataset.icon;
   const inputParent = target.parentElement.parentElement;
   const input = inputParent.querySelector("input");
   if (iconData === "eye-slash") {
      input.type = "password";
      const replaceMentIcon = inputParent.querySelector('[data-role="visibility-icon"]');
      replaceMentIcon.classList.remove("display-none");
      target.classList.add("display-none");
   } else {
      input.type = "text";
      const replaceMentIcon = inputParent.querySelector('[data-role="visibility-icon-replace"]');
      replaceMentIcon.classList.remove("display-none");
      target.classList.add("display-none");
   }
};

export const testFunction = () => {
   console.log("hey");
};




export const validate=(email:string)=>{
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
}

export  const checkForSpecialCharactersLengthInString=(str:string)=>{
   return str.replace(/[0-9a-zA-Z]/g,"").length;
}


export const checkForLetterslengthInString=(str:string)=>{
 return str.replace(/[^a-zA-Z]/g,"").length;
}

// [^0-9a-zA-Z]+