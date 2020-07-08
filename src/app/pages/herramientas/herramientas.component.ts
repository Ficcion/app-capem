import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';


@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styles: [
  ]
})
export class HerramientasComponent implements OnInit {

  forma: FormGroup;
  usuario: UsuarioModel;
  id = '';
  admin = false;
  crear = false;
  registrar = true;
  actualizar = false;


  constructor(
    public usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      empresa: new FormControl( null, Validators.required ),
      password: new FormControl( null, Validators.required ),
      role: new FormControl( null ),
      activo: new FormControl( null ),
    });

    if (this.usuarioService.usuario.role === 'ADMIN_ROLE') {
      this.admin = true;
    }
  }


  registrarUsuario() {
    if (this.forma.valid ) {
    const usuario = new UsuarioModel(
      this.forma.value.nombre,
      this.forma.value.empresa,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario( usuario )
      .subscribe( resp => {
        this.forma.reset();
        this.crear = false;
      });
    // console.log( this.forma.value );

    }
  }


  llenarUsuario( inputValor: string ) {
    // this.cargando = true;
    this.crear = true;
    this.registrar = false;
    this.actualizar = true;

    console.log( inputValor );

    this.usuarioService.cargarUsuario( inputValor )
    .subscribe ( (resp: any) => {
      // console.log( resp );
      this.id = resp._id;
      this.usuario = resp;
      this.forma.patchValue(this.usuario);
      console.log( this.id );

      // this.cargando = false;
    });
  }


  cambiosUsuario() {
    const usuario = this.forma.value;
    console.log( usuario );
    this.usuarioService.actualizarUsuario( this.id, usuario )
      .subscribe( usuarioActualizado => {
        console.log( usuarioActualizado );
        this.forma.reset();
        this.crear = false;
      });
  }


}
