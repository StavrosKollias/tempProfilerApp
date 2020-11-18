export class Channel {
  dataLine:Array<number>;
  dataLabels:Array<string>;
  active:boolean;
  channelName:string;
  constructor(dataline,dataLabels,active,channelName){
    this.dataLine= dataline;
    this.dataLabels=dataLabels;
    this.active= active;
    this.channelName= channelName;

  }
}