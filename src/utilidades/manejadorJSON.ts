import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";
import { ColeccionRutas } from "../colecciones/coleccionRutas";
import { ColeccionRetos } from "../colecciones/coleccionRetos";
import { Usuario } from "../entidades/usuario";
import { Grupo } from "../entidades/grupo";
import { Reto } from "../entidades/reto";
import { Ruta } from "../entidades/ruta";
import { UsuarioDB, GrupoDB, RetoDB, RutaDB } from "../tipos/tipos";
import { interfazUsuarioDB, interfazGrupoDB, interfazRetoDB, interfazRutaDB } from "../interfaces/interfaces";
import { Actividades } from "../enumerados/enumerados";
import * as fs from 'fs';



export class ManejadorJSON {
  private constructor() {};

  // agregar a la bd usus, retos, rutas y grupos
  // boolean ¿existe usus, retos, rutas y grupos?
  
  /////////// USUARIOS ///////////
  
  // Pilla la coleccion de usuarios y la guarda en la bd
  static actualizarUsuariosDB() {
    fs.writeFileSync('db/usuarios.json', '');
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    coleccionUsuarios.getUsuarios().forEach((usuarios) => {
      ManejadorJSON.agregarUsuarioDB(usuarios);
    });
  }

  // Agrega un usuario a la bd
  static agregarUsuarioDB(usu: Usuario): void {
    const arrayFecha: string[] = [];
    const arrayRuta: number[][] = [];

    for(let [key, value] of usu.historicoRutas) {
      arrayFecha.push(key);
      arrayRuta.push(value);
    }

    const usuario: UsuarioDB = {
      _nombre: usu.nombre,
      _retosActivos: usu.retosActivos === undefined ? [] : usu.retosActivos,
      _id: usu.id,
      _actividades: Array.from(usu.actividades),
      _historicoFechas: arrayFecha,
      _historicoRutas: arrayRuta,
      _estadistica: usu.estadistica,
      _amigos: usu.amigos === undefined ? [] : usu.amigos,
      _gruposAmigos: usu.gruposAmigos === undefined ? [] : usu.gruposAmigos
    };
    
    const dbUsuario = lowdb(new FileSync<interfazUsuarioDB>('./db/usuarios.json'));
    dbUsuario.set(usuario._id, usuario).write();
  }

  // Pilla la bd y la guarda en la coleccion de usuarios
  static extraccionUsuariosDB(): Usuario[] {
    const dbUsuario = lowdb(new FileSync('./db/usuarios.json'));
    let usuarios: Usuario[] = [];
    const usuariosDB = dbUsuario.toJSON();

    for (const id in usuariosDB) {
      let usu = new Usuario(usuariosDB[id]._nombre, []);
      usu.ContructorDBUsuario(usuariosDB[id]._actividades, usuariosDB[id]._historicoFechas, usuariosDB[id]._historicoRutas, usuariosDB[id]._estadistica, usuariosDB[id]._amigos, usuariosDB[id]._gruposAmigos, usuariosDB[id]._retosActivos)
      usuarios.push(usu);
    }
    return usuarios;
  }

  /////////// GRUPOS ///////////

  // Pilla la coleccion de grupos y la guarda en la bd
  static actualizarGruposDB() {
    fs.writeFileSync('db/grupos.json', '');
    const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
    coleccionGrupos.getGrupos().forEach((grupo) => {
      grupo.actualizarEstadistica();
      ManejadorJSON.agregarGrupoDB(grupo);
    });
  }

  // Agrega un grupo a la bd
  static agregarGrupoDB(grupo: Grupo): void {
    const array1: string[] = [];
    const array2: number[][] = [];

    for(let [key, value] of grupo.historicoRutas) {
      array1.push(key);
      array2.push(value);
    }

    const grupoDB: GrupoDB = {
      _id: grupo.id,
      _creador: grupo.creador,
      _nombre: grupo.nombre,
      _participantes: grupo.participantes,
      _estadistica: grupo.estadistica,
      _clasificacion: grupo.clasificacion,
      _historicoFechas: array1,
      _historicoRutas: array2
    };
    
    const dbGrupos = lowdb(new FileSync<interfazGrupoDB>('./db/grupos.json'));
    dbGrupos.set(grupoDB._id, grupoDB).write();
  }
  

