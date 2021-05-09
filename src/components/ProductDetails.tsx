import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProduct, selectError, selectProduct, selectProductsStatus } from "../resources/productSlice";

/**
 * Displays the details of a given product ID.
 */
export const ProductDetails = ({ id }: Props) => {
    const product = useAppSelector((state) => selectProduct(state, id));
    const status = useAppSelector(selectProductsStatus);
    const errorMessage = useAppSelector(selectError);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (product === undefined && status === "idle") {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id, product, status]);

    const error = status === "error" ? errorMessage : undefined;
    const loading = status === "loading" ? "Loading..." : undefined;

    return (
        <>
            <h3>{loading || error}</h3>
            {/* FIXME: style the output */}
            {product && <div>{JSON.stringify(product, null, 2)}</div>}
        </>
    );
};

interface Props {
    id: string;
}
