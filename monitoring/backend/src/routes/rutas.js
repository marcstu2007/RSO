const express = require("express");
const router = express.Router();
const data = require("../data/data.json");
const pool = require("../db");
const bodyParser = require("body-parser");
const axios = require("axios");

//obtener el rendimiento
//http://localhost:3000/rendimiento
// {
//   "ip":"34.125.140.180"
// }
router.post("/rendimiento", async (req, res) => {
  IPDireccion = req.body.ip;
  // const ipAddress = "34.125.140.180"; // IP que deseas consultar
  console.log("Dirección: ", IPDireccion);
  try {
    const query =
      "SELECT * FROM Recurso WHERE idpc = ? ORDER BY fecha_hora DESC LIMIT 10";
    const [resultado] = await pool.query(query, [IPDireccion]);
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos de rendimiento." });
  }
});

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

let tareas = [];
//http://localhost:3000/insert
router.post("/insert", async (req, res) => {
  const ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  const ip_address = ipAddress.split(":").pop(); // Obtenemos la dirección IP sin '::ffff:'
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
    total,
  } = req.body.rendimiento.ram;

  try {
    const [rows] = await pool.query(
      "INSERT INTO Recurso(idpc,ram_total,ram_usada,ram_libre, ram_cache, ram_porcentaje_en_uso, cpu_porcentaje_en_uso, running, sleeping, zombie, stoppeds, total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);",
      [
        ip_address,
        ram_total,
        ram_usada,
        ram_libre,
        ram_cache,
        ram_porcentaje_en_uso,
        cpu_porcentaje_en_uso / 100,
        running,
        sleeping,
        zombie,
        stopped,
        total,
      ]
    );

    tareas = processes;

    console.log(tareas);

    res.status(200).json({
      id: rows.iduso, // Se asume que la columna tiene una propiedad autoincrementable llamada 'id'
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
router.get("/tareas", (req, res) => {
  res.json(tareas);
});

http://localhost:3000/tareasip

router.post("/tareasip", (req, res) => {
  const direccion = req.body.ip;
  const direccionCompleta = "http://" + direccion + ":3010/process";

  // Opciones de configuración de la solicitud (opcional)
  const config = {
    method: "get", // Puedes usar 'get', 'post', 'put', 'delete', etc.
  };

  // let respuesta
  // Hacer la solicitud HTTP
  axios(direccionCompleta, config)
    .then((response) => {
      console.log("Respuesta del servidor:", response.data);
      // respuesta = response.data;
      res.json(respuesta.data);
    })
    .catch((error) => {
      // respuesta = error
      res.json(error);
      console.error("Error al hacer la solicitud:", error);
    });

  
});

router.get("/ip", (req, res) => {
  const ipAddress = req.header("x-forwarded-for") || req.socket.remoteAddress;
  console.log("ip: " + ipAddress.split(":"));
  res.send("ip: " + ipAddress.split(":"));
});

router.get("/live", (req, res) => {
  res.json({ estado: "live" });
});

router.get("/listaip", async (req, res) => {
  console.log("Listar ip");
  const result = await pool.query(
    "SELECT DISTINCT(idpc) FROM Recurso WHERE fecha_hora >= NOW() - INTERVAL 10 MINUTE order by idpc desc limit 4"
  );
  res.json(result[0]);
  console.log(result[0]);
});

// {"pid":121212,
// "ip":"34.16.183.137"}
router.post("/pid", async (req, res) => {
  //http://localhost:3000/pid
  // Verificar si el campo "pid" está presente en el JSON recibido

  try {
    if (req.body && req.body.pid) {
      const pid = req.body.pid;
      const ip = req.body.ip;

      // Realizar aquí cualquier operación que necesites con "pid"
      console.log(`PID recibido: ${pid}`);
      console.log(`IP recibido: ${ip}`);

      // Enviar el valor de "ip" a otro servidor utilizando Axios
      const response = await axios.post(
        "https://" + ip + ":3010/kill?pid=" + pid
      );

      console.log("Respuesta del otro servidor:", response.data);

      res
        .status(200)
        .send("Solicitud recibida con éxito y enviada al otro servidor");
      res.status(200).send("Solicitud recibida con éxito");
    } else {
      res.status(400).send('El JSON no contiene el campo "pid"');
    }
  } catch (error) {
    console.error("Error al enviar a otro servidor:", error);
    res.status(500).send("Error al enviar a otro servidor");
  }
});

module.exports = router;
