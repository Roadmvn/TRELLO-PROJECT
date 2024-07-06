import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
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

describe("MemberManager - Assign Member", () => {
  it("assigns a member to a card", async () => {
    const memberToAssign = { id: "2", fullName: "Jane Doe" };
    axios.get.mockResolvedValueOnce({
      data: [memberToAssign],
    });
    axios.post.mockResolvedValue({});

    const { getByText } = render(
      <MemberManager route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      fireEvent.press(getByText("Assigner"));
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Object)
    );
  });
});
