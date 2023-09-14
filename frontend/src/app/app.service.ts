import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Player } from './models/player';

const baseUrl = `http://localhost:4200/api/player`; 

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  getProfile(){
    return this.http.get<Player[]>(baseUrl);
  }

  update(id:number, params:Player) {
    return this.http.patch(`${baseUrl}/${id}/update`, params).pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong, please try again'))
      })
    );
  }

  delete(id:number) {
    return this.http.delete(`${baseUrl}/${id}/delete`).pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong, please try again'))
      })
    );
  }

  create(params:Player) {
    return this.http.post(`${baseUrl}/create`, params).pipe(
      catchError(() => {
        return throwError(() => new Error('Something went wrong, please try again'))
      })
    );
  }
  
}
