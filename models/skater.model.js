import { pool } from '../database/connection.js'

const skatersAll = async () => {
    const querysql = {
        text: ' SELECT * FROM skaters ORDER BY id;'
    }
    const { rows } = await pool.query(querysql)
    return rows
}

const skatersByEmail = async (email) => {
    const querysql = {
        text: 'SELECT * FROM skaters WHERE email = $1;',
        values: [email]
    }
    const { rows } = await pool.query(querysql)
    return rows[0]
}

const skaterCreate = async (email, nombre, password, anos_experiencia, especialidad, foto, estado) => {
    const querysql = {
        text: 'INSERT INTO skater (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
        values: [email, nombre, password, anos_experiencia, especialidad, foto, estado]
    }
    const { rows } = await pool.query(querysql)
    return rows
}

const skaterUpdate = async (nombre, password, anos_experiencia, especialidad) => {
    const querysql = {
        text: 'UPDATE skaters SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4, RETURNING *;',
        values: [nombre, password, anos_experiencia, especialidad]
    }
    const { rows } = await pool.query(querysql)
    return rows[0]
}

const skaterUpState = async (email, estado) => {
    const querysql = {
        text: 'UPDATE skaters SET estado = $2, email = $1 RETURNING *;',
        values: [email, estado]
    }
    const { rows } = await pool.query(querysql)
    return rows
}

const skaterRemove = async (email) => {
    const querysql = {
        text: 'DELETE FROM skaters WHERE email = $1 RETURNING *;',
        values: [email]
    }
    const { rows } = await pool.query(querysql)
    return rows
}


export const skaterModel = {
    skatersAll,
    skatersByEmail,
    skaterCreate,
    skaterUpdate,
    skaterUpState,
    skaterRemove
}