import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorreoModel } from '../../models/correo.model';
import { EncuestaModel } from '../../models/encuesta.model';
import { EncuestaService } from '../../services/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styles: [
  ]
})
export class EncuestaComponent implements OnInit {

  forma: FormGroup;
  correo: FormGroup;
  mail: {};
  empresaErr = false;
  dia: Date = new Date();
  diaEs = `${this.dia.getDate()}/${this.dia.getMonth() + 1}/${this.dia.getFullYear()}`;
  empleado: '';
  btn3 = false;
  sospechosoComplicacion = false;
  sospechosoRiesgo = false;

  constructor(
    public encuestaService: EncuestaService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.forma = new FormGroup({
      codigo: new FormControl( null, [Validators.required, Validators.minLength(2)] ),
      numeroEmpleado: new FormControl( null, Validators.required ),
      fecha: new FormControl( this.diaEs, Validators.required ),
      fiebre: new FormControl( null ),
      tos: new FormControl( null ),
      diarrea: new FormControl( null ),
      vomito: new FormControl( null ),
      calosfrios: new FormControl( null ),
      dolorCabeza: new FormControl( null ),
      dolorAbdominal: new FormControl( null ),
      dolorMuscular: new FormControl( null ),
      dolorArticulaciones: new FormControl( null ),
      debilidadMalestar: new FormControl( null ),
      secrecionNasal: new FormControl( null ),
      dolorGarganta: new FormControl( null ),
      conjuntivitis: new FormControl( null ),
      sintomasComplicacion: new FormControl( null ),
      diabetes: new FormControl( null ),
      presion: new FormControl( null ),
      enfermedadCorazon: new FormControl( null ),
      enfermedadRenal: new FormControl( null ),
      enfermedadPulmonar: new FormControl( null ),
      cancer: new FormControl( null ),
      inmunocompromiso: new FormControl( null ),
      vih: new FormControl( null ),
      ninguna: new FormControl( null ),
      sospechosoComplicacion: new FormControl( this.sospechosoComplicacion),
      sospechosoRiesgo: new FormControl( this.sospechosoRiesgo),
    });

    this.correo = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      asunto: new FormControl( null, Validators.required ),
      email: new FormControl( null, Validators.required ),
      mensaje: new FormControl( null, Validators.required ),
    });

    document.getElementById('seccion2').style.display = 'none';
    document.getElementById('seccion3').style.display = 'none';
  }

  validaEmpresa() {
    const empresas = [
      {cod: 'kinich', mail: 'alferreyraf@gmail.com'},
      {cod: 'kinichp', mail: 'pruebaswapp19@gmail.com'},
      {cod: 'capem', mail: 'salud_ocupacional@capem.com.mx'},
      {cod: 'capemp', mail: 'pruebaswapp19@gmail.com'},
      {cod: 'bd', mail: 'covid-19@byd.com'},
      {cod: 'niagara', mail: 'covid-19@niagara.com'},
      {cod: 'zurich', mail: 'covid-19@zurich.com'},
    ];
    const confirmada = empresas.find(empresa => empresa.cod === this.forma.value.codigo);

    if ( !confirmada) {

      this.empresaErr = true;
      this.forma.controls.codigo.setValue(null);

    } else {

      this.empresaErr = false;
      this.mail = confirmada.mail;
    }
   }


  copiaEmpleado() {
    this.empleado = this.forma.value.numeroEmpleado;
  }


  comprueba1() {
      if ( this.forma.value.fiebre === true && this.forma.value.tos === true ||
        this.forma.value.fiebre === true && this.forma.value.dolorCabeza === true ||
        this.forma.value.fiebre === true && this.forma.value.debilidadMalestar === true) {

          document.getElementById('seccion1').style.display = 'none';
          document.getElementById('seccion2').style.display = 'block';
      }
     else {

      Swal.fire({
        title: '<H4 style="color:#3594C5">¡Gracias por cuidar de todos! <H4/>',
        html:
        '<span style="color:#575959">No tienes síntomas compatibles con COVID-19, si persisten, acude a evaluación médica para un diagnóstico alterno.<span>',
        icon: 'success',
      });

      this.enviarEncuesta();
    }
  }


  llenarCorreo() {
    this.correo.setValue({
      nombre: 'CAPEM México',
      asunto: 'Alerta de COVID-19',
      email: this.mail,
      mensaje:
      `<!DOCTYPE html>
      <html lang="en">
	      <head>
		      <title>Alerta de riesgo COVID-19</title>
		      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		      <meta name="viewport" content="width=device-width, initial-scale=1">
		      <meta http-equiv="X-UA-Compatible" content="IE=edge" />

		      <style type="text/css">
			      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
			      img { -ms-interpolation-mode: bicubic; }

			      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
			      table { border-collapse: collapse !important; }
			      body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

			      a[x-apple-data-detectors] {
			        color: inherit !important;
			        text-decoration: none !important;
			        font-size: inherit !important;
			        font-family: inherit !important;
			        font-weight: inherit !important;
			        line-height: inherit !important;
			      }

			      #MessageViewBody a {
			        color: inherit;
			        text-decoration: none;
			        font-size: inherit;
			        font-family: inherit;
			        font-weight: inherit;
			        line-height: inherit;
			      }

			      a { color: #3594C5 !important; font-weight: bold; }
			      a:hover { color: #DE6426 !important; text-decoration: none; }

			      @media screen and (max-width: 600px) {
				      h1 { font-size: 24px !important; }
			      }
		      </style>
	      </head>
	      <body id="body" style="margin: 0 !important; padding: 0 !important;">

		      <div style="display: none; max-height: 0; overflow: hidden;">Alerta de riesgo COVID-19.</div>

		      <div style="background-color: white; color: #000000; font-family: sans-serif; font-size: 18px; line-height: 36px; margin: 0 auto; max-width: 600px; padding: 40px 20px 40px 20px;">
            <img src="https://res.cloudinary.com/kinich/image/upload/v1593738650/LogoCAPEM_f4zex2.png" alt="Logotipo de CAPEM México." width="100" border="0" style="border-radius: 4px; display: block; margin: 20px auto 20px auto; margin-left: -7px; max-width: 60%; min-width: 100px; width: 100%;">

			      <h1 style="margin: 20px auto 20px auto; text-align: center;">¡Atención!</h1>

            <center>
              <img src="https://res.cloudinary.com/kinich/image/upload/v1593481942/alerta_ch7bkz.jpg" alt="Símbolo de alerta" width="100" border="0" style="border-radius: 50px; display: block; margin: 20px auto 20px auto;">
            </center>

			      <p style="margin: 0 0 20px 0;">El Colaborador No. "${this.empleado}" contestó afirmativamente a síntomas de riesgo.</p>
			      <p style="margin: 0 0 20px 0;">¡Contáctalo lo antes posible!</p>
			      <p style="margin: 0 0 20px 0;">¡Gracias por cuidar la salud de todos!</p>
            <br>

            <center>
              <img src="https://res.cloudinary.com/kinich/image/upload/v1593738760/LogoFCAPEM_gwvx6k.png" alt="Logotipo CAPEM México" width="50" border="0" style="display: block;">
            </center>

            <center>
              <a href="https://www.capem.com.mx/" style="font-size: 14px;">CAPEM México.</a>
            </center>

            <div style="color: #888888; font-size: 14px; margin: 2em 0 0 0;">
              <p style="margin: 0 0 20px 0;">CAPEM México es el responsable del tratamiento de los datos personales que nos proporcione.
              Sus datos personales serán utilizados para las siguientes finalidades: a) Generar información de prevención de riesgo de contagio; b) Generar estadísticas para informes internos; c) Emisión de constancia de elaboración de la encuesta para permitir su ingreso a las instalaciones.</p>
              <p style="margin: 0 0 20px 0; font-size: 10px;">En caso de que no desee que sus datos personales sean tratados para finalidades adicionales, usted puede manifestarlo en el correo electrónico datospersonales@capem.com.mx.org</p>
			      </div>
		      </div>
	      </body>
      </html>`
    });
  }


  comprueba2() {
    if (this.forma.value.sintomasComplicacion === 'No') {

      document.getElementById('seccion2').style.display = 'none';
      document.getElementById('seccion3').style.display = 'block';

    } else {

      this.forma.value.sospechosoComplicacion = true;
      this.enviarCorreo();

      Swal.fire({
        title: '<H4 style="color:#3594C5">¡Gracias por cuidar de todos! <H4/>',
        html:
        '<span style="color:#DE6426">Llama de inmediato al servicio médico de la empresa y a R.H.<span>',
        icon: 'warning',
      });

      this.enviarEncuesta();
    }
  }


  valAlguna(evento: any) {
    if (evento.currentTarget.checked === true) {

      this.btn3 = true;
      this.forma.controls.ninguna.setValue(null);
      this.llenarCorreo();
    }
  }


  valNinguna(evento: any) {
    if (evento.currentTarget.checked === true) {

      this.btn3 = true;
      this.forma.controls.diabetes.setValue(null);
      this.forma.controls.presion.setValue(null);
      this.forma.controls.enfermedadCorazon.setValue(null);
      this.forma.controls.enfermedadRenal.setValue(null);
      this.forma.controls.enfermedadPulmonar.setValue(null);
      this.forma.controls.cancer.setValue(null);
      this.forma.controls.inmunocompromiso.setValue(null);
      this.forma.controls.vih.setValue(null);
    }
  }


  comprueba3() {
    if (
      this.forma.value.diabetes === true
      || this.forma.value.presion === true
      || this.forma.value.enfermedadCorazon === true
      || this.forma.value.enfermedadRenal === true
      || this.forma.value.enfermedadPulmonar === true
      || this.forma.value.cancer === true
      || this.forma.value.inmunocompromiso === true
      || this.forma.value.vih === true
      || this.forma.value.ninguna === true
      ) {

      if (this.forma.value.ninguna === true) {

        Swal.fire({
          title: '<H4 style="color:#3594C5">¡Gracias por cuidar de todos! <H4/>',
          html:
          '<span style="color:#575959">Mantente en casa y avisa al servicio médico de la empresa, al jefe directo y a R.H.<span>',
          icon: 'success',
        });

        this.enviarEncuesta();

      } else {

        this.forma.value.sospechosoRiesgo = true;
        this.enviarCorreo();

        Swal.fire({
          title: '<H4 style="color:#3594C5">¡Gracias por cuidar de todos! <H4/>',
          html:
          '<span style="color:#DE6426">Llama de inmediato al servicio médico de la empresa y a R.H.<span>',
          icon: 'warning',
        });

        this.enviarEncuesta();
      }
    } else {

      this.btn3 = false;
    }
  }


  enviarCorreo() {
    const correoNuevo = new CorreoModel(
      this.correo.value.nombre,
      this.correo.value.asunto,
      this.correo.value.email,
      this.correo.value.mensaje,
    );

    this.encuestaService.correoCovid( correoNuevo )
    .subscribe( encuestaCreada => console.log( 'Correo enviado; función enviarCorreo' ));
  }


  enviarEncuesta() {
    const encuestaNueva = new EncuestaModel(
      this.forma.value.codigo,
      this.forma.value.numeroEmpleado,
      this.forma.value.fecha,
      this.forma.value.fiebre,
      this.forma.value.tos,
      this.forma.value.diarrea,
      this.forma.value.vomito,
      this.forma.value.calosfrios,
      this.forma.value.dolorCabeza,
      this.forma.value.dolorAbdominal,
      this.forma.value.dolorMuscular,
      this.forma.value.dolorArticulaciones,
      this.forma.value.debilidadMalestar,
      this.forma.value.secrecionNasal,
      this.forma.value.dolorGarganta,
      this.forma.value.conjuntivitis,
      this.forma.value.sintomasComplicacion,
      this.forma.value.diabetes,
      this.forma.value.presion,
      this.forma.value.enfermedadCorazon,
      this.forma.value.enfermedadRenal,
      this.forma.value.enfermedadPulmonar,
      this.forma.value.cancer,
      this.forma.value.inmunocompromiso,
      this.forma.value.vih,
      this.forma.value.ninguna,
      this.forma.value.sospechosoComplicacion,
      this.forma.value.sospechosoRiesgo,
    );

    this.encuestaService.crearEncuesta( encuestaNueva )
      .subscribe( encuestaCreada => {
      this.router.navigate([ '/recursos' ]);
      });
  }


}
