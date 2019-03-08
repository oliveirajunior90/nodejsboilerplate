const faker = require("faker");
const factory = require("factory-girl").factory;
const { Usuario } = require("../src/app/models");

factory.define("Usuario", Usuario, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

module.exports = factory;