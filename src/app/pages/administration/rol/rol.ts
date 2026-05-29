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
import { RoleService } from '@/service/role.service';
import { Role as RoleModel } from '@/domain/Role';

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
    selector: 'app-rol',
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
    providers: [MessageService, ConfirmationService],
    templateUrl: './rol.html',
    styleUrl: './rol.scss'
})
export class Rol implements OnInit {
    roleDialog: boolean = false;
    roleForm: Partial<RoleModel> = {};
    editMode: boolean = false;
    viewMode: boolean = false;

    roles = signal<RoleModel[]>([]);
    selectedRoles!: RoleModel[] | null;

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private roleService: RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.loadRoles();
        this.cols = [
            { field: 'rol', header: 'Rol' },
            { field: 'estado', header: 'Estado' },
            { field: 'acciones', header: 'Acciones' }
        ];
        this.exportColumns = this.cols.filter((col) => col.field !== 'acciones').map((col) => ({ title: col.header, dataKey: col.field }));
    }

    exportCSV() {
        this.dt.exportCSV();
    }

    loadRoles() {
        this.roleService.getRoles().subscribe((data) => {
            this.roles.set(data);
        });
    }

    openNew() {
        this.roleForm = {};
        this.editMode = false;
        this.viewMode = false;
        this.roleDialog = true;
    }

    viewRole(role: RoleModel) {
        this.roleForm = { ...role };
        this.editMode = false;
        this.viewMode = true;
        this.roleDialog = true;
    }

    editRole(role: RoleModel) {
        this.roleForm = { ...role };
        this.editMode = true;
        this.viewMode = false;
        this.roleDialog = true;
    }

    saveRole() {
        if (!this.roleForm.rol) {
            return;
        }

        if (this.editMode && this.roleForm.id) {
            this.roleService.updateRole(this.roleForm.id, {
                rol: this.roleForm.rol,
                estado: this.roleForm.estado ?? true
            }).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Rol actualizado' });
                this.roleDialog = false;
                this.loadRoles();
            });
        } else {
            this.roleService.createRole({ rol: this.roleForm.rol }).subscribe(() => {
                this.messageService.add({ severity: 'success', summary: 'Creado', detail: 'Rol creado' });
                this.roleDialog = false;
                this.loadRoles();
            });
        }
    }

    deleteRole(role: RoleModel) {
        this.confirmationService.confirm({
            message: `Seguro que deseas eliminar el rol ${role.rol}?`,
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.roleService.deleteRole(role.id).subscribe({
                    next: () => {
                        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'Rol eliminado' });
                        this.loadRoles();
                    },
                    error: (err) => {
                        console.error('Error DELETE rol', err);
                    }
                });
            }
        });
    }

    activateRole(role: RoleModel) {
        this.roleService.activateRole(role.id).subscribe(() => {
            this.messageService.add({ severity: 'success', summary: 'Activado', detail: 'Rol activado' });
            this.loadRoles();
        });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
