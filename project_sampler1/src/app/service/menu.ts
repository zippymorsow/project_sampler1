import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // create a contructor
  constructor(private http: HttpClient) {}

  // gets the menu items from the json file (we call this Observable)
  getMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>('./assets/data/menu.json');
  }
}
