import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localEs from '@angular/common/locales/es';

registerLocaleData(localEs);

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

// RUTAS
import { AppRoutingModule } from './app-routing.module';

// SERVICIOS
import { UsuarioService } from './services/usuario.service';
import { EncuestaService } from './services/encuesta.service';
import { CsvService } from './services/csv.service';

// COMPONENTES
import { AppComponent } from './app.component';
import { CabeceroComponent } from './pages/cabecero/cabecero.component';
import { RecursosComponent } from './pages/recursos/recursos.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { LoginComponent } from './pages/login/login.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { HerramientasComponent } from './pages/herramientas/herramientas.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    RecursosComponent,
    EncuestaComponent,
    LoginComponent,
    EstadisticasComponent,
    HerramientasComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    UsuarioService,
    EncuestaService,
    CsvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
