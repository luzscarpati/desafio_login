import ProductManager from '../managers/product.manager.js';

const productManager = new ProductManager();

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, sort } = req.query;
        const products = await productManager.getAll(page, limit, sort);
        // products.nextLink = "http://luz.scarpati";
        res.json(products);
    } catch (error) {
        next(error);
    };
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productManager.getById(id);

        if (!product) {
            res.json({msg: "Producto no encontrado"});
        }else {
            res.json(product);
        };
    }catch (error) {
        next(error);
    };
};

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productManager.create(req.body);

        if(!newProduct) {
            res.json({ msg: "Error al crear el producto"});
        }else {
            res.json(newProduct);
        };
    }catch(error) {
        next(error);
    };
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdt = await productManager.update(id, req.body);

        if(!productUpdt) {
            res.json({ msg: "Producto no encontrado" });
        } else {
            res.json(productUpdt);
        };
    }catch(error){
        next(error);
    ;}
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productDel = await productManager.delete(id);

        if(!productDel) {
            res.json({ msg: "Producto no encontrado" });
        }else {
            res.json(productDel);
        };
    }catch(error) {
        next(error);
    };
};