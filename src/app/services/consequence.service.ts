import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Consequances} from '../model/consequances';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ConsequanceService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getConsequances(pageNumber:number= 0,pageSize:number= 3):Observable<Consequances[]>{
        return this.http.get<Consequances[]>
        (`${this.apiServerUrl}/consequance/consequances?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      }

    public getConsequanceById(idConsequances:number):Observable<Consequances>{
        return this.http.get<Consequances>
        (`${this.apiServerUrl}/consequance/consequance/${idConsequances}`);
    }

    public addConsequance(consequances:Consequances):Observable<Consequances>{
        return this.http.post<Consequances>(`${this.apiServerUrl}/consequance/consequance`,consequances);
      }

      public editConsequances(consequance:Consequances,idConsequances:number):Observable<Consequances>{
        return this.http.put<Consequances>(`${this.apiServerUrl}/consequance/consequance/${idConsequances}`,consequance);
      }
    
      public deleteConsequance(idConsequances:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/consequance/consequance/${idConsequances}`);
     }

    }