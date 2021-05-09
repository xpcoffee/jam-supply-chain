import React from "react";
import { Route, Router, Switch } from "react-router";
import "./App.css";
import { ProductsListView } from "./pages/ProductsListView";
import { ProductView } from "./pages/ProductView";
import { createBrowserHistory } from "history";
import { NotFound } from "./pages/NotFound";
import { CreateProductView } from "./pages/CreateProductView";

const history = createBrowserHistory();

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Router history={history}>
                    <Switch>
                        <Route path="/products/new">
                            <CreateProductView />
                        </Route>
                        <Route
                            path="/products/:id"
                            render={(routeProps) => {
                                const searchParams = new URLSearchParams(routeProps.location.search);
                                const isEditView = searchParams.get("view") === "edit";
                                return (
                                    <ProductView view={isEditView ? "edit" : "view"} id={routeProps.match.params.id} />
                                );
                            }}
                        />
                        <Route path="/products">
                            <ProductsListView />
                        </Route>
                        <Route exact path="/">
                            <ProductsListView />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
