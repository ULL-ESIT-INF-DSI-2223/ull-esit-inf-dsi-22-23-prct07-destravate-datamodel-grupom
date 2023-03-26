import "mocha";
import { expect } from "chai";
import { Reto } from "../../src/entidades/reto";
import { Actividades } from "../../src/enumerados/enumerados";
import { Ruta } from "../../src/entidades/ruta";
import { Usuario } from "../../src/entidades/usuario";

let usu1 = new Usuario('Juan', [Actividades.Correr]);
let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
let reto1 = new Reto("reto1", [ruta1], Actividades.Bicicleta)


describe("Pruebas de Reto", () => {
  it("Se debe instanciar un objeto no nulo", () => {
    expect(reto1).not.to.be.eql(null)
  });

  it("Getters : Tiene distintas propiedades" , () => {
    expect(reto1.nombre).to.be.equal('reto1');
    expect(reto1.rutas).to.be.eql([ruta1]);
    expect(reto1.tipoActividad).to.be.eql(Actividades.Bicicleta);
    expect(reto1.id).to.be.eql(1000);
    expect(reto1.distanciaTotal).to.be.eql(4);
    expect(reto1.usuarios).to.be.eql([]);
  });

  it("agregarUsuario : método que añade un usuario al reto", () => {
    expect(reto1.agregarUsuario).to.be.a('function');
    expect(reto1.usuarios).to.be.eql([]);
    reto1.agregarUsuario(1000);
    expect(reto1.usuarios).to.be.eql([1000]);
  });

  it("quitarUsuario : método que elimina un usuario al reto", () => {
    expect(reto1.quitarUsuario).to.be.a('function');
    reto1.agregarUsuario(1000);
    reto1.quitarUsuario(1000);
    expect(reto1.usuarios).to.be.eql([]);
  });

  it("ConstructorDB : método que crea un objeto a partir de un objeto de la base de datos", () => {
    expect(reto1.ConstructorDBReto).to.be.a('function');
    reto1.ConstructorDBReto(100, [usu1.id]);
    expect(reto1.distanciaTotal).to.be.equal(100);
    expect(reto1.usuarios).to.be.eql([usu1.id]);
  });

});
