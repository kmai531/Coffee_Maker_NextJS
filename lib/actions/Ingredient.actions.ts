'use server';

import { connectToDatabase } from '../database';
import Ingredient from '../database/models/Ingredient.model';

export const createIngredient = async (name: string, amount: number) => {
    try {
        await connectToDatabase();

        const newIngredient = await Ingredient.create({
            name: name,
            amount: amount,
        });
        return JSON.parse(JSON.stringify(newIngredient));
    } catch (error) {
        console.error('Error creating ingredient:', error);
        throw new Error('Failed to create ingredient');
    }
};

export const updateIngredient = async (
    id: string,
    name: string,
    amount: number
) => {
    try {
        await connectToDatabase();
        const ingredientToUpdate = await Ingredient.findById(id);
        if (!ingredientToUpdate) {
            throw new Error('Unable to find this ingredient');
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            id,
            { name: name, amount: amount },
            { new: true }
        );

        return JSON.parse(JSON.stringify(updatedIngredient));
    } catch (error) {
        console.error('Error updating ingredient:', error);
        throw new Error('Failed to update ingredient');
    }
};

export const deleteIngredient = async (id: string) => {
    try {
        await connectToDatabase();
        const ingredientToDelete = await Ingredient.findByIdAndDelete(id);
        if (!ingredientToDelete) {
            throw new Error('Unable to find this ingredient');
        }
        await Ingredient.findByIdAndDelete(id);
        return { message: "Ingredient deleted" };
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        throw new Error('Failed to delete ingredient');
    }
};

export const getAllIngredients = async () => {
    try {
        await connectToDatabase();
        const ingredients = await Ingredient.find();
        return JSON.parse(JSON.stringify(ingredients));
    } catch (error) {
        console.error('Error getting ingredients:', error);
        throw new Error('Failed to get ingredients');
    }
};
