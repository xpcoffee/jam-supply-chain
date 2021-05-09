import React from "react";

export class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>We ran into an error.</h1>
                    <p>
                        Please reload the page and try again. If errors persist, please reach out to{" "}
                        <a href="https://github.com/xpcoffee">@xpcoffee</a>
                    </p>
                </>
            );
        } else {
            try {
                return this.props.children;
            } catch (e) {
                this.setState({ hasError: true });
            }
        }
    }
}
