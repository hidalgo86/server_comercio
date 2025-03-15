const app = require("../src/app");
const mongoose = require("../src/db");
const request = require("supertest");
require("dotenv").config();

describe("Rutas del proveedor", () => {
  let user_1
  beforeAll(async () => {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
    });
    let user = {
      username: "juan",
      password: 1234,
    };
    let res = await request(app).post("/api/user/create").send(user); 
    user_1 = res.body.id;
  }, 60000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 60000);

  let provider_1, provider_2, providers;

  test("Crear proveedor_1", async () => {
    let data = {
      razonSocial: "souch",
      name: "jesus",
      telf: 1234,
      email: "hidalgo@gmail.com",
      user: `${user_1}`
    };
    let res = await request(app).post("/api/provider/create").send(data);
    provider_1 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(data.name);
  }, 20000);

  test("Crear proveedor_2", async () => {
    let data = {
      razonSocial: "souch",
      name: "jesus",
      telf: 1234,
      email: "hidalgo@gmail.com",
    };
    let res = await request(app).post("/api/provider/create").send(data);
    provider_2 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(data.name);
    expect(res.body.razonSocial).toBe(data.razonSocial);
  }, 20000);

  test("Buscar proveedor_1", async () => {
    let res = await request(app)
      .get("/api/provider/" + provider_1)
      .send();
    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(provider_1);
    expect(res.body[0].user.username).toBe("juan");
  });

  test("Actualizar proveedor_1", async () => {
    let res = await request(app)
      .put("/api/provider/update/" + provider_1)
      .send({ name: "lulu" });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(provider_1);
    expect(res.body.name).toBe("lulu");
  });

  test("Buscar todos los proveedores", async () => {
    let res = await request(app).get("/api/provider").send();
    providers = res.body.length;
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test("Eliminar proveedor_1", async () => {
    await request(app)
      .delete("/api/provider/delete/" + provider_1)
      .send();
    let res = await request(app).get("/api/provider").send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(providers - 1);
  });

  test("Eliminar todos los proveedores", async () => {
    await request(app).delete("/api/provider/delete").send();
    let res = await request(app).get("/api/provider").send();
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("No hay proveedor");
  });
});
