// import { ManejadorJSON } from "./utilidades/manejadorJSON";
import { ColeccionUsuarios } from "./colecciones/coleccionUsuarios";
import { ColeccionGrupos } from "./colecciones/coleccionGrupos";
import { ColeccionRutas } from "./colecciones/coleccionRutas";
import { ColeccionRetos } from "./colecciones/coleccionRetos";
import { Gestor } from "./utilidades/gestor";
// import { Ruta } from "./entidades/ruta";
// import { Actividades } from "./enumerados/enumerados";
// import { Usuario } from "./entidades/usuario";
// import { Grupo } from "./entidades/grupo";
// import { Reto } from "./entidades/reto";

const coleccionRutas = ColeccionRutas.getColeccionRutas();
const coleccionUsuarios = ColeccionUsuarios.getColeccionUsuarios();
const coleccionGrupos = ColeccionGrupos.getColeccionGrupos();
const coleccionRetos = ColeccionRetos.getColeccionRetos();


// INICIALIZAR LA BASE DE DATOS 
// Al menos 10 rutas distintas.

// let ruta1 = new Ruta('Vuelta al parque', [1,2], [3,4], 4, 5, Actividades.Correr);
// let ruta2 = new Ruta('Desafio Colina', [4,8], [30,4], 4, 7, Actividades.Bicicleta);
// let ruta3 = new Ruta('Ciudad', [1, 6], [3,4], 43, 3, Actividades.Bicicleta);
// let ruta4 = new Ruta('Carrera puentes', [10, 21], [3,4], 40, 50, Actividades.Correr);
// let ruta5 = new Ruta('Vuelta al mundo', [14, 12], [3,4], 1, 51, Actividades.Correr);
// let ruta6 = new Ruta('Gran Ruta', [75, 12], [7,21], 12, 14, Actividades.Bicicleta);
// let ruta7 = new Ruta('La Larga', [8, 78], [3,7], 12, 23, Actividades.Correr);
// let ruta8 = new Ruta('La Playa', [6, 35], [5,1], 90, 20, Actividades.Bicicleta);
// let ruta9 = new Ruta('Bosque', [12, 56], [2,1], 10, 23, Actividades.Bicicleta);
// let ruta10 = new Ruta('Pueblos juntos', [1,8], [8,4], 11, 31, Actividades.Correr);
// coleccionRutas.agregarRuta(ruta1);
// coleccionRutas.agregarRuta(ruta2);
// coleccionRutas.agregarRuta(ruta3);
// coleccionRutas.agregarRuta(ruta4);
// coleccionRutas.agregarRuta(ruta5);
// coleccionRutas.agregarRuta(ruta6);
// coleccionRutas.agregarRuta(ruta7);
// coleccionRutas.agregarRuta(ruta8);
// coleccionRutas.agregarRuta(ruta9);
// coleccionRutas.agregarRuta(ruta10);


// Incluir al menos 20 usuarios distintos.

// let juan = new Usuario('Juan', [Actividades.Correr]);
// let maria = new Usuario('maria', [Actividades.Bicicleta]);
// let pepe = new Usuario('pepe', [Actividades.Bicicleta]);
// let roberto = new Usuario('roberto', [Actividades.Bicicleta]);
// let manuel = new Usuario('manuel', [Actividades.Bicicleta]);
// let alberto = new Usuario('alberto', [Actividades.Bicicleta]);
// let alfonso = new Usuario('alfonso', [Actividades.Bicicleta]);
// let alvaro = new Usuario('alvaro', [Actividades.Bicicleta]);
// let sara = new Usuario('sara', [Actividades.Bicicleta]);
// let lara = new Usuario('lara', [Actividades.Bicicleta]);

// let marta = new Usuario('marta', [Actividades.Correr]);
// let mario = new Usuario('mario', [Actividades.Bicicleta]);
// let alejandra = new Usuario('alejandra', [Actividades.Bicicleta]);
// let victor = new Usuario('victor', [Actividades.Bicicleta]);
// let eduardo = new Usuario('eduardo', [Actividades.Bicicleta]);
// let lucas = new Usuario('lucas', [Actividades.Bicicleta]);
// let violeta = new Usuario('violeta', [Actividades.Bicicleta]);
// let cristina = new Usuario('cristina', [Actividades.Bicicleta]);
// let tini = new Usuario('tini', [Actividades.Bicicleta]);
// let hugo = new Usuario('hugo', [Actividades.Bicicleta]);


