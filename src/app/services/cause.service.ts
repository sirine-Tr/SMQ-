import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Causes} from '../model/causes';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CauseService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getCauses(pageNumber:number= 0,pageSize:number= 3):Observable<Causes[]>{
        return this.http.get<Causes[]>
        (`${this.apiServerUrl}/causes/causes?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      }

    public getCausesById(idCauses:number):Observable<Causes>{
        return this.http.get<Causes>
        (`${this.apiServerUrl}/causes/cause/${idCauses}`);
    }

    public addCause(cause:Causes):Observable<Causes>{
        return this.http.post<Causes>(`${this.apiServerUrl}/causes/cause`,cause);
      }

      public editCauses(cause:Causes,idCauses:number):Observable<Causes>{
        return this.http.put<Causes>(`${this.apiServerUrl}/causes/cause/${idCauses}`,cause);
      }
    
      public deleteCause(idCauses:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/causes/cause/${idCauses}`);
     }

    }