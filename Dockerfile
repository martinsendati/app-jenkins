# Usa una imagen base de Nginx para servir la página web
FROM nginx:latest

# Copia los archivos al directorio de trabajo de Nginx
COPY index.html /usr/share/nginx/html
COPY index.js /usr/share/nginx/html
COPY styles.css /usr/share/nginx/html

# Exponer el puerto 80 para que Nginx pueda escuchar las solicitudes web
EXPOSE 80

