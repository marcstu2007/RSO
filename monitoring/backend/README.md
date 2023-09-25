## Inicializar
~~~
npm init -y
~~~
## Instalar express
~~~
npm i express
~~~
## Instalar morgan
Middleware
~~~
npm i morgan
~~~
## Instalar nodemon
- Instalar nodemon
~~~
npm i nodemon -D
~~~
- Ejecutar aplicación, el comando debe configurarse en el archivo de package.json
~~~
npm run dev
~~~
## Instalar mysql
- Instalar mysql
~~~
npm i mysql
~~~
~~~
npm install --save mysql2
~~~

Cabecera JSON de rendimiento
~~~
{
    "idpc": 1,
    "ram_total": 400,
    "ram_usada": 200,
    "ram_libre": 100,
    "ram_cache": 10,
    "ram_porcentaje_en_uso": 20.5,
    "cpu_porcentaje_en_uso": 60.2,
    "running": 1,
    "sleeping": 2,
    "zombie": 4,
    "stoppeds": 2,
    "total": 4
}
~~~
Cabecera de tareas
~~~
{
    "idpc": 1,
    "pid": 10,
    "nombre": "Tarea1",
    "usuario": 1,
    "estado": 1,
    "ram": 100,
    "cpu_percentaje": 100
}
~~~