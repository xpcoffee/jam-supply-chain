import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { AppPath } from "../app/paths";
import { DeleteProductButton } from "../components/DeleteProductButton";
import { ProductTable } from "../components/ProductTable";

export const ProductsListView = () => {
    const [selectedId, setSelectedId] = useState<string | undefined>();
    const history = useHistory();

    return (
        <>
            <h1>Products</h1>
            <Button onClick={() => history.push(AppPath.NewProduct)}>New Product</Button>
            <Button
                disabled={selectedId === undefined}
                onClick={() => selectedId && history.push(AppPath.ViewProduct(selectedId))}
            >
                View details
            </Button>
            <Button
                disabled={selectedId === undefined}
                onClick={() => selectedId && history.push(AppPath.ModifyProduct(selectedId))}
            >
                Modify
            </Button>
            <DeleteProductButton id={selectedId} />
            <ProductTable onSelect={(id) => setSelectedId(id)} />
        </>
    );
};
