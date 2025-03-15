const app = require("../src/app");
const mongoose = require("../src/db");
const request = require("supertest");
require("dotenv").config();

xdescribe("Rutas de productos", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
    });
  }, 60000);

  afterAll(async () => {
    await mongoose.connection.close();
  }, 60000);

  let product_1, product_2, products;

  test("Crear product_1", async () => {
    let data = {
      image:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/6182RBFfifL._AC_SL1500_.jpg",
      name: "Colgate",
      price: 1500,
      codigo: 2343738533,
      stock: 16,
      proveedor: 1,
      vencimiento: "15-12-2023",
    };
    let res = await request(app).post("/api/product/create").send(data);
    product_1 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(data.name);
    expect(res.body.price).toBe(data.price); 
  }, 20000);

  test("Crear product_2", async () => {
    let data = {
      image:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/6182RBFfifL._AC_SL1500_.jpg",
      name: "Colgate",
      price: 1500,
      codigo: 2343738533,
      stock: 16,
      proveedor: 1,
      vencimiento: "15-12-2023",
    };
    let res = await request(app).post("/api/product/create").send(data);
    product_2 = res.body.id;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(data.name);
    expect(res.body.price).toBe(data.price);
  }, 20000);

  test("Buscar product_1", async () => {
    let res = await request(app)
      .get("/api/product/" + product_1)  
      .send();
    expect(res.status).toBe(200);
    expect(res.body[0].id).toBe(product_1);
  });

  test("Buscar todos los products", async () => {
    let res = await request(app).get("/api/product").send();
    products = res.body.length;
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  test("Eliminar product_1", async () => { 
    await request(app)
      .delete("/api/product/delete/" + product_1)
      .send();
    let res = await request(app).get("/api/product").send();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(products - 1); 
  });

  test("Eliminar todos los productos", async () => {
    await request(app).delete("/api/product/delete").send();
    let res = await request(app).get("/api/product").send(); 
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("No hay productos");
  });
});
