import fs from "fs";

export default class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    this.products = [];

    const writingFile = async (file) => {
      try {
        await fs.promises.writeFile(file, JSON.stringify(this.products));
      } catch (error) {
        console.log("error write: ", error);
      }
    };
    writingFile(this.fileName);
  }

  async save(productSafe) {
    try {
      if (this.products.length == 0) {
        productSafe.id = 1;
      } else {
        let id = this.products[this.products.length - 1].id;
        productSafe.id = id + 1;
      }
      this.products = [...this.products, productSafe];
      console.log("productos: ", this.products);
      await fs.promises.writeFile(
        `${this.fileName}.txt`,
        JSON.stringify(this.products)
      );
      console.log("SE HA GUARDADO EL PRODUCTO");
    } catch (error) {
      console.log("error save: ", error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(`${this.fileName}.txt`, "utf8");
      const parseData = JSON.parse(data);
      console.log("All Products =>", parseData);
      return parseData;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.promises.readFile(`${this.fileName}.txt`, "utf8");
      const dataParse = JSON.parse(data);
      const productId = dataParse.find((prod) => prod.id === id) || null;
      console.log("Product by ID =>", productId);
      return productId;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.promises.readFile(`${this.fileName}.txt`, "utf8");
      const dataParse = JSON.parse(data);
      const productId = dataParse.filter((prod) => prod.id !== id);
      console.log("Se eliminó el producto específico:", productId);
      await fs.promises.writeFile(
        `${this.fileName}.txt`,
        JSON.stringify(productId)
      );
    } catch (error) {
      console.log("error deleteById: ", error);
    }
  }
}
