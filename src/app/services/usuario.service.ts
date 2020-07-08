import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { URL_SERVICIOS } from '../config/config';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuario: UsuarioModel;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
  }


  cargarUsuario( empresa: string ) {
    const url = URL_SERVICIOS + '/usuario/' + empresa;

    return this.http.get( url )
      .pipe(map( (resp: any) => resp.usuario ));
  }


  crearUsuario( usuario: UsuarioModel ) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Usuario creado.',
          icon: 'success',
        });

        return resp.usuario;
      }));
  }


  actualizarUsuario( id: string, usuario: any ) {
    const url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.put( url, usuario )
      .pipe(map( (resp: any) => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'El usuario ha sido actualizado.',
          icon: 'success',
        });

        return resp.usuario;
      }));
  }


  logIn( usuario: UsuarioModel, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem('empresa', usuario.empresa);

    } else {

      localStorage.removeItem('empresa');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
      .pipe(map( (resp: any) => {
        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        if (resp.usuario.activo === 'true') {
          // console.log( 'Sí pagó' );
          return true;

        } else {
          Swal.fire({
            title: '¡Vaya!',
            text: 'Debe contactar al administrador.',
            icon: 'warning',
          });

          // console.log( 'No ha pagado' );
          return false;
        }
      }),
      catchError(error => {
        console.error('HTTP Error', error.status);
        Swal.fire('Error login', error.error.mensaje, 'error');
        throw error;
      })
    );
  }


  autenticado() {
    return ( this.token.length > 6 ) ? true : false;
  }


  cargarStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));

    } else {
        this.token = '';
        this.usuario = null;
    }
  }


  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'usuario' );
    this.router.navigate(['/recursos']);
  }


}
