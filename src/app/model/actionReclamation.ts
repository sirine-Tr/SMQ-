import{Causes} from './causes';
export interface ActionReclamation{
     idDecision?:number;
     libelle?:String;
     responsable?:String;
     cin?:String;
     dateDecision?:Date;
     causesDto?:Causes;
}