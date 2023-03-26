import "mocha";
import { expect } from "chai";


import { Grupo } from "../../src/entidades/grupo";
import { Actividades } from "../../src/enumerados/enumerados";
import { Ruta } from "../../src/entidades/ruta";
import { Usuario } from "../../src/entidades/usuario";

let usu1 = new Usuario('Juan', [Actividades.Correr]);
let grupo1 = new Grupo('GrupoJuan', usu1.id)
let ruta1 = new Ruta('ruta1', [1,2], [3,4], 4, 5, Actividades.Correr);

usu1.agregarRuta(ruta1);

describe("Pruebas de Grupo", () => {
  it("Se debe instanciar un objeto no nulo", () => {
    expect(grupo1).not.to.be.eql(null)
  });

  it("Getters : Tiene distintas propiedades" , () => {
    expect(grupo1.nombre).to.be.equal('GrupoJuan');
    expect(grupo1.creador).to.be.equal(1000);
    expect(grupo1.participantes).to.be.eql([1000]);
    const sizeMap = grupo1.historicoRutas.size;
    expect(sizeMap).to.be.equal(0);
    expect(grupo1.estadistica).to.be.eql([[0, 0], [0, 0], [0, 0]])
    expect(grupo1.clasificacion).to.be.eql([])
  });

  it("agregarUsuario : método que añade un usuario al grupo", () => {
    expect(grupo1.agregarUsuario).to.be.a('function');
    expect(grupo1.participantes).to.be.eql([1000]);
    grupo1.agregarUsuario(1002);
    expect(grupo1.participantes).to.be.eql([1000, 1002]);
  });

  it("clasificacionUsuarios : método que retorna los participantes en orden", () => {
    let grupo1 = new Grupo('GrupoJuan', usu1.id)
    expect(grupo1.clasificacionUsuarios).to.be.a('function');
    expect(grupo1.clasificacionUsuarios()).to.be.eql([1000]);
  });

  it("agregarRuta : método que añade una ruta al grupo", () => {
    expect(grupo1.agregarRuta).to.be.a('function');
    expect(grupo1.historicoRutas.size).to.be.equal(0);
    grupo1.agregarRuta(ruta1);
    expect(grupo1.historicoRutas.size).to.be.equal(1);
  });

  it("rutasFavoritas : método que retorna las rutas favoritas del grupo", () => {
    expect(grupo1.rutasFavoritas).to.be.a('function');
    expect(grupo1.rutasFavoritas()).to.be.eql([1000]);
  });

  it("toString : método que retorna un string con la información del grupo", () => {
    expect(grupo1.toString).to.be.a('function');
    expect(grupo1.toString()).to.be.equal(`Grupo ${grupo1.nombre} tiene la id ${grupo1.id} y su creador es ${grupo1.creador}\nSus participantes son ${grupo1.participantes.join(", ")}\nSus estadisticas son ${grupo1.estadistica} \nSu clasificacion es ${grupo1.clasificacion.join(", ")} \nSu histórico de rutas es ${Array.from(grupo1.historicoRutas.keys()).join(", ")}\n`);
  });

  it("ConstructorDB : método que crea un objeto a partir de un objeto de la base de datos", () => {
    expect(grupo1.ContructorDBGrupo).to.be.a('function');
    grupo1.ContructorDBGrupo([usu1.id], [[0,0], [0,0], [0,0]], [usu1.id], ['12/12/12'], [[1001]]);
    expect(grupo1.participantes).to.be.eql([1000]);
    expect(grupo1.estadistica).to.be.eql([[0,0], [0,0], [0,0]]);
    expect(grupo1.clasificacion).to.be.eql([usu1.id]);
    expect(grupo1.historicoRutas.size).to.be.equal(2);
  });
});      