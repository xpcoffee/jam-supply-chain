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
import { Field, Form, Formik } from "formik";
import { ExistingProduct, Product } from "../api/types";
import { useHistory } from "react-router";

export const ProductForm = ({ id }: Props) => {
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
                    <Form>
                        {id && (
                            <label>
                                ID
                                <span>{id}</span>
                            </label>
                        )}
                        <label>
                            Name
                            <Field type="text" name="name" />
                        </label>
                        <label>
                            Price
                            <Field type="number" name="price" />
                        </label>
                        <label>
                            Quantity
                            <Field type="number" name="quantity" />
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );

    return <>{loading || error || form}</>;
};

interface Props {
    id?: string;
}
