import { AfterViewInit, Component, Injectable, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTableModule, MatTableDataSource} from '@angular/material/table';
import { UsersService } from '../service/users-service';
import { OnInit } from '@angular/core';
import { UserElement } from '../interfaces/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule , Sort, MatSort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddEditUsers } from '../add-edit-users/add-edit-users';
import { RemoveDialog } from '../remove-dialog/remove-dialog';


@Component({
  selector: 'app-users',
  imports: [MatToolbar
    , MatTableModule
    , MatIconModule
    , MatTooltipModule
    , MatFormFieldModule
    , MatInputModule
    , MatPaginatorModule
    , MatSortModule
    , MatButtonModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})

export class Users implements OnInit, AfterViewInit {

  //create a constructor
  constructor(private usersService: UsersService, private _liveAnnouncer: LiveAnnouncer, readonly dialog: MatDialog) {
    this.userElemEmpty = {
      id: '',
      username: '',
      firstname: '',
      lastname: '',
      sex: ''
    };
  }
  
  userElemEmpty: UserElement;
  dataSource: UserElement[] = [];
  displayedColumns: string[] = [];
  dataFilter!: MatTableDataSource<UserElement>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.displayedColumns = ['username', 'firstname', 'lastname', 'sex', 'actions'];
    this.setUsers();
  }

  ngAfterViewInit(): void {
    this.assignDataAfterInit();
  }

  setUsers() {
    // Fetch users from the service (Observable to subscriber)
    this.usersService.getUsers().subscribe(data => {
      this.dataSource = data;
      this.dataFilter = new MatTableDataSource<UserElement>(this.dataSource);

      // this.assignPaginator();
      this.dataFilter.paginator = this.paginator;
      this.dataFilter.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    if (!this.dataFilter) {
      return;
    }

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataFilter.filter = filterValue.trim().toLowerCase();
  }

  assignDataAfterInit() : void{
    if (this.dataFilter) {
      this.dataFilter.paginator = this.paginator;
      this.dataFilter.sort = this.sort;
    }
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction){
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openAddEditUser(data?: UserElement, action?: string) : void {
    // Open dialog to add/edit user
    if (data) {
      // change titleDialog based on action
      if (action === 'search') {
        // this.usersService.openDialog(AddEditUsers, { titleDialog: "View User" });
        this.usersService.openDialog(AddEditUsers, { ...data, titleDialog: "View User" });
        this.usersService.setViewModeAddEditUser(true);
        return;
      }
      // Edit case
      this.usersService.openDialog(AddEditUsers, { ...data, titleDialog: "Edit User" });
      this.usersService.setViewModeAddEditUser(false);
      return;
    }
    // Add case
    this.usersService.openDialog(AddEditUsers, { ...this.userElemEmpty, titleDialog: "Add User" });
    this.usersService.setViewModeAddEditUser(false);
  }

  openRemoveDialog(data: UserElement) : void {
    // Open dialog to remove user
    this.usersService.openDialog( RemoveDialog, {...data, titleDialog: "Remove User"} );
  }
}