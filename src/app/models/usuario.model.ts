export class UsuarioModel {

  constructor(
    public nombre: string,
    public empresa: string,
    public password: string,
    public role?: string,
    public activo?: string,
    public id?: string,
  ) {}


}
