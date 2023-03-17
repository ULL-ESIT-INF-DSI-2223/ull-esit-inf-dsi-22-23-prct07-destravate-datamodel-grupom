import "mocha";
import { expect } from "chai";
import { Saludar } from "../src/index";



describe('Funcion Prueba', () => {
  it('Prueba funcion', () => {
    expect(Saludar()).to.be.equal('Hola');
  });
});



