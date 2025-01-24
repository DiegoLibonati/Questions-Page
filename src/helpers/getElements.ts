export const getElements = () => ({
  btnsOpenQuestions: document.querySelectorAll(
    ".question__header-btn "
  ) as NodeList,
  questionOpen: document.querySelector(
    ".question.question--show"
  ) as HTMLDivElement,
});
