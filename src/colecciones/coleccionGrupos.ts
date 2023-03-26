import { ColeccionUsuarios } from './coleccionUsuarios';
import { Grupo } from '../entidades/grupo';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';



export class ColeccionGrupos {
  private Grupos: Grupo[];

  private static coleccionGrupos: ColeccionGrupos;
  
  private constructor(gruposDB: Grupo[]) {
    this.Grupos = gruposDB;
  }

  public static getColeccionGrupos(): ColeccionGrupos{
    if (!ColeccionGrupos.coleccionGrupos) {
      ColeccionGrupos.coleccionGrupos = new ColeccionGrupos(ManejadorJSON.extraccionGruposDB());

    }
    return ColeccionGrupos.coleccionGrupos;
  }

  getNumeroGrupos(): number {
    return ColeccionGrupos.coleccionGrupos.Grupos.length;
  }

  getGrupos(): Grupo[] {
    return ColeccionGrupos.coleccionGrupos.Grupos;
  }

  getGrupo(id: number): Grupo | undefined {
    for(let i = 0; i < ColeccionGrupos.coleccionGrupos.Grupos.length; i++) {
      if (ColeccionGrupos.coleccionGrupos.Grupos[i].id == id) {
        return ColeccionGrupos.coleccionGrupos.Grupos[i];
      }
    }
    return undefined;
  }

  agregarGrupo(grupo: Grupo): void {
    ColeccionGrupos.coleccionGrupos.Grupos.push(grupo);
  }


  eliminarGrupo(grupoID: number): number | undefined {
    let tamanoOriginal = ColeccionGrupos.coleccionGrupos.getNumeroGrupos();
    ColeccionGrupos.getColeccionGrupos().Grupos = ColeccionGrupos.getColeccionGrupos().getGrupos().filter((u) => u.id !== grupoID);
    let tamanoFinal = ColeccionGrupos.coleccionGrupos.getNumeroGrupos();
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    ManejadorJSON.eliminarGrupoDB(grupoID);
    return grupoID;
  }

  imprimirInformacion(): void {
    ColeccionGrupos.coleccionGrupos.Grupos.forEach(element => {
      console.log(element);
    });
  }

  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  ordenarId(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  ordenarDistanciaSemana(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[0][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[0][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  ordenarDistanciaMes(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[1][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[1][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }

  ordenarDistanciaAnio(opcion: ManeraOrdenar) {  
    const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => 
    a.participantes.reduce((acc, numUsuA) => acc + coleccionUsuarios.getEstadistica(numUsuA)[2][0], 0) - 
    b.participantes.reduce((acc, numUsuB) => acc + coleccionUsuarios.getEstadistica(numUsuB)[2][0], 0));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }


  ordenarCantidadMiembros(opcion: ManeraOrdenar) {
    ColeccionGrupos.coleccionGrupos.Grupos.sort((a, b) => a.participantes.length - b.participantes.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionGrupos.coleccionGrupos.Grupos.reverse();
    }
  }
}

