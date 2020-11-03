export const addWindowHandlers= ()=>{
      window.addEventListener("click", (event) => {
        event.stopPropagation();
        const activeSelect = document.querySelector(".active-options-list");
        closeActiveSelectMenuWindowClick(activeSelect);
        });
  
        window.addEventListener("keydown", (event) => {
            event.stopPropagation();
            if (event.code === "27" || event.key === "Escape") {
            const activeSelect = document.querySelector(".active-options-list");
            closeActiveSelectMenuWindowClick(activeSelect);
            }
        });
  
        function closeActiveSelectMenuWindowClick(activeSelect) {
            if (activeSelect === null) return;
            activeSelect.classList.remove("active-options-list");
            const button = activeSelect.closest(".select-theme");
            button.dataset.state = "false";
        }


        window.addEventListener("load", function () {
            // Inputs
                const inputs = document.querySelectorAll("[data-role='input-range']");
                inputs.forEach((e:any, i) => {
                    const style = window.getComputedStyle(e);
                    const max= e.max;
                    const value= e.value;
                    var color = style.getPropertyValue("color");
                    e.style.background =
                    "linear-gradient(to right,  " +
                    color +
                    " 0%, " +
                    color +
                    value/max*100 +
                    "%, #d3d3d3 " +
                   value/max*100 +
                    "%, #d3d3d3 100%)";

                    addHandlerToInputRange(e)
                });
            });
} 


 function addHandlerToInputRange(input:HTMLInputElement) {
    input.addEventListener("input", (event) => {
        const style = window.getComputedStyle(input);
        var color = style.getPropertyValue("color");
        const max= Number(input.max);
        const value= Number(input.value);
        input.style.background =
            "linear-gradient(to right,  " +
             color +
              " 0%, " +
             color +
            value/max*100+
             "%, #d3d3d3 " +
            value/max *100+
             "%, #d3d3d3 100%)";
         });
}

  