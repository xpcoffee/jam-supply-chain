import { ExistingProduct, Product } from "../api/types";
import {
    createProduct,
    deleteProduct,
    fetchProduct,
    fetchProducts,
    initialState,
    modifyProduct,
    productSlice,
    ProductState,
} from "./productSlice";

describe("productSlice", () => {
    describe("reducer", () => {
        it("should return the initial state", () => {
            expect(productSlice.reducer(undefined, { type: "foo" })).toEqual(initialState);
        });

        describe("when processing results of fetchProducts", () => {
            const _requestId = "doesntMatter";

            it("should clear any initial items in state and populate state with the new items", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

                const data: ExistingProduct[] = [{ id: "foo", name: "bar" }];
                const action = fetchProducts.fulfilled({ result: "success", data }, _requestId);

                const expectedState: ProductState = { items: { foo: data[0] }, status: "idle" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status to loading when fetching", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = fetchProducts.pending(_requestId);

                const expectedState: ProductState = { items: beforeState.items, status: "loading" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status of error if there's a failure", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = fetchProducts.fulfilled({ result: "failure", error: "foo" }, _requestId);

                const expectedState: ProductState = { items: beforeState.items, status: "error", error: "foo" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });
        });

        describe("when processing results of fetchProduct", () => {
            const _requestId = "doesntMatter";
            const _idArg = "doesntMatter";
            it("should add the fetched product to state", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

                const data: ExistingProduct = { id: "foo", name: "bar" };
                const action = fetchProduct.fulfilled({ result: "success", data }, _requestId, _idArg);

                const expectedState: ProductState = { items: { foo: data, ...beforeState.items }, status: "idle" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should override an existing product with the new one", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

                const data: ExistingProduct = { id: "baz", name: "bar" };
                const action = fetchProduct.fulfilled({ result: "success", data }, _requestId, _idArg);

                const expectedState: ProductState = { items: { baz: data }, status: "idle" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status to loading when fetching", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = fetchProduct.pending(_requestId, _idArg);

                const expectedState: ProductState = { items: beforeState.items, status: "loading" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status of error if there's a failure", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = fetchProduct.fulfilled({ result: "failure", error: "foo" }, _requestId, _idArg);

                const expectedState: ProductState = { items: beforeState.items, status: "error", error: "foo" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });
        });

        describe("when processing results of createProduct", () => {
            const _requestId = "doesntMatter";
            const _idArg: Product = {};

            it("should add the created product to state and set the lastModifiedProductId flag", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

                const data: ExistingProduct = { id: "foo", name: "bar" };
                const action = createProduct.fulfilled({ result: "success", data }, _requestId, _idArg);

                const expectedState: ProductState = {
                    items: { foo: data, ...beforeState.items },
                    status: "idle",
                    latestModifiedProductId: "foo",
                };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status to pending when creating", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = createProduct.pending(_requestId, _idArg);

                const expectedState: ProductState = { items: beforeState.items, status: "pending" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });

            it("should set status of error if there's a failure", () => {
                const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

                const action = createProduct.fulfilled({ result: "failure", error: "foo" }, _requestId, _idArg);

                const expectedState: ProductState = { items: beforeState.items, status: "error", error: "foo" };
                expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
            });
        });
    });

    describe("when processing results of modifyProduct", () => {
        const _requestId = "doesntMatter";
        const _idArg: ExistingProduct = { id: "doesntMatter" };

        it("should update the modified product in state and set the lastModifiedProductid flag", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

            const data: ExistingProduct = { id: "foo", name: "bar" };
            const action = modifyProduct.fulfilled({ result: "success", data }, _requestId, _idArg);

            const expectedState: ProductState = {
                items: { foo: data, ...beforeState.items },
                status: "idle",
                latestModifiedProductId: "foo",
            };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });

        it("should override an existing product with the new one", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "loading" };

            const data: ExistingProduct = { id: "baz", name: "bar" };
            const action = modifyProduct.fulfilled({ result: "success", data }, _requestId, _idArg);

            const expectedState: ProductState = {
                items: { baz: data },
                status: "idle",
                latestModifiedProductId: "baz",
            };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });

        it("should set status to pending when modifying", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

            const action = modifyProduct.pending(_requestId, _idArg);

            const expectedState: ProductState = { items: beforeState.items, status: "pending" };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });

        it("should set status of error if there's a failure", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

            const action = modifyProduct.fulfilled({ result: "failure", error: "foo" }, _requestId, _idArg);

            const expectedState: ProductState = { items: beforeState.items, status: "error", error: "foo" };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });
    });

    describe("when processing results of deleteProduct", () => {
        const _requestId = "doesntMatter";
        const _idArg = "doesntMatter";

        it("should remove the product from state", () => {
            const beforeState: ProductState = {
                items: { baz: { id: "baz", name: "grault" }, foo: { id: "foo", name: "bar" } },
                status: "loading",
            };

            const action = deleteProduct.fulfilled({ result: "success", data: "baz" }, _requestId, _idArg);

            const expectedState: ProductState = {
                items: { foo: { id: "foo", name: "bar" } },
                status: "idle",
            };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });

        it("should set status to pending when deleting", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

            const action = deleteProduct.pending(_requestId, _idArg);

            const expectedState: ProductState = { items: beforeState.items, status: "pending" };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });

        it("should set status of error if there's a failure", () => {
            const beforeState: ProductState = { items: { baz: { id: "baz", name: "grault" } }, status: "idle" };

            const action = deleteProduct.fulfilled({ result: "failure", error: "foo" }, _requestId, _idArg);

            const expectedState: ProductState = { items: beforeState.items, status: "error", error: "foo" };
            expect(productSlice.reducer(beforeState, action)).toEqual(expectedState);
        });
    });
});

export {};
