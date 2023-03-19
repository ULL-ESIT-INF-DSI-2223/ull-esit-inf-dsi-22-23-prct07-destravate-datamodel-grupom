import { Usuario } from './usuario';

export enum ManeraOrdenar { "Ascendente" = "Ascendente", "Descendente" = "Descendente" }


export class ColeccionUsuarios {
  private usuarios: Usuario[];

  private static coleccionUsuarios: ColeccionUsuarios;
  
  private constructor() {
    this.usuarios = [];
  }

  public static getColeccionUsuarios(): ColeccionUsuarios{
    if (!ColeccionUsuarios.coleccionUsuarios) {
      ColeccionUsuarios.coleccionUsuarios = new ColeccionUsuarios();
    }
    return ColeccionUsuarios.coleccionUsuarios;
  }

  getNumeroUsuarios(): number {
    return ColeccionUsuarios.coleccionUsuarios.usuarios.length;
  }

  getUsuarios(): Usuario[] {
    return ColeccionUsuarios.coleccionUsuarios.usuarios;
  }

  getUsuario(id: number): Usuario | undefined {
    for(let i = 0; i < ColeccionUsuarios.coleccionUsuarios.usuarios.length; i++) {
      if (ColeccionUsuarios.coleccionUsuarios.usuarios[i].id == id) {
        return ColeccionUsuarios.coleccionUsuarios.usuarios[i];
      }
    }
    return undefined;
  }

  agregarUsuario(usuario: Usuario): void {
    ColeccionUsuarios.coleccionUsuarios.usuarios.push(usuario);
  }
  
  eliminarUsuario(usuario: Usuario): Usuario | undefined {
    let tamanoOriginal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    ColeccionUsuarios.coleccionUsuarios.usuarios = ColeccionUsuarios.coleccionUsuarios.usuarios.filter((u) => u !== usuario);
    let tamanoFinal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    return usuario;
  }

  imprimirInformacion(): void {
    ColeccionUsuarios.coleccionUsuarios.usuarios.forEach(element => {
      console.log(element);
    });
  }

  ordenarAlfabeticamente(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarId(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.id - b.id);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarDistanciaSemana(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[0][0] - b.estadistica[0][0]);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarDistanciaMes(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[1][0] - b.estadistica[1][0]);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarDistanciaAnio(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[2][0] - b.estadistica[2][0]);
    if (opcion === ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }
}

