import { Coordenadas } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";



export class Ruta {
  private static _contadorRuta = 1000;
  private _id: number;
  private _usuarios: number[] = [];
  private _calificacion: number[] = [];
  private _mediaCalificacion = 0;
  
  constructor(private _nombre: string, private _geolocalizacionInicial: Coordenadas, private _geolocalizacionFinal: Coordenadas, 
    private _distancia: number, private _desnivel: number, private _tipoActividad: Actividades) {
    this._id = Ruta._contadorRuta;
    Ruta._contadorRuta++;
  }

  get id(): number { return this._id; }
  get usuarios(): number[] { return this._usuarios; }
  get nombre(): string { return this._nombre; }
  get geolocalizacionInicial(): Coordenadas { return this._geolocalizacionInicial; }
  get geolocalizacionFinal(): Coordenadas { return this._geolocalizacionFinal; }
  get distancia(): number { return this._distancia; }
  get desnivel(): number { return this._desnivel; }
  get tipoActividad(): Actividades { return this._tipoActividad; }
  get calificacionMedia(): number { return this._mediaCalificacion; }
  get calificacion(): number[] { return this._calificacion; }
  
  public ConstructorDBRuta(usuarios: number[], calificacion: number[], mediaCalificacion: number) {
    this._calificacion = calificacion;
    this._mediaCalificacion = mediaCalificacion;
    this._usuarios = usuarios;
  }
 
  calificar(calificacion: number): number {
    if(calificacion <= 10 && calificacion >= 0) {
      this._calificacion.push(calificacion);
      this._mediaCalificacion = this._calificacion.reduce((acc, elem) => acc + elem, 0) / this._calificacion.length;
      return this._mediaCalificacion;
    } else {
      return -1;
    }
  }

  agregarUsuario(id: number) {
    this._usuarios.push(id);
  }

  eliminarUsuario(id: number) {
    this._usuarios = this._usuarios.filter((u) => u !== id);
  }

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