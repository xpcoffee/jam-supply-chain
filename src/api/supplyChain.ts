import { ExistingProduct, ListResponse, Product } from "./types";

const SUPPLY_CHAIN_PATH = "/supply-chain";
const supplyChainProductPath = (id: string) => `${SUPPLY_CHAIN_PATH}/${id}`;

export function listProducts(): Promise<Response<ExistingProduct[]>> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(SUPPLY_CHAIN_PATH, {
        method: "get",
        headers,
    })
        .then((res) => assert200<ListResponse<ExistingProduct>>(res))
        .then((productList) => success(productList.bundle))
        .catch((err) => failure(err));
}

export function getProduct(id: string): Promise<Response<ExistingProduct>> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(supplyChainProductPath(id), {
        method: "get",
        headers,
    })
        .then((res) => assert200<ExistingProduct>(res))
        .then((product) => success(product))
        .catch((err) => failure(err));
}

export function updateProduct(product: Product): Promise<Response<ExistingProduct>> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(SUPPLY_CHAIN_PATH, {
        method: "post",
        headers,
        body: JSON.stringify(product),
    })
        .then((res) => assert200<ExistingProduct>(res))
        .then((product) => success<ExistingProduct>(product))
        .catch((err) => failure(err));
}

export function deleteProduct(id: string): Promise<Response<string>> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    return fetch(supplyChainProductPath(id), {
        method: "delete",
        headers,
    })
        .then((res) => assert204(res))
        .then(() => success(id))
        .catch((err) => failure(err));
}

type Response<T> = { result: "success"; data: T } | { result: "failure"; error: any };
const assert200 = <T>(response: globalThis.Response): Promise<T> => {
    if (response.ok) {
        return response.json() as Promise<T>;
    } else {
        throw response.statusText;
    }
};
const assert204 = async (response: globalThis.Response): Promise<void> => {
    if (response.ok) {
        return;
    } else {
        throw response.statusText;
    }
};
const success = <T>(data: T): Response<T> => {
    return { result: "success", data };
};
const failure = <T>(error: any): Response<T> => {
    return { result: "failure", error };
};
