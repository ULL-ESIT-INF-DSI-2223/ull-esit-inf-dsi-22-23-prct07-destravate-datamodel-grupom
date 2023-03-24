import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { Usuario } from "../entidades/usuario";
import { Actividades } from "../enumerados/enumerados";
import { EstadisticaUsuario } from "../tipos/tipos";


export class ManejadorJSON {
  // private static ;
  // private static dbGrupo = lowdb(new FileSync('./db/grupos.json'));
  // private static dbRutas = lowdb(new FileSync('./db/rutas.json'));
  // private static dbRetos = lowdb(new FileSync('./db/retos.json'));


  private constructor() {};

  // agregar a la bd usus, retos, rutas y grupos
  static agregarUsuarioDB(usu: Usuario): void {
    const dbUsuario = lowdb(new FileSync('./db/usuarios.json'));
    dbUsuario.set('usuarios', usu).write();
  }


  // static eliminarUsuarioDB(usu: Usuario): void {
  //   ManejadorJSON.dbUsuario.unset(u).write()
  // }

  static extraccionUsuariosDB(): Usuario[] {
    const dbUsuario = lowdb(new FileSync('./db/usuarios.json'))
    let usuarios: Usuario[] = [];
    console.log(dbUsuario.get('usuarios').value())
    
    return usuarios;
  }


  // eliminar a la bd usus, retos, rutas y grupos
  // boolean ¿existe usus, retos, rutas y grupos?

}

///////////////////////////////////////////////////
// Crea una instancia de la base de datos
// const adapter = new FileSync('./db/usuarios.json');
// const db = lowdb(adapter);


// coleccionUsuarios.getUsuarios().forEach((usuario) => {
//   db.set(usuario.nombre, usuario).write()
// });


// db.set(pepe.nombre, pepe).write()


//   Recupera los datos de la base de datos
// const usu = db.get('Juan');

// console.log(usu.value());
// usu.remove({ 'id': 1 }).write();


// db.unset('Pepe').write();