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

} 

  