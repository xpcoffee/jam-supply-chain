import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as supplyChainClient from "../api/supplyChain";
import { ExistingProduct, Product } from "../api/types";
import { RootState } from "../app/store";

export interface ProductState {
    items: ProductRecord;
    status: "loading" | "error" | "idle" | "pending";
    latestModifiedProductId?: string;
    error?: string;
}

type ProductRecord = Record<string, ExistingProduct>;

export const initialState: ProductState = {
    items: {},
    status: "idle",
};

export const fetchProducts = createAsyncThunk("product/list", async () => {
    return supplyChainClient.listProducts();
});

export const fetchProduct = createAsyncThunk("product/get", async (id: string) => {
    return supplyChainClient.getProduct(id);
});

export const createProduct = createAsyncThunk("product/create", async (product: Product) => {
    // ensure we let the API generate an ID
    // FIXME: the API shouldn't be accepting POSTS for IDs that don't exist
    const productWithoutId: Product = {
        name: product.name,
        quantity: product.quantity,
        price: product.price,
    };
    return supplyChainClient.updateProduct(productWithoutId);
});

export const modifyProduct = createAsyncThunk("product/modify", async (product: ExistingProduct) => {
    return supplyChainClient.updateProduct(product);
});

export const deleteProduct = createAsyncThunk("product/delete", async (id: string) => {
    const result = await supplyChainClient.deleteProduct(id);
    console.log({ result });
    return result;
});

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // clears local record state
        clear: (state) => {
            state.items = {};
            state.latestModifiedProductId = undefined;
        },
        // updates a single record in local state
        updateProductLocally: (state, action: PayloadAction<ExistingProduct>) => {
            updateProductRecord(state.items, [action.payload]);
        },
        clearLatestModifiedProductId: (state) => {
            state.latestModifiedProductId = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                if (action.payload.result === "success") {
                    state.items = {}; // FIXME; should have a method that can just update the resources instead of nuking store
                    updateProductRecord(state.items, action.payload.data);
                    state.status = "idle";
                } else {
                    state.status = "error";
                    state.error = action.payload.error;
                }
            })
            .addCase(fetchProduct.pending, (state) => {
                state.status = "loading";
                state.error = undefined;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                if (action.payload.result === "success") {
                    updateProductRecord(state.items, [action.payload.data]);
                    state.status = "idle";
                } else {
                    state.status = "error";
                    state.error = action.payload.error;
                }
            })
            .addCase(createProduct.pending, (state) => {
                state.status = "pending";
                state.error = undefined;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                if (action.payload.result === "success") {
                    state.latestModifiedProductId = action.payload.data.id;
                    updateProductRecord(state.items, [action.payload.data]);
                    state.status = "idle";
                } else {
                    state.status = "error";
                    state.error = action.payload.error;
                }
            })
            .addCase(modifyProduct.pending, (state) => {
                state.status = "pending";
                state.error = undefined;
            })
            .addCase(modifyProduct.fulfilled, (state, action) => {
                if (action.payload.result === "success") {
                    state.latestModifiedProductId = action.payload.data.id;
                    updateProductRecord(state.items, [action.payload.data]);
                    state.status = "idle";
                } else {
                    state.status = "error";
                    state.error = action.payload.error;
                }
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = "pending";
                state.error = undefined;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (action.payload.result === "success") {
                    const itemToRemove = action.payload.data;
                    const { [itemToRemove]: _removed, ...remainingItems } = state.items;
                    state.items = remainingItems;

                    state.status = "idle";
                } else {
                    state.status = "error";
                    state.error = action.payload.error;
                }
            });
    },
});

function updateProductRecord(record: ProductRecord, newProducts?: ExistingProduct[]): ProductRecord {
    newProducts?.forEach((product) => {
        record[product.id] = product;
    });
    return record;
}

export const selectProduct = (rootState: RootState, id?: string) =>
    id === undefined ? undefined : rootState.products.items[id];
export const selectLastModifiedProductId = (rootState: RootState) => rootState.products.latestModifiedProductId;
export const selectProducts = (rootState: RootState) => rootState.products.items;
export const selectProductsStatus = (rootState: RootState) => rootState.products.status;
export const selectError = (rootState: RootState) => rootState.products.error;

export const { clear } = productSlice.actions;
export default productSlice.reducer;
