// import { model } from "mongoose";
import { ProductModel } from "../models/product.model.js";

export default class ProductManager {
    //constructor( collection, schema) {
    //    this.collection = model(collection, schema);
    //};

    async getAll(page=1, limit=10, sortOrder='desc') {
        try{
            return (
                await ProductModel.paginate({}, { page, limit, sort: {price: sortOrder} })
            );
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try {
            return (
                await ProductModel.findById(id)
            );
        }catch(error) {
            console.log(error);
        };
    };

    async create(obj) {
        try {
           return await ProductModel.create(obj);
        }catch (error) {
            console.log(error);
        };
    };

    async update(id, obj) {
        try{
            return (
                await ProductModel.findByIdAndUpdate(
                    {_id: id},
                    obj,
                    {new: true}
                    )
            );
        }catch (error) {
            console.log(error);
        };
    };

    async delete(id) {
        try {
            return (
                await ProductModel.findByIdAndDelete(id)
            )
        }catch (error) {
            console.log(error);
        };
    };

};