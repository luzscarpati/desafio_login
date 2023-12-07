import ProductServices from "../services/product.services.js";

const productServices = new ProductServices();
//const urlBase = 'http://localhost:8080/api/products/';

export default class ProductController {
    
    async getAllProducts (req, res, next){
        try {
            const { page, limit, sort, query } = req.query;
            
            const products = await productServices.getAll(page, limit, sort, query);
            
            let srtOptions = '';
            if(limit){
                srtOptions += '&limit=' + limit;
            };
            if(sort) {
                srtOptions += '&sort=' + sort;
            };
            
    
            products.prevLink = products.hasPrevPage ? urlBase + '?page=' + products.prevPage + srtOptions : null;
            products.nextLink = products.hasNextPage ? urlBase + '?page=' + products.nextPage + srtOptions : null;
           
            res.json(products);
        } catch (error) {
            next(error);
        };
    };
    
    async getProductById (req, res, next){
        try {
            const { id } = req.params;
            const product = await productServices.getById(id);
    
            if (!product) {
                res.json({msg: "Producto no encontrado"});
            }else {
                res.json(product);
            };
        }catch (error) {
            next(error);
        };
    };
    
    async createProduct (req, res, next){
        try {
            const newProduct = await productServices.create(req.body);
    
            if(!newProduct) {
                res.json({ msg: "Error al crear el producto"});
            }else {
                res.json(newProduct);
            };
        }catch(error) {
            next(error);
        };
    };
    
    async updateProduct (req, res, next){
        try {
            const { id } = req.params;
            const productUpdt = await productServices.update(id, req.body);
    
            if(!productUpdt) {
                res.json({ msg: "Producto no encontrado" });
            } else {
                res.json(productUpdt);
            };
        }catch(error){
            next(error);
        ;}
    };
    
    async deleteProduct (req, res, next){
        try {
            const { id } = req.params;
            const productDel = await productServices.delete(id);
    
            if(!productDel) {
                res.json({ msg: "Producto no encontrado" });
            }else {
                res.json(productDel);
            };
        }catch(error) {
            next(error);
        };
    };

};

