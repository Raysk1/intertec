
// eslint-disable-next-line no-undef
var DomParser = require("react-native-html-parser").DOMParser;

class Alumno {
  constructor(control, password) {
    this.password = password;
    this.control = control;
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
      correoInstitucional: control + "@eldorado.tecnm.mx",
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

    this.kardex = [];
    this.horario = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
    };
  }

  async LoadHTML(url) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    }); // fetch page

    const htmlString = await response.text(); // get response text

    return htmlString;
  }

  async validarInicioInicioDeSecion() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=MAIN&Control=" +
      this.control +
      "&password=" +
      this.password +
      "&aceptar=ACEPTAR";

    //const url = 'http://201.164.155.162/cgi-bin/sie.pl?Opc=MAIN&Control=19160026&password=L19160026&aceptar=ACEPTAR';
    const html = await this.LoadHTML(url);
    if (html == "") {
      return false;
    }
    let doc = new DomParser().parseFromString(html, "text/html");
    let title = doc.getElementsBySelector("title")[0].textContent;
    if (title == "SIE Estudiantes") {
      return false;
    }

    let pass = "" + doc.getElementsBySelector("FRAME")[0].getAttribute("SRC");
    pass = pass.substr(pass.indexOf("Password") + 9);
    this.password = pass.substr(0, pass.length - 8);

    await this.ObtenerDatosDeAlumno();
    //his.ObtenerKardex();
    //this.ObtenerHorario();
    return true;
  }

  async ObtenerDatosDeAlumno() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=DATOSALU&Control=" +
      this.control +
      "&password=" +
      this.password +
      "&aceptar=ACEPTAR";
    const html = await this.LoadHTML(url);
    let doc = new DomParser().parseFromString(html, "text/html");
    let datos = doc.getElementsBySelector("strong");

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

    datos = doc.getElementsBySelector("p");
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
      this.password +
      "&aceptar=ACEPTAR";
    const html = await this.LoadHTML(url);
    let doc = new DomParser().parseFromString(html, "text/html");
    let trs = doc.getElementsBySelector("TR");

    for (let i = 5; i < trs.length - 4; i++) {
      const tr = trs[i];
      const tds = tr.getElementsBySelector("TD");
      this.kardex.push({
        clave: tds[0].textContent.trim(),
        materia: tds[1].textContent.trim(),
        calificacion: tds[2].textContent.trim(),
        periodo: tds[5].textContent.trim(),
      });
    }
  }

  async ObtenerHorario() {
    const url =
      "http://201.164.155.162/cgi-bin/sie.pl?Opc=HORARIO&Control=" +
      this.control +
      "&password=" +
      this.password +
      "&aceptar=ACEPTAR";
    const html = await this.LoadHTML(url);
    let doc = new DomParser().parseFromString(html, "text/html");
    let trs = doc.getElementsBySelector("TR");
    for (let i = 0; i < trs.length - 4; i++) {
      const tr = trs[i];
      const tds = tr.getElementsBySelector("TD");
      let horaAulaArray = tds[7].textContent.split(" ");
      this.horario.lunes.push({
        materia: tds[1].textContent.trim(),
        hora: horaAulaArray[0],
        aula: horaAulaArray[1],
      });
      horaAulaArray = tds[8].textContent.split(" ");
      this.horario.martes.push({
        materia: tds[1].textContent.trim(),
        hora: horaAulaArray[0],
        aula: horaAulaArray[1],
      });
      horaAulaArray = tds[9].textContent.split(" ");
      this.horario.miercoles.push({
        materia: tds[1].textContent.trim(),
        hora: horaAulaArray[0],
        aula: horaAulaArray[1],
      });
      horaAulaArray = tds[10].textContent.split(" ");
      this.horario.jueves.push({
        materia: tds[1].textContent.trim(),
        hora: horaAulaArray[0],
        aula: horaAulaArray[1],
      });
      horaAulaArray = tds[11].textContent.split(" ");
      this.horario.viernes.push({
        materia: tds[1].textContent.trim(),
        hora: horaAulaArray[0],
        aula: horaAulaArray[1],
      });
    }
  }
}

export default Alumno;
