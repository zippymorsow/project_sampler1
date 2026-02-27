import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserElement } from '../interfaces/menu';
import { MatDialog } from '@angular/material/dialog';
import { SERVER_CONFIG, ENDPOINTS_DETAILS } from '../../constants';

const cons = SERVER_CONFIG.host + ':' + SERVER_CONFIG.api_port;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, readonly dialog: MatDialog) {}

  diaTitle : string = '';

  public viewModeaddedituser = new BehaviorSubject<boolean>(false);
  viewModeAddEditUser$ = this.viewModeaddedituser.asObservable();
  setViewModeAddEditUser(mode: boolean) {
    this.viewModeaddedituser.next(mode);
  }
  
  //Fetch Data Methods
  getUsers(): Observable<UserElement[]> {
    return this.http.get<UserElement[]>('./assets/data/users.json').pipe(
      catchError((error) => {
        console.error('Error fetching users data:', error);
        throw error;
      })
    );
  }

  getUsersApi(): Observable<any[]> {
    console.log('Fetching users from API');
    return this.http.get<any[]>('http://'+ cons + ENDPOINTS_DETAILS.users.endpoint);
  }

  //Dialog Related Methods
  openDialog(component : any, data? : any) : void {
    // Open dialog to add/edit user
    const dialogRef = this.dialog.open(component, {
      data: data ? data : '',
    });
    this.diaTitle = data
    dialogRef.afterClosed().subscribe(result => {});
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  //Save Data Method
  saveUserApi(userData: any, action: string = 'new', endpoint: string = ENDPOINTS_DETAILS.users.endpoint): Observable<any> {
    return this.savedUsersApiTemplate(userData, action, endpoint);
  }

  //create a function that gets user data according to id of user and according to optional endpoint, then returns an observable, afterward remove thar id into users.json and add it to usersremoved.json
  /**
   * 
   * @param userData input data to be manipulated/processed
   * @param endpoint url link
   * @param action type of action to be performed [new (default) | edit | remove]
   * @returns 
   */
  savedUsersApiTemplate(userData: any, action: string = 'new', endpoint: string = ENDPOINTS_DETAILS.usersremoved.endpoint): Observable<any> {

    this.http.get<any[]>('http://'+ cons + endpoint).subscribe(users => {

      if (action === 'remove' || action === 'edit') {
        // Check if user already exists
        const userIndex = users.findIndex(u => u.id === userData.id);

        if (userIndex > -1 && action === 'edit') {
          // Update existing user
          users[userIndex] = userData;
        } else {
          // Remove user
          users.splice(userIndex, 1);
        }
      }
      if (action === 'new') {
        // Add new user
        users.push(userData);
      }

      // post the updated removed users data back to the endpoint
      this.http.post('http://'+ cons + endpoint, users).subscribe({
        next: response => console.log('Users transferred to removed file successfully via API:', response),
        error: err => console.error('Error transferring users to removed file via API:', err),
        complete: () => console.log('API Transfer to removed file completed')
      });
    });
    return this.http.post('http://'+ cons + endpoint, userData);
  } 
}