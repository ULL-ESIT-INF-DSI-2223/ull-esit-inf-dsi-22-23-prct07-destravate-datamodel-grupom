import { ColeccionUsuarios } from './coleccionUsuarios';
import { Grupo } from '../entidades/grupo';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';


/**
 * Clase que representa una colección de grupos
 */
export class ColeccionGrupos {

  /**
   * Colección de grupos
   */
  private Grupos: Grupo[];

  /**
   * Instancia de la clase ColeccionGrupos (Única ya que se emplea el patrón Singleton)
   */
  private static coleccionGrupos: ColeccionGrupos;
  
  /**
   * Constructor privado ya que se emplea el patrón Singleton
   * @param gruposDB Lista de grupos que se encuentran en la base de datos
   */
  private constructor(gruposDB: Grupo[]) {
    this.Grupos = gruposDB;
  }

  /**
   * Método que devuelve la instancia de la clase ColeccionGrupos
   * @returns Instancia de la clase ColeccionGrupos
   */
  public static getColeccionGrupos(): ColeccionGrupos{
    if (!ColeccionGrupos.coleccionGrupos) {
      ColeccionGrupos.coleccionGrupos = new ColeccionGrupos(ManejadorJSON.extraccionGruposDB());

    }
    return ColeccionGrupos.coleccionGrupos;
  }

  /**
   * Método que devuelve el número de grupos que se encuentran en la colección
   * @returns numero de grupos
   */
  getNumeroGrupos(): number {
    return ColeccionGrupos.coleccionGrupos.Grupos.length;
  }

  /**
   * Método que devuelve la colección de grupos
   * @returns Colección de grupos
   */
  getGrupos(): Grupo[] {
    return ColeccionGrupos.coleccionGrupos.Grupos;
  }

  /**
   * Método que devuelve el grupo con el identificador id o undefined si no existe
   * @param id identificador del grupo
   * @returns el grupo con el identificador id o undefined si no existe
   */
  getGrupo(id: number): Grupo | undefined {
    for(let i = 0; i < ColeccionGrupos.coleccionGrupos.Grupos.length; i++) {
      if (ColeccionGrupos.coleccionGrupos.Grupos[i].id == id) {
        return ColeccionGrupos.coleccionGrupos.Grupos[i];
      }
    }
    return undefined;
  }

  /**
   * Método que agrega un grupo a la colección de grupos 
   * @param grupo Grupo que se desea agreagr a la coleccion de usuarios
   */
  agregarGrupo(grupo: Grupo): void {
    ColeccionGrupos.coleccionGrupos.Grupos.push(grupo);
  }

  /**
  * Método que elimina un grupo de la colección de grupos
  * @param grupoID identificador del grupo que se desea eliminar
  * @returns identificador del grupo eliminado o undefined si no se ha podido eliminar
  */
  eliminarGrupo(grupoID: number): number | undefined {
    let tamanoOriginal = ColeccionGrupos.coleccionGrupos.getNumeroGrupos();
    ColeccionGrupos.getColeccionGrupos().Grupos = ColeccionGrupos.getColeccionGrupos().getGrupos().filter((u) => u.id !== grupoID);
    let tamanoFinal = ColeccionGrupos.coleccionGrupos.getNumeroGrupos();
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    ManejadorJSON.eliminarGrupoDB(grupoID);
    return grupoID;
  }

  /**
   * Método que imprime por consola la información de los grupos
   */
  imprimirInformacion(): void {
    ColeccionGrupos.coleccionGrupos.Grupos.forEach(element => {
      console.log(element);
    });
  }

  /**
   * Método que ordena la colección de grupos alfabéticamente
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  /**
   * Método que ordena la colección de grupos por el identificador
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarId(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  /**
   * Método que ordena la colección por la distancia recorrida en la semana
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarDistanciaSemana(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[0][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[0][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  /**
   * Método que ordena la colección por la distancia recorrida en el mes
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarDistanciaMes(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[1][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[1][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  /**
   * Método que ordena la colección por la distancia recorrida en el año
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarDistanciaAnio(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[2][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[2][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  /**
   * Método que ordena la colección por la cantidad de miembros
   * @param opcion manera en la que se desea ordenar la colección de grupos
   */
  ordenarCantidadMiembros(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.participantes.length - b.participantes.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }
}

