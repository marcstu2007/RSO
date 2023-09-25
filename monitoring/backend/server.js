const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const rutasRoutes = require('./src/routes/rutas.js')

const app = express()
app.use(cors())
app.set('port',3000)


app.use(morgan('dev'))
app.use(express.json());
app.use(rutasRoutes)


app.listen(app.get('port'))
console.log(`Server listening on port ${app.get("port")}`)