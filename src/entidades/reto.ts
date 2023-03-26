import { Ruta } from "./ruta";
import { Actividades } from "../enumerados/enumerados";
import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";

/**
 * Clase que representa un reto a realizar
 */
export class Reto {

  /**
   * Contador que lleva la gestión de la asignación de los ID
   */
  private static _contadorReto = 1000;

  /**
   * Identificador del reto
   */
  private _id: number;

  /**
   * Propiedad que representa la distancia total del reto
   */
  private _distanciaTotal: number;

  /**
   * Lista de usuarios que se encuentran realizando el reto
   */
  private _usuarios: number[] = [];
  
  /**
   * Constructor de la clase, el cual crea instancias de la clase Reto
   * @param _nombre nombre del reto
   * @param _rutas lista de rutas que componen el reto
   * @param _tipoActividad tipo de actividad que se realiza en el reto
   */
  constructor(private _nombre: string, private _rutas: Ruta[], private _tipoActividad: Actividades) {
    this._id = Reto._contadorReto;
    Reto._contadorReto++;
    this._distanciaTotal = this._rutas.reduce((acc, elem) => acc + elem.distancia, 0);
    
  }

  /**
   * Getter de la propiedad ID
   */
  get id(): number { return this._id; }

  /**
   * Getter del nombre del reto
   */
  get nombre(): string { return this._nombre; }

  /**
   * Getter de la distancia total del reto
   */
  get distanciaTotal(): number { return this._distanciaTotal; }

  /**
   * Getter de la lista de usuarios que realizan el reto
   */
  get usuarios(): number[] { return this._usuarios; }

  /**
   * Getter del tipo de actividad del reto
   */
  get tipoActividad(): Actividades { return this._tipoActividad; }

  /**
   * Getter de la lista de rutas que componen el reto
   */
  get rutas(): Ruta[] { return this._rutas; }

  /**
   * Sobrecarga del constructor que permite crear un reto a partir de la base de datos
   * @param distanciaTotal distancia total del reto
   * @param usuarios lista de usuarios que realizan el reto
   */
  public ConstructorDBReto(distanciaTotal: number, usuarios: number[]) {
    this._distanciaTotal = distanciaTotal;
    this._usuarios = usuarios;
  }

  /**
   * Método que permite agregar un usuario al reto
   * @param id identificador del usuario que se quiere agregar al reto
   */
  agregarUsuario(id: number) {
    this._usuarios.push(id);
    ColeccionUsuarios.getColeccionUsuarios().getUsuario(id)?.agregarReto(this._id);
  }

  /**
   * Método que permite quitar un usuario del reto
   * @param id identificador del usuario que se quiere quitar del reto
   */
  quitarUsuario(id: number) {
    this._usuarios = this._usuarios.filter((usuario) => usuario !== id);
    ColeccionUsuarios.getColeccionUsuarios().getUsuario(id)?.eliminarReto(this._id);
  }

  /**
   * Método que permite obtener la información del reto
   * @returns información del reto
   */
  public toString(): string {
    let info = `Reto ${this.nombre} tiene la ID ${this.id}\n`;
    info += `Sus rutas son ${Array.from(this.rutas.keys()).join(", ")}\n`;
    info += `Su actividad es: ${this.tipoActividad}\n`;
    info += `Sus participantes son ${this.usuarios.join(", ")}\n`;
    info += `Su distancia total es ${this.distanciaTotal}\n`;
    return info;
  }
}