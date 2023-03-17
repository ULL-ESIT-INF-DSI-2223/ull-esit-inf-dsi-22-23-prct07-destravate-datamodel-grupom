import "mocha";
import { expect } from "chai";
import { hello } from "../src/index";

describe("Hello function", () => {
  it("should return hello world", () => {
    expect(hello()).to.equal("Hello world!");
  });
});