import { EstadisticaUsuario } from '../tipos/tipos';
import { Usuario } from '../entidades/usuario';
import { ManeraOrdenar } from '../enumerados/enumerados';
import { ManejadorJSON } from '../utilidades/manejadorJSON';



export class ColeccionUsuarios {
  private usuarios: Usuario[];

  private static coleccionUsuarios: ColeccionUsuarios;
  
  private constructor( usuariosDB: Usuario[]) {
    this.usuarios = usuariosDB;
  }

  public static getColeccionUsuarios(): ColeccionUsuarios{
    if (!ColeccionUsuarios.coleccionUsuarios) {
      ColeccionUsuarios.coleccionUsuarios = new ColeccionUsuarios(ManejadorJSON.extraccionUsuariosDB());
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

  getEstadistica(id: number): EstadisticaUsuario {
    for(let i = 0; i < ColeccionUsuarios.coleccionUsuarios.usuarios.length; i++) {
      if (ColeccionUsuarios.coleccionUsuarios.usuarios[i].id == id) {
        return ColeccionUsuarios.coleccionUsuarios.usuarios[i].estadistica;
      }
    }
    return [[0, 0], [0,0], [0,0]];
  }

  agregarUsuario(usuario: Usuario): void {
    ColeccionUsuarios.coleccionUsuarios.usuarios.push(usuario);
    ManejadorJSON.agregarUsuarioDB(usuario);
  }
  
  eliminarUsuario(usuario: Usuario): Usuario | undefined {
    let tamanoOriginal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    ColeccionUsuarios.coleccionUsuarios.usuarios = ColeccionUsuarios.coleccionUsuarios.usuarios.filter((u) => u !== usuario);
    let tamanoFinal = ColeccionUsuarios.coleccionUsuarios.usuarios.length;
    if(tamanoFinal === tamanoOriginal) {
      return undefined;
    }
    // ManejadorJSON.eliminarUsuarioDB(usuario);
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
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarDistanciaMes(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[1][0] - b.estadistica[1][0]);
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  ordenarDistanciaAnio(opcion: ManeraOrdenar) {
    ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.estadistica[2][0] - b.estadistica[2][0]);
    if (opcion !== ManeraOrdenar.Descendente) {
      ColeccionUsuarios.coleccionUsuarios.usuarios.reverse();
    }
  }

  // TODO comprobar que esto está bien
  ordenarNumeroRutas(id: number): [Usuario, Usuario, Usuario] {
    let coleccion = ColeccionUsuarios.coleccionUsuarios.usuarios.sort((a, b) => a.historicoRutas.size - b.historicoRutas.size);
    coleccion = coleccion.filter((user) => user.esGrupoAmigo(id));
    return [coleccion[0], coleccion[1], coleccion[2]];
  }
}
