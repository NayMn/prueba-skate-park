import jwt from 'jsonwebtoken'
import { skaterModel } from '../models/skater.model.js'
import { handleErrorDatabase } from '../database/errors.database.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'


const __dirname = dirname(fileURLToPath(import.meta.url))


// skaters: 
const allSkaters = async (req, res) => {
    try {
        const skater = await skaterModel.skatersAll()
        return res.status(200).json({ skater })

    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

// login:
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const skaEmail = await skaterModel.skatersByEmail(email)

        if (!skaEmail) {
            throw { code: 400, msg: "error email no registrado" }
        }

        if (skaEmail.password != password) {
            throw { msg: "no es valida la contrasea" }
        }

        const token = jwt.sign(
            { email: skaEmail.email },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )

        return res.status(200).json({ token, email: skaEmail })

    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })

    }
}


// register:
const register = async (req, res) => {
    try {
        const { email, nombre, password, anos_experiencia, especialidad } = req.body
        const skaRegist = await skaterModel.skatersByEmail(email)
        if (skaRegist) {
            throw { msg: 'ya se encuentra registrado' }
        }

        const foto = req.files.foto
        const fotoDir = path.join(__dirname, '../public/img', foto.name)
        await foto.mv(fotoDir)

        const skater = await skaterModel.skaterCreate({
            email,
            nombre,
            password: hashedPassword,
            anos_experiencia,
            especialidad,
            foto: foto.nombre
        })

        const token = jwt.sign(
            { email: skaEmail.email },
            process.env.SECRET_JWT,
            { expiresIn: '1h' }
        )
        return res.json({
            token,
            email: skater.email
        })



    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })

    }
}

const updateSkaters = async (req, res) => {
    try {

        const { email, nombre, password, anos_experiencia, especialidad } = req.body
        const skater = await skaterModel.skaterUpdate(email, { nombre, password, anos_experiencia, especialidad })
        return res.json({ skater })
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })

    }
}

const stateSka = async (req, res) => {
    try {
        const { email, estado } = req.body
        const skater = await skaterModel.skaterUpState(email, estado)
        return res.json({ skater })

    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })
    }
}

const removeSkaters = async (req, res) => {
    try {
        const { email } = req.body
        const skater = await skaterModel.skaterRemove(email)
        return res.json({ skater })
    } catch (error) {
        console.log(error)
        const { code, msg } = handleErrorDatabase(error)
        return res.status(code).json({ ok: false, msg })

    }
}

export const skaterController = {
    register,
    login,
    allSkaters,
    updateSkaters,
    stateSka,
    removeSkaters
}
