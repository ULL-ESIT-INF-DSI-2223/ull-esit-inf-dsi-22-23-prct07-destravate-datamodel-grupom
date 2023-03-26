import { Reto } from '../entidades/reto';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';
import { ColeccionUsuarios } from './coleccionUsuarios';


/**
 * Clase que representa una colección de retos
 */
export class ColeccionRetos {

  /**
   * Colección de retos
   */
  private retos: Reto[];

  /**
   * Instancia de la clase ColeccionRetos (Única ya que se emplea el patrón Singleton)
   */
  private static coleccionRetos: ColeccionRetos;
  
  /**
   * Constructor privado ya que se emplea el patrón Singleton
   * @param retosDB Lista de retos que se encuentran en la base de datos
   */
  private constructor(retosDB: Reto[]) {
    this.retos = retosDB;
  }

  /**
   * Método que devuelve la instancia de la clase ColeccionRetos
   * @returns Instancia de la clase ColeccionRetos
   */
  public static getColeccionRetos(): ColeccionRetos {
    if (!ColeccionRetos.coleccionRetos) {
      ColeccionRetos.coleccionRetos = new ColeccionRetos(ManejadorJSON.extraccionRetosDB());
    }
    return ColeccionRetos.coleccionRetos;
  }

  /**
   * Método que devuelve el número de retos que se encuentran en la colección
   * @returns Número de retos que se encuentran en la colección
   */
  getNumeroRetos(): number {
    return ColeccionRetos.coleccionRetos.retos.length;
  }

  /**
   * Método que devuelve la colección de retos
   * @returns colección de retos
   */
  getRetos(): Reto[] {
    return ColeccionRetos.coleccionRetos.retos;
  }

  /**
   * Método que devuelve el reto con el identificador id o undefined si no existe
   * @param id identificador del reto
   * @returns reto con el identificador id o undefined si no existe
   */
  getReto(id: number): Reto | undefined {
    for(let i = 0; i < ColeccionRetos.coleccionRetos.retos.length; i++) {
      if (ColeccionRetos.coleccionRetos.retos[i].id == id) {
        return ColeccionRetos.coleccionRetos.retos[i];
      }
    }
    return undefined;
  }

  /**
   * Método que agrega un reto a la colección
   * @param Reto Reto que se desea agregar a la colección
   */
  agregarReto(Reto: Reto): void {
    ColeccionRetos.coleccionRetos.retos.push(Reto);
  }
  
  /**
   * Método que elimina un reto de la colección
   * @param retoID identificador del reto que se desea eliminar
   * @returns el identificador del reto eliminado o undefined si no se ha podido eliminar
   */
  eliminarReto(retoID: number): number | undefined {
    const usuariosReto = ColeccionRetos.getColeccionRetos().getReto(retoID)?.usuarios;
    let tamanoOriginal = ColeccionRetos.coleccionRetos.getNumeroRetos();
    ColeccionRetos.getColeccionRetos().retos = ColeccionRetos.getColeccionRetos().getRetos().filter((u) => u.id !== retoID);
    let tamanoFinal = ColeccionRetos.coleccionRetos.getNumeroRetos();
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    if(usuariosReto !== undefined) {
      for (let i = 0; i < usuariosReto.length; i++) {
        ColeccionUsuarios.getColeccionUsuarios().getUsuario(usuariosReto[i])?.eliminarReto(retoID)
      }
    }
    ManejadorJSON.eliminarRetoDB(retoID);
    return retoID;
  }

  /**
   * Método que imprime la información de los retos que se encuentran en la colección
   */
  imprimirInformacion(): void {
    ColeccionRetos.coleccionRetos.retos.forEach(element => {
      console.log(element);
    });
  }

  /**
   * Método que ordena la colección de retos alfabéticamente
   * @param opcion manera en la que se desea ordenar la colección
   */
  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  /**
   * Método que ordena la colección de retos por identificador
   * @param opcion manera en la que se desea ordenar la colección
   */
  ordenarId(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  /**
   * Método que ordena la colección de retos por distancia
   * @param opcion manera en la que se desea ordenar la colección
   */
  ordenarDistancia(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.distanciaTotal - b.distanciaTotal);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  /**
   * Método que ordena la colección de retos por cantidad de usuarios
   * @param opcion manera en la que se desea ordenar la colección
   */
  ordenarCantidadUsuarios(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.usuarios.length - b.usuarios.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }
}

