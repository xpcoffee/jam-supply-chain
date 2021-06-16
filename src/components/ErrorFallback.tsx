import React from "react";

export function ErrorFallback({ error }: { error: Error }) {
    return (
        <>
            <h1>We ran into an error.</h1>
            <p>
                Please reload the page and try again. If errors persist, please reach out to{" "}
                <a href="https://github.com/xpcoffee">@xpcoffee</a>
            </p>
        </>
    );
}
