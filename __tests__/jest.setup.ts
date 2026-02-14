import "@testing-library/jest-dom";

import { questionsMock } from "@tests/__mocks__/questions.mock";

jest.mock("@/constants/questions", () => ({
  __esModule: true,
  default: questionsMock,
}));
