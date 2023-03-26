import { ManejadorJSON } from "./utilidades/manejadorJSON";
import { ColeccionUsuarios } from "./colecciones/coleccionUsuarios";
import { ColeccionGrupos } from "./colecciones/coleccionGrupos";
import { ColeccionRutas } from "./colecciones/coleccionRutas";
import { ColeccionRetos } from "./colecciones/coleccionRetos";
import { Gestor } from "./utilidades/gestor";
import { Ruta } from "./entidades/ruta";
import { Actividades } from "./enumerados/enumerados";
import { Usuario } from "./entidades/usuario";
import { Grupo } from "./entidades/grupo";
import { Reto } from "./entidades/reto";

const coleccionRutas = ColeccionRutas.getColeccionRutas();
const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
const coleccionRetos = ColeccionRetos.getColeccionRetos();

// let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
// let ruta2 = new Ruta('ruta2', [4,8], [30,4], 4, 7, Actividades.Bicicleta);
// let ruta3 = new Ruta('ruta3', [1,6], [3,4], 43, 3, Actividades.Bicicleta);
// let ruta4 = new Ruta('ruta4', [1,2], [3,4], 40, 50, Actividades.Correr);
// let ruta5 = new Ruta('ruta5', [1,2], [3,4], 1, 51, Actividades.Correr);
// let ruta6 = new Ruta('ruta6', [1,2], [3,4], 11, 31, Actividades.Correr);
// coleccionRutas.agregarRuta(ruta1);
// coleccionRutas.agregarRuta(ruta2);
// coleccionRutas.agregarRuta(ruta3);
// coleccionRutas.agregarRuta(ruta4);
// coleccionRutas.agregarRuta(ruta5);
// coleccionRutas.agregarRuta(ruta6);


// let juan = new Usuario('Juan', [Actividades.Correr]);
// let maria = new Usuario('maria', [Actividades.Bicicleta]);
// let pepe = new Usuario('pepe', [Actividades.Bicicleta]);
// let roberto = new Usuario('roberto', [Actividades.Bicicleta]);
// let manuel = new Usuario('manuel', [Actividades.Bicicleta]);
// let alberto = new Usuario('alberto', [Actividades.Bicicleta]);
// let alfonso = new Usuario('alfonso', [Actividades.Bicicleta]);
// let alvaro = new Usuario('alvaro', [Actividades.Bicicleta]);

// coleccionUsuarios.agregarUsuario(juan);
// coleccionUsuarios.agregarUsuario(maria);
// coleccionUsuarios.agregarUsuario(pepe);
// coleccionUsuarios.agregarUsuario(roberto);
// coleccionUsuarios.agregarUsuario(manuel);
// coleccionUsuarios.agregarUsuario(alberto);
// coleccionUsuarios.agregarUsuario(alfonso);
// coleccionUsuarios.agregarUsuario(alvaro);

// let reto1 = new Reto("reto1", [ruta1, ruta3], Actividades.Bicicleta)
// let reto2 = new Reto("reto2", [ruta2], Actividades.Correr)
// coleccionRetos.agregarReto(reto1);
// coleccionRetos.agregarReto(reto2);

// reto1.agregarUsuario(juan.id);
// reto2.agregarUsuario(maria.id);
// reto2.agregarUsuario(pepe.id);


// let grupo1 = new Grupo('grupo1', juan.id);
// let grupo2 = new Grupo('grupo2', maria.id);
// coleccionGrupos.agregarGrupo(grupo1);
// coleccionGrupos.agregarGrupo(grupo2)

// /////////grupo1.agregarUsuario(maria.id);
// grupo2.agregarUsuario(roberto.id);
// grupo2.agregarUsuario(manuel.id);
// grupo2.agregarUsuario(alberto.id);

// /////////grupo1.agregarUsuario(juan.id);
// grupo1.agregarUsuario(alfonso.id);
// grupo1.agregarUsuario(pepe.id);
// grupo1.agregarUsuario(alvaro.id);


// juan.agregarRuta(ruta1);
// juan.agregarRuta(ruta2);
// maria.agregarRuta(ruta2);
// maria.agregarRuta(ruta3);
// pepe.agregarRuta(ruta3);
// pepe.agregarRuta(ruta4);
// alvaro.agregarRuta(ruta2);

// roberto.agregarRuta(ruta4);
// manuel.agregarRuta(ruta5);
// manuel.agregarRuta(ruta6);
// alberto.agregarRuta(ruta6);
// alfonso.agregarRuta(ruta1);
// alfonso.agregarRuta(ruta2);


// console.log('usuarios########################')
//  coleccionUsuarios.imprimirInformacion();
// console.log('grupos########################')
// coleccionGrupos.imprimirInformacion();
// console.log('rutas########################')
// coleccionRutas.imprimirInformacion();
// console.log('retos########################')
// coleccionRetos.imprimirInformacion();


// // console.log(coleccionUsuarios.getUsuario(1002)?.rutasFavoritas());

// coleccionGrupos.getGrupos().forEach(grupo => { 
  //   console.log(grupo.nombre)
  //   console.log(grupo.clasificacionUsuarios());
  // });
  
  
// Gestor.registrarEnSistema();
// Gestor.mostrarUsuarios();

// ManejadorJSON.actualizarUsuariosDB();
// ManejadorJSON.actualizarGruposDB();
// ManejadorJSON.actualizarRutasDB();
// ManejadorJSON.actualizarRetosDB();

// 

Gestor.inicio();