// Para cada ruta incluida dentro del sistema, se debe almacenar la información siguiente:

// ID único de la ruta.
// Nombre de la ruta.
// Geolocalización del inicio (coordenadas).
// Geolocalización del final de la ruta (coordenadas).
// Longitud de la ruta en kilómetros.
// Desnivel medio de la ruta.
// Usuarios que han realizado la ruta (IDs).
// Tipo de actividad: Indicador si la ruta se puede realizar en bicicleta o corriendo.
// Calificación media de la ruta.

import { Actividades } from "./usuario";

export type Coordenadas = [latitud: number, longitud: number];


export class Ruta {
  private static _contadorRuta = 1000;
  private _id: number;
  private _usuarios: number[];
  constructor(private _nombre: string, private _geolocalizacionInicial: Coordenadas, private _geolocalizacionFinal: Coordenadas, 
    private _distancia: number, private _desnivel: number, private _tipoActividad: Actividades) {
    // no sabemos que hacer con la calificacion
    this._id = Ruta._contadorRuta;
    Ruta._contadorRuta++;
  }

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get geolocalizacionInicial(): Coordenadas { return this._geolocalizacionInicial; }
  get geolocalizacionFinal(): Coordenadas { return this._geolocalizacionFinal; }
  get distancia(): number { return this._distancia; }
  get desnivel(): number { return this._desnivel; }
}