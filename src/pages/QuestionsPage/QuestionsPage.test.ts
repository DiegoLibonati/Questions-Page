import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { QuestionsPage } from "@src/pages/QuestionsPage/QuestionsPage";

import questionsData from "@src/constants/questions";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = QuestionsPage();
  document.body.appendChild(container);
  return { container: container };
};

describe("QuestionsPage.ts", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the main component with correct class", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("questions-page");
    });

    test("It should render the section with class 'questions'", () => {
      renderComponent();

      const section = document.querySelector<HTMLElement>(".questions");
      expect(section).toBeInTheDocument();
      expect(section?.tagName).toBe("SECTION");
    });

    test("It should render the header article and title", () => {
      renderComponent();

      const header = document.querySelector<HTMLElement>(".questions__header");
      const title = screen.getByText("General Questions");

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe("H2");
    });
  });

  describe("Questions Rendering Tests.", () => {
    test("It should render all questions from questionsData", () => {
      renderComponent();

      const questions = document.querySelectorAll<HTMLDivElement>(".question");
      expect(questions.length).toBe(questionsData.length);
    });

    test("Each question should contain a title and description", () => {
      renderComponent();

      questionsData.forEach(({ title, description }) => {
        const titleElements = screen.getAllByText(title);
        const descriptionElements = screen.getAllByText(description);

        expect(titleElements.length).toBeGreaterThan(0);
        expect(descriptionElements.length).toBeGreaterThan(0);
      });
    });
  });

  const clickQuestion = async (id: string): Promise<HTMLDivElement> => {
    const question = document.querySelector<HTMLDivElement>(`#${id}`);
    const button = question!.querySelector<HTMLButtonElement>(
      ".question__btn-manage"
    );
    await user.click(button!);
    return question!;
  };

  describe("Interaction Tests.", () => {
    test("It should open question when clicked", async () => {
      renderComponent();

      const firstQuestion = await clickQuestion(questionsData[0].id);
      expect(firstQuestion.classList.contains("question--show")).toBe(true);
    });

    test("It should close previously open question when clicking another", async () => {
      renderComponent();

      const first = await clickQuestion(questionsData[0].id);
      expect(first.classList.contains("question--show")).toBe(true);

      const second = await clickQuestion(questionsData[1].id);
      expect(first.classList.contains("question--show")).toBe(false);
      expect(second.classList.contains("question--show")).toBe(true);
    });

    test("It should close question if clicked twice", async () => {
      renderComponent();

      const question = await clickQuestion(questionsData[0].id);
      expect(question.classList.contains("question--show")).toBe(true);

      await clickQuestion(questionsData[0].id);
      expect(question.classList.contains("question--show")).toBe(false);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should append all Question components to .questions section", () => {
      renderComponent();

      const section = document.querySelector<HTMLElement>(".questions");
      const children = section?.querySelectorAll<HTMLDivElement>(".question");

      expect(section).toBeInTheDocument();
      expect(children?.length).toBe(questionsData.length);
    });

    test("Each question should be a DIV element", () => {
      renderComponent();

      const questions = document.querySelectorAll<HTMLDivElement>(".question");
      questions.forEach((q) => expect(q.tagName).toBe("DIV"));
    });
  });
});
