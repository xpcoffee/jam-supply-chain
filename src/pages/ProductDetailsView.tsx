import React from "react";
import { ProductDetails } from "../components/ProductDetails";
import { Breadcrumbs, Button, Link, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { AppPath } from "../app/paths";

export const ProductDetailsView = ({ id }: Props) => {
    const history = useHistory();
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" onClick={() => history.push(AppPath.ProductList)}>
                    Products
                </Link>
                <Typography color="textPrimary">{id}</Typography>
            </Breadcrumbs>
            <h1>Product details: {id}</h1>
            <Button onClick={() => history.push(AppPath.ModifyProduct(id))}>Edit</Button>
            <ProductDetails id={id} />
        </>
    );
};

export interface Props {
    id: string;
}
