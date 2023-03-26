import { GrupoDB, RetoDB, RutaDB, UsuarioDB } from "../tipos/tipos";

/**
 * Interfaz de la base de datos de usuarios
 */
export interface interfazUsuarioDB {
  usuarios: UsuarioDB[];
}

/**
 * Interfaz de la base de datos de grupos
 */
export interface interfazGrupoDB {
  grupos: GrupoDB[];
}

/**
 * Interfaz de la base de datos de rutas
 */
export interface interfazRutaDB {
  rutas: RutaDB[];
}

/**
 * Interfaz de la base de datos de retos
 */
export interface interfazRetoDB {
  retos: RetoDB[];
}