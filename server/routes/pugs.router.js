const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req, res, next) => {
    try {
        const pugs = await Pug.findAll()
        res.json(pugs)
    } catch (err) {
        next(err)
    }
})

router.get('/favoriteCoffee/:name', async (req, res, next) => {
    try {
        const pugs = await Pug.findByCoffee(req.params.name)
        res.json(pugs)
    } catch (err) {
        next(err)
    }
})

router.get('/:pugId', async (req, res, next) => {
    try {
        const pug = await Pug.findById(req.params.pugId)
        if(!pug) res.sendStatus(404)
        else res.json(pug)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const { name } = req.body
        const newPug = await Pug.create({ name })
        res.status(201).json(newPug)
    } catch (err) {
        next(err)
    }
})

router.put('/:pugId', async (req, res, next) => {
    try {
        const pug = await Pug.findById(req.params.pugId)
        if(!pug) {
            res.sendStatus(404)
            return
        }
        const updated =  await pug.update({favoriteCoffeeId: req.body.favoriteCoffeeId})
        res.json(updated)
    } catch (err) {
        next(err)
    }
})

router.delete('/:pugId', async (req, res, next) => {
    try {
        const numberAffected = await Pug.destroy({where: {
            id: req.params.pugId
        }})
        if(numberAffected){
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router
