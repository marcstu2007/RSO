# Proyecto 1
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

## Contruyendo la solución

Crear un archivo go.mod para el paquete principal

- Iniciar proyecto
~~~
go mod init main
~~~
- Instalar CORS
~~~
go get github.com/rs/cors
~~~
- Ejecutar
~~~
go run main.go
~~~



## Comandos para ejecutar el Makefile
Debemos conocer que versión de kernel esta instalado
~~~
uname -r
~~~
instalar make
~~~
apt install make 
~~~
GCC instalar 
~~~
sudo apt-get install build-essential
~~~

El archivo Makefile contendra las instrucciones para crear los archivos de compilación.

Construir los archivos.
~~~
make all
~~~

modulo_cpu.ko es el nombre de nuestro modulo
~~~ 
sudo insmod modulo_cpu.ko
~~~

Limpiar archivo Makefile
~~~
make clean
~~~

## Verificación de mensajes del nucleo del sistema
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
##
Insalar flex
~~~
sudo apt-get install flex
~~~
Instalar bison
~~~
sudo apt-get install bison
~~~

Actualizar dependencias
~~~
sudo apt-get update
sudo apt-get install --reinstall linux-headers-$(uname -r)


sudo apt-get install linux-headers-5.15.0-1042-gcp

sudo apt reinstall linux-headers-$(uname -r)
~~~
## Problemas con GCC
### fedora
Verifica que los archivos de encabezado del kernel estén instalados:
~~~
sudo dnf install kernel-devel-$(uname -r)
~~~

Verifica que tienes los paquetes de desarrollo instalados:
~~~
sudo dnf groupinstall "Development Tools"
~~~

### ubuntu

Verifica que los archivos de encabezado del kernel estén instalados:
~~~
sudo apt-get install linux-headers-$(uname -r)
~~~

Verifica que tienes los paquetes de desarrollo instalados:
~~~
sudo apt-get install build-essential
~~~


## Revisar demonio de Docker

Verificar el estado de docker
~~~
sudo systemctl status docker
~~~
Inciar el demonio de docker en segundo plano
~~~
sudo systemctl start docker
~~~

## Comandos de docker
Mostrar imagenes de docker
~~~
docker images
~~~
enumera todas las imagenes
~~~
docker images -a 
~~~
Eliminar un contenedor
~~~
docker rmi <ID | nombre>
~~~
Eliminar todas las imagenes
~~~
docker system prune
~~~
Construir imagen
~~~
docker build -t cliente .
~~~
Eliminar todos los contonedores
~~~
docker rm $(docker ps -a -q)
~~~

## Para usar GCC con Ubuntu 22.04 LTS en GCP
ubuntu 22.04 LTS Server
~~~
sudo apt update

sudo apt install gcc-12

export CC=gcc-12
make all

sudo apt update
sudo apt install make
~~~