  // Pilla la bd y la guarda en la coleccion de grupos
  static extraccionGruposDB(): Grupo[] {
    const dbGrupo = lowdb(new FileSync('./db/grupos.json'));
    let grupos: Grupo[] = [];
    const gruposDB = dbGrupo.toJSON();

    for (const id in gruposDB) {
      let grupo = new Grupo(gruposDB[id]._nombre, gruposDB[id]._creador);
      grupo.ContructorDBGrupo(gruposDB[id]._participantes, gruposDB[id]._estadistica, gruposDB[id]._clasificacion, gruposDB[id]._historicoFechas, gruposDB[id]._historicoRutas)
      grupos.push(grupo);
    }
    return grupos;
  }


  /////////// RETOS ///////////

  // Pilla la coleccion de retos y la guarda en la bd
  static actualizarRetosDB() {
    fs.writeFileSync('db/retos.json', '');
    const coleccionRetos = ColeccionRetos.getColeccionRetos();
    coleccionRetos.getRetos().forEach((retos) => {
      ManejadorJSON.agregarRetoDB(retos);
    });
  }

  // Agrega un reto a la bd
  static agregarRetoDB(reto: Reto): void {
    let rutasID: number[] = []
    reto.rutas.forEach((ruta) => {
      rutasID.push(ruta.id)
    })
    const retoDB: RetoDB = {
      _id: reto.id,
      _nombre: reto.nombre,
      _rutas : rutasID,
      _tipoActividad: reto.tipoActividad,
      _distanciaTotal: reto.distanciaTotal,
      _usuarios: reto.usuarios
    };
    
    const dbretos = lowdb(new FileSync<interfazRetoDB>('./db/retos.json'));
    dbretos.set(retoDB._id, retoDB).write();
  }
  

  // Pilla la bd y la guarda en la coleccion de retos
  static extraccionRetosDB(): Reto[] {
    const dbRetos = lowdb(new FileSync('./db/retos.json'));
    let retos: Reto[] = [];
    const retosDB = dbRetos.toJSON();
    for (const id in retosDB) {
      let rutas: Ruta[] = [];
      for (let i = 0; i < retosDB[id]._rutas.length; i++) {
        const variable = ColeccionRutas.getRuta(retosDB[id]._rutas[i]);
        if (variable instanceof Ruta) {
          rutas.push(variable);
        }
        
      }
      let reto = new Reto(retosDB[id]._nombre, rutas, retosDB[id]._tipoActividad as Actividades);
      reto.ConstructorDBReto(retosDB[id]._distanciaTotal, retosDB[id]._usuarios)
      retos.push(reto);
    }
    return retos;
  }


  /////////// RUTAS ///////////

  // Pilla la coleccion de rutas y la guarda en la bd
  static actualizarRutasDB() {
    fs.writeFileSync('db/rutas.json', '');
    const coleccionRutas = ColeccionRutas.getColeccionRutas();
    coleccionRutas.getRutas().forEach((rutas) => {
      ManejadorJSON.agregarRutaDB(rutas);
    });
  }

  // Agrega una ruta a la bd
  static agregarRutaDB(ruta: Ruta): void {
    const rutaDB: RutaDB = {
      _id: ruta.id,
      _nombre: ruta.nombre,
      _geolocalizacionInicial: ruta.geolocalizacionInicial,
      _geolocalizacionFinal: ruta.geolocalizacionFinal,
      _distancia: ruta.distancia,
      _desnivel: ruta.desnivel,
      _usuarios: ruta.usuarios,
      _tipoActividad: ruta.tipoActividad,
      _calificacion: ruta.calificacion,
      _calificacionMedia: ruta.calificacionMedia
    };
    
    const dbRutas = lowdb(new FileSync<interfazRutaDB>('./db/rutas.json'));
    dbRutas.set(rutaDB._id, rutaDB).write();
  }
  
  // Pilla la bd y la guarda en la coleccion de rutas
  static extraccionRutasDB(): Ruta[] {
    const dbRutas = lowdb(new FileSync('./db/rutas.json'));
    let rutas: Ruta[] = [];

    const rutasDB = dbRutas.toJSON();    
    for (const id in rutasDB) {
      let ruta = new Ruta(rutasDB[id]._nombre, rutasDB[id]._geolocalizacionInicial, rutasDB[id]._geolocalizacionFinal, 
        rutasDB[id]._distancia, rutasDB[id]._desnivel, rutasDB[id]._tipoActividad);
      ruta.ConstructorDBRuta(rutasDB[id]._usuarios, rutasDB[id]._calificacion, rutasDB[id]._calificacionMedia);
      rutas.push(ruta);
    }
    return rutas;
  }

}
