import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { QuestionsPage } from "@/pages/QuestionsPage/QuestionsPage";

const renderPage = (): Page => {
  const container = QuestionsPage();
  document.body.appendChild(container);
  return container;
};

describe("QuestionsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".questions-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render page title", () => {
    renderPage();

    const title = screen.getByRole("heading", { name: "General Questions" });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("questions__title");
  });

  it("should render all questions from data", () => {
    renderPage();

    expect(screen.getByText("What is React?")).toBeInTheDocument();
    expect(screen.getByText("What is TypeScript?")).toBeInTheDocument();
    expect(screen.getByText("What is Jest?")).toBeInTheDocument();
  });

  it("should toggle question visibility when clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const firstQuestionButton = screen.getAllByRole("button", {
      name: "open question",
    })[0];

    await user.click(firstQuestionButton!);

    const firstQuestion = document.querySelector<HTMLDivElement>("#question-1");
    expect(firstQuestion).toHaveClass("question--show");
  });

  it("should close previous question when opening new one", async () => {
    const user = userEvent.setup();
    renderPage();

    const buttons = screen.getAllByRole("button", { name: "open question" });
    const firstButton = buttons[0];
    const secondButton = buttons[1];

    await user.click(firstButton!);

    const firstQuestion = document.querySelector<HTMLDivElement>("#question-1");
    expect(firstQuestion).toHaveClass("question--show");

    await user.click(secondButton!);

    const secondQuestion =
      document.querySelector<HTMLDivElement>("#question-2");
    expect(firstQuestion).not.toHaveClass("question--show");
    expect(secondQuestion).toHaveClass("question--show");
  });

  it("should close question when clicking same question button", async () => {
    const user = userEvent.setup();
    renderPage();

    const firstButton = screen.getAllByRole("button", {
      name: "open question",
    })[0];

    await user.click(firstButton!);

    const firstQuestion = document.querySelector<HTMLDivElement>("#question-1");
    expect(firstQuestion).toHaveClass("question--show");

    await user.click(firstButton!);

    expect(firstQuestion).not.toHaveClass("question--show");
  });

  it("should cleanup all question components", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
