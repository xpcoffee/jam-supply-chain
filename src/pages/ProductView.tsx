import React from "react";
import { ModifyProductView } from "./ModifyProductView";
import { ProductDetailsView } from "./ProductDetailsView";

export const ProductView = (props: Props) => {
    switch (props.view) {
        case "view":
            return <ProductDetailsView id={props.id} />;
        case "edit":
            return <ModifyProductView id={props.id} />;
    }
};

export interface Props {
    id: string;
    view: "view" | "edit";
}
