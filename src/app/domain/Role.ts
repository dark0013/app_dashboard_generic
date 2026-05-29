export interface Role {
    id: number;
    rol: string;
    estado: boolean;
    usuarioCreacion: string;
    fechaCreacion: string;
    usuarioActualizacion: string;
    fechaActualizacion: string | null;
}
