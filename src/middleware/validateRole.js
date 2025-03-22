function validateRole(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user.role; // El rol del usuario debe estar en req.user (decodificado del token JWT)

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." }); // Código 403: Prohibido
    }

    next(); // Continuar si el rol es válido
  };
}

module.exports = validateRole;
