import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { QuestionsPage } from "@/pages/QuestionsPage/QuestionsPage";

import { questionsMock } from "@tests/__mocks__/questions.mock";

jest.doMock("@/constants/questions", () => ({
  default: questionsMock,
}));

const renderPage = (): Page => {
  const container = QuestionsPage();
  document.body.appendChild(container);
  return container;
};

const clickQuestion = async (
  id: string,
  user: ReturnType<typeof userEvent.setup>
): Promise<HTMLDivElement> => {
  const question = document.querySelector<HTMLDivElement>(`#${id}`);
  const button = question!.querySelector<HTMLButtonElement>(
    ".question__btn-manage"
  );
  await user.click(button!);
  return question!;
};

describe("QuestionsPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    it("should render the main component with correct class", () => {
      renderPage();

      const main = screen.getByRole("main");
      expect(main).toBeInTheDocument();
      expect(main).toHaveClass("questions-page");
    });

    it("should render the section with class 'questions'", () => {
      const container = renderPage();

      const section = container.querySelector<HTMLElement>(".questions");
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    it("should render the header article and title", () => {
      const container = renderPage();

      const header = container.querySelector<HTMLElement>(".questions__header");
      const title = screen.getByRole("heading", {
        name: "General Questions",
        level: 2,
      });

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });
  });

  describe("Questions Rendering Tests", () => {
    it("should render all questions from questionsData", () => {
      const container = renderPage();

      const questions = container.querySelectorAll<HTMLDivElement>(".question");
      expect(questions).toHaveLength(questionsMock.length);
    });

    it("should render each question title", () => {
      renderPage();

      questionsMock.forEach(({ title }) => {
        expect(screen.getByText(title)).toBeInTheDocument();
      });
    });

    it("should render all question descriptions", () => {
      const container = renderPage();

      const descriptions = container.querySelectorAll<HTMLParagraphElement>(
        ".question__description"
      );
      expect(descriptions).toHaveLength(questionsMock.length);
    });
  });

  describe("Interaction Tests", () => {
    it("should open question when clicked", async () => {
      const user = userEvent.setup();
      renderPage();

      const firstQuestion = await clickQuestion(questionsMock[0]!.id, user);
      expect(firstQuestion).toHaveClass("question--show");
    });

    it("should close previously open question when clicking another", async () => {
      const user = userEvent.setup();
      renderPage();

      const first = await clickQuestion(questionsMock[0]!.id, user);
      expect(first).toHaveClass("question--show");

      const second = await clickQuestion(questionsMock[1]!.id, user);
      expect(first).not.toHaveClass("question--show");
      expect(second).toHaveClass("question--show");
    });

    it("should close question if clicked twice", async () => {
      const user = userEvent.setup();
      renderPage();

      const question = await clickQuestion(questionsMock[0]!.id, user);
      expect(question).toHaveClass("question--show");

      await clickQuestion(questionsMock[0]!.id, user);
      expect(question).not.toHaveClass("question--show");
    });
  });

  describe("DOM Structure Tests", () => {
    it("should append all Question components to .questions section", () => {
      const container = renderPage();

      const section = container.querySelector<HTMLElement>(".questions");
      const children = section?.querySelectorAll<HTMLDivElement>(".question");

      expect(section).toBeInTheDocument();
      expect(children).toHaveLength(questionsMock.length);
    });

    it("should render each question as a DIV element", () => {
      const container = renderPage();

      const questions = container.querySelectorAll<HTMLDivElement>(".question");
      questions.forEach((q) => {
        expect(q.tagName).toBe("DIV");
      });
    });
  });
});
