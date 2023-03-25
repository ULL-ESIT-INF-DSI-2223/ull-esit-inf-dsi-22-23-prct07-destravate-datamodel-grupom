import { Ruta } from "./ruta";
import { Actividades } from "../enumerados/enumerados";
import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";



export class Reto {
  private static _contadorReto = 1000;
  private _id: number;
  private _distanciaTotal: number;
  private _usuarios: number[] = [];
  constructor(private _nombre: string, private _rutas: Ruta[], private _tipoActividad: Actividades) {
    this._id = Reto._contadorReto;
    Reto._contadorReto++;
    this._distanciaTotal = this._rutas.reduce((acc, elem) => acc + elem.distancia, 0);
    
  }

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get distanciaTotal(): number { return this._distanciaTotal; }
  get usuarios(): number[] { return this._usuarios; }
  get tipoActividad(): Actividades { return this._tipoActividad; }
  get rutas(): Ruta[] { return this._rutas; }

  public ConstructorDBReto(distanciaTotal: number, usuarios: number[]) {
    this._distanciaTotal = distanciaTotal;
    this._usuarios = usuarios;
  }

  // TODO: REVISAR QUE ESTE BIEN métodos que agregan y quitan usuarios al reto
  agregarUsuario(id: number) {
    this._usuarios.push(id);
    ColeccionUsuarios.getColeccionUsuarios().getUsuario(id)?.agregarReto(this._id);
  }

  quitarUsuario(id: number) {
    this._usuarios = this._usuarios.filter((usuario) => usuario !== id);
    ColeccionUsuarios.getColeccionUsuarios().getUsuario(id)?.eliminarReto(this._id);
  }
}