import { Breadcrumbs, Button, Link, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import { AppPath } from "../app/paths";
import { ProductForm } from "../components/ProductForm";

export const ModifyProductView = ({ id }: Props) => {
    const history = useHistory();
    const navigateBackToProduct = () => history.push(AppPath.ViewProduct(id));

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" onClick={() => history.push(AppPath.ProductList)}>
                    Products
                </Link>
                <Link color="inherit" onClick={navigateBackToProduct}>
                    {id}
                </Link>
                <Typography color="textPrimary">Modify</Typography>
            </Breadcrumbs>
            <h1>Modify product: {id}</h1>
            <ProductForm id={id} onCancel={navigateBackToProduct} />
        </>
    );
};

export interface Props {
    id: string;
}
