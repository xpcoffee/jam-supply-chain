import React from "react";
import { Button } from "@material-ui/core";
import { useAppDispatch } from "../app/hooks";
import { deleteProduct } from "../resources/productSlice";

export const DeleteProductButton = ({ id, global = window }: Props) => {
    const dispatch = useAppDispatch();

    const confirmAndDelete = () => {
        const doDelete = global.confirm("Are you sure you want to delete product " + id + " ?");
        if (doDelete && id) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <Button aria-label={"delete-product"} disabled={id === undefined} onClick={confirmAndDelete}>
            Delete
        </Button>
    );
};

interface Props {
    id?: string;
    global?: typeof window;
}
