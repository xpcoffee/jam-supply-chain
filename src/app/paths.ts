export class AppPath {
    static ProductList = "/products";
    static NewProduct = "/products/new";
    static ViewProduct = (id: string) => `/products/${id}`;
    static ModifyProduct = (id: string) => `/products/${id}?view=edit`;
}
