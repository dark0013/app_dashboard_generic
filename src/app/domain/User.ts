export interface User {
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
}