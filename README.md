Proyecto de Clases de Yoga
Descripción
Este proyecto (aún en producción) es una plataforma para gestionar clases de yoga. Los usuarios pueden ver y comprar clases, mientras que los instructores pueden publicar nuevas clases. El sistema incluye un dashboard para administradores, usuarios e instructores, y utiliza Firebase y Auth0 para la autenticación.

Tecnologías Utilizadas

Frontend:
React
JavaScript
HTML
TailwindCSS

Backend:
Node.js
Express

Base de Datos:
MongoDB

Autenticación:
Firebase
Auth0

Funcionalidades
Para Usuarios:

Ver clases disponibles de yoga.
Seleccionar y comprar clases.
Acceder a un dashboard personal.
Para Instructores:

Publicar nuevas clases de yoga.
Gestionar las clases publicadas.
Acceder a un dashboard para instructores.
Para Administradores:

Gestionar usuarios y instructores.
Supervisar y moderar el contenido de la plataforma.
Acceder a un dashboard administrativo.
Autenticación:

Login y registro utilizando Firebase y Auth0.
Instalación
Para ejecutar este proyecto localmente, sigue estos pasos:

Clona el repositorio:

bash
Copiar código
git clone <URL_DEL_REPOSITORIO>
Instala las dependencias del frontend:

bash
Copiar código
cd client
npm install
Instala las dependencias del backend:

bash
Copiar código
cd ../server
npm install
Configura Firebase y Auth0: Asegúrate de tener configuradas las credenciales de Firebase y Auth0. Añade la configuración en los archivos correspondientes (client/src/firebase-config.js y server/config/auth0-config.js).

Configura la base de datos: Configura la conexión a MongoDB en el archivo server/config/db.js.

Inicia el servidor backend:

bash
Copiar código
npm start
Inicia el frontend:

bash
Copiar código
cd ../client
npm start
Enlace de la Aplicación
Actualmente el proyecto está en desarrollo y no tiene un enlace de despliegue. Mantente atento a futuras actualizaciones para obtener acceso a la aplicación en producción.

Contribuciones
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Envía tus cambios a tu repositorio fork (git push origin feature/nueva-funcionalidad).
Abre una Pull Request en este repositorio.
Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
