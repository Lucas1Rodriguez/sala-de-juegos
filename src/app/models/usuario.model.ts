export class Usuario {
    public id: string;   
    public usuario: string;                
    public email: string;

    constructor(id: string, usuario: string, email: string) {
        this.id = id;
        this.usuario = usuario;
        this.email = email;
    }           
} 
