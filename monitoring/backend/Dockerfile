# Utiliza una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en /usr/src/app
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecuta tu aplicación
EXPOSE 3000

# Comando para ejecutar tu aplicación cuando se inicie el contenedor
CMD [ "node", "server.js" ]
