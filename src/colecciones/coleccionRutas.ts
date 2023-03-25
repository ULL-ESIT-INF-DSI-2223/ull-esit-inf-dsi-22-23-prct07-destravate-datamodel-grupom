import { Ruta } from '../entidades/ruta';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { Actividades } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';



export class ColeccionRutas {
  private rutas: Ruta[];

  private static coleccionRutas: ColeccionRutas;
  
  private constructor(rutasDB: Ruta[]) {
    this.rutas = rutasDB;
  }

  public static getColeccionRutas(): ColeccionRutas{
    if (!ColeccionRutas.coleccionRutas) {
      ColeccionRutas.coleccionRutas = new ColeccionRutas(ManejadorJSON.extraccionRutasDB());
    }
    return ColeccionRutas.coleccionRutas;
  }

  public static getNumeroRutas(): number {
    return ColeccionRutas.coleccionRutas.rutas.length;
  }

  getRutas(): Ruta[] {
    return ColeccionRutas.coleccionRutas.rutas;
  }

  public static getRuta(id: number): Ruta | undefined {
    return ColeccionRutas.coleccionRutas.rutas.find((ruta) => ruta.id === id) || undefined;
  }

  agregarRuta(Ruta: Ruta): void {
    ColeccionRutas.coleccionRutas.rutas.push(Ruta);
  }
  
  eliminarRuta(Ruta: Ruta): Ruta | undefined {
    let tamanoOriginal = ColeccionRutas.coleccionRutas.rutas.length;
    ColeccionRutas.coleccionRutas.rutas = ColeccionRutas.coleccionRutas.rutas.filter((u) => u !== Ruta);
    let tamanoFinal = ColeccionRutas.coleccionRutas.rutas.length;
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    return Ruta;
  }

  imprimirInformacion(): void {
    ColeccionRutas.coleccionRutas.rutas.forEach(element => {
      console.log(element);
    });
  }

  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  ordenarId(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  ordenarCantidadUsuarios(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.usuarios.length - b.usuarios.length);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }

  ordenarDistancia(opcion: ManeraOrdenar) {
    ColeccionRutas.coleccionRutas.rutas.sort((a, b) => a.distancia - b.distancia);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionRutas.coleccionRutas.rutas.reverse();
    }
  }
  
  ordenarActividad(actividad: Actividades) {
    let parteCiclismo = ColeccionRutas.coleccionRutas.rutas.filter((ruta) => ruta.tipoActividad === Actividades.Bicicleta);
    let parteCorredor = ColeccionRutas.coleccionRutas.rutas.filter((ruta) => ruta.tipoActividad === Actividades.Correr);
    parteCiclismo.sort((a, b) => a.id - b.id);
    parteCorredor.sort((a, b) => a.id - b.id);
    if(actividad === Actividades.Bicicleta) {
      ColeccionRutas.coleccionRutas.rutas = parteCiclismo.concat(parteCorredor);
    } else {
      ColeccionRutas.coleccionRutas.rutas = parteCorredor.concat(parteCiclismo);
    }
  }
}

