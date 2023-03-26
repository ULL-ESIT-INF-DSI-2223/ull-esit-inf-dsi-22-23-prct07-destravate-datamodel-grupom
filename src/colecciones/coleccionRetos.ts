import { Reto } from '../entidades/reto';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';
import { ColeccionUsuarios } from './coleccionUsuarios';



export class ColeccionRetos {
  private retos: Reto[];

  private static coleccionRetos: ColeccionRetos;
  
  private constructor(retosDB: Reto[]) {
    this.retos = retosDB;
  }

  public static getColeccionRetos(): ColeccionRetos {
    if (!ColeccionRetos.coleccionRetos) {
      ColeccionRetos.coleccionRetos = new ColeccionRetos(ManejadorJSON.extraccionRetosDB());
    }
    return ColeccionRetos.coleccionRetos;
  }

  getNumeroRetos(): number {
    return ColeccionRetos.coleccionRetos.retos.length;
  }

  getRetos(): Reto[] {
    return ColeccionRetos.coleccionRetos.retos;
  }

  getReto(id: number): Reto | undefined {
    for(let i = 0; i < ColeccionRetos.coleccionRetos.retos.length; i++) {
      if (ColeccionRetos.coleccionRetos.retos[i].id == id) {
        return ColeccionRetos.coleccionRetos.retos[i];
      }
    }
    return undefined;
  }

  agregarReto(Reto: Reto): void {
    ColeccionRetos.coleccionRetos.retos.push(Reto);
  }
  
  eliminarReto(retoID: number): number | undefined {
    const usuariosReto = ColeccionRetos.getColeccionRetos().getReto(retoID)?.usuarios;
    let tamanoOriginal = ColeccionRetos.coleccionRetos.getNumeroRetos();
    ColeccionRetos.getColeccionRetos().retos = ColeccionRetos.getColeccionRetos().getRetos().filter((u) => u.id !== retoID);
    let tamanoFinal = ColeccionRetos.coleccionRetos.getNumeroRetos();
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    if(usuariosReto !== undefined) {
      for (let i = 0; i < usuariosReto.length; i++) {
        ColeccionUsuarios.getColeccionUsuarios().getUsuario(usuariosReto[i])?.eliminarReto(retoID)
      }
    }
    ManejadorJSON.eliminarRetoDB(retoID);
    return retoID;
  }

  imprimirInformacion(): void {
    ColeccionRetos.coleccionRetos.retos.forEach(element => {
      console.log(element);
    });
  }

  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  ordenarId(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  ordenarDistancia(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.distanciaTotal - b.distanciaTotal);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }

  ordenarCantidadUsuarios(opcion: ManeraOrdenar) {
    ColeccionRetos.coleccionRetos.retos.sort((a, b) => a.usuarios.length - b.usuarios.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRetos.coleccionRetos.retos.reverse();
    }
  }
}

