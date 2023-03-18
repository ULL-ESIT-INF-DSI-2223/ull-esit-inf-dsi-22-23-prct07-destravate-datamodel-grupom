import { Grupo } from "./grupo";

export enum Actividades { "Correr" = "Correr", "Bicicleta" = "Bicicleta" }

export type DistanciaDesnivel = [distancia: number, desnivel: number];

export type EstadisticaUsuario = [dia: DistanciaDesnivel, semana: DistanciaDesnivel, anio: DistanciaDesnivel];


export class Usuario {
  private static _contadorUsuario = 1000;
  private _id: number;
  private _actividades: Set<Actividades>;
  private _historicoRutas: Map<string, number[]> = new Map();
  private _estadistica: EstadisticaUsuario;
  private _amigos: number[] = [];
  private _gruposAmigos: number[] = [];

  constructor(private _nombre: string, actividades: Actividades[], private _retosActivos: number[]) {
    this._id = Usuario._contadorUsuario;
    Usuario._contadorUsuario++;
    this._actividades = new Set(actividades);
  }

  get id(): number { return this._id; }

  get nombre(): string { return this._nombre; }
  get actividades(): Set<Actividades> { return this._actividades; }
  get amigos(): number[] | string { return (this._amigos.length !== 0) ? this._amigos : "No tiene amigos" }
  get gruposAmigos(): number[] | string { return (this._gruposAmigos.length !== 0) ? this._gruposAmigos : "No tiene grupos amigos" }
  get estadistica(): EstadisticaUsuario { return this._estadistica; }
  get retosActivos(): number[] | undefined { return this._retosActivos; }
  get historicoRutas(): Map<string, number[]> { return this._historicoRutas; }
  
  // método que agrega a la lista de historicos, la ruta que realizó
  
  // método que calcula la ruta favorita --> la que más veces se ha realizado en el vector de historico

  // método que agrega la id de un amigo a la lista de amigos
  agregarAmigo(amigo: Usuario) {
    this._amigos.push(amigo.id);
  }
  // método que agrega la id de un grupoamigo a la lista de gruposamigos
  agregarGrupoAmigo(grupoAmigo: Grupo) {
    this._gruposAmigos.push(grupoAmigo.id);
  }
  // creamos un metodo que pregunte al usaurio si quiere meter retos,
  // if(no quiere) {se deja el array de retos vacíos}
  // else {se le pregunta cuantos retos quiere meter y se le pide que los meta (el id de los retos)}
}
