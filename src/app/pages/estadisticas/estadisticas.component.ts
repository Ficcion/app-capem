import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { UsuarioService } from '../../services/usuario.service';
import { EncuestaService } from '../../services/encuesta.service';
import { CsvService } from '../../services/csv.service';
import { EncuestaModel } from '../../models/encuesta.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ]
})
export class EstadisticasComponent implements OnInit {

  encuestas: EncuestaModel [] = [];
  miFecha: Date = new Date();
  cargando = true;
  descarga = [];

  encuestasHoy = [];
  riesgo2Hoy = [];
  riesgo3Hoy = [];
  porcentaje0Hoy = 0;
  porcentaje2Hoy = 0;
  porcentaje3Hoy = 0;

  encuestasJul = [];
  encuestasAgo = [];
  encuestasSep = [];
  encuestasOct = [];
  encuestasNov = [];
  encuestasDic = [];

  riesgosJul = 0;
  riesgosAgo = 0;
  riesgosSep = 0;
  riesgosOct = 0;
  riesgosNov = 0;
  riesgosDic = 0;

  riesgoT2jul = [];
  riesgoT2ago = [];
  riesgoT2sep = [];
  riesgoT2oct = [];
  riesgoT2nov = [];
  riesgoT2dic = [];

  riesgoT3jul = [];
  riesgoT3ago = [];
  riesgoT3sep = [];
  riesgoT3oct = [];
  riesgoT3nov = [];
  riesgoT3dic = [];

/* === Pie Chart inicio === */
  public pieChartData: number[] = [0, 0, 0];
  public pieChartLabels: Label[] = ['% Riesgos 0', '% Riesgos T2', '% Riesgos T3'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [ { backgroundColor: ['grey', 'orange', 'firebrick'] } ];
/* === Pie Chart fin === */


/* === Line Chart inicio === */
  lineChartData: ChartDataSets[] = [
    // { data: [0, 0, 0, 0, 0, 0], label: 'Encuestas' },
    { data: [0, 0, 0, 0, 0, 0], label: 'Riesgos' },
    { data: [0, 0, 0, 0, 0, 0], label: 'Riesgos T2' },
    { data: [0, 0, 0, 0, 0, 0], label: 'Riesgos T3' }
  ];
  lineChartLabels: Label[] = ['Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartOptions = { responsive: true, aspectRatio: 0 };
  lineChartLegend = true;
/* === Line Chart fin === */

  constructor(
    public usuarioService: UsuarioService,
    public encuestaService: EncuestaService,
    public csvService: CsvService
  ) {
    this.cargando = true;
  }


  ngOnInit(): void {
    this.listado();
  }


  listado() {

    this.encuestaService.cargarEncuestas()
      .subscribe( (resp: any) => {
        this.encuestas = resp.encuestas;

        this.getEncuestasHoy();
        this.getRiesgo2Hoy();
        this.getRiesgo3Hoy();
        this.getEncuestas();
        this.getRiesgoT2();
        this.getRiesgoT3();
        this.getRiesgos();
        this.porcentajes();

        this.pieChartData = [
          Number(this.porcentaje0Hoy.toFixed(2)),
          Number(this.porcentaje2Hoy.toFixed(2)),
          Number(this.porcentaje3Hoy.toFixed(2))
        ];

        this.lineChartData = [
          // { data: [this.encuestasJul.length, this.encuestasAgo.length, this.encuestasSep.length, this.encuestasOct.length,
          //   this.encuestasNov.length, this.encuestasDic.length], label: 'Encuestas' },
          { data: [this.riesgosJul, this.riesgosAgo, this.riesgosSep, this.riesgosOct, this.riesgosNov, this.riesgosDic],
            label: 'Riesgos' },
          { data: [this.riesgoT2jul.length, this.riesgoT2ago.length, this.riesgoT2sep.length,
            this.riesgoT2oct.length, this.riesgoT2nov.length, this.riesgoT2dic.length], label: 'Riesgos T2' },
          { data: [ this.riesgoT3jul.length, this.riesgoT3ago.length, this.riesgoT3sep.length,
            this.riesgoT3oct.length, this.riesgoT3nov.length, this.riesgoT3dic.length], label: 'Riesgos T3' }
        ];
      });
    this.cargando = false;
  }

  getEncuestasHoy() {
    for (const encuesta of this.encuestas) {
      if ( encuesta.fecha === this.miFecha.toLocaleDateString() ) {
        this.encuestasHoy.push(encuesta);
      }
    }
  }


  getRiesgo2Hoy() {
    for (const encuesta of this.encuestas) {
      if ( encuesta.fecha === this.miFecha.toLocaleDateString() && encuesta.secc2Riesgo === 'true' ) {
        this.riesgo2Hoy.push(encuesta);
      }
    }
  }


  getRiesgo3Hoy() {
    for (const encuesta of this.encuestas) {
      if ( encuesta.fecha === this.miFecha.toLocaleDateString() && encuesta.secc3Riesgo === 'true' ) {
        this.riesgo3Hoy.push(encuesta);
      }
    }
  }


  getEncuestas() {
    for (const encuesta of this.encuestas) {
      const suFecha =  encuesta.fecha.split('/');
      const mes = suFecha[suFecha.length - 2 ];

      switch (mes){
        case '7':
          this.encuestasJul.push(encuesta);
          break;
        case '8':
          this.encuestasAgo.push(encuesta);
          break;
        case '9':
          this.encuestasSep.push(encuesta);
          break;
        case '10':
          this.encuestasOct.push(encuesta);
          break;
        case '11':
          this.encuestasNov.push(encuesta);
          break;
        case '12':
          this.encuestasDic.push(encuesta);
          break;
      }
    }
  }


  getRiesgoT2() {
    for (const encuesta of this.encuestas) {
      const suFecha =  encuesta.fecha.split('/');
      const mes = suFecha[suFecha.length - 2 ];

      if ( encuesta.secc2Riesgo === 'true' ) {
        switch (mes){
          case '7':
            this.riesgoT2jul.push(encuesta);
            break;
          case '8':
            this.riesgoT2ago.push(encuesta);
            break;
          case '9':
            this.riesgoT2sep.push(encuesta);
            break;
          case '10':
            this.riesgoT2oct.push(encuesta);
            break;
          case '11':
            this.riesgoT2nov.push(encuesta);
            break;
          case '12':
            this.riesgoT2dic.push(encuesta);
            break;
        }
      }
    }
  }


  getRiesgoT3() {
    for (const encuesta of this.encuestas) {
      const suFecha =  encuesta.fecha.split('/');
      const mes = suFecha[suFecha.length - 2 ];

      if ( encuesta.secc3Riesgo === 'true' ) {
        switch (mes){
          case '7':
            this.riesgoT3jul.push(encuesta);
            break;
          case '8':
            this.riesgoT3ago.push(encuesta);
            break;
          case '9':
            this.riesgoT3sep.push(encuesta);
            break;
          case '10':
            this.riesgoT3oct.push(encuesta);
            break;
          case '11':
            this.riesgoT3nov.push(encuesta);
            break;
          case '12':
            this.riesgoT3dic.push(encuesta);
            break;
        }
      }
    }
  }


  getRiesgos() {
    this.riesgosJul = this.riesgoT2jul.length + this.riesgoT3jul.length;
    this.riesgosAgo = this.riesgoT2ago.length + this.riesgoT3ago.length;
    this.riesgosSep = this.riesgoT2sep.length + this.riesgoT3sep.length;
    this.riesgosOct = this.riesgoT2oct.length + this.riesgoT3oct.length;
    this.riesgosNov = this.riesgoT2nov.length + this.riesgoT3nov.length;
    this.riesgosDic = this.riesgoT2dic.length + this.riesgoT3dic.length;
  }


  porcentajes() {
    const riesgos = this.riesgo2Hoy.length + this.riesgo3Hoy.length;
    const noRiesgos = this.encuestasHoy.length - riesgos;

    this.porcentaje0Hoy = noRiesgos * 100 / this.encuestasHoy.length;
    this.porcentaje2Hoy = this.riesgo2Hoy.length * 100 / this.encuestasHoy.length;
    this.porcentaje3Hoy = this.riesgo3Hoy.length * 100 / this.encuestasHoy.length;
  }


  descargar() {
    // IMPRIMIR POR SEMANA
    for (const encuesta of this.encuestas) {
      const suFecha =  encuesta.fecha.split('/');
      const mes = suFecha[suFecha.length - 2 ];
      const miMes = this.miFecha.getMonth() + 1;
      const dia = suFecha[suFecha.length - 3 ];

      if ( mes === miMes.toLocaleString() ) {
        if ( Number(dia) <= 7) {
          this.descarga.push(encuesta);
        }

        if ( Number(dia) > 7 && Number(dia) < 16) {
          this.descarga.push(encuesta);
        }

        if ( Number(dia) > 15 && Number(dia) < 24) {
          this.descarga.push(encuesta);
        }
        if ( Number(dia) > 23 && Number(dia) <= 31) {
          this.descarga.push(encuesta);
        }
      }
    }
    this.csvService.exportAcsv(`Encuestas_${this.miFecha.toLocaleDateString()}.csv`, this.descarga);
  }


  onPrint() {
    window.print();
  }


}
