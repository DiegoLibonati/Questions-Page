import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { QuestionProps } from "@/types/props";
import type { QuestionComponent } from "@/types/components";

import Question from "@/components/Question/Question";

const mockOnClick = jest.fn();

const defaultProps: QuestionProps = {
  id: "question-1",
  title: "What is React?",
  description: "React is a JavaScript library.",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<QuestionProps> = {}
): QuestionComponent => {
  const element = Question({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Question", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render with the correct id", () => {
      renderComponent();
      expect(
        document.querySelector<HTMLDivElement>("#question-1")
      ).toBeInTheDocument();
    });

    it("should render with the question-wrapper class", () => {
      const element = renderComponent();
      expect(element).toHaveClass("question-wrapper");
    });

    it("should render the question title", () => {
      renderComponent();
      expect(screen.getByText("What is React?")).toBeInTheDocument();
    });

    it("should render the question description", () => {
      renderComponent();
      expect(
        screen.getByText(/React is a JavaScript library/)
      ).toBeInTheDocument();
    });

    it("should render a toggle button with the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Toggle answer" })
      ).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClick with the event and id when the button is clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button", { name: "Toggle answer" }));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "question-1"
      );
    });

    it("should pass the correct id when a different id is provided", async () => {
      const user = userEvent.setup();
      renderComponent({ id: "question-99" });
      await user.click(screen.getByRole("button", { name: "Toggle answer" }));
      expect(mockOnClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "question-99"
      );
    });

    it("should call onClick on each click", async () => {
      const user = userEvent.setup();
      renderComponent();
      const button = screen.getByRole("button", { name: "Toggle answer" });
      await user.click(button);
      await user.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(2);
    });
  });

  describe("cleanup", () => {
    it("should remove the click listener so onClick is not called after cleanup", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button", { name: "Toggle answer" }));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
