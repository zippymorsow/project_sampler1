import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MenuService } from '../service/menu';
import { Menu } from '../interfaces/menu';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule
    , MatIconModule
    , MatButtonModule
    , RouterLink
    , CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})

export class Navbar implements OnInit {

  menuItems: Menu[] = [];

  //create a constructor
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.setMenu();
  }

  setMenu() {
    // Fetch menu items from the service (Observable to subscriber)
    this.menuService.getMenu().subscribe(menuItems => {
      this.menuItems = menuItems;
    });
  }
}
