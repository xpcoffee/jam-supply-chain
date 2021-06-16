import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    createProduct,
    fetchProduct,
    modifyProduct,
    selectError,
    selectLastModifiedProductId,
    selectProduct,
    selectProductsStatus,
} from "../resources/productSlice";
import { Form, Formik } from "formik";
import { ExistingProduct, Product } from "../api/types";
import { useHistory } from "react-router";
import { Button, TextField } from "@material-ui/core";

export const ProductForm = ({ id, onCancel }: Props) => {
    const history = useHistory();

    const product = useAppSelector((state) => selectProduct(state, id));
    const status = useAppSelector(selectProductsStatus);
    const errorMessage = useAppSelector(selectError);
    const lastModifiedProductId = useAppSelector(selectLastModifiedProductId);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id !== undefined && product === undefined && status === "idle") {
            dispatch(fetchProduct(id));
        }
    }, [dispatch, id, product, status]);

    const error = status === "error" ? errorMessage : undefined;
    const loading = status === "loading" ? "Loading..." : undefined;

    const readyToShowForm = id === undefined || product !== undefined || errorMessage === "Not found";

    const initialValues: Product = product || { id: "", name: "", quantity: 0, price: 0 };
    const form = readyToShowForm && (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                const action = values.id ? modifyProduct(values as ExistingProduct) : createProduct(values);
                dispatch(action);
            }}
        >
            {({ isSubmitting, setSubmitting }) => {
                if (isSubmitting && lastModifiedProductId) {
                    setSubmitting(false);
                    history.push(`/products/${lastModifiedProductId}`);
                }

                return (
                    <Form className="productForm">
                        {id && <h3>ID: {id}</h3>}
                        <TextField fullWidth label="Name" type="text" name="name" />
                        <TextField fullWidth label="Price" type="number" name="price" />
                        <TextField fullWidth label="Quantity" type="number" name="quantity" />
                        <div className="verticalSpacer"></div>
                        <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </Form>
                );
            }}
        </Formik>
    );

    return <>{loading || error || form}</>;
};

interface Props {
    id?: string;
    onCancel: () => void;
}
