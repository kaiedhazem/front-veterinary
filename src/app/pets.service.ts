import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8092/api/v1/';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  getPets(): Observable<any> {
    return this.http.get(API_URL + 'pets', { responseType: 'json' });
  }

  addPet(data : any): Observable<any> {
    return this.http.post<any>(API_URL + 'pets', data, { responseType: 'json' } );
  }

  updatePet(data : any): Observable<any> {
    return this.http.put<any>(API_URL + 'pets', data);
  }

  deletePet(id : number): Observable<any> {
    return this.http.delete<any>(API_URL + 'pets/'+id);
  }
}