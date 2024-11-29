import { btnsOpenQuestions } from "./constants/elements";

const handleOpenQuestion = (e: Event) => {
  const target = e.currentTarget as HTMLButtonElement;
  const oldQuestionOpen = target.parentElement?.parentElement as HTMLDivElement;

  const questionOpen = document.querySelector(
    ".question.show-text"
  ) as HTMLDivElement;

  if (questionOpen !== oldQuestionOpen)
    questionOpen?.classList.remove("show-text");

  oldQuestionOpen?.classList.toggle("show-text");
};

const onInit = () => {
  btnsOpenQuestions.forEach((btn) =>
    btn.addEventListener("click", (e) => handleOpenQuestion(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
