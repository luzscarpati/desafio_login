import fs from "fs";

export class ProductManager {
    constructor(path) {
        this.productsPath = path;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.productsPath)) {
                const productsJSON = await fs.promises.readFile(this.productsPath, 'utf-8');
                return JSON.parse(productsJSON);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getProductsByLimit(limit){
        try {
            const products = await this.getProducts();
            if(!limit || limit >= products.length) return products;
            else return products.slice(0, limit);
        } catch (error) {
            console.log(error);
        }
      }

      async createProduct(obj) {
        try {
            const products = await this.getProducts();
            const maxProductId = Math.max(...products.map(product => product.id));
            const newProductId = maxProductId + 1;
    
            const product = {
                id: newProductId,
                status: true,
                ...obj,
            };
    
            products.push(product);
            await fs.promises.writeFile(this.productsPath, JSON.stringify(products));
            return product;
        } catch (error) {
            console.log('No se pudo cargar el producto', error);
        }
    }
        
    async getProductById(id) {
        console.log('entra');
        try {
          const products = await this.getProducts();
          console.log('prod', products);
          id = parseInt(id);
          const product = products.find((p) => p.id === id);
          return product || null;
        } catch (error) {
          console.error("Error al buscar el producto por ID:", error);
          return null;
        }
      }
      

      async updateProduct(id, updatedFields) {
        try {
            const products = await this.getProducts();
    
            if (!products) {
                console.log("La lista de productos no se cargó correctamente.");
                return;
            }
    
            const productIndex = products.findIndex((p) => p.id === id);
    
            if (productIndex !== -1) {
                const updatedProduct = { ...products[productIndex], ...updatedFields };
                updatedProduct.id = id;
                products[productIndex] = updatedProduct;
                await fs.promises.writeFile(this.productsPath, JSON.stringify(products));
                console.log("Producto actualizado correctamente.");
            } else {
                console.log("Producto no encontrado. No se pudo actualizar.");
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }
  
    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
    
            if (!products) {
                console.log("La lista de productos no se cargó correctamente.");
                return;
            }
    
            const productIndex = products.findIndex((p) => p.id === id);
    
            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await fs.promises.writeFile(this.productsPath, JSON.stringify(products));
                console.log("Producto eliminado correctamente.");
            } else {
                console.log("Producto no encontrado. No se pudo eliminar.");
            }
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }      
}
