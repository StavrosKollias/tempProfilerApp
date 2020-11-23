 export interface ITemplate{
     name:string;
     ovenName:string;
     zones:Array<IZone>;
     thresholds:Array<IThreshold>;
     _id:string;
     createdAt:IRecordStamp;
     updatedAt:IRecordStamp;
    //  {"name":"Default Template"
    //  ,"ovenName":"Testing Oven",
    //  "zones":[{"name":"YOYO","value":"3","type":"line","topHeater":"53","bottomHeater":"20","editable":false},
    //  {"name":"Zone 2","value":"3","type":"line","topHeater":"150","bottomHeater":"180","editable":false},
    //  {"name":"Zone 3","value":"3","type":"line","topHeater":"150","bottomHeater":"100","editable":false},
    //  {"name":"Zone 4","value":"3","type":"line","topHeater":"210","bottomHeater":"180","editable":false},
    //  {"name":"Zone 5","value":"3","type":"line","topHeater":"290","bottomHeater":"250","editable":false},
    //  {"name":"Zone 6","value":"3","type":"line","topHeater":"50","bottomHeater":"20","editable":false}],
    //  "thresholds":[{"name":"1","value":"50","type":"line"},{"name":"2","value":"100","type":"line"},
    //  {"name":"3","value":"150","type":"line"},{"name":"4","value":"200","type":""},
    //  {"name":"5","value":"250","type":""},{"name":"6","value":"300","type":""}],
    //  "_id":"Adqd1Pjf3SmWDfE1",
    //  "createdAt":{"$$date":1600434730295},
    //  "updatedAt":{"$$date":1603818670472}
    // }
 }

 export interface IZone{
    name:string;
    value:number;
    type:string;
    topHeater:number;
    bottonHeater:number;
    editable:boolean;
 }

 export interface IThreshold{
     name:string;
     value:number;
     type:string;
 }

 export interface IRecordStamp{
     $$date:number;
 }


 export interface IChartData{
    labels:Array<string>;
    datasets:Array<IDataset>;
}

export interface IDataset{
        fill?: boolean;
        lineTention?: number;
        type?:string;
        label: string;
        borderDash?:Array<number>;
        backgroundColor?: string | Array<string>;
        borderColor?: string | Array<string>;
        data: Array<number>;
    }

    
export interface IChannel{
  dataLine:Array<number>;
  dataLabels:Array<string>;
  active:boolean;
  channelName:string;
}

export interface IChannelDisplay{
    name:string;
    active:boolean;
}


export interface AnnotationLabel {
  backgroundColor: string;
  content: string;
  enabled: boolean;
  position?: string;
  xAdjust?: number;
}

export interface IAnnotation {
  drawTime: string;
  type: string;
  mode: string;
  id: string;
  scaleID: string;
  value: number | string;
  endValue?: number | string;
  borderWidth: number;
  borderColor: string;
  borderDash?: Array<number>;
  label: AnnotationLabel;
  draggable: boolean;
  onClick?(e: any): void;
  onDrag?(e: any): void;
}

export class Annotation {
  drawTime: string;
  type: string;
  mode: string;
  id: string;
  scaleID: string;
  value: number | string;
  endValue?: number | string;
  borderColor: string;
  borderWidth: number;
  borderDash?: Array<number>;
  label: AnnotationLabel;
  draggable: boolean;
  onClick?(e: any): void;
  onDrag?(e: any): void;
  constructor(annotation: IAnnotation) {
    this.drawTime = annotation.drawTime;
    this.type = annotation.type;
    this.mode = annotation.mode;
    this.id = annotation.id;
    this.scaleID = annotation.scaleID;
    this.value = annotation.value;
    this.endValue = annotation.endValue;
    this.borderWidth = annotation.borderWidth;
    this.borderColor = annotation.borderColor;
    this.borderDash = annotation.borderDash;
    this.label = annotation.label;
    this.draggable = annotation.draggable;
    this.onClick = annotation.onClick;
    this.onDrag = annotation.onDrag;
  }
}
