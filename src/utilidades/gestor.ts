import { Actividades, ComandosInicio, ComandosPrincipal } from "../enumerados/enumerados";
import { Usuario } from "../entidades/usuario";
import * as inquirer from 'inquirer';
import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { ColeccionRutas } from "../colecciones/coleccionRutas";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";
import { ManejadorJSON } from "./manejadorJSON";


export class Gestor {
  private constructor() {};

  public static inicio(): void {
    // Primera parte del programa
    inquirer.prompt({
        type: "list",
        name: "comando",
        message: "Elija una opción:",
        choices: Object.values(ComandosInicio),
    }).then(answers => {
      switch (answers["comando"]) {
        case ComandosInicio.IniciarSesion:
          // this.iniciarSesion();
          break;
        case ComandosInicio.Registrarse:
          this.registrarEnSistema();
          break;
        case ComandosInicio.Salir:
          console.log("Hasta luego!");
          break;
      }
    });
  }

  public static principal(): void {
    // Primera parte del programa
    inquirer.prompt({
        type: "list",
        name: "comando",
        message: "Elija una opción:",
        choices: Object.values(ComandosPrincipal),
    }).then(answers => {
      switch (answers["comando"]) {
        case ComandosPrincipal.VerListaUsuario:
          this.verListaUsuario();
          break;
        case ComandosPrincipal.VerListaRutas:
          this.verListaRutas();
          break;
        case ComandosPrincipal.VerListaGrupos:
          this.verListaGrupos();
          break;
        case ComandosPrincipal.AgregarAmigo:
          // this.registrarEnSistema();
          break;
        case ComandosPrincipal.EliminarAmigo:
          // this.registrarEnSistema();
          break;
        case ComandosPrincipal.UnirseGrupo:
          // this.iniciarSesion();
          break;
        case ComandosPrincipal.CrearGrupo:
          // this.iniciarSesion();
          break;
        case ComandosPrincipal.EliminarGrupo:
          // this.iniciarSesion();
          break;
        case ComandosPrincipal.Salir:
          console.log("Hasta luego!");
          break;
      }
    });
  }
  
  private static registrarEnSistema() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '¿Cuál es tu nombre?'
      },
      {
        type: 'checkbox',
        name: 'actividad',
        message: '¿Qué actividad realiza?',
        choices: [Actividades.Bicicleta, Actividades.Correr]
      }
    ]).then((answers) => {
      ColeccionUsuarios.getColeccionUsuarios().agregarUsuario(new Usuario(answers.name, answers.actividad));
      ManejadorJSON.actualizarUsuariosDB();
      this.principal();
    });
  }

  private static verListaUsuario() {
    let usuarios = ColeccionUsuarios.getColeccionUsuarios().getUsuarios();
    usuarios.forEach((usuario) => {
      console.log(usuario.toString());
    });
    inquirer.prompt({
      type: "confirm",
      name: "continuar",
      message: "¿Desea continuar?",
    }).then((answers) => {
      if(answers.continuar) {
        ManejadorJSON.actualizarUsuariosDB();
        this.principal();
      }
    });
  }

  private static verListaRutas() {
    let rutas = ColeccionRutas.getColeccionRutas().getRutas();
    rutas.forEach((ruta) => {
      console.log(ruta.toString());
    });
    this.principal();
  }

  private static verListaGrupos() {
    let grupos = ColeccionGrupos.getColeccionGrupos().getGrupos();
    grupos.forEach((grupo) => {
      console.log(grupo.toString());
    });
    this.principal();
  }




  // private static iniciarSesion() {
    
}
