import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Investigation from "../Pages/Investigation";

const mockSuspects = [
  { suspectID: 1, name: "Alex Morgan", occupation: "Software Developer" },
  { suspectID: 2, name: "Jamie Smith", occupation: "Security Officer" },
  { suspectID: 3, name: "Taylor Williams", occupation: "Research Assistant" },
];

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes("/api/suspects")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSuspects),
      });
    }
    if (url.includes("/api/investigations")) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      });
    }
    return Promise.reject(new Error(`Unhandled fetch call: ${url}`));
  });
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Investigation Page", () => {

  it("displays the investigation heading", () => {
    render(<Investigation />);
    expect(screen.getByText("Submit Investigation")).toBeTruthy();
  });

  it("contains the suspect selection", () => {
    render(<Investigation />);
    expect(screen.getByLabelText("Suspect")).toBeTruthy();
  });

  it("contains the conclusion field", () => {
    render(<Investigation />);
    expect(screen.getByLabelText("Conclusion")).toBeTruthy();
  });

  it("cannot be submitted if no suspect has been selected", async () => {
    render(<Investigation />);

    // wait for suspects to load from the mocked API before interacting
    await screen.findByText("Alex Morgan");

    fireEvent.change(screen.getByLabelText("Conclusion"), {
      target: { value: "Some conclusion text" },
    });
    fireEvent.click(screen.getByText("SUBMIT INVESTIGATION"));

    expect(screen.getByText("Please select a suspect.")).toBeTruthy();
  });

  it("cannot be submitted if the conclusion is empty", async () => {
    render(<Investigation />);

    await screen.findByText("Jamie Smith");

    fireEvent.change(screen.getByLabelText("Suspect"), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("SUBMIT INVESTIGATION"));

    expect(screen.getByText("Please enter your conclusion.")).toBeTruthy();
  });

  it("can be submitted when a suspect and conclusion are provided", async () => {
    render(<Investigation />);

    await screen.findByText("Jamie Smith");

    fireEvent.change(screen.getByLabelText("Suspect"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Conclusion"), {
      target: { value: "Jamie Smith accessed the lab that night." },
    });
    fireEvent.click(screen.getByText("SUBMIT INVESTIGATION"));

    const successMessage = await screen.findByText(/Investigation Submitted Successfully/i);
    expect(successMessage).toBeTruthy();
  });

});