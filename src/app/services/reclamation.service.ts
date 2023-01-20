import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import {Reclamation} from '../model/reclamation';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class ReclamationService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getReclamations(pageNumber:number= 0,pageSize:number= 3):Observable<Reclamation[]>{
        return this.http.get<Reclamation[]>
        (`${this.apiServerUrl}/reclamation/reclamations?pageNumber=${pageNumber}&pageSize=${pageSize}`);
      }

    public getReclamationById(idReclamation:number):Observable<Reclamation>{
        return this.http.get<Reclamation>
        (`${this.apiServerUrl}/reclamation/reclamation/${idReclamation}`);
    }

    public addReclamation(reclamation:Reclamation):Observable<Reclamation>{
        return this.http.post<Reclamation>(`${this.apiServerUrl}/reclamation/reclamation`,reclamation);
      }

      public editReclamation(reclamation:Reclamation,idReclamation:number):Observable<Reclamation>{
        return this.http.put<Reclamation>(`${this.apiServerUrl}/reclamation/reclamation/${idReclamation}`,reclamation);
      }
    
      public deleteReclamation(idReclamation:number):Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/reclamation/reclamation/${idReclamation}`);
     }

    }