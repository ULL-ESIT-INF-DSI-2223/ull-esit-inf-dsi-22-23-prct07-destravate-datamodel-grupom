import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { EstadisticaGrupo } from "../tipos/tipos";



export class Grupo {
  private static _contadorGrupo = 1000;
  private _id: number;
  private _estadistica: EstadisticaGrupo = [[0, 0], [0, 0], [0, 0]];
  private _clasificacion: number[];
  private _participantes: number[] = [];
  // Solo se puede borrar el grupo si id >= 1000 y si la id del creador coincide con el usuario q intenta borrar
  private _creador: number;
  constructor(private _nombre: string, idCreador: number) {
    this._id = Grupo._contadorGrupo;
    Grupo._contadorGrupo++;
    this._creador = idCreador;
  }
  // TODO clasificacion de usuarios
  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get participantes(): number[] { return this._participantes; }
  // get rutaFavoritas(): number[] | undefined { return this._rutasFavoritas; }

  // método que calcula la ruta favorita --> la que más veces se ha realizado en el vector de historico

  // TODO: Falta ver como hacer el historico 
  agregarUsuario(id: number) {
    // TODO comrpobar bdd
    this._participantes.push(id);
    this.actualizarEstadistica();
  }

  actualizarClasificacion() {
    let a = 0;
  }

  actualizarEstadistica() {
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    const distanciaSemana = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[0][0], 0)
    const desnivelSemana = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[0][1], 0)
    const distanciaMes = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[1][0], 0)
    const desnivelMes = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[1][1], 0)
    const distanciaAnio = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[2][0], 0)
    const desnivelAnio = this.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[2][1], 0)
    this._estadistica = [[distanciaSemana, desnivelSemana], [distanciaMes, desnivelMes], [distanciaAnio, desnivelAnio]];
  }
}