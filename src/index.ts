// import * as lowdb from "lowdb";
// import * as FileSync from "lowdb/adapters/FileSync";
// import * as inquirer from 'inquirer';
import { Usuario } from "./entidades/usuario";
// import { Grupo } from "./entidades/grupo";
import { Actividades } from "./enumerados/enumerados";
// import { ColeccionUsuarios } from "./colecciones/coleccionUsuarios";

// // Parte index ////////////////////////////////////

// let juan = new Usuario('Juan', [Actividades.Correr], []);
// let maria = new Usuario('Maria', [Actividades.Bicicleta], []);
// // let pepe = new Usuario('Pepe', [Actividades.Bicicleta], []);


// const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
// coleccionUsuarios.agregarUsuario(juan);
// coleccionUsuarios.agregarUsuario(maria);
// coleccionUsuarios.agregarUsuario(pepe);

/**
 * 1. se crea un juan a base de preguntas al usuario
 * 2. se hace un append a coleccionUsuarios
 * 3. se actualiza base de datos Usuario
 *
 *
 * USUARIO RUTA
 * 1. Existe una ruta r1 (debe existir en coleccionRutas)
 * 2. usuario debe actualizar su historico de rutas (agregarRuta)
 * 3. INTERNAMENTE ruta añade al usuario en agregarRuta
 * 4. Actualizar base de datos de usuarios
 * 5. Actualizar base de datos de rutas
 *
 * USUARIO RETO
 * 1. Existe un reto re1 (debe existir en coleccionRetos)
 * 2. usuario debe añadir a retosActivos
 * 3. reto debe añadir a usuario a sus ususarios
 * 4. Actualziar base de datos ususarios
 * 5. Actualziar base de datos retos
 *
 *
 * USUARIO GRUPO CREARLO
 * 1. crea un grupo
 * 2. se añade el grupo a la coleccion de grupo
 * 3. se actualzia la base de datos de grupo
 * OJO Si
 */

import { ManejadorJSON } from "./utilidades/manejadorJSON";
import { ColeccionUsuarios } from "./colecciones/coleccionUsuarios";
import { Ruta } from "./entidades/ruta";
import { Reto } from "./entidades/reto";
import { ColeccionGrupos } from "./colecciones/coleccionGrupos";
import { Grupo } from "./entidades/grupo";
import { ColeccionRutas } from "./colecciones/coleccionRutas";
import { ColeccionRetos } from "./colecciones/coleccionRetos";

//fs.writeFileSync('db/rutas.json', '');

const coleccionRutas = ColeccionRutas.getColeccionRutas();
const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
const coleccionRetos = ColeccionRetos.getColeccionRetos();

// let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
// let ruta2 = new Ruta('ruta2', [4,8], [30,4], 4, 7, Actividades.Bicicleta);
// let ruta3 = new Ruta('ruta3', [1,6], [3,4], 4, 3, Actividades.Bicicleta);
// coleccionRutas.agregarRuta(ruta1);
// coleccionRutas.agregarRuta(ruta2);
// coleccionRutas.agregarRuta(ruta3);


// let juan = new Usuario('Juan', [Actividades.Correr]);
// let maria = new Usuario('maria', [Actividades.Bicicleta]);
// let pepe = new Usuario('pepe', [Actividades.Bicicleta]);
// let roberto = new Usuario('roberto', [Actividades.Bicicleta]);
// coleccionUsuarios.agregarUsuario(juan);
// coleccionUsuarios.agregarUsuario(maria);
// coleccionUsuarios.agregarUsuario(pepe);
// coleccionUsuarios.agregarUsuario(roberto);

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
// grupo1.agregarUsuario(pepe.id);
// grupo2.agregarUsuario(roberto.id);


// juan.agregarRuta(ruta1);
// maria.agregarRuta(ruta2);

// coleccionUsuarios.agregarUsuario(juan);
// // coleccionUsuarios.eliminarUsuario(juan);
// coleccionUsuarios.agregarUsuario(maria);
// coleccionUsuarios.imprimirInformacion();
// coleccionUsuarios.eliminarUsuario(juan);
// coleccionUsuarios.eliminarUsuario(maria);
// console.log(coleccionUsuarios.getUsuario(1000))

// console.log('usuarios########################')
//  coleccionUsuarios.imprimirInformacion();
// console.log('grupos########################')
// coleccionGrupos.imprimirInformacion();
// console.log('rutas########################')
// coleccionRutas.imprimirInformacion();
// console.log('retos########################')
// coleccionRetos.imprimirInformacion();

// ManejadorJSON.actualizarUsuariosDB();
// ManejadorJSON.actualizarGruposDB();
// ManejadorJSON.actualizarRutasDB();
// ManejadorJSON.actualizarRetosDB();

// console.log(coleccionUsuarios.getUsuario(1002)?.rutasFavoritas());