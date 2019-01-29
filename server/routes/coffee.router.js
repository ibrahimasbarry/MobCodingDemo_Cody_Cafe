const router = require('express').Router()
const {Coffee} = require('../models')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Coffee.findAll())
    } catch (error) {
        next(error)
    }
})
//api/coffee/ingredient/milk
router.get('/ingredients/:ingredientName', async (req, res, next) => {
    try {
        res.json(await Coffee.findByIngredient(req.params.ingredientName))
    } catch (err) {
        next(err)
    }
})
router.get('/:coffeeId', async (req, res, next) => {
    try {
        const coffee = await Coffee.findById(req.params.coffeeId)
        if(!coffee) res.sendStatus(404)
        else res.json(coffee)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCoffee = await Coffee.create({
            name: req.body.name
        })
        res.status(201).json(newCoffee)
    } catch (err) {
        next(err)
    }
})

module.exports = router

