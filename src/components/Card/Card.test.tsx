import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Card from "./Card";

describe("Card Component", () => {
  const mockProps = {
    id: 1,
    images: ["https://example.com/image.jpg"],
    title: "Test Product",
    category: "Test Category",
    price: "$99.99",
    originalPrice: "$129.99",
    discount: 23,
    rating: 4.5,
    reviewsCount: 100,
  };

  it("renders card with correct information", () => {
    render(<Card {...mockProps} />);

    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Category")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("$129.99")).toBeInTheDocument();
    expect(screen.getByText("23% Off")).toBeInTheDocument();
    expect(screen.getByText("4.5 (100)")).toBeInTheDocument();
  });

  it("uses placeholder image when no image is provided", () => {
    const propsWithoutImage = { ...mockProps, images: [] };
    render(<Card {...propsWithoutImage} />);

    const img = screen.getByAltText("Test Product");
    expect(img).toHaveAttribute(
      "src",
      "https://via.placeholder.com/360x360?text=No+Image"
    );
  });

  it("truncates long titles", () => {
    const propsWithLongTitle = {
      ...mockProps,
      title: "This is a very long product title that should be truncated",
    };
    render(<Card {...propsWithLongTitle} />);

    const titleElement = screen.getByText(
      "This is a very long product title that should be truncated"
    );
    expect(titleElement).toHaveClass("truncate");
  });
});
