// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\docs\productDocs.js
/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos
 */

/**
 * @swagger
 * /api/product:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Recupera una lista de todos los productos disponibles en el sistema.
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */

/**
 * @swagger
 * /api/product/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Recupera los detalles de un producto específico utilizando su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 */

/**
 * @swagger
 * /api/product/update/{id}:
 *   put:
 *     summary: Actualizar un producto por ID
 *     description: Actualiza la información de un producto específico utilizando su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL de la imagen del producto.
 *               name:
 *                 type: string
 *                 description: El nombre del producto.
 *               price:
 *                 type: number
 *                 description: El precio del producto.
 *               codigo:
 *                 type: number
 *                 description: El código del producto.
 *               stock:
 *                 type: number
 *                 description: La cantidad de stock del producto.
 *               vencimiento:
 *                 type: string
 *                 description: La fecha de vencimiento del producto.
 *               user:
 *                 type: string
 *                 description: ID del usuario asociado al producto.
 *               provider:
 *                 type: string
 *                 description: ID del proveedor asociado al producto.
 *     responses:
 *       200:
 *         description: Producto actualizado
 */

/**
 * @swagger
 * /api/product/create:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto en el sistema.
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL de la imagen del producto.
 *               name:
 *                 type: string
 *                 description: El nombre del producto.
 *               price:
 *                 type: number
 *                 description: El precio del producto.
 *               codigo:
 *                 type: number
 *                 description: El código del producto.
 *               stock:
 *                 type: number
 *                 description: La cantidad de stock del producto.
 *               vencimiento:
 *                 type: string
 *                 description: La fecha de vencimiento del producto.
 *               user:
 *                 type: string
 *                 description: ID del usuario asociado al producto.
 *               provider:
 *                 type: string
 *                 description: ID del proveedor asociado al producto.
 *     responses:
 *       200:
 *         description: Producto creado
 */

/**
 * @swagger
 * /api/product/delete:
 *   delete:
 *     summary: Eliminar todos los productos
 *     description: Elimina todos los productos registrados en el sistema.
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Todos los productos eliminados
 */

/**
 * @swagger
 * /api/product/delete/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     description: Elimina un producto específico utilizando su ID.
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
