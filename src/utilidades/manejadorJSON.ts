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


/**
 * Clase que gestiona todas las interacciones con la base de datos
 */
export class ManejadorJSON {

  /**
   * Constructor privado ya que no se emplea ninguna instancia de la clase
   */
  private constructor() {};

  /**
   * Método que lleva la información referente a los usuarios a la base de datos
   */
  static actualizarUsuariosDB() {
    fs.writeFileSync('db/usuarios.json', '');
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    coleccionUsuarios.getUsuarios().forEach((usuarios) => {
      ManejadorJSON.agregarUsuarioDB(usuarios);
    });
  }

  /**
   * Método que agrega un usuario a la base de datos
   * @param usu Usuario que se desea añadir a la base de datos
   */
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

  /**
   * Método que rescata la colección de usuarios de la base de datos
   * @returns Devuelve un array de usuarios
   */
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




  /**
   * Método que lleva la información referente a los grupos a la base de datos
   */
  static actualizarGruposDB() {
    fs.writeFileSync('db/grupos.json', '');
    const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
    coleccionGrupos.getGrupos().forEach((grupo) => {
      grupo.actualizarEstadistica();
      ManejadorJSON.agregarGrupoDB(grupo);
    });
  }

  /**
   * Método que agrega un grupo a la base de datos
   * @param grupo grupo que se desea añadir a la base de datos
   */
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
  

  /**
   * Método que rescata la colección de grupos de la base de datos
   * @returns Devuelve un array de grupos
   */
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

  /**
   * Método que elimina un grupo de la base de datos
   * @param idGrupo ID del grupo que se desea eliminar
   */
  static eliminarGrupoDB(idGrupo: number) {
    const dbGrupo = lowdb(new FileSync('./db/grupos.json'));
    dbGrupo.unset(String(idGrupo)).write()
  }




  /**
   * Método que lleva la información referente a las rutas a la base de datos
   */
  static actualizarRetosDB() {
    fs.writeFileSync('db/retos.json', '');
    const coleccionRetos = ColeccionRetos.getColeccionRetos();
    coleccionRetos.getRetos().forEach((retos) => {
      ManejadorJSON.agregarRetoDB(retos);
    });
  }

  /**
   * Método que agrega un reto a la base de datos
   * @param reto Reto que se desea añadir a la base de datos
   */
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
  

  /**
   * Método que rescata la colección de retos de la base de datos
   * @returns Devuelve un array de retos
   */  
  static extraccionRetosDB(): Reto[] {
    const dbRetos = lowdb(new FileSync('./db/retos.json'));
    let retos: Reto[] = [];
    const retosDB = dbRetos.toJSON();
    for (const id in retosDB) {
      let rutas: Ruta[] = [];
      for (let i = 0; i < retosDB[id]._rutas.length; i++) {
        const variable = ColeccionRutas.getColeccionRutas().getRuta(retosDB[id]._rutas[i]);
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

  /**
   * Método que elimina un reto de la base de datos
   * @param idReto ID del reto que se desea eliminar
   */
  static eliminarRetoDB(idReto: number) {
    const dbRetos = lowdb(new FileSync('./db/retos.json'));
    dbRetos.unset(String(idReto)).write()
  }




  /**
   * Método que lleva la información referente a las rutas a la base de datos
   */
  static actualizarRutasDB() {
    fs.writeFileSync('db/rutas.json', '');
    const coleccionRutas = ColeccionRutas.getColeccionRutas();
    coleccionRutas.getRutas().forEach((rutas) => {
      ManejadorJSON.agregarRutaDB(rutas);
    });
  }

  /**
   * Método que agrega una ruta a la base de datos
   * @param ruta Ruta que se desea añadir a la base de datos
   */
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
  

  /**
   * Método que rescata la colección de rutas de la base de datos
   * @returns Devuelve un array de rutas
   */
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

  /**
   * Método que elimina una ruta de la base de datos
   * @param idRuta ID de la ruta que se desea eliminar
   */
  static eliminarRutaDB(idRuta: number) {
    const dbRutas = lowdb(new FileSync('./db/rutas.json'));
    dbRutas.unset(String(idRuta)).write()
  }

}
