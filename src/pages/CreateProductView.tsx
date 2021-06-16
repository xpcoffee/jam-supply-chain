import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { ProductForm } from "../components/ProductForm";

export const CreateProductView = () => {
    const history = useHistory();
    const navigateToProducts = () => history.push("/products/");
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" onClick={navigateToProducts}>
                    Products
                </Link>
                <Typography color="textPrimary">New</Typography>
            </Breadcrumbs>
            <h1>Create new product</h1>
            <ProductForm onCancel={navigateToProducts} />
        </>
    );
};
