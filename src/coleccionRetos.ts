import { Reto } from './reto';

export enum ManeraOrdenar { "Ascendente" = "Ascendente", "Descendente" = "Descendente" }


export class ColeccionRetos {
  private retos: Reto[];

  private static coleccionRetos: ColeccionRetos;
  
  private constructor() {
    this.retos = [];
  }

  public static getColeccionRetos(): ColeccionRetos{
    if (!ColeccionRetos.coleccionRetos) {
      ColeccionRetos.coleccionRetos = new ColeccionRetos();
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
  
  eliminarReto(Reto: Reto): Reto | undefined {
    let tamanoOriginal = ColeccionRetos.coleccionRetos.retos.length;
    ColeccionRetos.coleccionRetos.retos = ColeccionRetos.coleccionRetos.retos.filter((u) => u !== Reto);
    let tamanoFinal = ColeccionRetos.coleccionRetos.retos.length;
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    return Reto;
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

