export const setVisibilityToInput = (element: any) => {
   const target = element.currentTarget;
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
