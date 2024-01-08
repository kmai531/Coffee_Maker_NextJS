import { Document, Schema, model, models } from "mongoose";

export interface IIngredient extends Document {
    _id: string;
    name: string;
    amount: number;
}

const IngreidentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    }
})

const Ingredient = models.Ingredient || model<IIngredient>("Ingredient", IngreidentSchema);

export default Ingredient;