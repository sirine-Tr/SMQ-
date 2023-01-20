import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ActionReclamation} from '../model/actionReclamation';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ActionReclamationService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getActionReclamations():Observable<ActionReclamation[]>{
        return this.http.get<ActionReclamation[]>
        (`${this.apiServerUrl}/actionReclamation/actionReclamations`);
      }

      public addActionReclamation(actionReclamation:ActionReclamation):Observable<ActionReclamation>{
        return this.http.post<ActionReclamation>(`${this.apiServerUrl}/actionReclamation/actionReclamation`,actionReclamation);
      }

      public editActionReclamation(actionReclamation:ActionReclamation,idDecision:number):Observable<ActionReclamation>{
        return this.http.put<ActionReclamation>(`${this.apiServerUrl}/actionReclamation/actionReclamation/${idDecision}`,actionReclamation);
      }

      public deleteActionReclamation(idDecision:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/actionReclamation/actionReclamation/${idDecision}`);
     }
     public getActionReclamationById(idDecision:number):Observable<ActionReclamation>{
      return this.http.get<ActionReclamation>
      (`${this.apiServerUrl}/actionReclamation/actionReclamation/${idDecision}`);
  }

    }