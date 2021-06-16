import React from "react";
import { render, screen } from "../testUtils";
import "@testing-library/jest-dom/extend-expect";
import { DeleteProductButton } from "./DeleteProductButton";
import configureStore from "redux-mock-store";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer, { fetchProducts, initialState, ProductState, FOR_TESTING_ONLY } from "../resources/productSlice";
import { ExistingProduct } from "../api/types";
import { ProductTable } from "./ProductTable";

const { updateProductRecord } = FOR_TESTING_ONLY;

const mockStore = configureStore(getDefaultMiddleware());
const products: ExistingProduct[] = [
    {
        id: "foo",
        name: "bar",
        quantity: 1000,
        price: 2000,
    },
    {
        id: "baz",
        name: "qux",
        quantity: 3000,
        price: 4000,
    },
];
const stateWithProducts: ProductState = { ...initialState, items: updateProductRecord({}, products) };

describe("ProductTable", () => {
    it("should initially fetch products.", () => {
        const storeMock = mockStore({ products: stateWithProducts });
        render(<ProductTable />, { storeMock });
        expect(storeMock.getActions().find((action) => (action.type = "product/list/pending"))).toBeTruthy();
    });

    it("should display products in the table.", () => {
        render(<ProductTable />, { storeMock: mockStore({ products: stateWithProducts }) });
        expect(screen.getByText(products[0].id)).toBeInTheDocument();
        expect(screen.getByText(products[0].name!)).toBeInTheDocument();
        expect(screen.getByText(`${products[0].quantity!}`)).toBeInTheDocument();
        expect(screen.getByText(`${products[0].price!}`)).toBeInTheDocument();

        expect(screen.getByText(products[1].id)).toBeInTheDocument();
        expect(screen.getByText(products[1].name!)).toBeInTheDocument();
        expect(screen.getByText(`${products[1].quantity!}`)).toBeInTheDocument();
        expect(screen.getByText(`${products[1].price!}`)).toBeInTheDocument();
    });
});
