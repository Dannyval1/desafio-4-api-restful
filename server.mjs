import express from "express";
const { Router } = express;

const app = express();
const router = Router();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let productos = [];

router.get("/", async (req, res) => {
  res.status(200).json(productos);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado" });
  const productId =
    productos.find((prod) => prod.id === id) ||
    res.json({ error: "Producto no encontrado" });
  res.send(productId);
});

router.post("/", async (req, res) => {
  if (req.body.producto) {
    productos.push(req.body.producto);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: req.body.producto });
  }
  if (!req.body.producto) {
    const priceNew = Number(req.body.productPrice);
    const newProduct = {
      title: req.body.productName,
      price: priceNew,
      thumbnail: req.body.productUrl,
    };
    productos.push(newProduct);
    productos.forEach((producto, index) => {
      producto.id = index + 1;
    });
    res.status(201).json({ Agregado: newProduct });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no existe para ser editado" });
  const priceNew = Number(req.body.productPrice);
  const newProduct = {
    title: req.body.productName,
    price: priceNew,
    thumbnail: req.body.productUrl,
  };
  productos[id - 1] = newProduct;
  productos.forEach((producto, index) => {
    producto.id = index + 1;
  });
  res.status(201).json({ EDITADO: newProduct });
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) res.json({ error: "Producto no encontrado para eliminar" });
  const productIdDelete = productos.filter((prod) => prod.id !== id);
  res.json({
    result: "ok",
    id: id,
  });
  productos = productIdDelete;
  res.status(200).json(productIdDelete);
});

app.use("/api/productos", router);

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
