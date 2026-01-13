import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle } from '@angular/material/dialog';
import { UsersService } from '../service/users-service';
import { ENDPOINTS_DETAILS } from '../../constants';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-remove-dialog',
  imports: [MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './remove-dialog.html',
  styleUrl: './remove-dialog.scss',
})
export class RemoveDialog implements OnInit {
  constructor(public usersService: UsersService, @Inject(MAT_DIALOG_DATA) public dialogData: any) {}

  ngOnInit(): void {}

  removedUsersApi(removedUsersData: any, action: string = 'remove', endpoint: string = ENDPOINTS_DETAILS.usersremoved.endpoint): Observable<any> {
    // remove the data from users.json and
    this.usersService.savedUsersApiTemplate(removedUsersData, 'remove', ENDPOINTS_DETAILS.users.endpoint);
    // add it to usersremoved.json
    return this.usersService.savedUsersApiTemplate(removedUsersData, 'new', ENDPOINTS_DETAILS.usersremoved.endpoint);
  }
}
