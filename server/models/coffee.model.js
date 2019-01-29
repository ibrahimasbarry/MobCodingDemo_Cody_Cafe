const  Sequelize = require('sequelize')
const {Op} = Sequelize
const db = require('./database')

const Coffee = db.define('coffee', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['love']
  }
})

Coffee.prototype.getIngredients = function () {
  return this.ingredients.join(', ')
}

Coffee.findByIngredient = function (ingredient) {
  return Coffee.findAll({
    where: {
      ingredients: {
        [Op.contains]: [ingredient]
      }
    }
  })
}

Coffee.beforeValidate(coffee => {
  if(!coffee.ingredients.includes('love')) {
    coffee.ingredients.push('love')
  }
})

module.exports = Coffee

