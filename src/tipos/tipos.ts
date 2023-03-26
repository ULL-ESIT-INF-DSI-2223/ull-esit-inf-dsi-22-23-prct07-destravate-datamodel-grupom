
/**
 * Tipo de dato que permite representar las coordenadas en un mapa
 */
export type Coordenadas = [latitud: number, longitud: number];

/**
 * Tipo de dato que permite representar la distancia y el desnivel de una ruta
 */
export type DistanciaDesnivel = [distancia: number, desnivel: number];

/**
 * Tipo de dato que permite representar la estadística de un usuario
 */
export type EstadisticaUsuario = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

/**
 * Tipo de dato que permite representar la estadística de un grupo
 */
export type EstadisticaGrupo = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

/**
 * Tipo de dato que permite representar la fecha
 */
export type Fecha = [dia: number, mes: number, anio: number];


/**
 * Tipo de dato que permite dar forma a los elementos que se encuentran en la base de datos (Usuarios)
 */
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

/**
 * Tipo de dato que permite dar forma a los elementos que se encuentran en la base de datos (Grupos)
 */
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

/**
 * Tipo de dato que permite dar forma a los elementos que se encuentran en la base de datos (Rutas)
 */
export type RutaDB = {
  _id: number,
  _nombre: string,
  _geolocalizacionInicial: Coordenadas,
  _geolocalizacionFinal: Coordenadas,
  _distancia: number,
  _desnivel: number,
  _usuarios: number[],
  _tipoActividad: string,
  _calificacion: number[],
  _calificacionMedia: number
}

/**
 * Tipo de dato que permite dar forma a los elementos que se encuentran en la base de datos (Retos)
 */
export type RetoDB = {
  _id: number,
  _nombre: string,
  _rutas : number[],
  _tipoActividad: string,
  _distanciaTotal: number,
  _usuarios: number[]
}
