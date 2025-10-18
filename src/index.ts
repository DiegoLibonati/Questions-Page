import { QuestionsPage } from "@src/pages/QuestionsPage/QuestionsPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const questionsPage = QuestionsPage();
  app.appendChild(questionsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
