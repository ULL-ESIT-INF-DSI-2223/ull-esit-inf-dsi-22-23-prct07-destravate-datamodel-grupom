// Los retos serán otra entidad dentro del sistema. Esta entidad deberá contener 
// toda la información asociada a objetivos de entrenamientos:

// ID único del reto.
// Nombre del reto.
// Rutas que forman parte del reto.
// Tipo de actividad del reto: bicicleta o correr.
// Km totales a realizar (como la suma de los kms de las rutas que lo engloban)
// Usuarios que están realizando el reto.


import { Actividades } from "./usuario";
import { Ruta } from "./ruta";



export class Reto {
  private static _contadorReto = 1000;
  private _id: number;
  private _distanciaTotal: number;
  private _usuarios: number[] = [];
  constructor(private _nombre: string, private _rutas: Ruta[], private _tipoActividad: Actividades) {
    this._id = Reto._contadorReto;
    Reto._contadorReto++;
    this._distanciaTotal = this._rutas.reduce((acc, elem) => acc + elem.distancia, 0);
    this._usuarios = this._rutas.map((ruta) => ruta.usuarios).reduce((acc, elem) => 
    [...acc, ...elem], []).filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
  }

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get distanciaTotal(): number { return this._distanciaTotal; }
  get usuarios(): number[] { return this._usuarios; }



  // la distancia total la tenemos que calcular con la distancia de cada una de las rutas del reto

  // métodos que agregan y quitan usuarios al reto
  
}