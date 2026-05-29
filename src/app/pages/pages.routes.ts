import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { User } from './administration/user/user';
import { Rol } from './administration/rol/rol';

export default [
    { path: 'documentation', component: Documentation, data: { breadcrumb: 'Documentation' } },
    { path: 'crud', component: Crud, data: { breadcrumb: 'CRUD' } },
    { path: 'empty', component: Empty, data: { breadcrumb: 'Empty' } },
    { path: 'user', component: User, data: { title: 'Administracion de Usuarios', breadcrumb: 'User' } },
    { path: 'rol', component: Rol, data: { title: 'Administracion de Roles', breadcrumb: 'Rol' } },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
