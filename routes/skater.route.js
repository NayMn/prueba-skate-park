import { Router } from "express";
import { skaterController } from "../controller/skater.controller.js";
import { verifyTokenJWT } from "../middlewares/middlewares.js";

const router = Router()

router.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

router.get('/admin', (req, res) => {
    res.sendFile('admin.html', { root: './public' });
});

router.get('/datos', verifyTokenJWT, (req, res) => {
    res.sendFile('datos.html', { root: './public' });
});

// /skater/users
router.get('/users', skaterController.allSkaters)
router.post('/login', skaterController.login)
router.post('/register', skaterController.register)
router.put('/editar', verifyTokenJWT, skaterController.updateSkaters)
router.put('/estado', skaterController.stateSka)
router.delete('/eliminar', skaterController.removeSkaters)

export default router