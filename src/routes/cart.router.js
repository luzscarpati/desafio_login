import { Router } from 'express';
import { CartManager } from '../managers/cartManager.js';


const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: 'No hay carritos' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo realizar la operación' });
  }
});

router.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getCartById(cid);

  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cartId/product/:productId', async (req, res) => {
  const { productId, cartId } = req.params;
  const updatedCart = await cartManager.saveProductToCart(cartId, productId);

  if (updatedCart) {
    res.status(200).json(updatedCart);
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

export default router;

