import { Question } from "@src/components/Question/Question";

import questionsData from "@src/constants/questions";

import "@src/pages/QuestionsPage/QuestionsPage.css";

const onQuestionClick = (_: MouseEvent, id: string) => {
  const question = document.querySelector<HTMLDivElement>(`#${id}`);
  const questionOpen =
    document.querySelector<HTMLDivElement>(".question--show");

  if (questionOpen) questionOpen.classList.remove("question--show");

  if (question === questionOpen) return;

  question?.classList.add("question--show");
};

export const QuestionsPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "questions-page";

  main.innerHTML = `
    <section class="questions">
        <article class="questions__header">
            <h2 class="questions__title">General Questions</h2>
        </article>
    </section>
  `;

  const questions = main.querySelector<HTMLElement>(".questions");

  questionsData.forEach((question) => {
    const questionComponent = Question({
      id: question.id,
      title: question.title,
      description: question.description,
      onClick: onQuestionClick,
    });

    questions?.append(questionComponent);
  });

  return main;
};
