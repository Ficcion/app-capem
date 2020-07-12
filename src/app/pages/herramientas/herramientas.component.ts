import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { EncuestaModel } from '../../models/encuesta.model';
import { UsuarioService } from '../../services/usuario.service';
import { EncuestaService } from '../../services/encuesta.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-herramientas',
  templateUrl: './herramientas.component.html',
  styles: [
  ]
})
export class HerramientasComponent implements OnInit {

  encuestas: EncuestaModel [] = [];
  forma: FormGroup;
  usuario: UsuarioModel;
  id = '';
  admin = false;
  crear = false;
  registrar = true;
  actualizar = false;


  constructor(
    public usuarioService: UsuarioService,
    public encuestaService: EncuestaService,
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
    this.noRiesgo();
  }


  noRiesgo() {
    this.encuestaService.cargarEncuestas()
    .subscribe( (resp: any) => {
      this.encuestas = resp.encuestas;
    });
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
      this.id = resp._id;
      this.usuario = resp;
      this.forma.patchValue(this.usuario);

      // this.cargando = false;
    });
  }


  cambiosUsuario() {
    const usuario = this.forma.value;
    this.usuarioService.actualizarUsuario( this.id, usuario )
      .subscribe( usuarioActualizado => {
        this.forma.reset();
        this.crear = false;
      });
  }


  limpiar(){
    Swal.fire({
      title: '¿Seguro?',
      text: 'Borrará y no hay marcha atrás.',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then( eliminar => {

      if (eliminar) {
        this.encuestaService.borrarEncuestas()
          .subscribe( borrada => {
            console.log( borrada );
          });

        } else {

        return;
      }
    });
  }


}
