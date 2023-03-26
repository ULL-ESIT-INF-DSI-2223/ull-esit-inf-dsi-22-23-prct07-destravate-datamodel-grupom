import { Actividades, ComandosInicio, ComandosPrincipal, ManeraOrdenar, OrdenarRuta, OrdenarGrupo, OrdenarReto, OrdenarUsuario } from "../enumerados/enumerados";
import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { ColeccionRutas } from "../colecciones/coleccionRutas";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";
import { ColeccionRetos } from "../colecciones/coleccionRetos";
import { ManejadorJSON } from "./manejadorJSON";
import { Usuario } from "../entidades/usuario";
import { Grupo } from "../entidades/grupo";
import { Reto } from "../entidades/reto";
import { Ruta } from "../entidades/ruta";
import { Coordenadas } from "../tipos/tipos";
import * as inquirer from 'inquirer';


export class Gestor {
  private static idPersona: number;
  private constructor() {};

  public static inicio(): void {
    // Primera parte del programa
    console.clear();
    inquirer.prompt({
        type: "list",
        name: "comando",
        message: "Bienvenido a DESTRAVATE, ¿Qué quieres hacer? : ",
        choices: Object.values(ComandosInicio),
    }).then(answers => {
      switch (answers["comando"]) {
        case ComandosInicio.IniciarSesion:
          console.clear();
          this.iniciarSesion();
          break;
        case ComandosInicio.Registrarse:
          console.clear();
          this.registrarEnSistema();
          break;
        case ComandosInicio.Salir:
          console.clear();
          console.log("Hasta luego!");
          process.exit();
          break;
      }
    });
  }

  public static principal(mensajeControl?: string): void {
    // Segunda parte del programa
    console.clear();
    if(mensajeControl !== undefined) {
      console.log(mensajeControl);
    }
    inquirer.prompt({
        type: "list",
        name: "comando",
        message: "¿Qué quieres hacer? : ",
        choices: Object.values(ComandosPrincipal),
    }).then(answers => {
      switch (answers["comando"]) {
        case ComandosPrincipal.VerListaUsuarios:
          console.clear();
          this.OrdenarListaUsuarios();
          break;
        case ComandosPrincipal.VerListaRutas:
          console.clear()
          this.OrdenarListaRutas();
          break;
        case ComandosPrincipal.VerListaGrupos:
          console.clear()
          this.OrdenarListaGrupo();
          break;
        case ComandosPrincipal.VerListaRetos:
          console.clear()
          this.OrdenarListaRetos();
          break;
        case ComandosPrincipal.AgregarAmigo:
          console.clear()
          this.agregarAmigo();
          break;
        case ComandosPrincipal.EliminarAmigo:
          console.clear()
          this.eliminarAmigo();
          break;
        case ComandosPrincipal.UnirseGrupo:
          console.clear()
          this.unirseGrupo();
          break;
        case ComandosPrincipal.CrearGrupo:
          console.clear()
          this.crearGrupo();
          break;
        case ComandosPrincipal.EliminarGrupo:
          console.clear()
          this.eliminarGrupo();
          break;
        case ComandosPrincipal.CrearReto:
          console.clear()
          this.crearReto();
          break;
        case ComandosPrincipal.CrearRuta:
          console.clear()
          this.crearRuta();
          break;
        case ComandosPrincipal.EliminarReto:
          console.clear()
          this.eliminarReto();
          break;
        case ComandosPrincipal.EliminarRuta:
          console.clear()
          this.eliminarRuta();
          break;
        case ComandosPrincipal.Salir:
          console.log("Hasta luego!");
          process.exit();
          break;
      }
    });
  }
  
