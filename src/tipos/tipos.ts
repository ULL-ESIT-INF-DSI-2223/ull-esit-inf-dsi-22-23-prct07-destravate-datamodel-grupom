
export type Coordenadas = [latitud: number, longitud: number];

export type DistanciaDesnivel = [distancia: number, desnivel: number];

export type EstadisticaUsuario = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

export type EstadisticaGrupo = [semana: DistanciaDesnivel, mes: DistanciaDesnivel, anio: DistanciaDesnivel];

export type Fecha = [dia: number, mes: number, anio: number];