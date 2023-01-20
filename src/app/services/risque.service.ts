import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Risque} from '../model/risque';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class RisqueService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getRisques(pageNumber:number= 0,pageSize:number= 3):Observable<Risque[]>{
        return this.http.get<Risque[]>
        (`${this.apiServerUrl}/risque/risques?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      }

    public getRisqueById(idRisque:number):Observable<Risque>{
        return this.http.get<Risque>
        (`${this.apiServerUrl}/risque/risque/${idRisque}`);
    }

    public addRisque(risque:Risque):Observable<Risque>{
        return this.http.post<Risque>(`${this.apiServerUrl}/risque/risque`,risque);
      }

      public editRisque(risque:Risque,idRisque:number):Observable<Risque>{
        return this.http.put<Risque>(`${this.apiServerUrl}/risque/risque/${idRisque}`,risque);
      }
    
      public deleteRisque(idRisque:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/risque/risque/${idRisque}`);
     }

    }