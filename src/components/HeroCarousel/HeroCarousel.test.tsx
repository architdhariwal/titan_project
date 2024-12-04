import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";

jest.mock("../../utils/HomeData", () => ({
  slides: [
    { id: 1, title: "Slide 1", image: "image1.jpg" },
    { id: 2, title: "Slide 2", image: "image2.jpg" },
    { id: 3, title: "Slide 3", image: "image3.jpg" },
  ],
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("HeroCarousel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("renders all slides", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByText("Slide 3")).toBeInTheDocument();
  });

  it("changes slide on next button click", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(screen.getByAltText("Slide 2").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("changes slide on previous button click", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    fireEvent.click(prevButton);

    expect(screen.getByAltText("Slide 3").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("autoplays slides", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-100"
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByAltText("Slide 2").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("pauses autoplay on hover", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const carousel = screen.getByRole("img", { name: "Slide 1" }).parentElement
      ?.parentElement;
    fireEvent.mouseEnter(carousel!);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 2").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("resumes autoplay on mouse leave", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const carousel = screen.getByRole("img", { name: "Slide 1" }).parentElement
      ?.parentElement;
    fireEvent.mouseEnter(carousel!);
    fireEvent.mouseLeave(carousel!);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByAltText("Slide 2").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("navigates to products page when clicking on a slide", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const slide = screen.getByAltText("Slide 1");
    fireEvent.click(slide);

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("changes slide when clicking on slide title", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const slideTitle = screen.getByText("Slide 2");
    fireEvent.click(slideTitle);

    expect(screen.getByAltText("Slide 2").parentElement).toHaveClass(
      "opacity-100"
    );
    expect(screen.getByAltText("Slide 1").parentElement).toHaveClass(
      "opacity-0"
    );
  });

  it("updates progress bar for current slide", () => {
    render(
      <MemoryRouter>
        <HeroCarousel />
      </MemoryRouter>
    );

    const progressBars = screen.getAllByTestId("progress-bar");
    const activeProgressBar = progressBars[0];

    expect(activeProgressBar).toHaveStyle({ width: "0%" });

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(activeProgressBar).toHaveStyle({ width: "50%" });
  });
});
