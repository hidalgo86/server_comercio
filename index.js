//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"use strict";
const server = require("./src/app.js");
const mongoose = require("./src/db.js");
require("dotenv").config();

const startServer = async () => {
  try {
    // Conexión a la base de datos
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // Mejora la estabilidad de la conexión
    });
    console.log("✅ Conexión a la base de datos exitosa");

    // Iniciar el servidor
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor escuchando en el puerto ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Error al iniciar la aplicación:", error.message);
    process.exit(1); // Finaliza el proceso si ocurre un error crítico
  }
};

startServer();
