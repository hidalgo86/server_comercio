const fs = require("fs"); // Módulo para trabajar con el sistema de archivos
const path = require("path"); // Módulo para trabajar con rutas de archivos y directorios

// Crear la carpeta "logs" si no existe
const logsFolder = path.join(__dirname, "logs"); // Ruta de la carpeta "logs"
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder); // Crear la carpeta si no existe
}

// Middleware para registrar solicitudes y estado de respuesta
const logRequests = (req, res, next) => {
  const logFilePath = path.join(logsFolder, "requests.log"); // Ruta del archivo de logs

  // Datos de la solicitud
  const requestData = {
    method: req.method, // Método HTTP (GET, POST, etc.)
    url: req.url, // URL de la solicitud
    body: req.body, // Cuerpo de la solicitud
  };

  // Interceptar la respuesta para capturar el estado
  const originalSend = res.send; // Guardar la referencia al método original res.send
  res.send = function (body) {
    const responseData = {
      statusCode: res.statusCode, // Código de estado de la respuesta
    };

    // Crear el registro combinado de solicitud y respuesta
    const logEntry = { request: requestData, response: responseData };

    // Guardar el registro en el archivo "requests.log"
    fs.appendFile(logFilePath, `${JSON.stringify(logEntry)}\n`, (err) => {
      if (err) {
        console.error("Error al guardar el registro de la solicitud:", err); // Manejar errores al escribir en el archivo
      }
    });

    originalSend.call(this, body); // Llamar al método original res.send para enviar la respuesta
  };

  next(); // Continuar con la siguiente función o ruta
};

module.exports = logRequests; // Exportar el middleware
