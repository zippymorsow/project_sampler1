import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UsersService } from '../service/users-service';
import { nanoid } from 'nanoid';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import { UserElement } from '../interfaces/menu';
import { ENDPOINTS_DETAILS } from '../../constants';

@Component({
  selector: 'app-add-edit-users',
  imports: [MatFormFieldModule
    , MatInputModule
    , MatSelectModule
    , MatButtonModule
    , MatDialogContent
    , MatDialogActions
    , MatDialogTitle
    , ReactiveFormsModule
  ],
  templateUrl: './add-edit-users.html',
  styleUrl: './add-edit-users.scss',
})
export class AddEditUsers implements OnInit {

  // defining a property form for this class (promise this component will have a form)
  //makes it accessible throughout the class (in methods, template bindings, etc.).
  addEditform : FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any,
    public usersService: UsersService,
    private fb : FormBuilder
  ) {
    // Initialize the form group with real values / initial state, or subproperties.
    this.addEditform = this.fb.group({
      id : [nanoid() ],
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      username: ['', Validators.required ],
      sex: ['', Validators.required ],
    });


    if (dialogData.id) {
      this.addEditform.patchValue({
        id: dialogData.id,
        firstname: dialogData.firstname,
        lastname: dialogData.lastname,
        username: dialogData.username,
        sex: dialogData.sex,
      });
    }
  }

  ngOnInit(): void {
    //disable the form if view mode is true (view only)
    this.usersService.viewModeAddEditUser$.subscribe(mode => {
      if (mode) {
        this.addEditform.disable();
      }
    });
  }

  // closeDialog(): void {
  //   this.usersService.closeDialog();
  // }

  onSave(): void {
    this.generateUsername();
    if (this.addEditform.valid) {
      const userData = this.addEditform.value;
      // userData.id = this.dialogData.id; // Ensure the ID remains unchanged for edits
      if (this.dialogData.titleDialog === 'Add User') {
        this.usersService.saveUserApi(userData, 'new', ENDPOINTS_DETAILS.users.endpoint);
      } else if (this.dialogData.titleDialog === 'Edit User') {
        this.usersService.saveUserApi(userData, 'edit', ENDPOINTS_DETAILS.users.endpoint);
      }
      // this.closeDialog();
      this.usersService.closeDialog();
    } else {
      console.log('Form is invalid');
    }
  }

  //create a method that gets the first letter value of formControl firstname, and full last name, assign that as a value to username
  generateUsername(): void {
    const username = this.addEditform.get('username')?.value;
    const firstname = this.addEditform.get('firstname')?.value;
    const lastname = this.addEditform.get('lastname')?.value;
    if (firstname && lastname) {
      const autousername = `${firstname.charAt(0).toLowerCase()}${lastname.toLowerCase()}`;
      
      // Only update the username if it has been manually changed by the user
      if (username != '' && username != autousername ) {
        this.addEditform.patchValue({ username: username });
        return;
      }
      this.addEditform.patchValue({ username: autousername });
    }
  }

}
