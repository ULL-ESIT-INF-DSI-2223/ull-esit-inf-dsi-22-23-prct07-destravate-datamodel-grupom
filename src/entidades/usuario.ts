import { Ruta } from "./ruta";
import { EstadisticaUsuario } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";
import { ColeccionRutas } from "../colecciones/coleccionRutas";


export class Usuario {
  private static _contadorUsuario = 1000;
  private _id: number;
  private _actividades: Set<Actividades>;
  private _historicoRutas: Map<string, number[]> = new Map();
  private _estadistica: EstadisticaUsuario = [[0, 0], [0, 0], [0, 0]];
  private _amigos: number[] = [];
  private _gruposAmigos: number[] = [];
  private _retosActivos: number[] = [];

  constructor(private _nombre: string, actividades: Actividades[]) {
    this._id = Usuario._contadorUsuario;
    Usuario._contadorUsuario++;
    this._actividades = new Set(actividades);
  }

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

  get id(): number { return this._id; }
  get nombre(): string { return this._nombre; }
  get actividades(): Set<Actividades> { return this._actividades; }
  get amigos(): number[] | undefined { return (this._amigos.length !== 0) ? this._amigos : undefined }
  get gruposAmigos(): number[] | undefined { return (this._gruposAmigos.length !== 0) ? this._gruposAmigos : undefined }
  get estadistica(): EstadisticaUsuario { return this._estadistica; }
  get retosActivos(): number[] | undefined { return this._retosActivos; }
  get historicoRutas(): Map<string, number[]> { return this._historicoRutas; }

  

  esGrupoAmigo(idGrupo: number): boolean {
    return this._gruposAmigos.includes(idGrupo);
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
    this.actualizarEstadisticas(ruta);
    ruta.agregarUsuario(this.id);
    this._gruposAmigos.forEach((idGrupo) => {
      ColeccionGrupos.getColeccionGrupos().getGrupo(idGrupo)?.actualizarEstadistica()
    });
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

  agregarReto(id: number) {
    this._retosActivos.push(id);
  }

  eliminarReto(id: number) {
    this._retosActivos = this._retosActivos.filter((elem) => elem !== id);
  }

  agregarAmigo(amigo: number) {
    this._amigos.push(amigo);
  }

  eliminarAmigo(amigo: number) {
    this._amigos = this._amigos.filter((elem) => elem !== amigo);
  }

  agregarGrupoAmigo(grupoAmigo: number) {
    this._gruposAmigos.push(grupoAmigo);
    ColeccionGrupos.getColeccionGrupos().getGrupo(grupoAmigo)?.agregarUsuario(this.id);
  }

  eliminarGrupoAmigo(grupoAmigo: number) {
    this._gruposAmigos = this._gruposAmigos.filter((elem) => elem !== grupoAmigo);
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

  distanciaTotal(): number {
    let distanciaTotal = 0;
    this.historicoRutas.forEach((value) => {
      value.forEach((idRuta) => {
        let ruta = ColeccionRutas.getRuta(idRuta);
        if (ruta !== undefined) {
          distanciaTotal += ruta.distancia;
        }
      });
    });
    return distanciaTotal;
  }


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
