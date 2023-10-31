import { Router } from 'express';
const router = Router();

import { ProductManager } from '../managers/productManager.js';
import { productValidator } from '../middlewares/productValidator.js';
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (!limit) {
      res.status(200).json(products);
    } else {
      const productsByLimit = await productManager.getProductsByLimit(limit);
      res.status(200).json(productsByLimit);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(Number(id));

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
  } else {
    res.status(200).json(product);
  }
});

router.post('/', productValidator, async (req, res) => {
  try {
    const productCreated = await productManager.createProduct(req.body);
    res.status(201).json(productCreated);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  const productOk = await productManager.getProductById(idNumber);
  
  if (!productOk) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const updatedProduct = { ...req.body };
  await productManager.updateProduct(idNumber, updatedProduct);
  res.status(200).json({ message: `Product id: ${id} updated` });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);
  await productManager.deleteProduct(idNumber);
  res.status(204).end();
});

export default router;
