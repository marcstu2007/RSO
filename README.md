# Proyecto 1

Nombre: Marco Antonio Xocop Roquel

## Plataforma de Monitoreo en GCP
## Objetivos
- Conocer el Kernel de Linux mediante módulos de C.
- Hacer uso de programación asíncrona con rutinas de Golang.
- Comprender el funcionamiento de los contenedores usando Docker.
- Utilizar GCP Compute Engine y autoscaling.

## Introducción
En este proyecto, se tiene como objetivo principal implementar un sistema de monitoreo de recursos del 
sistema y gestión de procesos, empleando varias tecnologías y lenguajes de programación. El sistema 
resultante permitirá obtener información clave sobre el rendimiento del computador, procesos en ejecución 
y su administración a través de una interfaz amigable. El para el despliegue del proyecto se utilizará GCP 
Compute Engine y autoscaling para simular múltiples máquinas virtuales a monitorear

## Arquitectura
![Arquitectura](img/21.PNG)

### Contruyendo la solución en go, para vm
En esta sección construiremos los modulos para la lectura de RAM y CPU junto a el sistema desarrollado en go.

![Arquitectura](img/22.PNG)

Crear un archivo go.mod para el paquete principal.

- Iniciar proyecto
~~~
go mod init main
~~~
- Instalar CORS (Para poder realizar consultas a otros servidores)
~~~
go get github.com/rs/cors
~~~
- Ejecutar
~~~
go run main.go
~~~

###  Instalando las herramientas para compila archivos de CPU y RAM

#### Instalar GCC con Ubuntu 22.04 LTS desplegado en GCP
- Version de Sistem operativo: ubuntu 22.04 LTS Server

Actualizar el sistema
~~~
sudo apt update
~~~
Instalar gcc-12 para compilar archivos
~~~
sudo apt install gcc-12
~~~
Exportar gcc-12
~~~
export CC=gcc-12
~~~
Actualizar e instalar make
~~~
sudo apt update
sudo apt install make
~~~
Comando para compilar archivo
~~~
make all
~~~
#### Verificación de mensajes del nucleo del sistema
Para revisar los mensajes enviado por el sistema utilizaremos el siguiente comando, se debe ejecuar en una nueva terminal (terminal2), esta mostrara todos los mensaje sque se han acumulado desde que el sistema inicio.
~~~
sudo dmesg
~~~

Para limpiar todos los mensajes es necesario ejecutar el siguiente comando, esto con el fin de facilitar la lectura de los resultados.
~~~
sudo dmesg -c
~~~
Ejecutar comando dentro de la carpeta que lo contiene
~~~
sudo insmod ram_201122934.ko
~~~
Regresar a la terminal2, ejecutar el siguiente comando y mostrara los resultados
~~~
sudo dmesg
~~~
Regresando a la terminal 1, vamos a desmontar nuestro modulo.
~~~
sudo rmmod ram_201122934.ko
~~~
Asi se veria el servidor en go, esta imprimiendo el consola en el servidor escrito en go.
![Arquitectura](img/24.PNG)

### FrontEnd

![Arquitectura](img/23.PNG)

Se construyo en react.

Instalaciones necesarias
Es necesario tener instalado nodejs

Construyendo proyecto
~~~
npm create vite
~~~

Contruir la aplicación
~~~
npm install
~~~
npm ejecutar 
~~~
npm run dev
~~~

Instalar
- react router para manejo de rutas https://reactrouter.com/en/main
~~~
npm install react-router-dom@6
~~~
- formik para validar datos de entrada https://formik.org/docs/overview
~~~
npm install formik
~~~
- axios
~~~
npm i axios
~~~
- instalar CORS
~~~
npm i cors
~~~
- tailwindcss
~~~
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
~~~
- prop-types
Añadimos tipos de datos para los props
~~~
npm i prop-types
~~~
- react-chartjs-2
~~~
npm install --save chart.js react-chartjs-2
~~~
### Interfaz de la aplicación
La aplicación se vera de esta manera en el navegeador.

![FrontEnd](img/25.jpeg)

