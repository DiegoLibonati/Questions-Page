const btnsOpenQuestions = document.querySelectorAll(".question-btn");
const questionContainer = document.querySelectorAll(".question");

btnsOpenQuestions.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    const question = e.currentTarget.parentElement.parentElement;

    questionContainer.forEach(function (newQuestion) {
      if (newQuestion !== question) {
        newQuestion.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
