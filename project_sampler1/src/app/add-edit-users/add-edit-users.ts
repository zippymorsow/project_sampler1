import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../service/users-service';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-users',
  imports: [MatFormFieldModule
    , MatInputModule
    , MatSelectModule
    , MatButtonModule
    , MatDialogContent
    , MatDialogActions
    , MatDialogTitle
  ],
  templateUrl: './add-edit-users.html',
  styleUrl: './add-edit-users.scss',
})
export class AddEditUsers {
  constructor(private usersService: UsersService) { }

  closeDialog(): void {
    this.usersService.closeDialog();
  }

}
