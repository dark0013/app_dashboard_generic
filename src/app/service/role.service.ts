import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '@/domain/Role';

export type CreateRoleRequest = Pick<Role, 'rol'>;
export type UpdateRoleRequest = Pick<Role, 'rol' | 'estado'>;

@Injectable({ providedIn: 'root' })
export class RoleService {
    private apiUrl = `${environment.apiUrl}/roles`;

    constructor(private http: HttpClient) {}

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(this.apiUrl);
    }

    createRole(role: CreateRoleRequest): Observable<Role> {
        return this.http.post<Role>(this.apiUrl, role);
    }

    updateRole(id: number, role: UpdateRoleRequest): Observable<Role> {
        return this.http.put<Role>(`${this.apiUrl}/${id}`, role);
    }

    deleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    activateRole(id: number): Observable<Role> {
        return this.http.patch<Role>(`${this.apiUrl}/${id}/restore`, {});
    }
}
