import React, { useState } from 'react';
import { User, Address } from '../../models/User_types';

interface AddUserFormProps {
  user?: User | null;
  onSubmit: (userData: Omit<User, 'id'>) => void;
  onCancel: () => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    role: user?.role || 'customer',
    balance: user?.balance ?? 0,
    addresses: user?.addresses ?? [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'balance' ? parseFloat(value) : value }));
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string | boolean) => {
    setFormData((prev) => {
      const newAddresses = [...(prev.addresses ?? [])];
      if (newAddresses[index]) {
        newAddresses[index] = { ...newAddresses[index], [field]: value };
      }
      return { ...prev, addresses: newAddresses };
    });
  };

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...(prev.addresses ?? []),
        {
          id: (prev.addresses?.length ?? 0) + 1,
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
          isDefault: (prev.addresses?.length ?? 0) === 0,
        },
      ],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-1">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-1">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!user}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="role" className="block mb-1">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
      </div>
      <div>
        <label htmlFor="balance" className="block mb-1">Balance</label>
        <input
          type="number"
          id="balance"
          name="balance"
          value={formData.balance}
          onChange={handleChange}
          step="0.01"
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Addresses</h3>
        {(formData.addresses ?? []).map((address, index) => (
          <div key={index} className="mb-4 border p-4 rounded">
            <h4 className="text-md font-semibold mb-2">Address {index + 1}</h4>
            <div className="space-y-2">
              <div>
                <label htmlFor={`street-${index}`} className="block mb-1">Street</label>
                <input
                  type="text"
                  id={`street-${index}`}
                  value={address.street}
                  onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor={`city-${index}`} className="block mb-1">City</label>
                <input
                  type="text"
                  id={`city-${index}`}
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor={`state-${index}`} className="block mb-1">State</label>
                <input
                  type="text"
                  id={`state-${index}`}
                  value={address.state}
                  onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor={`zipCode-${index}`} className="block mb-1">Zip Code</label>
                <input
                  type="text"
                  id={`zipCode-${index}`}
                  value={address.zipCode}
                  onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label htmlFor={`country-${index}`} className="block mb-1">Country</label>
                <input
                  type="text"
                  id={`country-${index}`}
                  value={address.country}
                  onChange={(e) => handleAddressChange(index, 'country', e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={address.isDefault}
                    onChange={(e) => handleAddressChange(index, 'isDefault', e.target.checked)}
                    className="mr-2"
                  />
                  Default Address
                </label>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addAddress}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Address
        </button>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {user ? 'Update' : 'Add'} User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;

