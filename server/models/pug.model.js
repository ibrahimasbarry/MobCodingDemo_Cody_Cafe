const Sequelize = require("sequelize");
const db = require("./database");
const Coffee = require("./coffee.model");
const { INTEGER, STRING, TEXT } = Sequelize;

const Pug = db.define("pugs", {
  age: {
    type: INTEGER,
    defaultValue: 0
  },
  name: {
    type: STRING,
    allowNull: false
  },
  biography: {
    type: TEXT
  }
});

Pug.prototype.isPuppy = function() {
  return this.age < 1;
};
Pug.prototype.shortBio = function() {
  return this.biography.split(/(\.|\?|!)/gi)[0];
};
Pug.findByCoffee = async function(coffee) {
  const foundCoffee = await Coffee.findOne({ where: { name: coffee } });
  const id = foundCoffee.id;
  const pugs = await Pug.findAll({
    where: { favoriteCoffeeId: id },
    include: [{model: Coffee, as: 'favoriteCoffee'}]
  });
  return pugs;
};

Pug.beforeValidate(pug => {
  pug.name = pug.name[0].toUpperCase() + pug.name.slice(1)
})

module.exports = Pug;
