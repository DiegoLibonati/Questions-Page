export const getElements = () => ({
  btnsOpenQuestions: document.querySelectorAll(".question__wrapper__header__btn") as NodeList,
  questionOpen: document.querySelector(".question__wrapper.question--show__text") as HTMLDivElement,
});
