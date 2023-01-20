import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {ActionRisque} from '../model/actionRisque';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ActionRisqueService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getActionRisques():Observable<ActionRisque[]>{
        return this.http.get<ActionRisque[]>
        (`${this.apiServerUrl}/actionRisque/actionRisques`);
      }

      public addActionRisque(actionRisque:ActionRisque):Observable<ActionRisque>{
        return this.http.post<ActionRisque>(`${this.apiServerUrl}/actionRisque/actionRisque`,actionRisque);
      }

      public editActionRisque(actionRisque:ActionRisque,idActionRisque:number):Observable<ActionRisque>{
        return this.http.put<ActionRisque>(`${this.apiServerUrl}/actionRisque/actionRisque/${idActionRisque}`,actionRisque);
      }

      public deleteActionRisque(idActionRisque:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/actionRisque/actionRisque/${idActionRisque}`);
     }
     public getActionRisqueById(idActionRisque:number):Observable<ActionRisque>{
      return this.http.get<ActionRisque>
      (`${this.apiServerUrl}/actionRisque/actionRisque/${idActionRisque}`);
  }

    }