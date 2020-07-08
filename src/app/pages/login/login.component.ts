import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.model';

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

    const usuario = new UsuarioModel(
      null,
      forma.value.empresa,
      forma.value.password
    );

    this.usuarioService.logIn( usuario, forma.value.recordarUsuario)
      .subscribe( logueado => {
        if (logueado) {
          // console.log( logueado );
          this.router.navigate(['/estadisticas']);

        } else {

          return;
        }
      });
  }


}
