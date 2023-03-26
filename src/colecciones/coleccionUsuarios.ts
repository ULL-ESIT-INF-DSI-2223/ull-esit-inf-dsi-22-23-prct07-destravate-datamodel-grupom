import { EstadisticaUsuario } from '../tipos/tipos';
import { Usuario } from '../entidades/usuario';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';


/**
 * Clase que representa una colección de usuarios
 */
export class ColeccionUsuarios {

  /**
   * Colección de usuarios
   */
  private usuarios: Usuario[];

  /**
   * Instancia de la clase ColeccionUsuarios (Única ya que se emplea el patrón Singleton)
   */
  private static coleccionUsuarios: ColeccionUsuarios;
  
  /**
   * Constructor privado ya que se emplea el patrón Singleton
   * @param usuariosDB Lista de usuarios que se encuentran en la base de datos
   */
  private constructor(usuariosDB: Usuario[]) {
    this.usuarios = usuariosDB;
  }

  /**
   * Método que devuelve la instancia de la clase ColeccionUsuarios
   * @returns Instancia de la clase ColeccionUsuarios
   */
  public static getColeccionUsuarios(): ColeccionUsuarios{
    if (!ColeccionUsuarios.coleccionUsuarios) {
      ColeccionUsuarios.coleccionUsuarios = new ColeccionUsuarios(ManejadorJSON.extraccionUsuariosDB());
    }
    return ColeccionUsuarios.coleccionUsuarios;
  }

  /**
   * Método que devuelve el número de usuarios que se encuentran en la colección
   * @returns Número de usuarios que se encuentran en la colección
   */
  getNumeroUsuarios(): number {
    return ColeccionUsuarios.coleccionUsuarios.usuarios.length;
  }

  /**
   * Método que devuelve la colección de usuarios
   * @returns Colección de usuarios
   */
  getUsuarios(): Usuario[] {
    return ColeccionUsuarios.coleccionUsuarios.usuarios;
  }

  /**
   * Método que devuelve el usuario con el identificador id o undefined si no existe
   * @param id identificador del usuario
   * @returns Usuario con el identificador id o undefined si no existe
   */
  getUsuario(id: number): Usuario | undefined {
    for(let i = 0; i < ColeccionUsuarios.coleccionUsuarios.usuarios.length; i++) {
      if (ColeccionUsuarios.coleccionUsuarios.usuarios[i].id == id) {
        return ColeccionUsuarios.coleccionUsuarios.usuarios[i];
      }
    }
    return undefined;
  }

  /**
   * Método que devuelve la estadística del usuario con el identificador id en caso de no encontrarlo devuelve una estadística vacía
   * @param id identificador del usuario
   * @returns Estadística del usuario con el identificador id en caso de no encontrarlo devuelve una estadística vacía
   */
  getEstadistica(id: number): EstadisticaUsuario {
    for(let i = 0; i < ColeccionUsuarios.coleccionUsuarios.usuarios.length; i++) {
      if (ColeccionUsuarios.coleccionUsuarios.usuarios[i].id == id) {
        return ColeccionUsuarios.coleccionUsuarios.usuarios[i].estadistica;
      }
    }
    return [[0, 0], [0,0], [0,0]];
  }

  /**
   * Método que añade un usuario a la colección
   * @param usuario Usuario que se desea agregar a la colección
   */
  agregarUsuario(usuario: Usuario): void {
    ColeccionUsuarios.coleccionUsuarios.usuarios.push(usuario);
  }
  
  /**
   * Método que elimina un usuario de la colección
   * @param usuario usuario que se desea eliminar
   * @returns el usuario que se eliminó o undefined si no se encontró
   */
  eliminarUsuario(usuario: Usuario): Usuario | undefined {
    let tamanoOriginal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    ColeccionUsuarios.coleccionUsuarios.usuarios = ColeccionUsuarios.coleccionUsuarios.usuarios.filter((u) => u !== usuario);
    let tamanoFinal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    return usuario;
  }

  /**
   * Método que imprime la información de los usuarios de la colección
   */
  imprimirInformacion(): void {
    ColeccionUsuarios.coleccionUsuarios.usuarios.forEach(element => {
      console.log(element);
    });
  }

  /**
   * Método que ordena la colección de usuarios alfábeticamente
   * @param opcion manera de ordenar
   */
  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  /**
   * Metodo que ordena la colección de usuarios por id
   * @param opcion manera de ordenar
   */
  ordenarId(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  /**
   * Método que ordena la colección de usuarios por distancia recorrida en la semana
   * @param opcion manera de ordenar
   */
  ordenarDistanciaSemana(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[0][0] - b.estadistica[0][0]);
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  /**
   * Método que ordena la colección de usuarios por distancia recorrida en el mes
   * @param opcion manera de ordenar
   */
  ordenarDistanciaMes(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[1][0] - b.estadistica[1][0]);
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  /**
   * Método que ordena la colección de usuarios por distancia recorrida en el año
   * @param opcion manera de ordenar
   */
  ordenarDistanciaAnio(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[2][0] - b.estadistica[2][0]);
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  /**
   * Método que devuelve los tres usuarios con más rutas que son amigos del usuario con el identificador id
   * @param id identificador del usuario
   * @returns los tres usuarios con más rutas que son amigos del usuario con el identificador id
   */
  ordenarNumeroRutas(id: number): [Usuario, Usuario, Usuario] {
    let coleccion = ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.historicoRutas.size - b.historicoRutas.size);
    coleccion = coleccion.filter((user) => user.esGrupoAmigo(id));
    return [coleccion[0], coleccion[1], coleccion[2]];
  }
}

