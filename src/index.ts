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



let juan = new Usuario('Juan', [Actividades.Correr], [1,2,3]);
let maria = new Usuario('maria', [Actividades.Bicicleta], []);
const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
let ruta2 = new Ruta('ruta2', [1,2], [3,4], 4, 5, Actividades.Bicicleta);
// juan.agregarRuta(ruta1);
// coleccionUsuarios.agregarUsuario(juan);
coleccionUsuarios.eliminarUsuario(juan);
coleccionUsuarios.agregarUsuario(maria);
coleccionUsuarios.imprimirInformacion();
// coleccionUsuarios.eliminarUsuario(juan);
// coleccionUsuarios.eliminarUsuario(maria);
// console.log(coleccionUsuarios.getUsuario(1000))

// ManejadorJSON.extraccionUsuariosDB();
ManejadorJSON.ActualizarDB();