import {Schema, model} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

export const cartsColletion = 'carts';
export const cartSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  }
});

cartSchema.plugin(mongoosePaginate);
export const CartModel = model(cartsColletion, cartSchema);