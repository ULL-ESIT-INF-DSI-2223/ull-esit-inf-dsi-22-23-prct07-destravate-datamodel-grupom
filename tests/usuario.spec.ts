import "mocha";
import { expect } from "chai";
import { Actividades, Usuario, EstadisticaUsuario } from "../src/usuario";



describe('Pruebas de la clase Usuario', () => {
  let usuario = new Usuario('Pepe', [Actividades.Correr], [1]);

  it('Un usuario es un objeto y tiene distintas propiedades', () => {
    expect(usuario).to.be.an('object');
    expect(usuario).to.have.property('id');
    expect(usuario).to.have.property('nombre');
    expect(usuario).to.have.property('amigos');
    expect(usuario).to.have.property('actividades');
    expect(usuario).to.have.property('gruposAmigos');
    expect(usuario).to.have.property('estadistica');
    expect(usuario).to.have.property('retosActivos');
    expect(usuario).to.have.property('historicoRutas');
  });

  it('El usuario tiene un nombre, con getter', () => {
    expect(usuario.nombre).to.equal('Pepe');
  });

  it('El usuario tiene un id, con getter', () => {
    expect(usuario.id).to.equal(1000);
  });

  it('El usuario tiene una lista de actividades, con getter', () => {
    expect(usuario.actividades).to.be.an('Set');
    expect(usuario.actividades).to.have.keys('Correr');
  });

  it('El usuario tiene una lista de amigos, con getter', () => {
    expect(usuario.amigos).to.equal('No tiene amigos');
  });

  it('El usuario tiene una lista de grupos amigos, con getter', () => {
    expect(usuario.gruposAmigos).to.equal('No tiene grupos amigos');
  });

  it('El usuario tiene una estadistica, con getter', () => {
    expect(usuario.estadistica).to.be.an('object');
  });

  it('El usuario tiene una lista de retos activos, con getter', () => {
    expect(usuario.retosActivos).to.be.an('array');
    expect(usuario.retosActivos).to.have.lengthOf(1);
    expect(usuario.retosActivos).to.have.members([1]);
  });

  it('El usuario tiene una lista de historico de rutas, con getter', () => {
    expect(usuario.historicoRutas).to.be.an('Map');
  });

  it('El usuario tiene un método para agregar un amigo', () => {
    expect(usuario.agregarAmigo).to.be.a('function');
  });

  it('El usuario tiene un método para agregar un grupo amigo', () => {
    expect(usuario.agregarGrupoAmigo).to.be.a('function');
  });



  
});



