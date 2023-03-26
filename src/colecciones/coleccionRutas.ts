import { Ruta } from '../entidades/ruta';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { Actividades } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';


/**
 * Clase que representa una colección de rutas
 */
export class ColeccionRutas {

  /**
   * Colección de rutas
   */
  private rutas: Ruta[];

  /**
   * Instancia de la clase ColeccionRutas (Única ya que se emplea el patrón Singleton)
   */
  private static coleccionRutas: ColeccionRutas;
  
  /**
   * Constructor privado ya que se emplea el patrón Singleton
   */
  private constructor(rutasDB: Ruta[]) {
    this.rutas = rutasDB;
  }

  /**
   * Método que devuelve la instancia de la clase ColeccionRutas
   * @returns Instancia de la clase ColeccionRutas
   */
  public static getColeccionRutas(): ColeccionRutas{
    if (!ColeccionRutas.coleccionRutas) {
      ColeccionRutas.coleccionRutas = new ColeccionRutas(ManejadorJSON.extraccionRutasDB());
    }
    return ColeccionRutas.coleccionRutas;
  }

  /**
   * Método que devuelve el número de rutas que existen en la coleccion
   * @returns número de rutas que existen en la coleccion
   */
  public static getNumeroRutas(): number {
    return ColeccionRutas.coleccionRutas.rutas.length;
  }

  /**
   * Método que devuelve la colección de rutas
   * @returns Colección de rutas
   */
  getRutas(): Ruta[] {
    return ColeccionRutas.coleccionRutas.rutas;
  }

  /**
   * Método que devuelve la ruta con el identificador id o undefined si no existe
   * @param id identificador de la ruta
   * @returns ruta con el identificador id o undefined si no existe
   */
  getRuta(id: number): Ruta | undefined {
    for(let i = 0; i < ColeccionRutas.coleccionRutas.rutas.length; i++) {
      if (ColeccionRutas.coleccionRutas.rutas[i].id == id) {
        return ColeccionRutas.coleccionRutas.rutas[i];
      }
    }
    return undefined;
  }

  /**
   * Método que agrega una ruta a la coleccion
   * @param Ruta ruta que se va a agregar a la colección
   */
  agregarRuta(Ruta: Ruta): void {
    ColeccionRutas.coleccionRutas.rutas.push(Ruta);
  }
  
  /**
   * Método que elimina una ruta de la coleccion
   * @param rutaID identificador de la ruta que se va a eliminar
   * @returns ruta que se elimina o undefined si no se elimina
   */
  eliminarRuta(rutaID: number): number | undefined {
    let tamanoOriginal = ColeccionRutas.getNumeroRutas();
    ColeccionRutas.coleccionRutas.rutas = ColeccionRutas.coleccionRutas.rutas.filter((u) => u.id !== rutaID);
    let tamanoFinal = ColeccionRutas.getNumeroRutas();
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    ManejadorJSON.eliminarRutaDB(rutaID);
    return rutaID;
  }

  /**
   * Método que imprime la información de la colección de rutas
   */
  imprimirInformacion(): void {
    ColeccionRutas.coleccionRutas.rutas.forEach(element => {
      console.log(element);
    });
  }

  /**
   * Metodo que ordena la colección de rutas alfabeticamente
   * @param opcion manera en la que se va a ordenar la colección de rutas
   */
  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  /**
   * Metodo que ordena la colección de rutas por id
   * @param opcion manera en la que se va a ordenar la colección de rutas
   */
  ordenarId(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  /**
   * Metodo que ordena la colección de rutas por cantidad de usuarios
   * @param opcion manera en la que se va a ordenar la colección de rutas
   */
  ordenarCantidadUsuarios(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.usuarios.length - b.usuarios.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  /**
   * Metodo que ordena la colección de rutas por distancia
   * @param opcion manera en la que se va a ordenar la colección de rutas
   */
  ordenarDistancia(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.distancia - b.distancia);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }
  
  /**
   * Metodo que ordena la colección de rutas por actividad
   * @param actividad actividad que se va a ordenar
   */
  ordenarActividad(actividad: Actividades) {
    let parteCiclismo = ColeccionRutas.coleccionRutas.rutas.filter((ruta) => ruta.tipoActividad === Actividades.Bicicleta);
    let parteCorredor = ColeccionRutas.coleccionRutas.rutas.filter((ruta) => ruta.tipoActividad === Actividades.Correr);
    parteCiclismo.sort((a, b) => a.id - b.id);
    parteCorredor.sort((a, b) => a.id - b.id);
    if(actividad === Actividades.Bicicleta) {
      ColeccionRutas.coleccionRutas.rutas = parteCiclismo.concat(parteCorredor);
    } else {
      ColeccionRutas.coleccionRutas.rutas = parteCorredor.concat(parteCiclismo);
    }
  }

  /**
   * Metodo que ordena la colección de rutas por calificación media
   * @param opcion manera en la que se va a ordenar la colección de rutas
   */
  ordenarCalificacionMedia(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.calificacionMedia - b.calificacionMedia);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }
}

