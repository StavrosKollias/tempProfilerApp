
export const setVisibilityToInput=(element:any)=>{
    const target=element.currentTarget;
    const iconData=target.dataset.icon;
    const input = target.previousElementSibling;
    console.log(target.children[0]);
    target.removeChild(target.children[0]);
  if(iconData==="eye-slash"){
    input.type ="password";
    target.dataset.icon="eye";
  }else{
    input.type ="text";
    target.dataset.icon="eye-slash";
  }
    // targetelement.parentElement.querySelector( '[data-role="visibility-icon"]');
    
}