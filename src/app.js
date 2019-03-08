const express = require('express')
const bodyParser = require('body-parser')

const app = express()

console.log(process.env.node_env)

const authService = require('./app/services/auth.services')

const authController = require('./app/controller/auth.controller')
const painelController = require('./app/controller/painel.controller')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/authenticate', authController.authenticate)
app.get('/painel', authService.authorize, painelController.getPainel)

module.exports = app