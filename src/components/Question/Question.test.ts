import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { QuestionProps } from "@src/entities/props";

import { Question } from "@src/components/Question/Question";

type RenderComponent = {
  container: HTMLDivElement;
  props: { onClick: jest.Mock } & QuestionProps;
};

const renderComponent = (props: QuestionProps): RenderComponent => {
  const questionProps = {
    ...props,
    onClick: jest.fn(),
  };

  const container = Question(questionProps);
  document.body.appendChild(container);
  return { container: container, props: questionProps };
};

describe("Question.ts", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component structure", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "What is React?",
        description: "React is a JavaScript library",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("question-wrapper");
    });

    test("It should return HTMLDivElement", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Question Title",
        description: "Question Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.tagName).toBe("DIV");
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should use correct id", () => {
      const props: QuestionProps = {
        id: "unique-question-id",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("unique-question-id");
    });

    test("It should display correct title", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "What is TypeScript?",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = screen.getByText("What is TypeScript?");

      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe("What is TypeScript?");
    });

    test("It should display correct description", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "This is the detailed description of the question",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const description = screen.getByText(
        "This is the detailed description of the question"
      );

      expect(description).toBeInTheDocument();
      expect(description.textContent?.trim()).toBe(
        "This is the detailed description of the question"
      );
    });

    test("It should render title as paragraph element", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Test Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = document.querySelector(".question__title");

      expect(title).toBeInstanceOf(HTMLParagraphElement);
      expect(title?.tagName).toBe("P");
    });

    test("It should render description as paragraph element", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Test Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const description = document.querySelector(".question__description");

      expect(description).toBeInstanceOf(HTMLParagraphElement);
      expect(description?.tagName).toBe("P");
    });
  });

  describe("Button Tests.", () => {
    test("It should render button with correct type", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button.getAttribute("type")).toBe("button");
    });

    test("It should render button with correct aria-label", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button).toHaveAttribute("aria-label", "open question");
    });

    test("It should render button with correct class", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button).toHaveClass("question__btn-manage");
    });

    test("It should render button with + text content", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button.textContent?.trim()).toBe("+");
    });
  });

  describe("Click Event Tests.", () => {
    test("It should call onClick when button is clicked", async () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { props: componentProps } = renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      await user.click(button);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should pass event and id to onClick", async () => {
      const props: QuestionProps = {
        id: "question-123",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { props: componentProps } = renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      await user.click(button);

      expect(componentProps.onClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "question-123"
      );
    });

    test("It should call onClick with correct id parameter", async () => {
      const props: QuestionProps = {
        id: "specific-question-id",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { props: componentProps } = renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      await user.click(button);

      const callArgs = componentProps.onClick.mock.calls[0];
      expect(callArgs[1]).toBe("specific-question-id");
    });

    test("It should call onClick multiple times on multiple clicks", async () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { props: componentProps } = renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(componentProps.onClick).toHaveBeenCalledTimes(3);
    });

    test("It should attach click event listener to button", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { props: componentProps } = renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });
      const clickEvent = new MouseEvent("click", { bubbles: true });
      button.dispatchEvent(clickEvent);

      expect(componentProps.onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Different IDs Tests.", () => {
    test("It should handle simple string id", () => {
      const props: QuestionProps = {
        id: "simple",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("simple");
    });

    test("It should handle id with dashes", () => {
      const props: QuestionProps = {
        id: "question-with-dashes",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("question-with-dashes");
    });

    test("It should handle id with underscores", () => {
      const props: QuestionProps = {
        id: "question_with_underscores",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("question_with_underscores");
    });

    test("It should handle numeric id", () => {
      const props: QuestionProps = {
        id: "question-123",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.id).toBe("question-123");
    });
  });

  describe("Multiple Questions Tests.", () => {
    test("It should render multiple questions independently", () => {
      const props1: QuestionProps = {
        id: "question-1",
        title: "First Question",
        description: "First Description",
        onClick: jest.fn(),
      };

      const props2: QuestionProps = {
        id: "question-2",
        title: "Second Question",
        description: "Second Description",
        onClick: jest.fn(),
      };

      renderComponent(props1);
      renderComponent(props2);

      const question1 = document.getElementById("question-1");
      const question2 = document.getElementById("question-2");
      const allQuestions = document.querySelectorAll(".question-wrapper");

      expect(question1).toBeInTheDocument();
      expect(question2).toBeInTheDocument();
      expect(allQuestions.length).toBe(2);
    });

    test("It should maintain separate content for each question", () => {
      const props1: QuestionProps = {
        id: "question-1",
        title: "Title A",
        description: "Description A",
        onClick: jest.fn(),
      };

      const props2: QuestionProps = {
        id: "question-2",
        title: "Title B",
        description: "Description B",
        onClick: jest.fn(),
      };

      const { container: question1 } = renderComponent(props1);
      const { container: question2 } = renderComponent(props2);

      const title1 = question1.querySelector(".question__title");
      const title2 = question2.querySelector(".question__title");
      const desc1 = question1.querySelector(".question__description");
      const desc2 = question2.querySelector(".question__description");

      expect(title1?.textContent).toBe("Title A");
      expect(title2?.textContent).toBe("Title B");
      expect(desc1?.textContent?.trim()).toBe("Description A");
      expect(desc2?.textContent?.trim()).toBe("Description B");
    });

    test("It should have unique ids for each question", () => {
      const props1: QuestionProps = {
        id: "unique-1",
        title: "Question 1",
        description: "Description 1",
        onClick: jest.fn(),
      };

      const props2: QuestionProps = {
        id: "unique-2",
        title: "Question 2",
        description: "Description 2",
        onClick: jest.fn(),
      };

      const { container: question1 } = renderComponent(props1);
      const { container: question2 } = renderComponent(props2);

      expect(question1.id).not.toBe(question2.id);
    });
  });

  describe("Content Tests.", () => {
    test("It should handle long title", () => {
      const longTitle = "This is a very long question title ".repeat(5).trim();
      const props: QuestionProps = {
        id: "question-1",
        title: longTitle,
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const title = screen.getByText((content) =>
        content.includes("This is a very long question title")
      );

      expect(title).toBeInTheDocument();
      expect(
        title.textContent?.includes("This is a very long question title")
      ).toBe(true);
    });

    test("It should handle long description", () => {
      const longDescription = "This is a very long description "
        .repeat(10)
        .trim();
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: longDescription,
        onClick: mockOnClick,
      };

      renderComponent(props);

      const description = document.querySelector(".question__description");
      expect(description?.textContent?.trim()).toBe(longDescription);
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should have correct header structure", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const header = document.querySelector(".question__header");
      const title = header?.querySelector(".question__title");
      const button = header?.querySelector(".question__btn-manage");

      expect(header).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    test("It should nest content inside question", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      const question = container.querySelector(".question");
      const content = question?.querySelector(".question__content");
      const description = content?.querySelector(".question__description");

      expect(question).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should nest header and content inside question", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      const question = container.querySelector(".question");
      const header = question?.querySelector(".question__header");
      const content = question?.querySelector(".question__content");

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should have aria-label on button", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button).toHaveAttribute("aria-label", "open question");
    });

    test("It should be keyboard accessible", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    test("It should be a button element for accessibility", () => {
      const props: QuestionProps = {
        id: "question-1",
        title: "Title",
        description: "Description",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /open question/i });

      expect(button.tagName).toBe("BUTTON");
    });
  });
});
