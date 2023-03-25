import { Grupo } from "./grupo";
import { Ruta } from "./ruta";
import { EstadisticaUsuario } from "../tipos/tipos";
import { Actividades } from "../enumerados/enumerados";
import { ColeccionGrupos } from "../colecciones/coleccionGrupos";


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

  public ContructorDBUsuario(actividades: string[], historicoFechas: string[], historicoRutas: number[][], estadistica: EstadisticaUsuario, 
    amigos: number[] | undefined, gruposAmigos: number[] | undefined) {
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
    this.actualizarEstadisticas(ruta);
    ruta.agregarUsuario(this.id);
    // TODO revisar esta parte de abajo qeu se actualicen las estadisticas de los grupos
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
  // método que calcula la ruta favorita --> la que más veces se ha realizado en el vector de historico
  // TODO
  // método que agrega la id de un amigo a la lista de amigos
  agregarAmigo(amigo: Usuario) {
    // TODO comprobar BDD
    this._amigos.push(amigo.id);
  }
  // método que agrega la id de un grupoamigo a la lista de gruposamigos
  agregarGrupoAmigo(grupoAmigo: Grupo) {
    // TODO comprobar BDD
    this._gruposAmigos.push(grupoAmigo.id);
  }
  // TODO
  // creamos un metodo que pregunte al usaurio si quiere meter retos,
  // if(no quiere) {se deja el array de retos vacíos}
  // else {se le pregunta cuantos retos quiere meter y se le pide que los meta (el id de los retos)}
}


