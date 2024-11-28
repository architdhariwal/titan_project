import { Product } from "../models/Product_types";
import axios from "axios";
import { config } from "../utils/config";
import { v4 as uuidv4 } from 'uuid';

const PRODUCTS_API_URL: string | undefined = `${config.BASE_URL}/products`;

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get(PRODUCTS_API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching all products: ${error}`);
    }
};

export const fetchProductById = async (productId: string): Promise<Product> => {
    try {
        const response = await axios.get(`${PRODUCTS_API_URL}/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching product with id ${productId}: ${error}`);
    }
};

export const createNewProduct = async (productDetails: Omit<Product, "id">): Promise<Product> => {
    try {
        const productWithId = { ...productDetails, id: uuidv4() };
        const response = await axios.post(PRODUCTS_API_URL, productWithId);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating new product: ${error}`);
    }
};

export const modifyProduct = async (productId: string, productUpdates: Partial<Product>): Promise<Product> => {
    try {
        const response = await axios.patch(`${PRODUCTS_API_URL}/${productId}`, productUpdates);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating product with id ${productId}: ${error}`);
    }
};

export const removeProduct = async (productId: string): Promise<void> => {
    try {
        await axios.delete(`${PRODUCTS_API_URL}/${productId}`);
    } catch (error) {
        throw new Error(`Error deleting product with id ${productId}: ${error}`);
    }
};
