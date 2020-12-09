import { IChannel, ITemplate } from "../../interfaces/utils";

export interface IMiniChartsSectionProps{
  channels:Array<IChannel>;
  template: ITemplate;
  samplePeriod:number;
}