import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname } from 'path'


const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/public'))



const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`servidor escuchando... `)
})