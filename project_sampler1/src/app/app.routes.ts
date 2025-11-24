import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Welcome } from './welcome/welcome';
import { Users } from './users/users';
import { Reports } from './reports/reports';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {path: 'dashboard', component: Dashboard, children: [
        {path: '', component: Welcome},
        {path: 'users', component: Users},
        {path: 'reports', component: Reports}
    ]},
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
