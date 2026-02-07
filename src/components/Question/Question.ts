import type { QuestionProps } from "@/types/props";
import type { ButtonComponent, QuestionComponent } from "@/types/components";

import "@/components/Question/Question.css";

export const Question = ({
  id,
  title,
  description,
  onClick,
}: QuestionProps): QuestionComponent => {
  const divRoot = document.createElement("div");
  divRoot.className = "question-wrapper";
  divRoot.id = id;

  divRoot.innerHTML = `
    <div class="question">
        <div class="question__header">
            <p class="question__title">${title}</p>
            <button
                type="button"
                class="question__btn-manage"
                aria-label="open question"
            >
                +
            </button>
        </div>

        <div class="question__content">
            <p class="question__description">
                ${description}
            </p>
        </div>
    </div>
  `;

  const questionBtn = divRoot.querySelector<ButtonComponent>(
    ".question__btn-manage"
  );

  if (questionBtn) {
    questionBtn.addEventListener("click", (e) => {
      onClick(e, id);
    });

    questionBtn.cleanup = (): void => {
      questionBtn.removeEventListener("click", (e) => {
        onClick(e, id);
      });
    };
  }

  return divRoot;
};
