
import axios from 'axios';
import crypto from 'crypto';
import { User } from '../models/User_types';
import { config } from '../utils/config';

const API_URL: string = `${config.BASE_URL}/users`;

export const fetchAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching all users: ${error}`);
    }
};

export const fetchUserById = async (userId: string): Promise<User> => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching user with id ${userId}: ${error}`);
    }
};

export const createNewUser = async (userDetails: Omit<User, "id">): Promise<User> => {
    try {
        const userWithId = { ...userDetails, id: crypto.randomUUID() };
        const response = await axios.post(API_URL, userWithId);
        return response.data;
    } catch (error) {
        throw new Error(`Error creating new user: ${error}`);
    }
};

export const modifyUser = async (userId: string, changes: Partial<User>): Promise<User> => {
    try {
        const response = await axios.patch(`${API_URL}/${userId}`, changes);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating user with id ${userId}: ${error}`);
    }
};

export const removeUser = async (userId: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${userId}`);
    } catch (error) {
        throw new Error(`Error deleting user with id ${userId}: ${error}`);
    }
};

export const fetchUsersByRoleId = async (roleId: string): Promise<User[]> => {
    try {
        const response = await axios.get(`${API_URL}?roleId=${roleId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching users with roleId ${roleId}: ${error}`);
    }
};
