import { HttpClient , HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { Observable } from 'rxjs';
import { PieceJointe } from '../model/pieceJointe';

@Injectable({
    providedIn: 'root'
})
export class PieceJointeService {
    private apiServerUrl=environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

     // define function to upload files
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.apiServerUrl}/pieceJointe/upload`, formData ,{
      reportProgress: true,
      observe: 'events'
    });
  }

   // define function to download files
   download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.apiServerUrl}/pieceJointe/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public getPieceJointes():Observable<PieceJointe[]>{
    return this.http.get<PieceJointe[]>
    (`${this.apiServerUrl}/pieceJointe/pieceJointes`);
  }

  public addPieceJointe(pieceJointe:PieceJointe):Observable<PieceJointe>{
    return this.http.post<PieceJointe>(`${this.apiServerUrl}/pieceJointe/pieceJointe`,pieceJointe);
  }

  public editPieceJointe(pieceJointe:PieceJointe,idPiece:number):Observable<PieceJointe>{
    return this.http.put<PieceJointe>(`${this.apiServerUrl}/pieceJointe/pieceJointe/${idPiece}`,pieceJointe);
  }

  public deletePieceJointe(idPiece:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/pieceJointe/pieceJointe/${idPiece}`);
 }
 public getPieceJointeByName(name:string):Observable<PieceJointe>{
  return this.http.get<PieceJointe>
  (`${this.apiServerUrl}/pieceJointe/${name}`);
}
}