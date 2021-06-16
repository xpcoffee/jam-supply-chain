import { Button, Checkbox } from "@material-ui/core";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchProducts, selectProducts, selectProductsStatus } from "../resources/productSlice";
import { Hooks, useTable, useRowSelect, UseRowSelectRowProps, UseRowSelectState } from "react-table";
import { ExistingProduct } from "../api/types";

enum TableKey {
    id = "colId",
    name = "colName",
    price = "colPrice",
    quantity = "colQuantity",
}

/**
 * Displays a list of products.
 */
export const ProductTable = ({ onSelect }: Props) => {
    const products = useAppSelector(selectProducts);
    const status = useAppSelector(selectProductsStatus);
    const dispatch = useAppDispatch();
    const [dirty, setDirty] = useState(false);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: TableKey.id,
            },
            {
                Header: "Name",
                accessor: TableKey.name,
            },
            {
                Header: "Price",
                accessor: TableKey.price,
            },
            {
                Header: "Quantity",
                accessor: TableKey.quantity,
            },
        ],
        []
    );

    /**
     * Fetch products if the page hasn't yet been loaded
     */
    useEffect(() => {
        if (!dirty) {
            dispatch(fetchProducts());
            setDirty(true);
        }
    }, [dirty, dispatch]);

    const loading = status === "loading" ? <h3>Loading...</h3> : undefined;
    const error = status === "loading" ? <h3>error</h3> : undefined;

    const selectColumnHook = (hooks: Hooks<FormattedProduct>) => {
        hooks.allColumns.push((columns) => [
            {
                id: "selection",
                Cell: ({ row }: any) => {
                    const { checked, onChange: toggleRow } = (
                        row as UseRowSelectRowProps<FormattedProduct>
                    ).getToggleRowSelectedProps();

                    return (
                        <div>
                            <Checkbox
                                checked={checked}
                                onChange={(e) => {
                                    toggleAllRowsSelected(false);
                                    toggleRow && toggleRow(e);
                                }}
                            />
                        </div>
                    );
                },
            },
            ...columns,
        ]);
    };

    const data = useMemo(() => productsToTableData(Object.values(products)), [products]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: tableState,
        //@ts-ignore
        toggleAllRowsSelected,
    } = useTable({ data, columns }, useRowSelect, selectColumnHook);

    /**
     * Handle row selection
     */
    useEffect(() => {
        const tableSelectionState: UseRowSelectState<FormattedProduct> =
            tableState as UseRowSelectState<FormattedProduct>;
        const selectedRows = tableSelectionState?.selectedRowIds;
        const selectedRowIndex = Object.keys(selectedRows)[0] as unknown as number;
        const selectedId = data[selectedRowIndex]?.colId;
        onSelect && onSelect(selectedId);
    }, [data, onSelect, tableState]);

    /**
     * Render the table
     */
    const table = (() => {
        if (loading) {
            return loading;
        }

        if (error) {
            return error;
        }

        return (
            <table className="productTable" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    })();

    return (
        <>
            <Button
                disabled={status === "loading"}
                onClick={() => {
                    setDirty(false);
                }}
            >
                Refresh
            </Button>
            {table}
        </>
    );
};

function productsToTableData(products: ExistingProduct[]): FormattedProduct[] {
    return products.map(({ id, name, price, quantity }) => ({
        colId: id,
        colName: name,
        colPrice: price?.toString(),
        colQuantity: quantity?.toString(),
    }));
}

/**
 * A product that can be displayed in the table
 */
type FormattedProduct = {
    [key in TableKey]: string | undefined;
};

interface Props {
    onSelect?: (id: string | undefined) => void;
}
