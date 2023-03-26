import "mocha";
import { expect } from "chai";
import { Usuario } from "../../src/entidades/usuario";
import { Actividades } from "../../src/enumerados/enumerados";
import { Ruta } from "../../src/entidades/ruta";
import { Grupo } from "../../src/entidades/grupo";
import { ColeccionRutas } from "../../src/colecciones/coleccionRutas";

let usu1 = new Usuario('Juan', [Actividades.Correr]);
let usu2 = new Usuario('Maria', [Actividades.Bicicleta]);

let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);
let ruta2 = new Ruta('ruta2', [1,2], [3,4], 4, 5, Actividades.Correr);

let grupo1 = new Grupo('grupo1', usu1.id);

describe("Pruebas de Usuario", () => {
  it("Se debe instanciar un objeto no nulo", () => {
    expect(usu1).not.to.be.eql(null)
  });

  it("Getters : Tiene distintas propiedades" , () => {
    expect(usu1.nombre).to.be.equal('Juan');
    expect(usu1.actividades.size).to.be.equal(1);
    expect(usu1.id).to.be.equal(1014);
    usu1.agregarAmigo(usu2.id);
    expect(usu1.amigos).to.be.eql([usu2.id]);
    expect(usu1.gruposAmigos).to.be.equal(undefined);
    usu1.agregarRuta(ruta1);
    expect(usu1.estadistica).to.be.eql([ [ 4, 5 ], [ 4, 5 ], [ 4, 5 ] ]);
    expect(usu1.retosActivos).to.be.eql([]);
    expect(usu1.historicoRutas.size).to.be.equal(1);
  });

  it("esGrupoAmigo : método que comprueba si un grupo es amigo", () => {
    expect(usu1.esGrupoAmigo).to.be.a('function');
    expect(usu1.esGrupoAmigo(grupo1.id)).to.be.eql(false);
  });

  it("agregarRuta : método que añade una ruta al usuario", () => {
    expect(usu1.agregarRuta).to.be.a('function');
    usu1.agregarGrupoAmigo(grupo1.id);
    expect(usu1.agregarRuta(ruta2)).to.be.eql(ruta2.id);
    expect(usu1.historicoRutas.size).to.be.eql(1);
  });

  it("actualizarEstadistica : método que actualiza la estadistica del usuario", () => {
    expect(usu1.actualizarEstadisticas).to.be.a('function');
    usu1.actualizarEstadisticas(ruta2);
    expect(usu1.estadistica).to.be.eql([ [ 12, 15 ], [ 12, 15 ], [ 12, 15 ] ]);
  });

  it("agregarReto : método que añade un reto al usuario", () => {
    expect(usu1.agregarReto).to.be.a('function');
    usu1.agregarReto(1000);
    expect(usu1.retosActivos).to.be.eql([1000]);
  });

  it("eliminarReto : método que elimina un reto del usuario", () => {
    expect(usu1.eliminarReto).to.be.a('function');
    usu1.eliminarReto(1000);
    expect(usu1.retosActivos).to.be.eql([]);
  });

  it("agregarAmigo : método que añade un amigo al usuario", () => {
    expect(usu1.agregarAmigo).to.be.a('function');
    usu1.agregarAmigo(1000);
    expect(usu1.amigos).to.be.eql([usu2.id, 1000]);
  });

  it("eliminarAmigo : método que elimina un amigo del usuario", () => {
    expect(usu1.eliminarAmigo).to.be.a('function');
    usu1.eliminarAmigo(1000);
    expect(usu1.amigos).to.be.eql([usu2.id]);
  });

  it("agregarGrupoAmigo : método que añade un grupo amigo al usuario", () => {
    expect(usu1.agregarGrupoAmigo).to.be.a('function');
    expect(usu1.gruposAmigos).to.be.eql([grupo1.id]);
  });

  it("eliminarGrupoAmigo : método que elimina un grupo amigo del usuario", () => {
    expect(usu1.eliminarGrupoAmigo).to.be.a('function');
    usu1.eliminarGrupoAmigo(grupo1.id);
    expect(usu1.gruposAmigos).to.be.eql(undefined);
  });

  it("rutasFavoritas : método que devuelve las rutas favoritas del usuario", () => {
    expect(usu1.rutasFavoritas).to.be.a('function');
    usu1.agregarRuta(ruta1);
    expect(usu1.rutasFavoritas()).to.be.eql([1003, 1004]);
  });

  it("distanciaTotal : método que devuelve la distancia total recorrida por el usuario", () => {
    expect(usu1.distanciaTotal).to.be.a('function');
    expect(usu1.distanciaTotal()).to.be.equal(0);
  });

  it("toString : método que devuelve la información del usuario", () => {
    expect(usu1.toString).to.be.a('function');
    let stringUsuario = usu1.toString();
    expect(usu1.toString()).to.be.equal(stringUsuario);
  });

});

