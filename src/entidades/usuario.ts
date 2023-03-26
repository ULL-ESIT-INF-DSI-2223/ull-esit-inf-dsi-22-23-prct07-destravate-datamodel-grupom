import { Ruta } from "./ruta";
import { EstadisticaUsuario } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";
import { ColeccionRutas } from "../colecciones/coleccionRutas";

/**
 * Clase Usuario que representa una persona que realiza actividad deportiva
 */
export class Usuario {

  /**
   * Contador que lleva la gestión de la asignación de los ID
   */
  private static _contadorUsuario = 1000;

  /**
   * Propiedad ID de cada uno de los usuarios
   */
  private _id: number;

  /**
   * Atributo que permite establecer una actividad a un usuario
   */
  private _actividades: Set<Actividades>;

  /**
   * Atributo que representa las rutas que ha realizado un usuario
   */
  private _historicoRutas: Map<string, number[]> = new Map();

  /**
   * Atributo que representa la estadística de un usuario [[distancia, desnivel], [distancia, desnivel], [distancia, desnivel]]
   * siendo la primera posición la de la semana, la segunda la del mes y la tercera la del año
   */
  private _estadistica: EstadisticaUsuario = [[0, 0], [0, 0], [0, 0]];

  /**
   * Atributo que representa los amigos de un usuario (almacena los ID de los amigos)
   */
  private _amigos: number[] = [];

  /**
   * Atributo que representa los grupos de amigos de un usuario (almacena los ID de los grupos)
   */
  private _gruposAmigos: number[] = [];

  /**
   * Atributo que representa los retos activos de un usuario (almacena los ID de los retos)
   */
  private _retosActivos: number[] = [];


  /**
   * Constructor de la clase Usuario
   * @param _nombre Nombre del usuario a instanciar
   * @param actividades actividades que realiza el usuario
   */
  constructor(private _nombre: string, actividades: Actividades[]) {
    this._id = Usuario._contadorUsuario;
    Usuario._contadorUsuario++;
    this._actividades = new Set(actividades);
  }
  
  /**
   * Getter que devuelve el ID de un usuario
   */
  get id(): number { return this._id; }

  /**
   * Getter que devuelve el nombre de un usuario
   */
  get nombre(): string { return this._nombre; }

  /**
   * Getter que devuelve las actividades de un usuario
   */
  get actividades(): Set<Actividades> { return this._actividades; }

  /**
   * Getter que devuelve el conjunto de amigos de un usuario
   */
  get amigos(): number[] | undefined { return (this._amigos.length !== 0) ? this._amigos : undefined }

  /**
   * Getter que devuelve el conjunto de grupos de amigos de un usuario
   */
  get gruposAmigos(): number[] | undefined { return (this._gruposAmigos.length !== 0) ? this._gruposAmigos : undefined }

  /**
   * Getter que devuelve la estadística de un usuario
   */
  get estadistica(): EstadisticaUsuario { return this._estadistica; }

  /**
   * Getter que devuelve los retos activos de un usuario
   */
  get retosActivos(): number[] | undefined { return this._retosActivos; }

  /**
   * Getter que devuelve el historico de rutas de un usuario
   */
  get historicoRutas(): Map<string, number[]> { return this._historicoRutas; }
  
    
  /**
   * Sobrecarga del constructor que permite crear un usuario a partir de la base de datos
   * @param actividades actividades que realiza el usuario 
   * @param historicoFechas conjunto de fechas en las que el usuario ha realizado las rutas
   * @param historicoRutas conjunto de rutas que ha realizado el usuario
   * @param estadistica estadística del usuario
   * @param amigos conjunto de amigos del usuario
   * @param gruposAmigos conjunto de grupos de amigos del usuario
   * @param retosActivos conjunto de retos activos del usuario
   */
  public ContructorDBUsuario(actividades: string[], historicoFechas: string[], historicoRutas: number[][], estadistica: EstadisticaUsuario, 
    amigos: number[] | undefined, gruposAmigos: number[] | undefined, retosActivos: number[]) {
    actividades.forEach((elem) => { this._actividades.add(elem as Actividades) })
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
    this._estadistica = estadistica;
    this._amigos = amigos === undefined ? [] : amigos;
    this._gruposAmigos = gruposAmigos === undefined ? [] : gruposAmigos;
    this._retosActivos = retosActivos;
  }

  /**
   * Método que permite saber si un grupo es amigo del usuario que lo invoca
   * @param idGrupo grupo del que se quiere saber si es amigo
   * @returns true o false dependiendo de si es amigo o no
   */
  esGrupoAmigo(idGrupo: number): boolean {
    return this._gruposAmigos.includes(idGrupo);
  }

