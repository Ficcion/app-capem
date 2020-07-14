import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  empresa: string;
  recordarUsuario = false;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.empresa = localStorage.getItem('empresa') || '';

    if ( this.empresa.length > 1 ) {
      this.recordarUsuario = true;
    }
  }


  ingresar( forma: NgForm ) {
    if ( forma.invalid ) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();

    const usuario = new UsuarioModel(
      null,
      forma.value.empresa,
      forma.value.password
    );

    this.usuarioService.logIn( usuario, forma.value.recordarUsuario)
      .subscribe( logueado => {

        if (logueado) {
          if (!this.usuarioService.usuario) {
            this.usuarioService.usuario = JSON.parse(localStorage.getItem('usuario'));
          }

          Swal.close();
          this.router.navigate(['/estadisticas']);

        } else {

          return;
        }
      });
  }


}
