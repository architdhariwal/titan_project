import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import MultiCardCarousel from './MultiCardCarousel';
import { getProductsByCategory } from '../services/productService';


jest.mock('../services/productService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('MultiCardCarousel', () => {
  const mockProducts = [
    {
      id: 1,
      images: ['image1.jpg'],
      title: 'Product 1',
      category: 'Category 1',
      subcategory: 'Subcategory 1',
      price: 100,
      originalPrice: 120,
      discount: 17,
      rating: 4.5,
      reviewsCount: 10,
    },
    {
      id: 2,
      images: ['image2.jpg'],
      title: 'Product 2',
      category: 'Category 2',
      subcategory: 'Subcategory 2',
      price: 200,
      originalPrice: 240,
      discount: 17,
      rating: 4.0,
      reviewsCount: 5,
    },
    {
      id: 3,
      images: ['image3.jpg'],
      title: 'Product 3',
      category: 'Category 3',
      subcategory: 'Subcategory 3',
      price: 300,
      originalPrice: 360,
      discount: 17,
      rating: 4.2,
      reviewsCount: 8,
    },
    {
      id: 4,
      images: ['image4.jpg'],
      title: 'Product 4',
      category: 'Category 4',
      subcategory: 'Subcategory 4',
      price: 400,
      originalPrice: 480,
      discount: 17,
      rating: 4.1,
      reviewsCount: 7,
    },
  ];

  beforeEach(() => {
    (getProductsByCategory as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders loading state initially', () => {
    render(
      <MemoryRouter>
        <MultiCardCarousel />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    render(
      <MemoryRouter>
        <MultiCardCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Bestselling Items')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('handles next and previous buttons correctly', async () => {
    render(
      <MemoryRouter>
        <MultiCardCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const nextButton = screen.getByRole('button', { name: /Next/i });
    const prevButton = screen.getByRole('button', { name: /Previous/i });

    expect(prevButton).toBeDisabled(); 
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    (getProductsByCategory as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(
      <MemoryRouter>
        <MultiCardCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch products')).toBeInTheDocument();
    });

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
  });

  it('handles no products returned from API', async () => {
    (getProductsByCategory as jest.Mock).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <MultiCardCarousel />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No products found')).toBeInTheDocument();
    });
  });
});
