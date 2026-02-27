import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Menu, UserElement } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // create a contructor
  constructor(private http: HttpClient) {}

  // gets the menu items from the json file (we call this Observable)
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/menu.json').pipe(
      catchError((error) => {
        console.error('Error fetching menu data:', error);
        throw error;
      })
    );
  }
}