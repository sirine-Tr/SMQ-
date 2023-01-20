import {Causes} from './causes';
import {Consequances} from './consequances';
export interface Reclamation{
    idReclamation?:number;
    type?:String;
    gravite?:String;
    dateDetection?:Date;
    description?:String;
    lieuOuPromotion?:String;
    acteur?:String;
    causes?:Causes[];
    consequances?:Consequances[];
}

