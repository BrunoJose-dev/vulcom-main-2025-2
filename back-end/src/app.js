import dotenv from 'dotenv'
dotenv.config() // Carrega as variáveis de ambiente do arquivo .env

import express, { json, urlencoded } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

const app = express()

import cors from 'cors'

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true
}))
// AP18:2023 — Má configuração de segurança: esta vulnerabilidade foi evitada, neste código: 
//import cors from 'cors'
//app.use(cors({
// origin: process.env.ALLOWED_ORIGINS.split(','),
// credentials: true
//}))
// essa configuração de CORS restringe as origens permitidas, e impede ataques maliciosos de outras origens.
app.use(logger('dev'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

// Rate limiter: limita a quantidade de requisições que cada usuário/IP
// pode efetuar dentro de um determinado intervalo de tempo
import { rateLimit } from 'express-rate-limit'
//

const limiter = rateLimit({
 windowMs: 60 * 1000,    // Intervalo: 1 minuto
 limit: 20               // Máximo de 20 requisições
})
//AP14:2023 - Consumo irrestrito de recursos: esta vulnerabilidade foi evitada, neste código: 
//import { rateLimit } from 'express-rate-limit'
//const limiter = rateLimit({
// windowMs: 60 * 1000,    // Intervalo: 1 minuto
// limit: 20               // Máximo de 20 requisições
//})
//esta medida limita i numero de a quantidade de requisições que cada usuário/IP, evitando ataque de força bruta.

app.use(limiter)

/*********** ROTAS DA API **************/

// Middleware de verificação do token de autorização
import auth from './middleware/auth.js'
app.use(auth)

import carsRouter from './routes/cars.js'
app.use('/cars', carsRouter)

import customersRouter from './routes/customers.js'
app.use('/customers', customersRouter)

import usersRouter from './routes/users.js'
app.use('/users', usersRouter)

export default app