  /**
   * Método que agrega una ruta al historico de rutas del usuario
   * @param ruta ruta que se quiere agregar al historico de rutas del usuario
   * @returns el ID de la ruta que se ha agregado
   */
  agregarRuta(ruta: Ruta): number {
    let fecha: Date = new Date();
    let fechaString: string = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    
    let arrayFecha: number[] = [];
    if (this.historicoRutas.get(fechaString) !== undefined) {
      this.historicoRutas.get(fechaString)?.push(ruta.id);
    } else {
      arrayFecha = [ruta.id];
      this.historicoRutas.set(fechaString, arrayFecha);
    }
    this.actualizarEstadisticas(ruta);
    ruta.agregarUsuario(this.id);
    this._gruposAmigos.forEach((idGrupo) => {
      ColeccionGrupos.getColeccionGrupos().getGrupo(idGrupo)?.actualizarEstadistica()
    });
    return ruta.id;
  }

  /**
   * Método que actualiza las estadísticas del usuario
   * @param ruta ruta que se ha realizado
   * @returns el ID de la ruta que se ha realizado
   */
  actualizarEstadisticas(ruta: Ruta): number {
    let distancia: number = ruta.distancia;
    let desnivel: number = ruta.desnivel;

    this.estadistica[0][0] += distancia;
    this.estadistica[0][1] += desnivel;
    this.estadistica[1][0] += distancia;
    this.estadistica[1][1] += desnivel;
    this.estadistica[2][0] += distancia;
    this.estadistica[2][1] += desnivel;
    return ruta.id;
  }

  /**
   * Método que agrega un reto al usuario
   * @param id identificador del reto que se quiere agregar
   * @returns el identificador del reto que se ha agregado
   */
  agregarReto(id: number): number {
    this._retosActivos.push(id);
    return id;
  }

  /**
   * Método que elimina un reto del usuario
   * @param id identificador del reto que se quiere eliminar
   * @returns identificador del reto que se ha eliminado
   */
  eliminarReto(id: number): number {
    this._retosActivos = this._retosActivos.filter((elem) => elem !== id);
    return id;
  }

  /**
   * Método que agrega un amigo al usuario
   * @param amigo identificador del amigo que se quiere agregar
   * @returns identificador del amigo que se ha agregado
   */
  agregarAmigo(amigo: number): number {
    this._amigos.push(amigo);
    return amigo;
  }

  /**
   * Método que elimina un amigo del usuario
   * @param amigo identificador del amigo que se quiere eliminar
   * @returns identificador del amigo que se ha eliminado
   */
  eliminarAmigo(amigo: number): number {
    this._amigos = this._amigos.filter((elem) => elem !== amigo);
    return amigo;
  }

  /**
   * Método que agrega un grupo de amigos al usuario
   * @param grupoAmigo identificador del grupo de amigos que se quiere agregar
   * @returns identificador del grupo de amigos que se ha agregado
   */
  agregarGrupoAmigo(grupoAmigo: number): number {
    this._gruposAmigos.push(grupoAmigo);
    ColeccionGrupos.getColeccionGrupos().getGrupo(grupoAmigo)?.agregarUsuario(this.id);
    return grupoAmigo;
  }

  /**
   * Método que elimina un grupo de amigos del usuario
   * @param grupoAmigo identificador del grupo de amigos que se quiere eliminar
   * @returns identificador del grupo de amigos que se ha eliminado
   */
  eliminarGrupoAmigo(grupoAmigo: number): number {
    this._gruposAmigos = this._gruposAmigos.filter((elem) => elem !== grupoAmigo);
    return grupoAmigo;
  }

  /**
   * Método que devuelve las rutas favoritas del usuario en base a las veces que ha realizado cada una
   * @returns las rutas favoritas del usuario
   */
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

  /**
   * Método que devuelve la distancia total recorrida por el usuario
   * @returns número de kilómetros recorridos por el usuario
   */
  distanciaTotal(): number {
    let distanciaTotal = 0;
    this.historicoRutas.forEach((value) => {
      value.forEach((idRuta) => {
        let ruta = ColeccionRutas.getColeccionRutas().getRuta(idRuta);
        if (ruta !== undefined) {
          distanciaTotal += ruta.distancia;
        }
      });
    });
    return distanciaTotal;
  }

  /**
   * Método que devuelve una cadena con la información del usuario para que se pueda imprimir por pantalla
   * @returns cadena con la información del usuario
   */
  public toString(): string {
    let info = `Usuario ${this.nombre} tiene la ID ${this.id}\n`;
    info += `Realiza las actividades: ${Array.from(this.actividades).join(", ")}\n`;
    info += this.amigos !== undefined ? `Sus son amigos ${this.amigos.join(", ")}\n` : "No tiene amigos\n";
    info += this.gruposAmigos !== undefined ? `Sus grupos de amigos son ${this.gruposAmigos.join(", ")}\n` : "No tiene grupos de amigos\n";
    info += `Sus estadisticas son ${this.estadistica} \n`;
    info += this.retosActivos !== undefined ? `Sus retos activos son ${this.retosActivos.join(", ")}\n` : "No tiene retos activos\n";
    info += `Su histórico de rutas es ${Array.from(this.historicoRutas.keys()).join(", ")}\n\n`;
    return info;
  }
}
