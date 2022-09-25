// eslint-disable-next-line no-undef
const IDOMParser = require("advanced-html-parser");
import iconv from "iconv-lite";
import { Buffer } from "buffer";

class Alumno {
  constructor(control, password) {
    this.password = password;
    this.control = control;
    this.passwordToken = "";
    this.datosGenerales = {
      nombre: "",
      curp: "",
      modalidad: "Matutina",
      carrera: "",
      planDeEstudios: "",
      especialidad: "",
    };
    this.datosPersonales = {
      ciudad: "",
      colonia: "",
      calle: "",
      noCalle: "",
      cp: "",
      fechaDeNacimiento: "",
      correoPersonal: "",
      correoInstitucional: control + "@eldorado.tecnm.mx".toUpperCase(),
      telefono: "",
    };

    this.datosAcademicos = {
      escuelaDeProcedencia: "",
      periodoDeIngreso: "",
      periodoActual: "",
      periodosValidados: "",
      creditosAcumulados: "",
      situacion: "",
    };

    this.kardex = {
      datos: [],
      promedio: 0,
      creditos: { totales: 0, obtenidos: 0 },
      avance: 0, //porcentaje de avance
    };
    this.horario = [];
    
  }

  fetchXML(url) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();

      request.onload = () => {
        if (request.status === 200) {
          resolve(iconv.decode(Buffer.from(request.response), "iso-8859-1"));
        } else {
          reject(new Error(request.statusText));
        }
      };
      request.onerror = () => reject(new Error(request.statusText));
      request.responseType = "arraybuffer";

      request.open("GET", url);
      request.setRequestHeader(
        "Content-type",
        "text/html; charset=ISO-8859-15S"
      );
      request.send();
    });
  }

  async LoadHTML(url) {
    const request = await this.fetchXML(url);
    let html = request.toUpperCase();
    return html;
  }

  async validarInicioInicioDeSecion() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=MAIN&Control=" +
      this.control +
      "&password=" +
      this.password +
      "&aceptar=ACEPTAR";

    //const url = 'http://201.164.155.162/cgi-bin/sie.pl?Opc=MAIN&Control=19160026&password=L19160026&aceptar=ACEPTAR';
    let html = await this.LoadHTML(url);
    if (html == "") {
      return false;
    }

    const doc = IDOMParser.parse(html);
    const title = doc.documentElement.querySelector("title").textContent;

    if (title == "SIE ESTUDIANTES") {
      return false;
    }

    let pass =
      "" + doc.documentElement.querySelector("frame").getAttribute("SRC");
    pass = pass.substr(pass.indexOf("PASSWORD") + 9);
    this.passwordToken = pass.substr(0, pass.length - 8);

    await this.ObtenerDatosDeAlumno();
    await this.ObtenerKardex();
    await this.ObtenerHorario();
    return true;
  }

  async ObtenerDatosDeAlumno() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=DATOSALU&Control=" +
      this.control +
      "&password=" +
      this.passwordToken +
      "&aceptar=ACEPTAR";
    const html = await this.LoadHTML(url);
    const doc = IDOMParser.parse(html);
    let datos = doc.documentElement.querySelectorAll("strong");

    this.datosGenerales.nombre = datos[3].textContent.trim();
    this.datosGenerales.curp = datos[4].textContent.trim();
    this.datosGenerales.carrera = datos[7].textContent
      .replace(/\(\d+\)/, "")
      .trim();
    this.datosGenerales.planDeEstudios = datos[8].textContent
      .replace(/\(\d+\)/, "")
      .split(/ +/)
      .join(" ")
      .trim();
    this.datosGenerales.especialidad = datos[9].textContent
      .replace(/\(\d+\)/, "")
      .trim();

    datos = doc.documentElement.querySelectorAll("p");
    this.datosPersonales.calle = datos[0].textContent.trim();
    this.datosPersonales.noCalle = datos[1].textContent.trim();
    this.datosPersonales.colonia = datos[2].textContent.trim();
    this.datosPersonales.ciudad = datos[3].textContent.trim();
    this.datosPersonales.cp = datos[4].textContent.trim();
    this.datosPersonales.telefono = datos[5].textContent.trim();
    this.datosPersonales.correoPersonal = datos[6].textContent.trim();
    this.datosPersonales.fechaDeNacimiento = datos[8].textContent.trim();

    this.datosAcademicos.escuelaDeProcedencia = datos[9].textContent
      .split(/\(\d+\)/)
      .join("")
      .split(/ +/)
      .join(" ")
      .trim();
    this.datosAcademicos.periodoDeIngreso = datos[10].textContent
      .replace(/\(\d+\)/, "")
      .trim();
    this.datosAcademicos.periodosValidados = datos[11].textContent.trim();
    this.datosAcademicos.periodoActual = datos[12].textContent
      .split(/\(\d+\)/)
      .join("");
    this.datosAcademicos.creditosAcumulados = datos[13].textContent.trim();
    this.datosAcademicos.situacion = datos[14].textContent.trim();
  }

  async ObtenerKardex() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=KARDEX&Control=" +
      this.control +
      "&password=" +
      this.passwordToken +
      "&aceptar=ACEPTAR";
    let html = await this.LoadHTML(url);

    const doc = IDOMParser.parse(html);
    const title = doc.documentElement.querySelector("title").textContent;

    if (title == "SIE ESTUDIANTES") {
      return false;
    }


    const tables = doc.documentElement.querySelectorAll("table");
    let trs = tables[1].querySelectorAll("tr");
    for (let i = 2; i < trs.length - 4; i++) {
      const tr = trs[i];
      const tds = tr.querySelectorAll("td");
      this.kardex.datos.push({
        clave: tds[0].textContent.trim(),
        materia: tds[1].textContent.trim(),
        calificacion: tds[2].textContent.trim(),
        periodo: tds[5].textContent.trim(),
      });
    }
    this.kardex.promedio = trs[trs.length - 4]
      .querySelectorAll("td")[2]
      .textContent.substr(0, 5);

    //obteniendo los creditos
    trs = tables[2].querySelectorAll("tr");
    let creditos = trs[0]
      .querySelector("td")
      .textContent.replace("CREDITOS ACUMULADOS", "")
      .trim()
      .split(" DE ");
    this.kardex.creditos = { obtenidos: creditos[0], totales: creditos[1] };

    //obteniendo el porcentaje de avance
    this.kardex.avance = trs[1]
      .querySelector("td")
      .textContent.replace("% DE AVANCE:", "")
      .trim();
    console.log("");
  }

  async ObtenerHorario() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=HORARIO&Control=" +
      this.control +
      "&password=" +
      this.passwordToken +
      "&aceptar=ACEPTAR";
    const html = await this.LoadHTML(url);
    const doc = IDOMParser.parse(html);
    const tables = doc.documentElement.querySelectorAll("table");
    const trs = tables[1].querySelectorAll("tr");
    for (let i = 1; i < trs.length ; i++) {
      const tr = trs[i];
      const tds = tr.querySelectorAll("td");

      //por materia cada dia de la semana
      for (let j = 7; j <= 11; j++) {
        let horaAulaArray = tds[j].textContent.split(" ");
        let aula = horaAulaArray[1];
        let hora = horaAulaArray[0].split("-");
        if (horaAulaArray[0] != "") {
          this.horario.push({
            materia: tds[1].textContent.trim(),
            horaEntrada: hora[0],
            horaSalida: hora[1],
            aula: aula,
            dia: j - 6,
          });
        }
      }
    }
    console.log("");
  }
}
export default Alumno;
