import { ColeccionUsuarios } from "../colecciones/coleccionUsuarios";
import { EstadisticaGrupo } from "../tipos/tipos";
import { Ruta } from "./ruta";


/**
 * Clase que representa un grupo de usuarios
 */
export class Grupo {

  /**
   * Contador que lleva la gestión de la asignación de los ID
   */
  private static _contadorGrupo = 1000;

  /**
   * Identificador del grupo
   */
  private _id: number;

  /**
   * Estadística del grupo, total acumulado de cada uno de los usuarios
   */
  private _estadistica: EstadisticaGrupo = [[0, 0], [0, 0], [0, 0]];

  /**
   * Clasificación de los usuarios del grupo, calculada en base a los Kilómetros recorridos de cada usuario
   */
  private _clasificacion: number[] = [];

  /**
   * Array de identificadores de usuarios que son miembros del grupo
   */
  private _participantes: number[] = [];

  /**
   * Identificador del usuario que ha creado el grupo
   */
  private _creador: number;

  /**
   * Historial de rutas que ha realizado el grupo, con sus respectivas fechas
   */
  private _historicoRutas: Map<string, number[]> = new Map();

  /**
   * Constructor de la clase, el cual crea instancias de la clase Grupo
   * @param _nombre Nombre del grupo
   * @param idCreador identificador del creador
   */
  constructor(private _nombre: string, idCreador: number) {
    this._id = Grupo._contadorGrupo;
    Grupo._contadorGrupo++;
    this._creador = idCreador;
    this.agregarUsuario(idCreador);
  }
  
  /**
   * Getter del identificador del grupo
   */
  get id(): number { return this._id; }

  /**
   * Getter del identificador del creador del grupo
   */
  get creador(): number { return this._creador; }

  /**
   * Getter del nombre del grupo
   */
  get nombre(): string { return this._nombre; }
  
  /**
   * Getter de los participantes del grupo
   */
  get participantes(): number[] { return this._participantes; }

  /**
   * Getter del historico de rutas del grupo, en el que se almacena la fecha y las rutas realizadas en dicha fecha
   */
  get historicoRutas(): Map<string, number[]> { return this._historicoRutas; }

  /**
   * Getter de la estadística del grupo
   */
  get estadistica(): EstadisticaGrupo { return this._estadistica; }

  /**
   * Getter de la clasificación del grupo, en base a las distancias recorridas por cada usuario
   */
  get clasificacion(): number[] { return this._clasificacion; }

  /**
   * Método que crea una instancia de la clase Grupo a partir de los datos de la base de datos
   * @param participantes lista de participantes del grupo
   * @param estadistica estadística grupal calculada a partir de los participantes
   * @param clasificacion lista de participantes ordenados por distancia recorrida
   * @param historicoFechas lista de fechas en las que se han realizado rutas
   * @param historicoRutas lista de rutas realizadas en cada fecha
   */
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

  /**
   * Método que agrega un usuario al grupo
   * @param id identificador del usuario a añadir al grupo
   */
  agregarUsuario(id: number) {
    this._participantes.push(id);
    this.actualizarEstadistica();
  }
  
  /**
   * Método que ordena los participantes del grupo en base a la distancia recorrida por cada uno de ellos
   * @returns devuelve el array ordenado en base a la distancia recorrida por cada usuario
   */
  clasificacionUsuarios(): number[] {
    let arrayOrdenado = this.participantes;
    arrayOrdenado.sort((a, b) => (ColeccionUsuarios.getColeccionUsuarios().getUsuario(b)?.distanciaTotal() ?? 0) - 
    (ColeccionUsuarios.getColeccionUsuarios().getUsuario(a)?.distanciaTotal() ?? 0));
    return arrayOrdenado;
  }
  
  /**
   * Método que añade una ruta al historico de rutas del grupo
   * @param ruta ruta a añadir al historico de rutas del grupo
   */
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

  /**
   * Método que devuelve las 3 rutas más repetidas en el historico de rutas del grupo, es decir, las favoritas del grupo
   * @returns devuelve un array con los 3 identificadores de rutas más repetidas en el historico de rutas del grupo
   */
  rutasFavoritas(): number[] {
    const rutas: number[] = Array.from(this.historicoRutas.values()).flat();
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

  /**
   * Método que actualiza la estadística del grupo
   */
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

  /**
   * Método que devuelve toda la información del grupo
   * @returns devuelve un string con toda la información del grupo
   */
  public toString(): string {
    let info = `Grupo ${this._nombre} tiene la id ${this._id} y su creador es ${this._creador}\n`;
    info += `Sus participantes son ${this._participantes.join(", ")}\n`;
    info += `Sus estadisticas son ${this._estadistica} \n`;
    info += `Su clasificacion es ${this._clasificacion.join(", ")} \n`;
    info += `Su histórico de rutas es ${Array.from(this._historicoRutas.keys()).join(", ")}\n`;
    return info;
  }
}