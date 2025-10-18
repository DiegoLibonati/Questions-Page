import { QuestionProps } from "@src/entities/props";

import "@src/components/Question/Question.css";

export const Question = ({
  id,
  title,
  description,
  onClick,
}: QuestionProps): HTMLDivElement => {
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

  const questionBtn = divRoot.querySelector<HTMLButtonElement>(
    ".question__btn-manage"
  );

  questionBtn?.addEventListener("click", (e) => onClick(e, id));

  return divRoot;
};
