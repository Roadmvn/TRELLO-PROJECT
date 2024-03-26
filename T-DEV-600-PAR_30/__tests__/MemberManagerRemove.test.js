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

describe("MemberManager - Remove Member", () => {
  it("removes a member from a card", async () => {
    const memberToRemove = { id: "3", fullName: "Sam Smith", assigned: true };
    axios.get.mockResolvedValueOnce({
      data: [memberToRemove],
    });
    axios.delete.mockResolvedValue({});

    const { getByText } = render(
      <MemberManager route={mockRoute} navigation={mockNavigation} />
    );

    await waitFor(() => {
      fireEvent.press(getByText("Désassigner"));
    });

    expect(axios.delete).toHaveBeenCalledWith(expect.any(String));
  });
});
