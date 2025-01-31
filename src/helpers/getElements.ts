export const getElements = () => ({
  btnsOpenQuestions: document.querySelectorAll(
    ".question__btn-manage "
  ) as NodeList,
  questionOpen: document.querySelector(
    ".question.question--show"
  ) as HTMLDivElement,
});
