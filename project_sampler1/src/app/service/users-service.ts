import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserElement } from '../interfaces/menu';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  
  getUsers(): Observable<UserElement[]> {
    return this.http.get<UserElement[]>('./assets/data/users.json');
  }
}
