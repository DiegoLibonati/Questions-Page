import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { QuestionProps } from "@/types/props";

import { Question } from "@/components/Question/Question";

const renderComponent = (props: QuestionProps): HTMLDivElement => {
  const container = Question(props);
  document.body.appendChild(container);
  return container;
};

describe("Question", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests", () => {
    it("should render the component structure", () => {
      const container = renderComponent({
        id: "question-1",
        title: "What is React?",
        description: "React is a JavaScript library",
        onClick: mockOnClick,
      });

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container).toHaveClass("question-wrapper");
    });

    it("should return HTMLDivElement", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Question Title",
        description: "Question Description",
        onClick: mockOnClick,
      });

      expect(container.tagName).toBe("DIV");
    });
  });

  describe("Props Rendering Tests", () => {
    it("should use correct id", () => {
      const container = renderComponent({
        id: "unique-question-id",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      expect(container.id).toBe("unique-question-id");
    });

    it("should display correct title", () => {
      renderComponent({
        id: "question-1",
        title: "What is TypeScript?",
        description: "Description",
        onClick: mockOnClick,
      });

      const title = screen.getByText("What is TypeScript?");
      expect(title).toBeInTheDocument();
    });

    it("should display correct description", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "This is the detailed description of the question",
        onClick: mockOnClick,
      });

      const description = screen.getByText(
        "This is the detailed description of the question"
      );
      expect(description).toBeInTheDocument();
    });

    it("should render title as paragraph element", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Test Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const title =
        container.querySelector<HTMLParagraphElement>(".question__title");
      expect(title).toBeInTheDocument();
      expect(title?.tagName).toBe("P");
    });

    it("should render description as paragraph element", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Title",
        description: "Test Description",
        onClick: mockOnClick,
      });

      const description = container.querySelector<HTMLParagraphElement>(
        ".question__description"
      );
      expect(description).toBeInTheDocument();
      expect(description?.tagName).toBe("P");
    });
  });

  describe("Button Tests", () => {
    it("should render button with correct type", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button).toHaveAttribute("type", "button");
    });

    it("should render button with correct aria-label", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button).toHaveAccessibleName("open question");
    });

    it("should render button with correct class", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button).toHaveClass("question__btn-manage");
    });

    it("should render button with + text content", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button).toHaveTextContent("+");
    });
  });

  describe("Click Event Tests", () => {
    it("should call onClick when button is clicked", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should pass event and id to onClick", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "question-123",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "question-123"
      );
    });

    it("should call onClick with correct id parameter", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "specific-question-id",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      await user.click(button);

      const callArgs = mockOnClick.mock.calls[0];
      expect(callArgs[1]).toBe("specific-question-id");
    });

    it("should call onClick multiple times on multiple clicks", async () => {
      const user = userEvent.setup();

      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });

    it("should attach click event listener to button", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      const clickEvent = new MouseEvent("click", { bubbles: true });
      button.dispatchEvent(clickEvent);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Different IDs Tests", () => {
    it("should handle simple string id", () => {
      const container = renderComponent({
        id: "simple",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      expect(container.id).toBe("simple");
    });

    it("should handle id with dashes", () => {
      const container = renderComponent({
        id: "question-with-dashes",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      expect(container.id).toBe("question-with-dashes");
    });

    it("should handle id with underscores", () => {
      const container = renderComponent({
        id: "question_with_underscores",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      expect(container.id).toBe("question_with_underscores");
    });

    it("should handle numeric id", () => {
      const container = renderComponent({
        id: "question-123",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      expect(container.id).toBe("question-123");
    });
  });

  describe("Multiple Questions Tests", () => {
    it("should render multiple questions independently", () => {
      renderComponent({
        id: "question-1",
        title: "First Question",
        description: "First Description",
        onClick: jest.fn(),
      });

      renderComponent({
        id: "question-2",
        title: "Second Question",
        description: "Second Description",
        onClick: jest.fn(),
      });

      const question1 = document.querySelector<HTMLDivElement>("#question-1");
      const question2 = document.querySelector<HTMLDivElement>("#question-2");
      const allQuestions =
        document.querySelectorAll<HTMLDivElement>(".question-wrapper");

      expect(question1).toBeInTheDocument();
      expect(question2).toBeInTheDocument();
      expect(allQuestions).toHaveLength(2);
    });

    it("should maintain separate content for each question", () => {
      const question1 = renderComponent({
        id: "question-1",
        title: "Title A",
        description: "Description A",
        onClick: jest.fn(),
      });

      const question2 = renderComponent({
        id: "question-2",
        title: "Title B",
        description: "Description B",
        onClick: jest.fn(),
      });

      const title1 =
        question1.querySelector<HTMLParagraphElement>(".question__title");
      const title2 =
        question2.querySelector<HTMLParagraphElement>(".question__title");
      const desc1 = question1.querySelector<HTMLParagraphElement>(
        ".question__description"
      );
      const desc2 = question2.querySelector<HTMLParagraphElement>(
        ".question__description"
      );

      expect(title1).toHaveTextContent("Title A");
      expect(title2).toHaveTextContent("Title B");
      expect(desc1).toHaveTextContent("Description A");
      expect(desc2).toHaveTextContent("Description B");
    });

    it("should have unique ids for each question", () => {
      const question1 = renderComponent({
        id: "unique-1",
        title: "Question 1",
        description: "Description 1",
        onClick: jest.fn(),
      });

      const question2 = renderComponent({
        id: "unique-2",
        title: "Question 2",
        description: "Description 2",
        onClick: jest.fn(),
      });

      expect(question1.id).not.toBe(question2.id);
    });
  });

  describe("Content Tests", () => {
    it("should handle long title", () => {
      const longTitle = "This is a very long question title ".repeat(5).trim();

      renderComponent({
        id: "question-1",
        title: longTitle,
        description: "Description",
        onClick: mockOnClick,
      });

      const title = screen.getByText((content) =>
        content.includes("This is a very long question title")
      );

      expect(title).toBeInTheDocument();
    });

    it("should handle long description", () => {
      const longDescription = "This is a very long description "
        .repeat(10)
        .trim();

      const container = renderComponent({
        id: "question-1",
        title: "Title",
        description: longDescription,
        onClick: mockOnClick,
      });

      const description = container.querySelector<HTMLParagraphElement>(
        ".question__description"
      );
      expect(description).toHaveTextContent(longDescription);
    });
  });

  describe("DOM Structure Tests", () => {
    it("should have correct header structure", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const header =
        container.querySelector<HTMLDivElement>(".question__header");
      const title =
        header?.querySelector<HTMLParagraphElement>(".question__title");
      const button = header?.querySelector<HTMLButtonElement>(
        ".question__btn-manage"
      );

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it("should nest content inside question", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const question = container.querySelector<HTMLDivElement>(".question");
      const content =
        question?.querySelector<HTMLDivElement>(".question__content");
      const description = content?.querySelector<HTMLParagraphElement>(
        ".question__description"
      );

      expect(question).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("should nest header and content inside question", () => {
      const container = renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const question = container.querySelector<HTMLDivElement>(".question");
      const header =
        question?.querySelector<HTMLDivElement>(".question__header");
      const content =
        question?.querySelector<HTMLDivElement>(".question__content");

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests", () => {
    it("should have aria-label on button", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button).toHaveAccessibleName("open question");
    });

    it("should be keyboard accessible", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      button.focus();

      expect(document.activeElement).toBe(button);
    });

    it("should be a button element for accessibility", () => {
      renderComponent({
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      });

      const button = screen.getByRole("button", { name: /open question/i });
      expect(button.tagName).toBe("BUTTON");
    });
  });
});
