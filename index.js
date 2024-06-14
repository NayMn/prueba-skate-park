import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { verifyTokenJWT } from './middlewares/middlewares.js'
import router from './routes/skater.route.js'

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))

app.use('/skater', router)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`servidor escuchando... `)
})