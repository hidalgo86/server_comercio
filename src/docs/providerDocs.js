// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\docs\providerDocs.js
/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Gestión de proveedores
 */

/**
 * @swagger
 * /api/provider:
 *   get:
 *     summary: Obtener todos los proveedores
 *     description: Recupera una lista de todos los proveedores registrados en el sistema.
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores
 */

/**
 * @swagger
 * /api/provider/{id}:
 *   get:
 *     summary: Obtener un proveedor por ID
 *     description: Recupera los detalles de un proveedor específico utilizando su ID.
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 */

/**
 * @swagger
 * /api/provider/update/{id}:
 *   put:
 *     summary: Actualizar un proveedor por ID
 *     description: Actualiza la información de un proveedor específico utilizando su ID.
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 */

/**
 * @swagger
 * /api/provider/create:
 *   post:
 *     summary: Crear un nuevo proveedor
 *     description: Crea un nuevo proveedor en el sistema.
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proveedor creado
 */

/**
 * @swagger
 * /api/provider/delete:
 *   delete:
 *     summary: Eliminar todos los proveedores
 *     description: Elimina todos los proveedores registrados en el sistema.
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Todos los proveedores eliminados
 */

/**
 * @swagger
 * /api/provider/delete/{id}:
 *   delete:
 *     summary: Eliminar un proveedor por ID
 *     description: Elimina un proveedor específico utilizando su ID.
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del proveedor
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 */
