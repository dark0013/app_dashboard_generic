import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { User } from './administration/user/user';
import { Title } from '@angular/platform-browser';

export default [
    { path: 'documentation', component: Documentation, data: { breadcrumb: 'Documentation' } },
    { path: 'crud', component: Crud, data: { breadcrumb: 'CRUD' } },
    { path: 'empty', component: Empty, data: { breadcrumb: 'Empty' } },
    { path: 'user', component: User, data: { title: 'Administración de Usuarios', breadcrumb: 'User' } },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
