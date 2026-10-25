import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CarouselNavigation } from "@/components/CarouselNavigation";

describe("shared carousel navigation", () => {
  it("blocks overlapping transitions while keeping both loop directions available when idle", () => {
    const move = vi.fn();
    const { rerender } = render(
      <CarouselNavigation
        label="products"
        controls="track"
        moving
        onMove={move}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next products" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous products" }));
    expect(move).not.toHaveBeenCalled();
    rerender(
      <CarouselNavigation
        label="products"
        controls="track"
        moving={false}
        onMove={move}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Previous products" }));
    fireEvent.click(screen.getByRole("button", { name: "Next products" }));
    expect(move.mock.calls).toEqual([[-1], [1]]);
  });
});
