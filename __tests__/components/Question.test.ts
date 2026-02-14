import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { QuestionProps } from "@/types/props";
import type { QuestionComponent } from "@/types/components";

import { Question } from "@/components/Question/Question";

const renderComponent = (props: QuestionProps): QuestionComponent => {
  const container = Question(props);
  document.body.appendChild(container);
  return container;
};

describe("Question Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: QuestionProps = {
    id: "question-1",
    title: "What is your question?",
    description: "This is the answer to the question.",
    onClick: mockOnClick,
  };

  it("should render question with correct structure", () => {
    renderComponent(defaultProps);

    const wrapper = document.querySelector<HTMLDivElement>(".question-wrapper");
    const question = document.querySelector<HTMLDivElement>(".question");

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute("id", "question-1");
    expect(question).toBeInTheDocument();
  });

  it("should render title and description", () => {
    renderComponent(defaultProps);

    const title = screen.getByText("What is your question?");
    const description = screen.getByText("This is the answer to the question.");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass("question__title");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("question__description");
  });

  it("should render toggle button", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "open question" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("question__btn-manage");
    expect(button).toHaveAttribute("type", "button");
    expect(button.textContent.trim()).toBe("+");
  });

  it("should call onClick handler with event and id when button clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "open question" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(
      expect.any(MouseEvent),
      "question-1"
    );
  });

  it("should cleanup event listeners", async () => {
    const user = userEvent.setup();
    const question = renderComponent(defaultProps);

    question.cleanup?.();

    const button = screen.getByRole("button", { name: "open question" });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
