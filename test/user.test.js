const app = require("../src/app");
const mongoose = require("../src/db");
const request = require("supertest");
require("dotenv").config();

describe("Rutas del usuario", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
    });
  }, 60000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 60000); 

  let user_1, user_2, users;

  test("Crear usuario_1", async () => {
    let user = {
      username: "Juan",
      password: 1234,
    };
    let res = await request(app).post("/api/user/create").send(user);
    user_1 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.username).toBe(user.username);
    expect(res.body.password).toBe(user.password);
  }, 20000);

  test("validar usuario_1", async () => {
    let user = {
      username: "Juan",
      password: 1234,
    };
    let autorizacion = await request(app)
      .post("/api/user/authorization")
      .send(user);
    expect(autorizacion.status).toBe(200);
    expect(autorizacion.header.authorization.split(".").length).toBe(3);
  }, 20000);

  test("Crear usuario_2", async () => {
    let user = {
      username: "Pedro",
      password: 1234,
    };
    let res = await request(app).post("/api/user/create").send(user);
    user_2 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.username).toBe(user.username);
    expect(res.body.password).toBe(user.password);
  }, 20000);

  test("Buscar usuario_1", async () => {
    let res = await request(app)
      .get("/api/user/" + user_1)
      .send();
    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(user_1);
  });

  test("Actualizar usuario_1", async () => {
    let res = await request(app)
      .put("/api/user/update/" + user_1)
      .send({ username: "lulu" });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(user_1);
    expect(res.body.username).toBe("lulu");
  });

  test("Buscar todos los usuarios", async () => {
    let res = await request(app).get("/api/user").send();
    users = res.body.length;
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test("Eliminar usuario_1", async () => {
    await request(app)
      .delete("/api/user/delete/" + user_1)
      .send();
    let res = await request(app).get("/api/user").send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(users - 1);
  });

  test("Eliminar todos los usuarios", async () => {
    let user = {
      username: "Pedro",
      password: 1234,
    };
    let autorizacion = await request(app)
      .post("/api/user/authorization")
      .send(user);
    expect(autorizacion.status).toBe(200);
    let deleted = await request(app)
      .delete("/api/user/delete")
      .set("Authorization", `Bearer ${autorizacion.header.authorization}`)
      .send();
    expect(deleted.status).toBe(200);
    let res = await request(app).get("/api/user").send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("No hay usuarios");
  });
});
