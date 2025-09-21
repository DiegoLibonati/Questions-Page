import { getElements } from "@src/helpers/getElements";

import { OFFICIAL_BODY } from "@tests/jest.constants";

describe("getElements.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      document.body.innerHTML = OFFICIAL_BODY;
    });

    afterEach(() => {
      document.body.innerHTML = "";
    });

    test("It must render the elements of the document that the 'getElements' function exports.", () => {
      const { btnsOpenQuestions, questionOpen } = getElements();

      for (let btnOpenQuestion of btnsOpenQuestions) {
        expect(btnOpenQuestion).toBeInTheDocument();
      }

      expect(questionOpen).not.toBeInTheDocument();
    });
  });
});
