# Usar una imagen oficial ligera de Node.js (versión slim)
FROM node:18-slim

# Establecer un directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción únicamente
RUN npm install --production

# Copiar solo el resto del código necesario
COPY . .

# Exponer el puerto que usa la aplicación
EXPOSE 8080

# Especificar usuario no root por seguridad
RUN useradd --create-home appuser
USER appuser

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
