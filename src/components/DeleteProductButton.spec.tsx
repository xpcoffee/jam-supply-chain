import React from "react";
import { render, screen } from "../testUtils";
import "@testing-library/jest-dom/extend-expect";
import { DeleteProductButton } from "./DeleteProductButton";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const mockStore = configureStore(getDefaultMiddleware());

describe("DeleteProductButton", () => {
    it("should be disabled if no ID is given", () => {
        render(<DeleteProductButton />, { storeMock: mockStore({}) });
        expect(screen.getByText("Delete")).toBeDisabled();
    });

    it("should be enabled if an ID is given", () => {
        render(<DeleteProductButton id={"foo"} />, { storeMock: mockStore({}) });
        expect(screen.getByText("Delete")).toBeEnabled();
    });

    it("should be enabled if an ID is given", () => {
        render(<DeleteProductButton id={"foo"} />, { storeMock: mockStore({}) });
        expect(screen.getByText("Delete")).toBeEnabled();
    });
});
