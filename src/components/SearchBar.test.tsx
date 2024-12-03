import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';
import { getProductsByTitle } from '../services/productService';
import { useNavigate } from 'react-router-dom';


jest.mock('../services/productService');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('SearchBar', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (getProductsByTitle as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Product 1' },
      { id: 2, title: 'Product 2' },
    ]);
  });

  it('renders the search input', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search for products')).toBeInTheDocument();
  });

  it('updates query on input change', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for products');
    fireEvent.change(input, { target: { value: 'test query' } });
    expect(input).toHaveValue('test query');
  });

  it('fetches suggestions on input change', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for products');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(getProductsByTitle).toHaveBeenCalledWith('test');
    });

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(await screen.findByText('Product 2')).toBeInTheDocument();
  });

  it('navigates to product page on suggestion click', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for products');
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(getProductsByTitle).toHaveBeenCalledWith('test');
    });

    const suggestion = await screen.findByText('Product 1');
    fireEvent.click(suggestion);

    expect(mockNavigate).toHaveBeenCalledWith('/products/1');
    expect(input).toHaveValue('');
  });
});
