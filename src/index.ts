import { getElements } from "./helpers/getElements";

const handleOpenQuestion = (e: Event) => {
  const { questionOpen } = getElements();

  const target = e.currentTarget as HTMLButtonElement;
  const oldQuestionOpen = target.parentElement?.parentElement as HTMLDivElement;

  if (questionOpen !== oldQuestionOpen)
    questionOpen?.classList.remove("show-text");

  oldQuestionOpen?.classList.toggle("show-text");
};

const onInit = () => {
  const { btnsOpenQuestions } = getElements();

  btnsOpenQuestions.forEach((btn) =>
    btn.addEventListener("click", (e) => handleOpenQuestion(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
