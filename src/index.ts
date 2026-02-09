import "@/index.css";
import { QuestionsPage } from "@/pages/QuestionsPage/QuestionsPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const questionsPage = QuestionsPage();
  app.appendChild(questionsPage);
};

document.addEventListener("DOMContentLoaded", onInit);
