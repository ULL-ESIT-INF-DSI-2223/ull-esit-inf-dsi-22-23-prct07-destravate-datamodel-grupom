// ID único del grupo.
// Nombre del grupo.
// Participantes: IDs de los miembros del grupo.
// Estadísticas de entrenamiento grupal: Cantidad de km y desnivel total acumulados de manera grupal en la semana, mes y año
// Clasificación de los usuarios: Ranking de los usuarios que más entrenamientos han realizado históricamente dentro del grupo, 
// es decir, ordenar los usuarios por la cantidad de km totales o desnivel total que han acumulado.
// Rutas favoritas del grupo: Rutas que los usuarios del grupo han realizado con mayor frecuencia en sus salidas conjuntas.
// Histórico de rutas realizadas por el grupo: Información similar que almacenan los usuarios pero en este caso referente a los grupos. 
// Nótese que un usuario puede realizar rutas con un grupo y/o de manera individual el mismo día. Es decir, a modo de simplificación, 
// asumimos que todos los usuarios de un grupo realizan la actividad cuando se planifica. Aunque, también pueden realizar otras
// actividades de manera individual.

import { DistanciaDesnivel } from "./usuario";

export type EstadisticaGrupo = [dia: DistanciaDesnivel, semana: DistanciaDesnivel, anio: DistanciaDesnivel];

export class Grupo {
  private static _contadorGrupo = 1000;
  private _id: string;
  private _estadistica: EstadisticaGrupo;
  private _clasificacion: number[];
  constructor(private nombre: string, private participantes: number[]) {
    this._id = "GR_" + Grupo._contadorGrupo;
    Grupo._contadorGrupo++;
  }

  get id(): number { return Number(this._id.split("_")[1]); }
  
}