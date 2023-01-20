import {Risque} from './risque';
export interface ActionRisque{
    idActionRisque?:number;
    libelle?:String;
    responsable?:String;
    cin?:String;
    dateDecision?:Date;
    risque?:Risque;
}
