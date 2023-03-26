import { Coordenadas } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";


/**
 * Clase Ruta que representa los diferentes recorridos que pueden hacer los usuarios
 */
export class Ruta {
  
  /**
   * Contador que lleva la gestión de la asignación de los ID
   */
  private static _contadorRuta = 1000;

  /**
   * Propiedad ID de cada una de las rutas
   */
  private _id: number;

  /**
   * Lista de usuarios que han realizado la ruta
   */
  private _usuarios: number[] = [];

  /**
   * Lista de calificaciones de la ruta
   */
  private _calificacion: number[] = [];

  /**
   * Media de las calificaciones de la ruta
   */
  private _mediaCalificacion = 0;
  
  /**
   * Constructor de la clase, el cual crea instancias de la clase Ruta
   * @param _nombre nombre de la ruta que se quiere instanciar
   * @param _geolocalizacionInicial coordenadas de la geolocalizacion inicial de la ruta
   * @param _geolocalizacionFinal coordenadas de la geolocalizacion final de la ruta
   * @param _distancia distancia total de la ruta
   * @param _desnivel desnivel total de la ruta
   * @param _tipoActividad tipo de actividad que se realiza en la ruta
   */
  constructor(private _nombre: string, private _geolocalizacionInicial: Coordenadas, private _geolocalizacionFinal: Coordenadas, 
    private _distancia: number, private _desnivel: number, private _tipoActividad: Actividades) {
    this._id = Ruta._contadorRuta;
    Ruta._contadorRuta++;
  }

  /**
   * Getter de la propiedad ID
   */
  get id(): number { return this._id; }

  /**
   * Getter de la lista de usuarios que recorren la ruta
   */
  get usuarios(): number[] { return this._usuarios; }

  /**
   * Getter del nombre de la ruta
   */
  get nombre(): string { return this._nombre; }

  /**
   * Getter de las coordenadas de la geolocalizacion inicial
   */
  get geolocalizacionInicial(): Coordenadas { return this._geolocalizacionInicial; }

  /**
   * Getter de las coordenadas de la geolocalizacion final
   */
  get geolocalizacionFinal(): Coordenadas { return this._geolocalizacionFinal; }

  /**
   * Getter de la distancia total de la ruta
   */
  get distancia(): number { return this._distancia; }

  /**
   * Getter del desnivel total de la ruta
   */
  get desnivel(): number { return this._desnivel; }

  /**
   * Getter del tipo de actividad que se realiza en la ruta
   */
  get tipoActividad(): Actividades { return this._tipoActividad; }

  /**
   * Getter de la media de calificaciones de la ruta
   */
  get calificacionMedia(): number { return this._mediaCalificacion; }

  /**
   * Getter de la lista de calificaciones de la ruta
   */
  get calificacion(): number[] { return this._calificacion; }
  
  /**
   * Sobrecarga del constructor para poder crear instancias de la clase Ruta a partir de la base de datos
   * @param usuarios lista de usuarios que recorren la ruta
   * @param calificacion lista de calificaciones de la ruta aportadas por usuarios
   * @param mediaCalificacion número medio de calificaciones de la ruta
   */
  public ConstructorDBRuta(usuarios: number[], calificacion: number[], mediaCalificacion: number) {
    this._calificacion = calificacion;
    this._mediaCalificacion = mediaCalificacion;
    this._usuarios = usuarios;
  }
 
  /**
   * Método que permite calificar una ruta
   * @param calificacion calificacion que se quiere añadir a la ruta
   * @returns la media de la calificacion de la ruta
   */
  calificar(calificacion: number): number {
    if(calificacion <= 10 && calificacion >= 0) {
      this._calificacion.push(calificacion);
      this._mediaCalificacion = this._calificacion.reduce((acc, elem) => acc + elem, 0) / this._calificacion.length;
      return this._mediaCalificacion;
    } else {
      return -1;
    }
  }

  /**
   * Método que permite agregar un usuario a una ruta, es decir, registro de que un usuario ha realizado la ruta
   * @param id id del usuario que se quiere añadir a la ruta
   */
  agregarUsuario(id: number) {
    this._usuarios.push(id);
  }

  /**
   * Método que permite eliminar un usuario de una ruta, es decir, registro de que un usuario ha dejado de realizar la ruta	
   * @param id id del usuario que se quiere eliminar de la ruta
   */
  eliminarUsuario(id: number) {
    this._usuarios = this._usuarios.filter((u) => u !== id);
  }

  /**
   * Método que permite obtener la información de la ruta
   * @returns una cadena de texto con toda la información de la ruta
   */
  toString(): string {
    let info = `Ruta ${this._nombre} tiene la id ${this._id}\n`
    info += `Sus actividades son ${this._tipoActividad}\n`;
    info += `Su distancia es ${this._distancia} y su desnivel es ${this._desnivel}\n`;
    info += `Su geolocalizacion inicial es ${this._geolocalizacionInicial} y su geolocalizacion final es ${this._geolocalizacionFinal}\n`;
    info += `Sus participantes son ${this._usuarios.join(", ")}\n`;
    info += `Su calificacion media es ${this._mediaCalificacion}\n`;
    return info;
  }
}