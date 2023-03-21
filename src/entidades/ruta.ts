import { Coordenadas } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";



export class Ruta {
  private static _contadorRuta = 1000;
  private _id: number;
  private _usuarios: number[] = [];
  constructor(private _nombre: string, private _geolocalizacionInicial: Coordenadas, private _geolocalizacionFinal: Coordenadas, 
    private _distancia: number, private _desnivel: number, private _tipoActividad: Actividades) {
    // no sabemos que hacer con la calificacion
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

  agregarUsuario(id: number) {
    this._usuarios.push(id);
  }
}