  private static registrarEnSistema() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '¿Cómo te llamas? : '
      },
      {
        type: 'checkbox',
        name: 'actividad',
        message: '¿Qué prefieres hacer? : ',
        choices: [Actividades.Bicicleta, Actividades.Correr]
      }
    ]).then((answers) => {
      let usuario = new Usuario(answers.name, answers.actividad);
      ColeccionUsuarios.getColeccionUsuarios().agregarUsuario(usuario);
      ManejadorJSON.actualizarUsuariosDB();
      Gestor.idPersona = usuario.id;
      this.principal();
    });

  }

  private static OrdenarListaUsuarios () {
    inquirer.prompt([
      {
        type: "list",
        name: "ordenar",
        message: "¿Qué quieres hacer? : ",
        choices: Object.values(OrdenarUsuario)
      },
      {
        type: 'list',
        name: 'manera',
        message: '¿Cómo quieres ordenarlo? : ',
        choices: Object.values(ManeraOrdenar)
      }
    ]).then(answers => {
      switch (String(answers.ordenar)) {
        case OrdenarUsuario.Alfabeticamente:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionUsuarios.getColeccionUsuarios().ordenarAlfabeticamente(ManeraOrdenar.Ascendente)
          } else {
            ColeccionUsuarios.getColeccionUsuarios().ordenarAlfabeticamente(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarUsuario.CantidadKMSemana:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaSemana(ManeraOrdenar.Ascendente)
          } else {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaSemana(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarUsuario.CantidadKMMes:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaMes(ManeraOrdenar.Ascendente)
          } else {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaMes(ManeraOrdenar.Descendente)
          }
          break;   
        case OrdenarUsuario.CantidadKMAnio:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaAnio(ManeraOrdenar.Ascendente)
          } else {
            ColeccionUsuarios.getColeccionUsuarios().ordenarDistanciaAnio(ManeraOrdenar.Descendente)
          }
          break;         
      }
      this.verListaUsuarios();
    });
  }


  private static OrdenarListaRutas () {
    inquirer.prompt([
      {
        type: "list",
        name: "ordenar",
        message: "¿Qué quieres hacer? : ",
        choices: Object.values(OrdenarRuta)
      },
      {
        type: 'list',
        name: 'manera',
        message: '¿Cómo quieres ordenarlo? : ',
        choices: Object.values(ManeraOrdenar)
      }
    ]).then(answers => {
      switch (String(answers.ordenar)) {
        case OrdenarRuta.Alfabeticamente:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRutas.getColeccionRutas().ordenarAlfabeticamente(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRutas.getColeccionRutas().ordenarAlfabeticamente(ManeraOrdenar.Descendente)
          }
          this.verListaRutas();
          break;
        case OrdenarRuta.CantidadUsuarios:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRutas.getColeccionRutas().ordenarCantidadUsuarios(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRutas.getColeccionRutas().ordenarCantidadUsuarios(ManeraOrdenar.Descendente)
          }
          this.verListaRutas();
          break;
        case OrdenarRuta.Longitud:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRutas.getColeccionRutas().ordenarDistancia(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRutas.getColeccionRutas().ordenarDistancia(ManeraOrdenar.Descendente)
          }
          this.verListaRutas();
          break;
        case OrdenarRuta.Calificacion:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRutas.getColeccionRutas().ordenarCalificacionMedia(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRutas.getColeccionRutas().ordenarCalificacionMedia(ManeraOrdenar.Descendente)
          }
          this.verListaRutas();
          break;
        case OrdenarRuta.Actividad:
          console.clear();
          this.ordenarRutasActividad();
          break;         
      }
    });
  }

  private static ordenarRutasActividad () {
    inquirer.prompt([
    {
      type: 'list',
      name: 'actividad',
      message: '¿Cómo quieres ordenarlo? : ',
      choices: Object.values(Actividades)
    }]).then(answers => {
      switch (String(answers.actividad)) {
        case Actividades.Bicicleta:
          ColeccionRutas.getColeccionRutas().ordenarActividad(Actividades.Bicicleta);
          break;
        case Actividades.Correr:
          ColeccionRutas.getColeccionRutas().ordenarActividad(Actividades.Correr);
          break;
      }
      this.verListaRutas();
    });
  }

  private static OrdenarListaGrupo () {
    inquirer.prompt([
      {
        type: "list",
        name: "ordenar",
        message: "¿Qué quieres hacer? : ",
        choices: Object.values(OrdenarGrupo)
      },
      {
        type: 'list',
        name: 'manera',
        message: '¿Cómo quieres ordenarlo? : ',
        choices: Object.values(ManeraOrdenar)
      }
    ]).then(answers => {
      switch (String(answers.ordenar)) {
        case OrdenarGrupo.Alfabeticamente:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionGrupos.getColeccionGrupos().ordenarAlfabeticamente(ManeraOrdenar.Ascendente)
          } else {
            ColeccionGrupos.getColeccionGrupos().ordenarAlfabeticamente(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarGrupo.CantidadKMSemana:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaSemana(ManeraOrdenar.Ascendente)
          } else {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaSemana(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarGrupo.CantidadKMMes:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaMes(ManeraOrdenar.Ascendente)
          } else {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaMes(ManeraOrdenar.Descendente)
          }
          break;   
        case OrdenarGrupo.CantidadKMAnio:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaAnio(ManeraOrdenar.Ascendente)
          } else {
            ColeccionGrupos.getColeccionGrupos().ordenarDistanciaAnio(ManeraOrdenar.Descendente)
          }
          break;  
        case OrdenarGrupo.CantidadUsuarios:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionGrupos.getColeccionGrupos().ordenarCantidadMiembros(ManeraOrdenar.Ascendente)
          } else {
            ColeccionGrupos.getColeccionGrupos().ordenarCantidadMiembros(ManeraOrdenar.Descendente)
          }
          break;       
      }
      this.verListaGrupos();
    });
  }

  private static OrdenarListaRetos () {
    inquirer.prompt([
      {
        type: "list",
        name: "ordenar",
        message: "¿Qué quieres hacer? : ",
        choices: Object.values(OrdenarReto)
      },
      {
        type: 'list',
        name: 'manera',
        message: '¿Cómo quieres ordenarlo? : ',
        choices: Object.values(ManeraOrdenar)
      }
    ]).then(answers => {
      switch (String(answers.ordenar)) {
        case OrdenarReto.Alfabeticamente:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRetos.getColeccionRetos().ordenarAlfabeticamente(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRetos.getColeccionRetos().ordenarAlfabeticamente(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarReto.CantidadKM:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRetos.getColeccionRetos().ordenarDistancia(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRetos.getColeccionRetos().ordenarDistancia(ManeraOrdenar.Descendente)
          }
          break;
        case OrdenarReto.CantidadUsuarios:
          console.clear();
          if (String(answers.manera) === ManeraOrdenar.Ascendente) {
            ColeccionRetos.getColeccionRetos().ordenarCantidadUsuarios(ManeraOrdenar.Ascendente)
          } else {
            ColeccionRetos.getColeccionRetos().ordenarCantidadUsuarios(ManeraOrdenar.Descendente)
          }
          break;         
      }
      this.verListaRetos();
    });
  }

  private static verListaUsuarios() {
    const nombresUsuarios = ColeccionUsuarios.getColeccionUsuarios().getUsuarios().map((usuario) => {
      return usuario.id + ' ' + usuario.nombre ;
    });
    inquirer.prompt({
      type: "list",
      name: "usuariosLista",
      message: "¿Qué quieres hacer? : ",
      choices: nombresUsuarios,
    }).then(answers => {
      let usuarios = ColeccionUsuarios.getColeccionUsuarios().getUsuario(Number(answers.usuariosLista.split(' ')[0]));
      if(usuarios !== undefined) {
        console.log(usuarios.toString());
      }
      inquirer.prompt({
        type: "confirm",
        name: "continuar",
        message: "¿Volver? : ",
      }).then((answers) => {
        if(!answers.continuar) {
          console.clear()
          this.principal();
        } else {
          console.clear()
          this.verListaUsuarios();
        }
      });
    });
  }

  private static verListaRutas() {
    const nombresRutas = ColeccionRutas.getColeccionRutas().getRutas().map((ruta) => {
      return ruta.id + ' ' + ruta.nombre ;
    });
    inquirer.prompt({
      type: "list",
      name: "RutasLista",
      message: "¿Qué quieres hacer? : ",
      choices: nombresRutas,
    }).then(answers => {
      let rutas = ColeccionRutas.getRuta(Number(answers.RutasLista.split(' ')[0]));
      if(rutas !== undefined) {
        console.log(rutas.toString());
      }
      inquirer.prompt({
        type: "confirm",
        name: "continuar",
        message: "¿Volver? : ",
      }).then((answers) => {
        if(!answers.continuar) {
          console.clear()
          this.principal();
        } else {
          console.clear()
          this.verListaRutas();
        }
      });
    });
  }

  private static verListaGrupos() {
    const nombresGrupos = ColeccionGrupos.getColeccionGrupos().getGrupos().map((grupo) => {
      return grupo.id + ' ' + grupo.nombre ;
    });
    inquirer.prompt({
      type: "list",
      name: "gruposLista",
      message: "¿Qué quieres hacer? : ",
      choices: nombresGrupos,
    }).then(answers => {
      let grupos = ColeccionGrupos.getColeccionGrupos().getGrupo(Number(answers.gruposLista.split(' ')[0]));
      if(grupos !== undefined) {
        console.log(grupos.toString());
      }
      inquirer.prompt({
        type: "confirm",
        name: "continuar",
        message: "¿Volver? : ",
      }).then((answers) => {
        if(!answers.continuar) {
          console.clear()
          this.principal();
        } else {
          console.clear()
          this.verListaGrupos();
        }
      });
    });
  }

  private static verListaRetos() {
    const nombresRetos = ColeccionRetos.getColeccionRetos().getRetos().map((reto) => {
      return reto.id + ' ' + reto.nombre ;
    });
    inquirer.prompt({
      type: "list",
      name: "retosLista",
      message: "¿Qué quieres hacer? : ",
      choices: nombresRetos,
    }).then(answers => {
      let retos = ColeccionRetos.getColeccionRetos().getReto(Number(answers.retosLista.split(' ')[0]));
      if(retos !== undefined) {
        console.log(retos.toString());
      }
      inquirer.prompt({
        type: "confirm",
        name: "continuar",
        message: "¿Volver? : ",
      }).then((answers) => {
        if(!answers.continuar) {
          console.clear()
          this.principal();
        } else {
          console.clear()
          this.verListaRetos();
        }
      });
    });
  }


  private static iniciarSesion() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'idUsuario',
        message: '¿Cuál es tu ID? : '
      }
    ]).then((answers) => {
      const usuario = ColeccionUsuarios.getColeccionUsuarios().getUsuario(answers.idUsuario);
      if(usuario !== undefined) {
        Gestor.idPersona = usuario.id;
        this.principal("\nHola " + usuario.nombre + "\n");
      } else {
        this.inicio();
      }
    });
  }

  private static agregarAmigo() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'idUsuario',
        message: 'Pregúntale el id a tu amigo.\nIngresa el id de tu amigo : '
      }
    ]).then((answers) => {
      let usuario = ColeccionUsuarios.getColeccionUsuarios().getUsuario(answers.idUsuario);
      if(usuario !== undefined) {
        const usuarioActual = ColeccionUsuarios.getColeccionUsuarios().getUsuario(Gestor.idPersona)
        if (usuarioActual instanceof Usuario) {
          usuarioActual.agregarAmigo(answers.idUsuario);
        }
      }
      ManejadorJSON.actualizarUsuariosDB();
      this.principal();
    });
  }

  private static eliminarAmigo() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'idUsuario',
        message: 'Pregúntale el id a tu amigo.\nIngresa el id de tu amigo : '
      }
    ]).then((answers) => {
      let usuario = ColeccionUsuarios.getColeccionUsuarios().getUsuario(answers.idUsuario);
      if(usuario !== undefined) {
        const usuarioActual = ColeccionUsuarios.getColeccionUsuarios().getUsuario(Gestor.idPersona)
        if (usuarioActual instanceof Usuario) {
          usuarioActual.eliminarAmigo(answers.idUsuario);
        }
      }
      ManejadorJSON.actualizarUsuariosDB();
      this.principal();
    });
  }

  private static unirseGrupo() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'idGrupo',
        message: '¿Sabes el id del grupo al que te quieres unir?\nPor favor ingrésalo : '
      }
    ]).then((answers) => {
      let grupoID = ColeccionGrupos.getColeccionGrupos().getGrupo(answers.idGrupo);
      if(grupoID !== undefined) {
        const usuario = ColeccionUsuarios.getColeccionUsuarios().getUsuario(Gestor.idPersona);        
        if (usuario instanceof Usuario) {
          usuario.agregarGrupoAmigo(answers.idGrupo);
        }
      }
      ManejadorJSON.actualizarUsuariosDB();
      ManejadorJSON.actualizarGruposDB();
      this.principal();
    });
  }

  private static crearGrupo() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreGrupo',
        message: '¿Cuál quieres que sea el nombre del grupo? : '
      }
    ]).then((answers) => {
      ColeccionGrupos.getColeccionGrupos().getGrupos().forEach((grupo) => {
        if (grupo.nombre === answers.nombreGrupo) {
          console.log('¡Upss! Ese nombre ya existe')
          this.crearGrupo()
        }
      })
      let grupoNuevo = new Grupo(answers.nombreGrupo, Gestor.idPersona);
      ColeccionGrupos.getColeccionGrupos().agregarGrupo(grupoNuevo);
      const usuario = ColeccionUsuarios.getColeccionUsuarios().getUsuario(Gestor.idPersona);
      if (usuario instanceof Usuario) {
        usuario.agregarGrupoAmigo(answers.idGrupo);
      }
      ManejadorJSON.actualizarUsuariosDB();
      ManejadorJSON.actualizarGruposDB();
      this.principal();
    });
  }

  private static eliminarGrupo() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'idGrupo',
        message: '¿Cuál es la ID del grupo que desea eliminar? : '
      }
    ]).then((answers) => {
      if(Gestor.idPersona === ColeccionGrupos.getColeccionGrupos().getGrupo(answers.idGrupo)?.creador) {
        let vectorUsuarios = ColeccionGrupos.getColeccionGrupos().getGrupo(answers.idGrupo)?.participantes;
        if (vectorUsuarios !== undefined) {
          vectorUsuarios.forEach((usuarioID) => {
            ColeccionUsuarios.getColeccionUsuarios().getUsuario(usuarioID)?.eliminarGrupoAmigo(answers.idGrupo);
          });
        }
        ColeccionGrupos.getColeccionGrupos().eliminarGrupo(Number(answers.idGrupo));
        ManejadorJSON.actualizarUsuariosDB();
        ManejadorJSON.actualizarGruposDB();
        this.principal('Grupo borrado con éxito\n');
      } else {
        this.principal('¡Upss! Esto no tiene buena pinta eh\nSolo el creador puede borrar el grupo\n');
      }
    });
  }


  ////////////////////////////////Si falla puede ser los stirngs, los numbers
  private static crearReto() {
    const nombresRutas = ColeccionRutas.getColeccionRutas().getRutas().map((ruta) => {
      return ruta.id + ' ' + ruta.nombre ;
    });
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreReto',
        message: '¿Qué nombre quieres para el reto? : '
      },
      {
        type: 'checkbox',
        name: 'rutas',
        message: 'Añade las rutas : ',
        choices: nombresRutas
      },
      {
        type: 'list',
        name: 'actividad',
        message: 'Dime el tipo de actividad del reto : ',
        choices: [Actividades.Bicicleta, Actividades.Correr]
      }
    ]).then((answers) => {
      let rutas: Ruta[] = [];
      const arrayRutas = Array(answers.rutas);
      for (let i = 0; i < arrayRutas.length; i++) {
        const ruta = ColeccionRutas.getRuta(Number(answers.rutas[i].split(' ')[0]))
        if(ruta !== undefined) {
          rutas.push(ruta);
        }
      }
      let actividad = String(answers.actividad) as Actividades;
      let reto = new Reto(String(answers.nombreReto), rutas, actividad);
      ColeccionRetos.getColeccionRetos().agregarReto(reto);
      ManejadorJSON.actualizarRetosDB();
      this.principal();
    });
  }


  private static eliminarReto() {
    const nombreReto = ColeccionRetos.getColeccionRetos().getRetos().map((reto) => {
      return reto.id + ' ' + reto.nombre ;
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'rutas',
        message: 'Indica el reto que quieres eliminar : ',
        choices: nombreReto
      }
    ]).then((answers) => {
      ColeccionRetos.getColeccionRetos().eliminarReto(Number(answers.rutas.split(' ')[0]))
      ManejadorJSON.actualizarRetosDB();
      ManejadorJSON.actualizarUsuariosDB();
      this.principal();
    });
  }

  
  private static crearRuta() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'nombreRuta',
        message: '¿Qué nombre quieres para la ruta? : '
      },
      {
        type: 'input',
        name: 'geoInicialX',
        message: 'Dime la coordenada X del inicio : ',
      },
      {
        type: 'input',
        name: 'geoInicialY',
        message: 'Dime la coordenada Y del inicial : ',
      },
      {
        type: 'input',
        name: 'geoFinalX',
        message: 'Dime la coordenada X del final : ',
      },
      {
        type: 'input',
        name: 'geoFinalY',
        message: 'Dime la coordenada Y del final : ',
      },
      {
        type: 'input',
        name: 'distancia',
        message: 'Dime la distancia de la ruta : ',
      },
      {
        type: 'input',
        name: 'desnivel',
        message: 'Dime el desnivel de la ruta : ',
      },
      {
        type: 'list',
        name: 'actividad',
        message: 'Dime el tipo de actividad de la ruta : ',
        choices: [Actividades.Bicicleta, Actividades.Correr]
      }
    ]).then((answers) => {
      let geoInicial = [Number(answers.geoInicialX), Number(answers.geoInicialY)] as Coordenadas;
      let geoFinal = [Number(answers.geoFinalX), Number(answers.geoFinalY)] as Coordenadas;
      let actividad = String(answers.actividad) as Actividades;
      let ruta = new Ruta(String(answers.nombreRuta), geoInicial, geoFinal, Number(answers.distancia), Number(answers.desnivel), actividad);
      ColeccionRutas.getColeccionRutas().agregarRuta(ruta);
      ManejadorJSON.actualizarRutasDB();
      this.principal();
    });
  }

  private static eliminarRuta() {
    const nombresRutas = ColeccionRutas.getColeccionRutas().getRutas().map((ruta) => {
      return ruta.id + ' ' + ruta.nombre ;
    });
    inquirer.prompt([
      {
        type: 'list',
        name: 'rutas',
        message: 'Indica el reto que quieres eliminar : ',
        choices: nombresRutas
      }
    ]).then((answers) => {
      ColeccionRutas.getColeccionRutas().eliminarRuta(Number(answers.rutas.split(' ')[0]));
      ManejadorJSON.actualizarRutasDB();
      this.principal();
    });
  }
  
}