### Backend de monitoring
### Inicializar
~~~
npm init -y
~~~
### Instalar express
~~~
npm i express
~~~
### Instalar morgan
Middleware
~~~
npm i morgan
~~~
### Instalar nodemon
- Instalar nodemon
~~~
npm i nodemon -D
~~~
- Ejecutar aplicación, el comando debe configurarse en el archivo de package.json
~~~
npm run dev
~~~
### Instalar mysql
- Instalar mysql
~~~
npm i mysql
~~~
~~~
npm install --save mysql2
~~~

## Base de datos MYSQL
Se utilizo Mysql version 8.0, a continuación se muestra la configuración de la imagen
~~~
  mysql:
    image: mysql:8.0
    container_name: mi_mysql
    environment:
      MYSQL_ROOT_PASSWORD: 201122934
      MYSQL_DATABASE: dbProyecto
      MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
      MYSQL_ROOT_HOST: '%'
    # command: --disable-public-key-lookup
    volumes:
      - ./baseDeDatos:/docker-entrypoint-initdb.d
      - mysql_data:/var/lib/mysql
    ports:
      - "3320:3306"
~~~
Script de base de datos en MySQL
~~~
CREATE DATABASE IF NOT EXISTS dbProyecto;
USE dbProyecto;

-- todo en mb
-- cpu / 100
CREATE TABLE IF NOT EXISTS Recurso(
    iduso INT PRIMARY KEY AUTO_INCREMENT,
    idpc INT,
    ram_total INT,
    ram_usada INT,
    ram_libre INT,
    ram_cache INT,
    ram_porcentaje_en_uso DECIMAL(5, 2),
    cpu_porcentaje_en_uso DECIMAL(5, 2),
    running INT,
    sleeping INT,
    zombie INT,
    stoppeds INT,
    total INT
);
~~~

