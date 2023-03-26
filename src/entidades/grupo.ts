import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { EstadisticaGrupo } from "../tipos/tipos";
import { Ruta } from "./ruta";



export class Grupo {
  private static _contadorGrupo = 1000;
  private _id: number;
  private _estadistica: EstadisticaGrupo = [[0, 0], [0, 0], [0, 0]];
  private _clasificacion: number[] = [];
  private _participantes: number[] = [];
  // Solo se puede borrar el grupo si id >= 1000 y si la id del creador coincide con el usuario q intenta borrar
  private _creador: number;
  private _historicoRutas: Map<string, number[]> = new Map();

  constructor(private _nombre: string, idCreador: number) {
    this._id = Grupo._contadorGrupo;
    Grupo._contadorGrupo++;
    this._creador = idCreador;
    this.agregarUsuario(idCreador);
  }

  public ContructorDBGrupo(participantes: number[], estadistica: EstadisticaGrupo, clasificacion: number[], historicoFechas: string[], historicoRutas: number[][]) {
    this._participantes = participantes;
    this._estadistica = estadistica;
    this.actualizarEstadistica();
    this._clasificacion = clasificacion;
    for (let i = 0; i < historicoFechas.length; ++i) {
      let fechaString = historicoFechas[i];
      for (let j = 0; j < historicoRutas[i].length; ++j) {
        if (this.historicoRutas.get(fechaString) !== undefined) {
          this.historicoRutas.get(fechaString)?.push(historicoRutas[i][j])
        } else {
          this.historicoRutas.set(fechaString, [historicoRutas[i][j]]);
        }
      }
    }
  }
  
  get id(): number { return this._id; }
  get creador(): number { return this._creador; }
  get nombre(): string { return this._nombre; }
  get participantes(): number[] { return this._participantes; }
  get historicoRutas(): Map<string, number[]> { return this._historicoRutas; }
  get estadistica(): EstadisticaGrupo { return this._estadistica; }
  get clasificacion(): number[] { return this._clasificacion; }

  
  agregarUsuario(id: number) {
    this._participantes.push(id);
    this.actualizarEstadistica();
  }
  
  clasificacionUsuarios(): number[] {
    let arrayOrdenado = this.participantes;
    arrayOrdenado.sort((a, b) => (ColeccionUsuarios.getColeccionUsuarios().getUsuario(b)?.distanciaTotal() ?? 0) - 
    (ColeccionUsuarios.getColeccionUsuarios().getUsuario(a)?.distanciaTotal() ?? 0));
    return arrayOrdenado;
  }
  
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
    this.participantes.forEach((participante) => {
      ColeccionUsuarios.getColeccionUsuarios().getUsuario(participante)?.agregarRuta(ruta)
    });
  }

  rutasFavoritas(): number[] {
    const rutas: number[]= Array.from(this.historicoRutas.values()).flat();
    const contador = new Map();
    for (let ruta of rutas) {
      if (contador.has(ruta)) {
        contador.set(ruta, contador.get(ruta) + 1);
      } else {
        contador.set(ruta, 1);
      }
    }
    const entradas = Array.from(contador.entries());
    const entradasOrdenadas = entradas.sort((a, b) => b[1] - a[1]);
    const numerosMasRepetidos = entradasOrdenadas.slice(0, 3).map((entrada) => parseInt(entrada[0]));
    return numerosMasRepetidos;
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

  public toString(): string {
    let info = `Grupo ${this._nombre} tiene la id ${this._id} y su creador es ${this._creador}\n`;
    info += `Sus participantes son ${this._participantes.join(", ")}\n`;
    info += `Sus estadisticas son ${this._estadistica} \n`;
    info += `Su clasificacion es ${this._clasificacion.join(", ")} \n`;
    info += `Su histórico de rutas es ${Array.from(this._historicoRutas.keys()).join(", ")}\n`;
    return info;
  }
}