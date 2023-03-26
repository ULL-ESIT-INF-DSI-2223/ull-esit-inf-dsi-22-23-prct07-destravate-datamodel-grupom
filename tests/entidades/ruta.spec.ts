import "mocha"
import { expect } from "chai"
import { Ruta } from "../../src/entidades/ruta"
import { Usuario } from "../../src/entidades/usuario"

import { Actividades } from "../../src/enumerados/enumerados"

let ruta = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
let usu1 = new Usuario('Juan', [Actividades.Correr]);

describe("Pruebas de Ruta", () => {
  it("Se debe instanciar un objeto no nulo", () => {
    expect(ruta).not.to.be.eql(null)
  });

  it("Getters : Tiene distintas propiedades" , () => {
    expect(ruta.nombre).to.be.eql('ruta1');
    expect(ruta.geolocalizacionInicial).to.be.eql([1,2]);
    expect(ruta.geolocalizacionFinal).to.be.eql([3,4]);
    expect(ruta.distancia).to.be.eql(4);
    expect(ruta.desnivel).to.be.eql(5);
    expect(ruta.tipoActividad).to.be.eql(Actividades.Correr);
    expect(ruta.calificacion).to.be.eql([]);
  });
  
  it("Calificar : método que califia la ruta y calcula la media de clasificacion", () => {
    expect(ruta.calificar).to.be.a('function');
    expect(ruta.calificacionMedia).to.be.equal(0);
    ruta.calificar(5);
    expect(ruta.calificacionMedia).to.be.equal(5);
    ruta.calificar(11);
    expect(ruta.calificacionMedia).to.be.equal(5);
  });

  it("agregarUsuario : método que añade un usuario a la ruta", () => {
    expect(ruta.agregarUsuario).to.be.a('function');
    expect(ruta.usuarios).to.be.eql([]);
    ruta.agregarUsuario(usu1.id);
    expect(ruta.usuarios).to.be.eql([usu1.id]);
  });
  
  it("eliminarUsuario : método que elimina un usuario a la ruta", () => {
    expect(ruta.eliminarUsuario).to.be.a('function');
    ruta.agregarUsuario(usu1.id);
    ruta.eliminarUsuario(usu1.id);
    expect(ruta.usuarios).to.be.eql([]);
  });

  it("toString : método que devuelve una cadena con la información de la ruta", () => {
    expect(ruta.toString).to.be.a('function');
    expect(ruta.toString()).to.be.eql(`Ruta ${ruta.nombre} tiene la id ${ruta.id}\nSus actividades son ${ruta.tipoActividad}\nSu distancia es ${ruta.distancia} y su desnivel es ${ruta.desnivel}\nSu geolocalizacion inicial es ${ruta.geolocalizacionInicial} y su geolocalizacion final es ${ruta.geolocalizacionFinal}\nSus participantes son \nSu calificacion media es ${ruta.calificacionMedia}\n`);
  });

  it("ConstructorDB : método que crea un objeto a partir de un objeto de la base de datos", () => {
    expect(ruta.ConstructorDBRuta).to.be.a('function');
    ruta.ConstructorDBRuta([usu1.id], [10,10,10], 10)
    expect(ruta.usuarios).to.be.eql([usu1.id]);
    expect(ruta.calificacion).to.be.eql([10,10,10]);
    expect(ruta.calificacionMedia).to.be.equal(10);
  });
})
