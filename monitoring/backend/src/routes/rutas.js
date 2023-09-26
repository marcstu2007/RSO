const express = require('express')
const router = express.Router()
const data = require('../data/data.json')
const pool = require('../db');

//obtener el rendimiento
router.get('/rendimiento', async(req,res)=>{
    const [resultado] = await pool.query('SELECT * FROM Recurso ORDER BY iduso DESC;')
    res.json(resultado)
})

// Json de pruebas
// router.get('/rendimiento',(req,res)=>{
//     res.json(data)
// })

// Prueba a base de datos
// router.get('/ping',async(req,res)=> {
//     console.log('Voy hacer ping')
//     const result = await pool.query('SELECT 1 + 1 as result')
//     res.json(result)
//     console.log(result)
// })

let tareas = []
//http://localhost:3000/insert
router.post('/insert', async(req,res)=>{
    const idpc = req.body.idpc
    const {ram_total,ram_usada,ram_libre,ram_cache,ram_porcentaje_en_uso,cpu_porcentaje_en_uso,processes,running,sleeping,zombie,stopped,total} = req.body.rendimiento.ram
    const [rows] = await pool.query('INSERT INTO Recurso(idpc,ram_total,ram_usada,ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stoppeds, total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);',
    [idpc, ram_total,ram_usada,ram_libre,ram_cache,ram_porcentaje_en_uso,cpu_porcentaje_en_uso,running,sleeping,zombie,stopped,total])
    tareas=processes
    console.log(tareas)
    res.send(
        {
        id: rows.iduso,
        idpc,ram_total,ram_usada,ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stopped, total,
    })
})

//obtener las tareas
//http://localhost:3000/tareas
router.get('/tareas', (req,res)=>{
    res.json(tareas)
})

router.get('/ip',(req, response) => {
    // const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    // res.send(ipAddress);
    res.send('ip address')
});

module.exports = router;