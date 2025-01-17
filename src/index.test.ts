import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "./tests/jest.constants";

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the title of the APP and at least two questions.", () => {
      const titleApp = screen.getByRole("heading", {
        name: /general questions/i,
      });
      const questions = document.querySelectorAll(".question__wrapper");

      expect(titleApp).toBeInTheDocument();
      expect(questions.length >= 2).toBeTruthy();

      for (let question of questions) {
        const header = question.querySelector(".question__wrapper__header");
        const description = question.querySelector(".question__wrapper__description");

        const title = header?.querySelector("p");
        const btnOpenQuestion = header?.querySelector("button");
        const paragraph = description?.querySelector("p");

        expect(question).toBeInTheDocument();
        expect(question.classList.contains("question--show__text")).toBeFalsy();
        expect(header).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(btnOpenQuestion).toBeInTheDocument();
        expect(paragraph).toBeInTheDocument();
      }
    });

    test("It should open a question.", async () => {
      const questions = document.querySelectorAll(".question__wrapper");
      const firstQuestion = questions[0];

      expect(firstQuestion).toBeInTheDocument();
      expect(
        firstQuestion.classList.contains("question__wrapper question--show__text")
      ).toBeFalsy();

      const btn = firstQuestion.querySelector("button") as HTMLButtonElement;

      expect(btn).toBeInTheDocument();

      await user.click(btn);

      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeTruthy();
    });

    test("It must open the question that is not open and close the one that is open.", async () => {
      const questions = document.querySelectorAll(".question__wrapper");
      const firstQuestion = questions[0];
      const secondQuestion = questions[1];

      expect(firstQuestion).toBeInTheDocument();
      expect(secondQuestion).toBeInTheDocument();
      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeFalsy();
      expect(
        secondQuestion.classList.contains("question--show__text")
      ).toBeFalsy();

      const btnFirstQuestion = firstQuestion.querySelector(
        "button"
      ) as HTMLButtonElement;

      expect(btnFirstQuestion).toBeInTheDocument();

      await user.click(btnFirstQuestion);

      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeTruthy();
      expect(
        secondQuestion.classList.contains("question--show__text")
      ).toBeFalsy();

      const btnSecondQuestion = secondQuestion.querySelector(
        "button"
      ) as HTMLButtonElement;

      expect(btnSecondQuestion).toBeInTheDocument();

      await user.click(btnSecondQuestion);

      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeFalsy();
      expect(
        secondQuestion.classList.contains("question--show__text")
      ).toBeTruthy();
    });

    test("It must close the question that is open.", async () => {
      const questions = document.querySelectorAll(".question__wrapper");
      const firstQuestion = questions[0];

      expect(firstQuestion).toBeInTheDocument();
      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeFalsy();

      const btnFirstQuestion = firstQuestion.querySelector(
        "button"
      ) as HTMLButtonElement;

      expect(btnFirstQuestion).toBeInTheDocument();

      await user.click(btnFirstQuestion);

      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeTruthy();

      await user.click(btnFirstQuestion);

      expect(
        firstQuestion.classList.contains("question--show__text")
      ).toBeFalsy();
    });
  });
});
