// product.controller.js
import ProductServices from "../services/product.services.js";

const productServices = new ProductServices();

export default class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const { page, limit, sort, query } = req.query;

      const products = await productServices.getAll(page, limit, sort, query);

      let srtOptions = "";
      if (limit) {
        srtOptions += "&limit=" + limit;
      }
      if (sort) {
        srtOptions += "&sort=" + sort;
      }

      products.prevLink = products.hasPrevPage
        ? "?page=" + products.prevPage + srtOptions
        : null;
      products.nextLink = products.hasNextPage
        ? "?page=" + products.nextPage + srtOptions
        : null;

      res.render('products', { products }); // Reemplaza 'products' con el nombre de tu vista Handlebars
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productServices.getById(id);

      if (!product) {
        res.render('productNotFound'); // Reemplaza 'productNotFound' con el nombre de tu vista Handlebars para producto no encontrado
      } else {
        res.render('productDetail', { product }); // Reemplaza 'productDetail' con el nombre de tu vista Handlebars para detalles del producto
      }
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productServices.create(req.body);

      if (!newProduct) {
        res.render('errorCreatingProduct'); // Reemplaza 'errorCreatingProduct' con el nombre de tu vista Handlebars para error al crear el producto
      } else {
        res.render('productCreated', { newProduct }); // Reemplaza 'productCreated' con el nombre de tu vista Handlebars para producto creado con éxito
      }
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const productUpdt = await productServices.update(id, req.body);

      if (!productUpdt) {
        res.render('productNotFound');
      } else {
        res.render('productUpdated', { productUpdt });
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const productDel = await productServices.delete(id);

      if (!productDel) {
        res.render('productNotFound');
      } else {
        res.render('productDeleted', { productDel });
      }
    } catch (error) {
      next(error);
    }
  }
}


