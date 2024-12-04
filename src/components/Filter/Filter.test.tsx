import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Filter from "./Filter";

describe("Filter Component", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders filter options correctly", () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        selectedFilter=""
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByText("Filter By Gender")).toBeInTheDocument();
    expect(screen.getByText("Men")).toBeInTheDocument();
    expect(screen.getByText("Women")).toBeInTheDocument();
    expect(screen.getByText("Kids")).toBeInTheDocument();
    expect(screen.getByText("SORT BY:")).toBeInTheDocument();
  });

  it("calls onFilterChange when a filter button is clicked", () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        selectedFilter=""
        onSortChange={mockOnSortChange}
      />
    );

    fireEvent.click(screen.getByText("Men"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("men");

    fireEvent.click(screen.getByText("Women"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("women");

    fireEvent.click(screen.getByText("Kids"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("kids");
  });

  it("shows clear filter button when a filter is selected", () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        selectedFilter="men"
        onSortChange={mockOnSortChange}
      />
    );

    expect(screen.getByText("Clear Filter")).toBeInTheDocument();
  });

  it("calls onFilterChange with empty string when clear filter is clicked", () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        selectedFilter="men"
        onSortChange={mockOnSortChange}
      />
    );

    fireEvent.click(screen.getByText("Clear Filter"));
    expect(mockOnFilterChange).toHaveBeenCalledWith("");
  });

  it("calls onSortChange when sort option is changed", () => {
    render(
      <Filter
        onFilterChange={mockOnFilterChange}
        selectedFilter=""
        onSortChange={mockOnSortChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "popularity" },
    });
    expect(mockOnSortChange).toHaveBeenCalledWith("popularity");

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "highToLow" },
    });
    expect(mockOnSortChange).toHaveBeenCalledWith("highToLow");
  });
});
