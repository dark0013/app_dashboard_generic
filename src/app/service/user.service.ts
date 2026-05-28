import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@/domain/User';

/* export interface User {
    id: number;
    cedula: string;
    nombres: string;
    apellidos: string;
    direccion: string;
    telefono: string;
    email: string;
    username: string;
    password: string;
    estado: boolean;
    usuarioCreacion: string;
    fechaCreacion: string;
    usuarioActualizacion: string;
    fechaActualizacion: string | null;
} */

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    createUser(user: Omit<User, 'id' | 'password' | 'usuarioCreacion' | 'fechaCreacion' | 'usuarioActualizacion' | 'fechaActualizacion'>): Observable<User> {
        return this.http.post<User>(this.apiUrl, user);
    }

    updateUser(id: number, user: Partial<User>): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        console.log(`Deleting user with ID: ${id}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    restoreUser(id: number): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/${id}/restore`, {});
    }
}
