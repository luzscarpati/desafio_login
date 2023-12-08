import ProductServices from "../services/product.services.js";

const productServices = new ProductServices();

export default class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await productServices.getProducts();
      const productsPlain = products.map(product => product.toObject());
      return res.render('products', { products: productsPlain });
    } catch (error) {
      next(error);
    };
  };

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productServices.getById(id);

      if (!product) {
        res.render('productNotFound');
        res.render('productDetail', { productDetail }); 
      }
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = await productServices.create(req.body);

      if (!newProduct) {
        res.render('errorCreatingProduct'); // Crear 'errorCreatingProduct'  vista Handlebars para error al crear el producto
      } else {
        res.render('productCreated', { newProduct }); // Crear 'productCreated' vista Handlebars para producto creado con éxito
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


