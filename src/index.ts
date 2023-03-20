// import { Usuario } from "./usuario";
// import { Ruta } from "./ruta";
// import { Reto } from "./reto";
// import { Actividades } from "./usuario";
// import { EstadisticaUsuario } from "./usuario";
// import { DistanciaDesnivel } from "./usuario";
// import { Grupo } from "./grupo";
// import { ColeccionUsuarios } from "./coleccionUsuarios";
// import { ColeccionRetos } from "./coleccionRetos";
// import { ColeccionRutas } from "./coleccionRutas";
// import { ManeraOrdenar } from "./coleccionUsuarios";
// import { Coordenadas } from "./ruta";


// let usu1 = new Usuario("Zarza", [Actividades.Correr], [1]);
// let usu2 = new Usuario("Aristizabal", [Actividades.Correr], [1]);
// let ruta1 = new Ruta("rrrr", [1,1], [1,1], 30, 1, Actividades.Correr);
// let ruta2 = new Ruta("aaaa", [1,1], [1,1], 10, 2, Actividades.Bicicleta);
// let ruta4 = new Ruta("zzzz", [1,1], [1,1], 20, 1, Actividades.Correr);
// let ruta6 = new Ruta("bbbb", [1,1], [1,1], 40, 1, Actividades.Correr);

// usu1.agregarRuta(ruta1);
// usu2.agregarRuta(ruta1);
// usu2.agregarRuta(ruta6);

// let coleccion = ColeccionRutas.getColeccionRutas();
// coleccion.agregarRuta(ruta1);
// coleccion.agregarRuta(ruta2);
// coleccion.agregarRuta(ruta4);
// coleccion.agregarRuta(ruta6);

// coleccion.imprimirInformacion();
// coleccion.ordenarActividad(Actividades.Correr);
// coleccion.imprimirInformacion();

// console.log(usu1.estadistica); 
// usu1.agregarRuta(ruta);
// usu1.agregarRuta(ruta1);
// usu1.agregarRuta(ruta2);
// console.log(usu1.historicoRutas);
// console.log(usu1.estadistica);
// usu1.agregarRuta(ruta2);
// console.log(usu1.estadistica);

// let usu1 = new Usuario("Zarza", [Actividades.Correr], [1]);
// let usu2 = new Usuario("Barbaro", [Actividades.Correr], [1]);
// let usu3 = new Usuario("Mesi", [Actividades.Correr], [1]);
// let usu4 = new Usuario("Antonio", [Actividades.Correr], [1]);

// let coleccion = ColeccionUsuarios.getColeccionUsuarios();
// coleccion.agregarUsuario(usu2);
// coleccion.agregarUsuario(usu4);
// coleccion.agregarUsuario(usu3);
// coleccion.agregarUsuario(usu1);

// usu1.agregarRuta(ruta1);
// usu1.agregarRuta(ruta2);
// usu3.agregarRuta(ruta2);

// console.log(usu1)
// coleccion.ordenarDistanciaSemana(ManeraOrdenar.Descendente)
// coleccion.imprimirInformacion();

// coleccion.imprimirInformacion();
// coleccion.imprimirInformacion();

// console.log(usu1.gruposAmigos)
// usu1.agregarAmigo(usu3);
// console.log(usu1.gruposAmigos)
// console.log(typeof(usu1.estadistica))

// console.log(usu1.id);
// console.log(usu1.nombre);

// console.log(usu1.id)
// console.log(usu2.id)
// console.log(usu3.tipo)


// let ret1 = new Reto("elpepe", [ruta1, ruta2], Actividades.Correr);
// let ret2 = new Reto("antonio", [ruta1, ruta6], Actividades.Bicicleta);
// let ret3 = new Reto("xilofono", [ruta2, ruta4], Actividades.Correr);

// let colret = ColeccionRetos.getColeccionRetos();
// colret.agregarReto(ret3);
// colret.agregarReto(ret1);
// colret.agregarReto(ret2);

// // colret.imprimirInformacion();
// colret.ordenarCantidadUsuarios(ManeraOrdenar.Descendente);
// // colret.eliminarReto(ret1);
// colret.imprimirInformacion();

// console.log(usu1.estadistica)
