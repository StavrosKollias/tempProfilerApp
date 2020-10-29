export const setVisibilityToInput = (element: any) => {
   console.log("Toolkit");
   const target = element.currentTarget;
   const iconData = target.dataset.icon;
   const input = target.previousElementSibling;
   console.log(target.children[0]);
   //  .removeChild(target.children[0]);
   if (iconData === "eye-slash") {
      input.type = "password";
      target.dataset.icon = "eye";
   } else {
      input.type = "text";
      target.dataset.icon = "eye-slash";
   }
};

export const testFunction = () => {
   console.log("hey");
};
