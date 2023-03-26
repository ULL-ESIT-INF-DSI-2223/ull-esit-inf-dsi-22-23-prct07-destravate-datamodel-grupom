/**
 * Enumerado que representa los tipos de actividades que se pueden realizar en una ruta o en un reto
 */
export enum Actividades { 
  "Correr" = "Correr",
  "Bicicleta" = "Bicicleta"
}

/**
 * Enumerado que representa las maneras de ordenar
 */
export enum ManeraOrdenar { 
  "Ascendente" = "Ascendente",
  "Descendente" = "Descendente"
}

/**
 * Enumerado que representa los tipos de ordenación de las rutas
 */
export enum OrdenarRuta {
  Alfabeticamente = "Alfabéticamente",
  CantidadUsuarios = "Cantidad de usuarios",
  Longitud = "Longitud",
  Calificacion = "Calificación",
  Actividad = "Actividad"
}

/**
 * Enumerado que representa los tipos de ordenación de los usuarios
 */
export enum OrdenarUsuario {
  Alfabeticamente = "Alfabéticamente",
  CantidadKMSemana = "Cantidad de kilómetros semanal",
  CantidadKMMes = "Cantidad de kilómetros mensual",
  CantidadKMAnio = "Cantidad de kilómetros anual"
}

/**
 * Enumerado que representa los tipos de ordenación de los grupos
 */
export enum OrdenarGrupo {
  Alfabeticamente = "Alfabéticamente",
  CantidadKMSemana = "Cantidad de kilómetros semanal",
  CantidadKMMes = "Cantidad de kilómetros mensual",
  CantidadKMAnio = "Cantidad de kilómetros anual",
  CantidadUsuarios = "Cantidad de usuarios"
}

/**
 * Enumerado que representa los tipos de ordenación de los retos
 */
export enum OrdenarReto {
  Alfabeticamente = "Alfabéticamente",
  CantidadKM = "Cantidad de kilómetros",
  CantidadUsuarios = "Cantidad de usuarios"
}

/**
 * Enumerado que representa las opciones que se pueden elegir al iniciar el programa
 */
export enum ComandosInicio {
  IniciarSesion = "Iniciar sesión",
  Registrarse = "Registrarse",
  Salir = "Salir"
}

/**
 * Enumerado que representa las opciones que se pueden elegir luego de iniciar sesión o registrarse
 */
export enum ComandosPrincipal {
  VerListaUsuarios = "Ver la lista de usuarios",
  VerListaRutas = "Ver la lista de rutas",
  VerListaGrupos = "Ver la lista de grupos",
  VerListaRetos = "Ver la lista de retos",
  AgregarAmigo = "Agregar un amigo",
  EliminarAmigo = "Eliminar un amigo",
  UnirseGrupo = "Unirse a un grupo",
  CrearGrupo = "Crear un grupo",
  EliminarGrupo = "Eliminar un grupo",
  CrearReto = "Crear un reto",
  CrearRuta = "Crear una ruta",
  EliminarReto = "Eliminar un reto",
  EliminarRuta = "Eliminar una ruta",
  Salir = "Salir"
}
