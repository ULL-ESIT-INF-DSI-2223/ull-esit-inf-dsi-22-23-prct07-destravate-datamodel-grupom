import { Grupo } from "./grupo";
import { Ruta } from "./ruta";

export enum Actividades { "Correr" = "Correr", "Bicicleta" = "Bicicleta" }

export type DistanciaDesnivel = [distancia: number, desnivel: number];

export type EstadisticaUsuario = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

export type Fecha = [dia: number, mes: number, anio: number];

export class Usuario {
  private static _contadorUsuario = 1000;
  private _id: number;
  private _actividades: Set<Actividades>;
  private _historicoRutas: Map<string, number[]> = new Map();
  private _estadistica: EstadisticaUsuario = [[0, 0], [0, 0], [0, 0]];
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
  // cada vez que se agrega una ruta debemos actualizar las estadisticas
  agregarRuta(ruta: Ruta) {
    let fecha: Date = new Date();
    let fechaString: string = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    
    let arrayFecha: number[] = [];
    if (this.historicoRutas.get(fechaString) !== undefined) {
      this.historicoRutas.get(fechaString)?.push(ruta.id);
    } else {
      arrayFecha = [ruta.id];
      this.historicoRutas.set(fechaString, arrayFecha);
    }
    ruta.agregarUsuario(this.id);
    this.actualizarEstadisticas(ruta);
  }

  actualizarEstadisticas(ruta: Ruta) {
    let distancia: number = ruta.distancia;
    let desnivel: number = ruta.desnivel;

    this.estadistica[0][0] += distancia;
    this.estadistica[0][1] += desnivel;
    this.estadistica[1][0] += distancia;
    this.estadistica[1][1] += desnivel;
    this.estadistica[2][0] += distancia;
    this.estadistica[2][1] += desnivel;
    
  }
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


