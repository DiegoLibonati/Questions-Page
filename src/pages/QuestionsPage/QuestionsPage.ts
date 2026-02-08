import type { Page } from "@/types/pages";

import { Question } from "@/components/Question/Question";

import questionsData from "@/constants/questions";

import "@/pages/QuestionsPage/QuestionsPage.css";

export const QuestionsPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "questions-page";

  main.innerHTML = `
    <section class="questions">
        <article class="questions__header">
            <h2 class="questions__title">General Questions</h2>
        </article>
    </section>
  `;

  const onQuestionClick = (_: MouseEvent, id: string): void => {
    const question = main.querySelector<HTMLDivElement>(`#${id}`);
    const questionOpen = main.querySelector<HTMLDivElement>(".question--show");

    if (questionOpen) questionOpen.classList.remove("question--show");

    if (question === questionOpen) return;

    question?.classList.add("question--show");
  };

  const questions = main.querySelector<HTMLElement>(".questions");

  questionsData.forEach((question) => {
    const questionComponent = Question({
      id: question.id,
      title: question.title,
      description: question.description,
      onClick: onQuestionClick,
    });

    questions?.append(questionComponent);

    main.cleanup = (): void => {
      questionComponent.cleanup?.();
    };
  });

  return main;
};