## Docker Hub
1. Lo primero debemos realizar es ir a [Docker hub](https://hub.docker.com/), iniciamos sesión o creamos un usuario.

![Docker Hub](img/1.PNG)

2. Crearemos un repositorio nuevo para subir nuestra imagen de docker (Es un repositorio por imagen, los repositorios privados son de paga, solamente podemos tener uno solo privado).
3. Colocaremos el nombre del repositorio
4. Colcaremos una descripción
5. Lo dejaremos como publico
6. Clic en el botón "Create"

![Docker Hub](img/2.PNG)

Se mostrara la siguiente ventana con los resultados

![Docker Hub](img/3.PNG)

Debemos de fijarnos en que tag debemos colocar a nuestra imagen, se encuentra del lado derecho, tal como se ve en la imagen.

![Docker Hub](img/4.PNG)

Configuración de credenciales para eso iremos al menú "Account Settings"

![Docker Hub](img/6.PNG)

- ir a la pestaña de "Security
- Clic en el botón "New Access Token"

![Docker Hub](img/7.PNG)

- Colocar un access token
- clic en "Generate"
- Mostrará el password que usaremos

![Docker Hub](img/8.PNG)

### Configuración de docker-compose
- Se agregara los tags al docker-compose para hacer referencia a la imagen que hemos creado.
- Recordar que es un repositorio por imagen

![Docker Hub](img/5.PNG)

- Agregar el login al proyecto en docker compose

![Docker Hub](img/9.PNG)

- Al colocar la clave mostrara el resultado en consola

![Docker Hub](img/10.PNG)

- Contruir las imagenes con el comando de docker
~~~
docker-compose build
~~~
![Docker Hub](img/11.PNG)

- Para revisar las imagenes que hemos creado en linux
~~~
docker images | grep proyect
~~~
- Para revisar las imagenes que hemos creado en windows
~~~
docker images 
~~~
![Docker Hub](img/12.PNG)

- Subir imagenes a docker Hub
~~~
docker-compose push
~~~
![Docker Hub](img/13.PNG)

- En docker hub se vera asi nuestra imagen

![Docker Hub](img/14.PNG)


## GCP
Crearemos unas maquinas virtuales [GCP](https://cloud.google.com/?utm_source=google&utm_medium=cpc&utm_campaign=latam-LATAM-all-es-dr-BKWS-all-all-trial-e-dr-1605194-LUAC0010197&utm_content=text-ad-none-any-DEV_c-CRE_512379899429-ADGP_Hybrid+%7C+BKWS+-+EXA+%7C+Txt+~+GCP_General-KWID_43700077851556093-kwd-155951229&utm_term=KW_gcp-ST_GCP&gclid=Cj0KCQjw06-oBhC6ARIsAGuzdw3FoRVxZKTqsto1QztQpECiIWtIx9XJ3_4FJAvLfASE2lQ316u4NqoaAnEUEALw_wcB&gclsrc=aw.ds&hl=es_419)


- Se mostrara la pagina de inicio
- Crearemos una maquina virtual "Compute Engine"
- Clic en "Instancias de VM"
![GCP](img/15.PNG)

- Clic en "crear Instancia"
![GCP](img/16.PNG)

1. Colocar el nombre de la instancia
![GCP](img/17.PNG)

2. Cambiar por la imagen de ubuntu
3. Permitir el trafico http
4. Clic en el botón "Crear"

![GCP](img/18.PNG)

- Se empezara a inicializar la mv

![GCP](img/19.PNG)

## Instalar Docker
seguir los pasos de https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04

Actualizar paquetes
~~~
sudo apt update
~~~
Usar paquetes
~~~
sudo apt install apt-transport-https ca-certificates curl software-properties-common
~~~
Agregar claves GPC
~~~
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
~~~
Agregue el repositorio de Docker a los orígenes de APT:
~~~
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
~~~
Actualice de nuevo la lista de paquetes existente para que se reconozca la adición:
~~~
sudo apt update
~~~
Asegúrese de que está a punto de instalar desde el repositorio de Docker en lugar del repositorio predeterminado de Ubuntu:
~~~
apt-cache policy docker-ce
~~~
Finalmente, instale Docker:
~~~
sudo apt install docker-ce
~~~
Docker ahora debe estar instalado, el demonio iniciado y el proceso habilitado para iniciarse en el arranque. Compruebe que se está ejecutando:
~~~
sudo systemctl status docker
~~~
Asi se vera el resultado al iniciarse docker
![GCP](img/20.PNG)

## Crear una plantilla de estancia

- Crear una plantilla de estancia yendo: "Compute Engine"
- Clic en "Plantilla de instacias" 

![GCP](img/25.PNG)

- Se debe dar clic en "Crear una plantilla de instacias"

![GCP](img/26.PNG)

- Agregar un nombre a la plantilla
- Ubicación:
- Global: significa que estara disponible en diferentes regiones
- Regional: Unicamente en la region actual.

![GCP](img/27.PNG)

- Se debe seleccionar vCPU que mejor se adapata
- Disco de arranque: Se debe seleccionar el que mejor se adapte en este caso sera Ubuntu.

![GCP](img/28.PNG)

- "Disco de arranque", se debe dar clic en "Cambiar"

- Debemos cambiar a:
- Sistema operativo: Ubuntu
- Version: 22.04 LTS
- Tamaño (GB): 10

![GCP](img/29.PNG)

- Firewall: Seleccionar permitir tráfico HTTP
- Clic en el botoón "Crear"

![GCP](img/30.PNG)

- Se crea la plantilla

![GCP](img/31.PNG)

- Ir a "Compute Engine"
- Seleccionar "Grupos de instancias"

![GCP](img/32.PNG)

- Se mostrará la siguiente pagina web
- Clic en "Crear grupo de instancias"

![GCP](img/33.PNG)

- Crearemos un grupo de instancias
- Colocaremos un nombre de instancia
- Eligiremos la plantilla: la que creamos anteriormente
- Ubicación donde se desplegaran: la mejor opción es 
  - Varias zonas
  - Zona unica 

![GCP](img/34.PNG)

- Se debe agregar un minimo de instancias y un maximo
- Se debe configurar el "Autoscaling"
- Agregar el periodo de inicialización en segundos, tomar en cuenta el tiempo actualización e instalación de librerias.

![GCP](img/35.PNG)

- Crear un health checks si es necesario
