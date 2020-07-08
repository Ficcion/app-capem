import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}


  canActivate() {
    if ( this.usuarioService.autenticado() ) {
      //  console.log( 'Pasó por el Login Guard' );
       return true;

    } else {
       console.log( 'Bloqueado por el Login Guard' );
       this.router.navigate(['/recursos']);
       return false;
    }
  }


}
