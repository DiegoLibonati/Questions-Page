import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import UnfoldPage from "@/pages/UnfoldPage/UnfoldPage";

const renderPage = (): Page => {
  const element = UnfoldPage();
  document.body.appendChild(element);
  return element;
};

describe("UnfoldPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("rendering", () => {
    it("should render a main element with the unfold-page class", () => {
      const element = renderPage();
      expect(element.tagName).toBe("MAIN");
      expect(element).toHaveClass("unfold-page");
    });

    it("should render the General Questions heading", () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: "General Questions" })
      ).toBeInTheDocument();
    });

    it("should render a question component for each mock question", () => {
      renderPage();
      const wrappers =
        document.querySelectorAll<HTMLDivElement>(".question-wrapper");
      expect(wrappers).toHaveLength(3);
    });

    it("should render each question title", () => {
      renderPage();
      expect(screen.getByText("What is React?")).toBeInTheDocument();
      expect(screen.getByText("What is TypeScript?")).toBeInTheDocument();
      expect(screen.getByText("What is Jest?")).toBeInTheDocument();
    });

    it("should render each question description", () => {
      renderPage();
      expect(
        screen.getByText(
          /React is a JavaScript library for building user interfaces/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/TypeScript is a typed superset of JavaScript/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Jest is a JavaScript testing framework/)
      ).toBeInTheDocument();
    });

    it("should render no question as open initially", () => {
      renderPage();
      expect(document.querySelector(".question--show")).not.toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    describe("accordion", () => {
      it("should open a question when its button is clicked", async () => {
        const user = userEvent.setup();
        renderPage();
        const buttons = screen.getAllByRole("button", {
          name: "Toggle answer",
        });
        await user.click(buttons[0]!);
        expect(document.getElementById("question-1")).toHaveClass(
          "question--show"
        );
      });

      it("should close a question when its button is clicked again", async () => {
        const user = userEvent.setup();
        renderPage();
        const buttons = screen.getAllByRole("button", {
          name: "Toggle answer",
        });
        await user.click(buttons[0]!);
        await user.click(buttons[0]!);
        expect(document.getElementById("question-1")).not.toHaveClass(
          "question--show"
        );
      });

      it("should close the previously open question when another is clicked", async () => {
        const user = userEvent.setup();
        renderPage();
        const buttons = screen.getAllByRole("button", {
          name: "Toggle answer",
        });
        await user.click(buttons[0]!);
        await user.click(buttons[1]!);
        expect(document.getElementById("question-1")).not.toHaveClass(
          "question--show"
        );
        expect(document.getElementById("question-2")).toHaveClass(
          "question--show"
        );
      });

      it("should only have one question open at a time", async () => {
        const user = userEvent.setup();
        renderPage();
        const buttons = screen.getAllByRole("button", {
          name: "Toggle answer",
        });
        await user.click(buttons[0]!);
        await user.click(buttons[2]!);
        const openQuestions =
          document.querySelectorAll<HTMLDivElement>(".question--show");
        expect(openQuestions).toHaveLength(1);
        expect(document.getElementById("question-3")).toHaveClass(
          "question--show"
        );
      });
    });
  });

  describe("cleanup", () => {
    it("should run cleanup without throwing", () => {
      const element = renderPage();
      expect(() => element.cleanup?.()).not.toThrow();
    });

    it("should not open a question after cleanup when a button is clicked", async () => {
      const user = userEvent.setup();
      const element = renderPage();
      element.cleanup?.();
      const buttons = screen.getAllByRole("button", { name: "Toggle answer" });
      await user.click(buttons[0]!);
      expect(document.getElementById("question-1")).not.toHaveClass(
        "question--show"
      );
    });
  });
});
