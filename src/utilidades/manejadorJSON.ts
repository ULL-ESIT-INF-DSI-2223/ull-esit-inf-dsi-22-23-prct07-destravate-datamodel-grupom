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
  
  static ActualizarUsuariosDB() {
    fs.writeFileSync('db/usuarios.json', '');
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    coleccionUsuarios.getUsuarios().forEach((usuarios) => {
      ManejadorJSON.agregarUsuarioDB(usuarios);
    });
  }

  static agregarUsuarioDB(usu: Usuario): void {
    const array1: string[] = [];
    const array2: number[][] = [];

    for(let [key, value] of usu.historicoRutas) {
      array1.push(key);
      array2.push(value);
    }

    const usuario: UsuarioDB = {
      _nombre: usu.nombre,
      _retosActivos: usu.retosActivos === undefined ? [] : usu.retosActivos,
      _id: usu.id,
      _actividades: Array.from(usu.actividades),
      _historicoFechas: array1,
      _historicoRutas: array2,
      _estadistica: usu.estadistica,
      _amigos: usu.amigos === undefined ? [] : usu.amigos,
      _gruposAmigos: usu.gruposAmigos === undefined ? [] : usu.gruposAmigos
    };
    
    const dbUsuario = lowdb(new FileSync<interfazUsuarioDB>('./db/usuarios.json'));
    dbUsuario.set(usuario._id, usuario).write();
  }

  static extraccionUsuariosDB(): Usuario[] {
    const dbUsuario = lowdb(new FileSync('./db/usuarios.json'));
    let usuarios: Usuario[] = [];
    const usuariosDB = dbUsuario.toJSON();

    for (const id in usuariosDB) {
      let usu = new Usuario(usuariosDB[id]._nombre, [], usuariosDB[id]._retosActivos);
      usu.ContructorDB(usuariosDB[id]._actividades, usuariosDB[id]._historicoRutas, usuariosDB[id]._historicoFechas, usuariosDB[id]._estadistica, usuariosDB[id]._amigos, usuariosDB[id]._gruposAmigos)
      usuarios.push(usu);
    }
    return usuarios;
  }

  /////////// GRUPOS ///////////

  static ActualizarGruposDB() {
    fs.writeFileSync('db/grupos.json', '');
    const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
    coleccionGrupos.getGrupos().forEach((grupos) => {
      ManejadorJSON.agregarGrupoDB(grupos);
    });
  }

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
  

  static extraccionGruposDB(): Grupo[] {
    const dbGrupo = lowdb(new FileSync('./db/grupos.json'));
    let grupos: Grupo[] = [];
    const gruposDB = dbGrupo.toJSON();

    for (const id in gruposDB) {
      let grupo = new Grupo(gruposDB[id]._nombre, gruposDB[id]._creador);
      grupo.ContructorDB(gruposDB[id]._participantes, gruposDB[id]._estadistica, gruposDB[id]._clasificacion, gruposDB[id]._historicoFechas, gruposDB[id]._historicoRutas)
      grupos.push(grupo);
    }
    return grupos;
  }

  /////////// RETOS ///////////

  static ActualizarRetosDB() {
    fs.writeFileSync('db/retos.json', '');
    const coleccionRetos = ColeccionRetos.getColeccionRetos();
    coleccionRetos.getRetos().forEach((retos) => {
      ManejadorJSON.agregarRetoDB(retos);
    });
  }

  static agregarRetoDB(reto: Reto): void {
    let rutasID: number[] = []
    reto.rutas.forEach((ruta) => {
      rutasID.push(reto.id)
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
  

  // static extraccionRetosDB(): Reto[] {
    // const dbRetos = lowdb(new FileSync('./db/retos.json'));
    // let retoss: Reto[] = [];
    // const retosDB = dbRetos.toJSON();

    // for (const id in retosDB) {
    //   let rutas: Ruta[] = []
    //   let nuevoArray: Ruta[] = ColeccionRutas.getRuta(retosDB[id]._rutas[0]);
    //   for (let i = 1; i < retosDB[i]._rutas.length; i++) {
    //     const nuevoElemento = ColeccionRutas.getRuta(retosDB[id]._rutas[i]);
    //     nuevoArray = [...rutas, nuevoElemento];
    //   } 
    //   let reto = new Reto(retosDB[id]._nombre, nuevoArray, retosDB[id]._tipoActividad as Actividades);
    //   reto.ContructorDB(retossDB[id]._participantes, retossDB[id]._estadistica, retossDB[id]._clasificacion, retossDB[id]._historicoFechas, retossDB[id]._historicoRutas)
    //   retoss.push(reto);
    // }
    // return retos;
  // }
  /////////// RUTAS ///////////

  static ActualizarRutasDB() {
    fs.writeFileSync('db/rutas.json', '');
    const coleccionRutas = ColeccionRutas.getColeccionRutas();
    coleccionRutas.getRutas().forEach((rutas) => {
      ManejadorJSON.agregarRutaDB(rutas);
    });
  }

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
      _calificacionMedia: ruta.calificacionMedia
    };
    
    const dbRutas = lowdb(new FileSync<interfazRutaDB>('./db/rutas.json'));
    dbRutas.set(rutaDB._id, rutaDB).write();
  }
  

  static extraccionRutasDB(): Ruta[] {
    const dbRutas = lowdb(new FileSync('./db/rutas.json'));
    let rutas: Ruta[] = [];
    const rutasDB = dbRutas.toJSON();    
    for (const id in rutasDB) {
      let ruta = new Ruta(rutasDB[id]._nombre, rutasDB[id]._geolocalizacionInicial, rutasDB[id]._geolocalizacionFinal, 
        rutasDB[id]._distancia, rutasDB[id]._desnivel, rutasDB[id]._tipoActividad);
      ruta.ContructorDB(rutasDB[id].calificacion, rutasDB[id].calificacionMedia);
      rutas.push(ruta);
    }
    return rutas;
  }

}
