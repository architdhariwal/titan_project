import axios from 'axios';
import bcrypt from 'bcryptjs';
import { Address, User } from '../models/User_types';
import { config } from '../utils/config';

const API_URL = `${config.BASE_URL}/users`;

export async function getUsers(): Promise<User[]> {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
}

export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  try {
    const existingUsers = await axios.get(`${API_URL}?email=${userData.email}`);
    if (existingUsers.data.length > 0) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const response = await axios.post(API_URL, { 
      ...userData, 
      password: hashedPassword,
      role: userData.role || 'customer',
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  try {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    const response = await axios.patch(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
}

export async function getAddress(userId: number, addressId: number): Promise<Address | undefined> {
  try {
    const user = await getUserById(userId);
    return user.addresses?.find(address => address.id === addressId);
  } catch (error) {
    console.error(`Error getting address ${addressId} for user ${userId}:`, error);
    throw error;
  }
}

export async function addAddress(userId: number, address: Omit<Address, 'id'>): Promise<User> {
  try {
    const user = await getUserById(userId);
    if (address.isDefault && user.addresses?.some(a => a.isDefault)) {
      address.isDefault = false;
    }
    
    const newAddresses = user.addresses
      ? [
          ...(address.isDefault 
            ? user.addresses.map(a => ({ ...a, isDefault: false }))
            : user.addresses
          ),
          {
            ...address,
            id: (user.addresses.length > 0 ? Math.max(...user.addresses.map(a => a.id)) : 0) + 1,
          },
        ]
      : [{ ...address, id: 1 }];
    
    return updateUser(userId, { addresses: newAddresses });
  } catch (error) {
    console.error(`Error adding address for user ${userId}:`, error);
    throw error;
  }
}