import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import fs from "fs";
import path from "path";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

beforeEach(() => {
  jest.resetModules();
  const body = INITIAL_HTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i)![1];

  document.body.innerHTML = body;
  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the title of the APP and at least two questions.", () => {
  const titleApp = screen.getByRole("heading", { name: /general questions/i });
  const questions = document.querySelectorAll(".question");

  expect(titleApp).toBeInTheDocument();
  expect(questions.length >= 2).toBeTruthy();

  for (let question of questions) {
    const header = question.querySelector(".question-title");
    const description = question.querySelector(".question-text");

    const title = header?.querySelector("p");
    const btnOpenQuestion = header?.querySelector("button");
    const paragraph = description?.querySelector("p");

    expect(question).toBeInTheDocument();
    expect(question.classList.contains("show-text")).toBeFalsy();
    expect(header).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(btnOpenQuestion).toBeInTheDocument();
    expect(paragraph).toBeInTheDocument();
  }
});

test("It should open a question.", async () => {
  const questions = document.querySelectorAll(".question");
  const firstQuestion = questions[0];

  expect(firstQuestion).toBeInTheDocument();
  expect(firstQuestion.classList.contains("show-text")).toBeFalsy();

  const btn = firstQuestion.querySelector("button") as HTMLButtonElement;

  expect(btn).toBeInTheDocument();

  await user.click(btn);

  expect(firstQuestion.classList.contains("show-text")).toBeTruthy();
});

test("It must open the question that is not open and close the one that is open.", async () => {
  const questions = document.querySelectorAll(".question");
  const firstQuestion = questions[0];
  const secondQuestion = questions[1];

  expect(firstQuestion).toBeInTheDocument();
  expect(secondQuestion).toBeInTheDocument();
  expect(firstQuestion.classList.contains("show-text")).toBeFalsy();
  expect(secondQuestion.classList.contains("show-text")).toBeFalsy();

  const btnFirstQuestion = firstQuestion.querySelector(
    "button"
  ) as HTMLButtonElement;

  expect(btnFirstQuestion).toBeInTheDocument();

  await user.click(btnFirstQuestion);

  expect(firstQuestion.classList.contains("show-text")).toBeTruthy();
  expect(secondQuestion.classList.contains("show-text")).toBeFalsy();

  const btnSecondQuestion = secondQuestion.querySelector(
    "button"
  ) as HTMLButtonElement;

  expect(btnSecondQuestion).toBeInTheDocument();

  await user.click(btnSecondQuestion);

  expect(firstQuestion.classList.contains("show-text")).toBeFalsy();
  expect(secondQuestion.classList.contains("show-text")).toBeTruthy();
});

test("It must close the question that is open.", async () => {
  const questions = document.querySelectorAll(".question");
  const firstQuestion = questions[0];

  expect(firstQuestion).toBeInTheDocument();
  expect(firstQuestion.classList.contains("show-text")).toBeFalsy();

  const btnFirstQuestion = firstQuestion.querySelector(
    "button"
  ) as HTMLButtonElement;

  expect(btnFirstQuestion).toBeInTheDocument();

  await user.click(btnFirstQuestion);

  expect(firstQuestion.classList.contains("show-text")).toBeTruthy();

  await user.click(btnFirstQuestion);

  expect(firstQuestion.classList.contains("show-text")).toBeFalsy();
});
