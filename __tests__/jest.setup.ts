import "@testing-library/jest-dom";

import { mockQuestions } from "@tests/__mocks__/questions.mock";

jest.mock("@/constants/questions", () => ({
  __esModule: true,
  default: mockQuestions,
}));
