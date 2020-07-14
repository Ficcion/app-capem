import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// RUTAS
import { RecursosComponent } from './pages/recursos/recursos.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { LoginComponent } from './pages/login/login.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';

// GUARDS
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'recursos', component: RecursosComponent },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'recursos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