// coleccionUsuarios.agregarUsuario(juan);
// coleccionUsuarios.agregarUsuario(maria);
// coleccionUsuarios.agregarUsuario(pepe);
// coleccionUsuarios.agregarUsuario(roberto);
// coleccionUsuarios.agregarUsuario(manuel);
// coleccionUsuarios.agregarUsuario(alberto);
// coleccionUsuarios.agregarUsuario(alfonso);
// coleccionUsuarios.agregarUsuario(alvaro);
// coleccionUsuarios.agregarUsuario(sara);
// coleccionUsuarios.agregarUsuario(lara);

// coleccionUsuarios.agregarUsuario(marta);
// coleccionUsuarios.agregarUsuario(mario);
// coleccionUsuarios.agregarUsuario(alejandra);
// coleccionUsuarios.agregarUsuario(victor);
// coleccionUsuarios.agregarUsuario(eduardo);
// coleccionUsuarios.agregarUsuario(lucas);
// coleccionUsuarios.agregarUsuario(violeta);
// coleccionUsuarios.agregarUsuario(cristina);
// coleccionUsuarios.agregarUsuario(tini);
// coleccionUsuarios.agregarUsuario(hugo);



// Un mínimo de 5 grupos.


// let poderosos = new Grupo('Poderosos', juan.id);
// let terribles = new Grupo('Los terribles', maria.id);
// let magnificos = new Grupo('Magnificos', eduardo.id);
// let malos = new Grupo('Los malos', mario.id);
// let buenos = new Grupo('Los buenos', violeta.id);

// coleccionGrupos.agregarGrupo(poderosos);
// coleccionGrupos.agregarGrupo(terribles);
// coleccionGrupos.agregarGrupo(magnificos);
// coleccionGrupos.agregarGrupo(malos);
// coleccionGrupos.agregarGrupo(buenos);

// poderosos.agregarUsuario(cristina.id);
// poderosos.agregarUsuario(pepe.id);

// terribles.agregarUsuario(roberto.id);
// terribles.agregarUsuario(manuel.id);
// terribles.agregarUsuario(tini.id);

// magnificos.agregarUsuario(alberto.id);
// magnificos.agregarUsuario(alfonso.id);

// malos.agregarUsuario(alvaro.id);

// buenos.agregarUsuario(sara.id);
// buenos.agregarUsuario(lara.id);
// buenos.agregarUsuario(marta.id);



// Al menos 3 retos.


// let finMundoReto = new Reto("El Fin del Mundo", [ruta1, ruta3], Actividades.Bicicleta)
// let universidadReto = new Reto("Universidad Reto", [ruta2], Actividades.Correr)
// let lagrimasReto = new Reto("LagrimasReto", [ruta2], Actividades.Correr)

// coleccionRetos.agregarReto(finMundoReto);
// coleccionRetos.agregarReto(universidadReto);
// coleccionRetos.agregarReto(lagrimasReto);

// finMundoReto.agregarUsuario(juan.id);
// universidadReto.agregarUsuario(maria.id);
// lagrimasReto.agregarUsuario(pepe.id);

// juan.agregarRuta(ruta1);
// juan.agregarRuta(ruta2);
// maria.agregarRuta(ruta2);
// maria.agregarRuta(ruta3);
// pepe.agregarRuta(ruta3);
// pepe.agregarRuta(ruta4);
// alvaro.agregarRuta(ruta2);

// mario.agregarRuta(ruta1);
// mario.agregarRuta(ruta2);
// eduardo.agregarRuta(ruta2);
// eduardo.agregarRuta(ruta3);
// lara.agregarRuta(ruta3);
// lara.agregarRuta(ruta4);
// sara.agregarRuta(ruta2);

// roberto.agregarRuta(ruta4);
// manuel.agregarRuta(ruta5);
// manuel.agregarRuta(ruta6);
// alberto.agregarRuta(ruta6);
// alfonso.agregarRuta(ruta1);
// alfonso.agregarRuta(ruta2);

// lucas.agregarRuta(ruta4);
// cristina.agregarRuta(ruta5);
// tini.agregarRuta(ruta6);


// ManejadorJSON.actualizarUsuariosDB();
// ManejadorJSON.actualizarGruposDB();
// ManejadorJSON.actualizarRutasDB();
// ManejadorJSON.actualizarRetosDB();


Gestor.inicio();