export const getElements = () => ({
  btnsOpenQuestions: document.querySelectorAll(".question-btn") as NodeList,
  questionOpen: document.querySelector(".question.show-text") as HTMLDivElement,
});
