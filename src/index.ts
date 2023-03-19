import { Usuario } from "./usuario";
import { Ruta } from "./ruta";
import { Actividades } from "./usuario";
// import { EstadisticaUsuario } from "./usuario";
// import { DistanciaDesnivel } from "./usuario";
// import { Grupo } from "./grupo";
// import { ColeccionUsuarios } from "./coleccionUsuarios";
// import { ManeraOrdenar } from "./coleccionUsuarios";
import { Coordenadas } from "./ruta";


let usu1 = new Usuario("Zarza", [Actividades.Correr], [1]);
let ruta = new Ruta("ruta", [1,1], [1,1], 1, 2, Actividades.Correr);
let ruta1 = new Ruta("ruta1", [1,1], [1,1], 3, 1, Actividades.Correr);
let ruta2 = new Ruta("ruta1", [1,1], [1,1], 3, 1, Actividades.Correr);

console.log(usu1.estadistica); 
usu1.agregarRuta(ruta);
usu1.agregarRuta(ruta1);
console.log(usu1.historicoRutas);
console.log(usu1.estadistica);
usu1.agregarRuta(ruta2);
console.log(usu1.estadistica);
// let usu2 = new Usuario("Barbaro", [Actividades.Correr], [1]);
// let usu3 = new Usuario("Mesi", [Actividades.Correr], [1]);
// let usu4 = new Usuario("Antonio", [Actividades.Correr], [1]);

// let coleccion = ColeccionUsuarios.getColeccionUsuarios();
// coleccion.agregarUsuario(usu2);
// coleccion.agregarUsuario(usu4);
// coleccion.agregarUsuario(usu3);
// coleccion.agregarUsuario(usu1);

// coleccion.ordenarDistanciaSemana(ManeraOrdenar.Descendente);

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