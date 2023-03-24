import { Coordenadas } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";



export class Ruta {
  private static _contadorRuta = 1000;
  private _id: number;
  private _usuarios: number[] = [];
  private _calificacion: number[];
  private _mediaCalificacion: number;
  constructor(private _nombre: string, private _geolocalizacionInicial: Coordenadas, private _geolocalizacionFinal: Coordenadas, 
    private _distancia: number, private _desnivel: number, private _tipoActividad: Actividades) {
    this._id = Ruta._contadorRuta;
    Ruta._contadorRuta++;
  }
  
  public ConstructorDB(calificacion: number[], mediaCalificacion: number) {
    this._calificacion = calificacion;
    this._mediaCalificacion = mediaCalificacion;
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
  
  calificar(calificacion: number): number {
    this._calificacion.push(calificacion);
    this._mediaCalificacion = this._calificacion.reduce((acc, elem) => acc + elem, 0) / this._calificacion.length;
    return this._mediaCalificacion;
  }

  agregarUsuario(id: number) {
    this._usuarios.push(id);
  }
}