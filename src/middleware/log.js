const fs = require("fs");
const path = require("path");

// Crear la carpeta "logs" si no existe
const logsFolder = path.join(__dirname, "logs");
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// Middleware para registrar solicitudes y estado de respuesta
const logRequests = (req, res, next) => {
  const logFilePath = path.join(logsFolder, "requests.log");
  const requestData = {
    method: req.method,
    url: req.url,
    body: req.body,
  };
  const originalSend = res.send;
  res.send = function (body) {
    const responseData = {
      statusCode: res.statusCode,
    };
    const logEntry = { request: requestData, response: responseData };
    fs.appendFile(logFilePath, `${JSON.stringify(logEntry)}\n`, (err) => {
      if (err) {
        console.error("Error al guardar el registro de la solicitud:", err);
      }
    });
    originalSend.call(this, body);
  };
  next();
};

module.exports = logRequests;


