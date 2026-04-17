import "@/index.css";
import UnfoldPage from "@/pages/UnfoldPage/UnfoldPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const unfoldPage = UnfoldPage();
  app.appendChild(unfoldPage);
};

document.addEventListener("DOMContentLoaded", onInit);
