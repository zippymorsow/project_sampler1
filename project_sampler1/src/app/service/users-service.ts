import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserElement } from '../interfaces/menu';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, readonly dialog: MatDialog) {}
  
  getUsers(): Observable<UserElement[]> {
    return this.http.get<UserElement[]>('./assets/data/users.json');
  }

  openDialog(component : any, data? : any) : void {
    // Open dialog to add/edit user
    const dialogRef = this.dialog.open(component);
    dialogRef.afterClosed().subscribe(result => {});
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
