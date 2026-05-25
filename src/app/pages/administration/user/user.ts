import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService, User as UserModel } from '../../service/user.service';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-user',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule
    ],
  templateUrl: './user.html',
  styleUrl: './user.scss',
    providers: [MessageService, ConfirmationService]
})
export class User implements OnInit {
    userDialog: boolean = false;
    userForm: Partial<UserModel> = {};
    editMode: boolean = false;

    users = signal<UserModel[]>([]);
    selectedUsers!: UserModel[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}


    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadUsers();
        this.cols = [
            { field: 'cedula', header: 'Cédula' },
            { field: 'nombres', header: 'Nombres' },
            { field: 'apellidos', header: 'Apellidos' },
            { field: 'direccion', header: 'Dirección' },
            { field: 'telefono', header: 'Teléfono' },
            { field: 'email', header: 'Email' },
            { field: 'username', header: 'Username' },
            { field: 'estado', header: 'Estado' },
            { field: 'acciones', header: 'Acciones' }
        ];
        this.exportColumns = this.cols.filter(col => col.field !== 'acciones').map((col) => ({ title: col.header, dataKey: col.field }));
    }

    loadUsers() {
        this.userService.getUsers().subscribe((data) => {
            this.users.set(data);
        });
    }

    openNew() {
        this.userForm = {};
        this.editMode = false;
        this.userDialog = true;
    }

    editUser(user: UserModel) {
        this.userForm = { ...user };
        this.editMode = true;
        this.userDialog = true;
    }

    saveUser() {
        if (this.editMode && this.userForm.id) {
            this.userService.updateUser(this.userForm.id, this.userForm).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Usuario actualizado' });
                this.userDialog = false;
                this.loadUsers();
            });
        } else {
            const request = { ...this.userForm };
            delete request.id;
            this.userService.createUser(request as any).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Usuario creado' });
                this.userDialog = false;
                this.loadUsers();
            });
        }
    }

    deleteUser(user: UserModel) {
        this.confirmationService.confirm({
            message: `¿Seguro que deseas eliminar a ${user.nombres} ${user.apellidos}?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.deleteUser(user.id).subscribe(() => {
                    this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Usuario eliminado' });
                    this.loadUsers();
                });
            }
        });
    }

    restoreUser(user: UserModel) {
        this.userService.restoreUser(user.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Restaurado', detail: 'Usuario restaurado' });
            this.loadUsers();
        });
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Métodos de edición/eliminación pueden implementarse aquí si se requiere CRUD
}

