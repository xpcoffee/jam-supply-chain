import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { reducer, RootState } from "./app/store";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

function render(ui: React.ReactElement, options: { initialState?: RootState; storeMock?: EnhancedStore<any> }) {
    const store = options.storeMock || configureStore({ reducer, preloadedState: options.initialState });
    const Wrapper: React.ComponentType = ({ children }) => {
        return <Provider store={store}>{children}</Provider>;
    };
    return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
