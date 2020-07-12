import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CorreoModel } from '../models/correo.model';
import { EncuestaModel } from '../models/encuesta.model';
import { UsuarioService } from './usuario.service';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class EncuestaService {

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService,
    ) {
    this.usuarioService.cargarStorage();
  }


  cargarEncuestas() {
    const url = URL_SERVICIOS + '/encuesta?token=' + this.usuarioService.token;
    return this.http.get( url );
  }


  correoCovid( correo: CorreoModel ) {
    const url = URL_SERVICIOS + '/correo';

    console.log( 'Se envió el correo' );

    return this.http.post( url, correo );
  }


  crearEncuesta( encuesta: EncuestaModel ) {
    const url = URL_SERVICIOS + '/encuesta';

    return this.http.post( url, encuesta );
  }


  borrarEncuestas() {
    const url = URL_SERVICIOS + '/encuesta?token=' + this.usuarioService.token;

    return this.http.delete( url )
      .pipe(map( resp => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Se han eliminado las encuestas que no registraron riesgo.',
          icon: 'success',
        });

        return true;
      }));
  }


}
