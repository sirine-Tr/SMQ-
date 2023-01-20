import {ActionRisque} from './actionRisque';
export interface Risque{
    idRisque?:number;
    type?:String;
    description?:String;
    lieuOuPromotion?:String;
    dateDetection?:Date;
    acteur?:String;
    niveau?:String;
    evolution?:String;
    actionRisque?:ActionRisque[];
}

