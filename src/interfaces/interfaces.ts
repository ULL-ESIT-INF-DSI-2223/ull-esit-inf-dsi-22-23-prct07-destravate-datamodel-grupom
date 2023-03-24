import { GrupoDB, RetoDB, RutaDB, UsuarioDB } from "../tipos/tipos";

export interface interfazUsuarioDB {
  usuarios: UsuarioDB[];
}


export interface interfazGrupoDB {
  grupos: GrupoDB[];
}


export interface interfazRutaDB {
  rutas: RutaDB[];
}


export interface interfazRetoDB {
  retos: RetoDB[];
}