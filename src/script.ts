const btnsOpenQuestions = document.querySelectorAll(".question-btn") as NodeList;
const questionContainer = document.querySelectorAll(".question") as NodeList;

btnsOpenQuestions.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget as HTMLElement
    const oldQuestionOpen = target.parentElement?.parentElement;

    questionContainer.forEach(function (newQuestion) {
      const openNewQuestion = newQuestion as HTMLElement
      if (openNewQuestion !== oldQuestionOpen) {
        openNewQuestion.classList.remove("show-text");
      }
    });

    oldQuestionOpen?.classList.toggle("show-text");
  });
});
