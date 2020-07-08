import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  public exportAcsv(filename: string, rows: object[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separador = ',';
    const keys = Object.keys(rows[0]);
    const csvData =
      keys.join(separador) + '\n' + rows.map(row => {
        return keys.map(k => {
          let celda = row[k] === null || row[k] === undefined ? '' : row[k];
          celda = celda instanceof Date
            ? celda.toLocaleString()
            : celda.toString().replace(/"/g, '""');
          if (celda.search(/("|,|\n)/g) >= 0) {
            celda = `"${celda}"`;
          }
          return celda;
        }).join(separador);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);

    } else {

      const link = document.createElement('a');

      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }


}
