// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\docs\userDocs.js
/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Recupera una lista de todos los usuarios registrados en el sistema.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Recupera los detalles de un usuario específico utilizando su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 */

/**
 * @swagger
 * /api/user/update/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     description: Actualiza la información de un usuario específico utilizando su ID.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario creado
 */

/**
 * @swagger
 * /api/user/delete:
 *   delete:
 *     summary: Eliminar todos los usuarios
 *     description: Elimina todos los usuarios registrados en el sistema.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Todos los usuarios eliminados
 */

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Elimina un usuario específico utilizando su ID. Debe proporcionar el ID del usuario y el token de acceso en el encabezado.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de acceso en formato Bearer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       401:
 *         description: No autorizado
 */
