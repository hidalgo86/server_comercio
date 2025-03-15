# API de Gestión de Negocios

Este proyecto es una API de gestión de negocios construida con Node.js, Express y MongoDB. La API permite gestionar usuarios, productos, proveedores y la autorización de usuarios.

## Requisitos

- Node.js
- MongoDB
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:

   ```sh
   cd tu-repositorio
   ```

3. Instala las dependencias:

   ```sh
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/tu_base_de_datos
   PORT=3000
   JWT_SECRET=tu_secreto
   ```

2. Inicia el servidor:

   ```sh
   npm start
   ```

## Uso de la API

### Endpoints principales

#### **Autorización (`/api/auth`)**
- `POST /api/auth/user/authorization` - Autorizar usuario

#### **Usuarios (`/api/user`)**
- `GET /api/user` - Obtener todos los usuarios
- `GET /api/user/:id` - Obtener un usuario por ID
- `PUT /api/user/update/:id` - Actualizar un usuario por ID
- `POST /api/user/create` - Crear un nuevo usuario
- `DELETE /api/user/delete` - Eliminar todos los usuarios (requiere autenticación)
- `DELETE /api/user/delete/:id` - Eliminar un usuario por ID

#### **Productos (`/api/product`)**
- `GET /api/product` - Obtener todos los productos
- `GET /api/product/:id` - Obtener un producto por ID
- `PUT /api/product/update/:id` - Actualizar un producto por ID
- `POST /api/product/create` - Crear un nuevo producto
- `DELETE /api/product/delete` - Eliminar todos los productos
- `DELETE /api/product/delete/:id` - Eliminar un producto por ID

#### **Proveedores (`/api/provider`)**
- `GET /api/provider` - Obtener todos los proveedores
- `GET /api/provider/:id` - Obtener un proveedor por ID
- `PUT /api/provider/update/:id` - Actualizar un proveedor por ID
- `POST /api/provider/create` - Crear un nuevo proveedor
- `DELETE /api/provider/delete` - Eliminar todos los proveedores
- `DELETE /api/provider/delete/:id` - Eliminar un proveedor por ID

## Pruebas

El proyecto cuenta con pruebas implementadas. Para ejecutarlas, usa el siguiente comando:

```sh
npm test
```

## Documentación con OpenAPI

La API está documentada con OpenAPI. Para acceder a la documentación interactiva, inicia el servidor y visita:

```
http://localhost:3000/api-docs
```

Aquí podrás explorar los endpoints, probar solicitudes y ver ejemplos de respuestas.

## Despliegue

Para ejecutar en producción, puedes usar PM2:

```sh
npm install -g pm2
npm run build
npm start
pm2 start index.js --name "API_Gestion"
```

## Contribución

Si deseas contribuir, por favor abre un issue o haz un pull request.

## Licencia

Este proyecto está bajo la licencia MIT.

