// import * as lowdb from "lowdb";
// import * as FileSync from "lowdb/adapters/FileSync";
// import * as inquirer from 'inquirer';
// import { Usuario } from "./usuario";
// import { Actividades } from "./usuario";

// // Crea una instancia de la base de datos
// const adapter = new FileSync('./db/usuario.json');
// const db = lowdb(adapter);

// const numbers = [1, 2, 3, 4, 5];
// // const menu = inquirer.prompt().then(answers => {
    
// //   let usu1 = new Usuario(answers.name, answers.actividad, answers.retos);
// //   db.set('usu', usu1).write();

  
// //   process.exit();
  
// // });



// const prompt1 = [
//   {
//     type: 'input',
//     name: 'name',
//     message: '¿Cuál es tu nombre?'
//   },
//   {
//     type: 'input',
//     name: 'retos',
//     message: 'Dime los retos'
//   },
//   {
//     type: 'checkbox',
//     name: 'actividad',
//     message: '¿Qué actividad realiza?',
//     choices: [Actividades.Bicicleta, Actividades.Correr]
//   },
//   {
//     type: 'checkbox',
//     message: 'Seleccione los números que desea:',
//     name: 'selectedNumbers',
//     choices: numbers.map(n => ({ name: n.toString(), value: n })),
//     validate: function(answers1: string | any[]) {
//       if (answers1.length < 1) {
//         return 'Debe seleccionar al menos un número.';
//       }
//       return true;
//     }
//   }
  
// ];

// const prompt2 = [
//   {
//     type: 'input',
//     message: 'Ingresa tu correo electrónico:',
//     name: 'email',
//   },
// ];

// const prompt3 = [
//   {
//     type: 'list',
//     message: 'Selecciona una opción:',
//     name: 'option',
//     choices: ['Opción 1', 'Opción 2', 'Opción 3'],
//   },
// ];

// const promptManager = inquirer.createPromptModule();

// promptManager(prompt2)
//   //.then((answers1) => promptManager(prompt2))
//   .then((answers2) => promptManager(prompt3))
//   .then((answers3) => console.log('Respuestas:', answers3))
//   .catch((error) => console.log('Error:', error))
//   .finally(() => console.log('Fin del programa'));




  // Agrega datos a la base de datos

// db.set('usuarios', [{ id: usu1.id, nombre: answers.name, color: answers.color }, { id: 2, nombre: 'Pedro', color: 'Rojo'}])
//   .write()
  

  // Recupera los datos de la base de datos
//   const usu = db.get('usuarios');

//   usu.remove({ 'id': 1 }).write();
  

// db.unset('usu').write();