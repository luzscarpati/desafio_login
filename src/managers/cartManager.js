import { error } from "console";
import fs from "fs";
import ProductManager from "../managers/product.manager.js";
import { CartModel } from "../models/cart.model.js";

export class CartManager {
    //constructor(path) {
    //    this.path = path;
    //}

    async getCarts(page=1, limit=10) {
        try {
            return (
                await CartModel.paginate({}, { page, limit, sort: {price: sortOrder} })
            );
        } catch (error) {
            console.log('Error al obtener carritos', error);
        };
    };

    async createCart(obj) {
        try {
            return await CartModel.create(obj);
        } catch (error) {
            console.log(error);
        };
    };

    async getCartById(id) {
        try {
           await CartModel.findById(id);
        } catch (error) {
            console.log(error);
            return null;
        };
    };

    async deleteCart(id){
        try{
            await CartModel.findByIdAndDelete(id);
        } catch (error){
            return error;
        };
    };

    async getCartIdInJson(id){
        try{
            id = parseInt(id);
            const carts = await this.getCarts();
            const cartId = carts.findIndex((c) => c.id === id);
            return cartId || null;
        } catch (error){
            return error;
        }
    }

   

    async saveProductToCart(idCart, idProd) {
        idProd = parseInt(idProd);
        const carts = await this.getCarts();
        const cartId = await this.getCartIdInJson(idCart);
        const productManager = new ProductManager('./src/data/products.json');
        const products = await productManager.getProductById(idProd);
        console.log('a ver: ', cartId, products);

        if (cartId && products) {
            const cartProduct = carts[cartId].products.find((p) => p.product === idProd);

            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                const prod = {
                    product: idProd,
                    quantity: 1
                };

                carts[cartId].products.push(prod);
            }

            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return carts[cartId];
        } else {
            return false
        }
    }
}