import { Ruta } from "../entidades/ruta";

export type Coordenadas = [latitud: number, longitud: number];

export type DistanciaDesnivel = [distancia: number, desnivel: number];

export type EstadisticaUsuario = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

export type EstadisticaGrupo = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

export type Fecha = [dia: number, mes: number, anio: number];

export type UsuarioDB = {
  _nombre: string,
  _retosActivos: number[],
  _id: number,
  _actividades: string[];
  _historicoFechas: string[],
  _historicoRutas: number[][],
  _estadistica: EstadisticaUsuario,
  _amigos: number[] | undefined,
  _gruposAmigos: number[] | undefined
}

export type GrupoDB = {
  _id: number,
  _creador: number,
  _nombre: string,
  _participantes: number[],
  _estadistica: EstadisticaGrupo,
  _clasificacion: number[],
  _historicoFechas: string[],
  _historicoRutas: number[][]
}


export type RutaDB = {
  _id: number,
  _nombre: string,
  _geolocalizacionInicial: Coordenadas,
  _geolocalizacionFinal: Coordenadas,
  _distancia: number,
  _desnivel: number,
  _usuarios: number[],
  _tipoActividad: string,
  _calificacionMedia: number
}


export type RetoDB = {
  _id: number,
  _nombre: string,
  _rutas : number[],
  _tipoActividad: string,
  _distanciaTotal: number,
  _usuarios: number[]
}
