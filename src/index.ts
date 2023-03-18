import { Usuario } from "./usuario";
import { Actividades } from "./usuario";
import { EstadisticaUsuario } from "./usuario";
import { DistanciaDesnivel } from "./usuario";
import { Grupo } from "./grupo";


let usu1 = new Usuario("Pepe", [Actividades.Correr], [1]);
let usu2 = new Usuario("Pepe2", [Actividades.Correr], [1]);
let usu3 = new Usuario("Pepe3", [Actividades.Correr], [1]);

let grupo = new Grupo("loscremas", [usu1.id, usu2.id, usu3.id]);

console.log(usu1.gruposAmigos)
usu1.agregarAmigo(usu3);
console.log(usu1.gruposAmigos)


// console.log(usu1.id);
// console.log(usu1.nombre);



// console.log(usu1.id)
// console.log(usu2.id)
// console.log(usu3.tipo)