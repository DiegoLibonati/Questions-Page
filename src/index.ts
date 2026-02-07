import "@/index.css";
import { QuestionsPage } from "@/pages/QuestionsPage/QuestionsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (app) {
    const questionsPage = QuestionsPage();
    app.appendChild(questionsPage);
  }
};

document.addEventListener("DOMContentLoaded", onInit);
