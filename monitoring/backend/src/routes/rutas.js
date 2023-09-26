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
router.post('/insert', async (req, res) => {
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    const ip_address = ipAddress.split(':').pop(); // Obtenemos la dirección IP sin '::ffff:'
    console.log(ip_address);
    const idpc = req.body.idpc;
    const {
        ram_total,
        ram_usada,
        ram_libre,
        ram_cache,
        ram_porcentaje_en_uso,
        cpu_porcentaje_en_uso,
        processes,
        running,
        sleeping,
        zombie,
        stopped,
        total
    } = req.body.rendimiento.ram;
    
    try {
        const [rows] = await pool.query('INSERT INTO Recurso(idpc,ram_total,ram_usada,ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stopped, total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);',
        [idpc, ram_total, ram_usada, ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stopped, total]);
        
        tareas = processes;
        
        console.log(tareas);
        
        res.status(200).json({
            id: rows.insertId, // Se asume que la columna tiene una propiedad autoincrementable llamada 'id'
            ip_address,
            ram_total,
            ram_usada,
            ram_libre,
            ram_cache,
            ram_porcentaje_en_uso,
            cpu_porcentaje_en_uso,
            running,
            sleeping,
            zombie,
            stopped,
            total,
        });
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


//obtener las tareas
//http://localhost:3000/tareas
router.get('/tareas', (req,res)=>{
    res.json(tareas)
})

router.get('/ip', (req,res)=>{
    const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
    console.log("ip: "+ipAddress.split(':'))
    res.send("ip: "+ipAddress.split(':'));
})

module.exports = router;