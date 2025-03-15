// filepath: c:\Users\USUARIO\Desktop\Server_comercio\src\docs\authorizationDocs.js
/**
 * @swagger
 * tags:
 *   name: Autorización
 *   description: Gestión de autorización de usuarios
 */

/**
 * @swagger
 * /api/user/authorization:
 *   post:
 *     summary: Autorizar un usuario
 *     description: Autoriza a un usuario y genera un token de acceso. Para autorizar a un usuario, este debe estar registrado con su nick y su password.
 *     tags: [Autorización]
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
 *                 type: number
 *     responses:
 *       200:
 *         description: Usuario autorizado y token generado
 *       401:
 *         description: Credenciales incorrectas
 */
