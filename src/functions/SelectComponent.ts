
export const  generateCustomSelectionButton=()=> {
    const selectElement:HTMLSelectElement = document.querySelector('[data-role="select-theme"]');
      const options = selectElement.querySelectorAll("option");
      const selectButton = generateButtonContainer(options,selectElement);
      selectButton.classList.add(selectElement.className);
      selectButton.classList.add(selectElement.dataset.role);
      selectButton.id = selectElement.id;
      selectButton.dataset.role = selectElement.dataset.role;
      selectButton.dataset.state = "false";
      selectButton.addEventListener("click", function (event) {
        handleClickSelectButton(event);
      });
      selectElement.parentNode.insertBefore(selectButton, selectElement);
  }
  
  const  generateButtonContainer=(optionsList:NodeList,selectElement:HTMLSelectElement)=> {
    const selectButton = document.createElement("button");
    const icon = selectElement.previousElementSibling;
    const parentIcon= icon.parentElement;
    parentIcon.removeChild(icon);
    const buttonLabel = document.createElement("span");
    const list = generateOptionList(optionsList);
    buttonLabel.innerText = "Select";
    selectButton.appendChild(buttonLabel);
    selectButton.appendChild(list);
    selectButton.appendChild(icon);
    return selectButton;
  }
  
 const generateOptionList=(optionList:NodeList)=>{
    const list = document.createElement("ul");
    optionList.forEach((e:HTMLOptionElement,i) => {
      if(i>0){
        var li = generateListItem(e);
        list.appendChild(li);
      }
     
    });
    return list;
  }
  
  const generateListItem=(optionItem:HTMLOptionElement)=>{
    const li = document.createElement("li");
    li.className = "select-theme-options";
    li.innerText = optionItem.innerText;
    li.dataset.value = optionItem.value;
    li.addEventListener("click", (event) => hanldeClickSelectOption(event));
    return li;
  }
  
  const handleClickSelectButton=(event:any)=>{
    event.stopPropagation();
    const selectButton = event.target.closest(".select-theme");
    const list = selectButton.querySelector("ul");
  
    const otherActivebuttonList = document.querySelector(".active-options-list");
    if (otherActivebuttonList && otherActivebuttonList !== list) {
      const otherButton: HTMLButtonElement = otherActivebuttonList.closest(".select-theme");
      otherButton.dataset.state = "false";
      otherActivebuttonList.classList.remove("active-options-list");
    }
  
    if (selectButton.dataset.state === "false") {
      list.classList.add("active-options-list");
      selectButton.dataset.state = "true";
    } else {
      list.classList.remove("active-options-list");
      selectButton.dataset.state = "false";
    }
  }
  
  const  hanldeClickSelectOption=(event:any)=>{
    event.stopPropagation();
    const li = event.target.closest(".select-theme-options");
    const list = li.closest(".active-options-list");
    const selectButton = event.target.closest(".select-theme");
    const select = selectButton.nextElementSibling;
    select.selectedIndex = li.dataset.value;
    select.value=  li.dataset.value;
    select.options[select.selectedIndex].selected=true;
    const eventEl = new Event('change', { bubbles: true });
    select.dispatchEvent(eventEl);
    const selectButtonlabel = selectButton.querySelector("span");
    selectButtonlabel.innerText = li.innerText;
    selectButton.dataset.state = "false";
    list.classList.remove("active-options-list");
    const activeOption = list.querySelector(".selected-option");
    if (activeOption) activeOption.classList.remove("selected-option");
    li.classList.add("selected-option");
  }

