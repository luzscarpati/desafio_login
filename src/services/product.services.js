import { ProductModel } from "../models/product.model.js";

export default class ProductServices {
  async getProducts() {
    try{
      const products = await ProductModel.find();
      return products;
  }catch(error){
      next(error)
  }
  };

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  };

  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  };

  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate(
        { _id: id },
        obj,
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  };
};
