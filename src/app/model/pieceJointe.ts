import { Risque } from "./risque";
import { Reclamation } from "./reclamation";
export interface PieceJointe{
    idPieceJointe?:number ;
    name?:String;
    risque?:Risque;
    reclamation?:Reclamation;


}