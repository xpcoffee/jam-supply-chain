# JAM Supply Chain

A CRUD UI the Supply Chain API.

## Context

This site was bootstrapped using `create-react-app` and uses `react-scripts` to simplify its configuration.

## Local development

### Gettings started

To start developing, start the devserver to start the app locally and run tests in watch mode.

**Run your local dev server**

Run `npm start` to start the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

**Run tests**

Run `npm test` to run jest in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Where should I make a change?

See [STRUCTURE.md](./STRUCTURE.md) for an overview of the layout of the project.

### Proxy server

CORS isn't set up on the test SupplyChain API endpoint; we can't call against it directly. To make calls from your dev-server,
a local proxy server is configured using `package.json`.

The dev server currently points to `https://ev5uwiczj6.execute-api.eu-central-1.amazonaws.com/test`.

### Create production artifacts

`npm build` builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Enhancements

-   Add table to products list view
-   Add pagination to table
-   Add selection to table
-   Add table action to view selection
-   Add table action to modify selection
-   Unit tests: state
-   Unit tests: components
-   Save user settings for table
-   Add table sorting
-   Add table filtering

---

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
