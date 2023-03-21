import { Ruta } from '../entidades/ruta';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { Actividades } from '../enumerados/enumerados';



export class ColeccionRutas {
  private rutas: Ruta[];

  private static coleccionRutas: ColeccionRutas;
  
  private constructor() {
    this.rutas = [];
  }

  public static getColeccionRutas(): ColeccionRutas{
    if (!ColeccionRutas.coleccionRutas) {
      ColeccionRutas.coleccionRutas = new ColeccionRutas();
    }
    return ColeccionRutas.coleccionRutas;
  }

  getNumeroRutas(): number {
    return ColeccionRutas.coleccionRutas.rutas.length;
  }

  getRutas(): Ruta[] {
    return ColeccionRutas.coleccionRutas.rutas;
  }

  getRuta(id: number): Ruta | undefined {
    for(let i = 0; i < ColeccionRutas.coleccionRutas.rutas.length; i++) {
      if (ColeccionRutas.coleccionRutas.rutas[i].id == id) {
        return ColeccionRutas.coleccionRutas.rutas[i];
      }
    }
    return undefined;
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

