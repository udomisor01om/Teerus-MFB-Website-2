import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { TeamBiography } from "@/components/TeamBiography";
import { teamBiographies } from "@/content/team-biographies";
import { team } from "@/content/marketing";
it("matches all six supplied biographies to a unique team member", () => {
  expect(Object.keys(teamBiographies)).toHaveLength(6);
  for (const [name, paragraphs] of Object.entries(teamBiographies)) {
    expect(team.filter((member) => member[0] === name)).toHaveLength(1);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    expect(paragraphs.join(" ")).not.toMatch(/Top of Form|Bottom of Form/);
  }
});
it("renders every paragraph of a long biography and returns focus on close", () => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
  const name = "Jelil (Tope) Ajagbe";
  const biography = teamBiographies[name];
  render(
    <TeamBiography
      name={name}
      role="Chairman"
      file=""
      index={7}
      width={800}
      height={800}
      biography={biography}
    />,
  );
  const trigger = screen.getByRole("button", {
    name: `Read biography of ${name}`,
  });
  fireEvent.click(trigger);
  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAccessibleName(name);
  biography.forEach((p) =>
    expect(
      within(dialog).getByText(p.replace(/\s+/g, " ").trim(), { exact: true }),
    ).toBeInTheDocument(),
  );
  expect(within(dialog).queryByText("PROFILE COMING SOON")).toBeNull();
  fireEvent.click(
    within(dialog).getByRole("button", { name: "Close biography" }),
  );
  expect(trigger).toHaveFocus();
});
