import Chart from "chart.js";
import { IDataset } from "../interfaces/utils";

export const setVisibilityToInput = (event: any) => {
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

export const validate = (email: string) => {
   const expression = new RegExp(
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
   );
   return expression.test(String(email).toLowerCase());
};

export const checkForSpecialCharactersLengthInString = (str: string) => {
   return str.replace(/[0-9a-zA-Z]/g, "").length;
};

export const checkForLetterslengthInString = (str: string) => {
   return str.replace(/[^a-zA-Z]/g, "").length;
};

export const average=(nums)=>{
    return nums.reduce((a, b) => (a + b)) / nums.length;
}


export const backgroundColor = [
  "#39a2a9",
  "#8b62d1",
  "#5fc27e",
  "#f22034",
  "#e9db1d",
  "#355fff",
  "#97d4d8",
  "#c5adee",
  "#98e6b1",
  "#f87683",
  "#f1ea7b",
  "#99adff",
];


export const updateCharts=(data:Array<IDataset>)=>{
    Chart.helpers.each(Chart.instances, function(instance){
    instance.chart.update();
    });
}


export function generateTimeLabel(peviousSampleTime:string ,samplePeriod:number) {
  let  oldMS;
  if(peviousSampleTime==="0"){
    oldMS= parseInt(peviousSampleTime);
  }else{
    const peviousSampleTimeArray= peviousSampleTime.split(":");
    oldMS= parseInt(peviousSampleTimeArray[0])*60*1000+ parseInt(peviousSampleTimeArray[1])*1000+parseInt(peviousSampleTimeArray[2]);
      }
  var t = oldMS+samplePeriod; //adding 100ms or any other sample period
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);
  return `${days*24*60+hours*60+minutes}:${seconds}:${Math.abs(minutes*60*1000-Math.abs(seconds*1000-t))}`;
}
