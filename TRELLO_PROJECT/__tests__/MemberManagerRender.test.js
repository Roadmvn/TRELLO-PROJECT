import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import axios from "axios";
import MemberManager from "./MemberManager";

jest.mock("axios");

const mockRoute = {
  params: {
    cardId: "1",
    boardId: "1",
  },
};
const mockNavigation = {
  navigate: jest.fn(),
};

describe("MemberManager - Render Members", () => {
  it("renders members correctly", async () => {
    axios.get.mockResolvedValue({
      data: [{ id: "1", fullName: "John Doe" }],
    });

    const { getByText } = render(
      <MemberManager route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText("John Doe")).toBeTruthy();
    });
  });
});
