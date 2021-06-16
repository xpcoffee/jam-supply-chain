# Structure

This file gives an overview of the structure of the project.

If you're looking for where to place/change code, you're in the right place!

## App state and resources

**api/** - This file contains functionality that enables/optimizes calls against the app APIs. It currently contains a definition for the SupplyChain client, which would ideally be vended by its own package in future.

**app/** - This directory contains functionality that is shared app-wide. It includes the core definition of app state and hooks to interact with it.

**resources/** - This directory contains definitions for resources used in the app. These are managed/stored using Redux slices. A new slice for each new type of resource should be created.

## App views

**pages/** - This directory contains the actual views shown in the app. These should be composed from components defined in `/components`.

**components/** - This directory defines components that can be used (and re-used) in the app. Each component should have a clear concern and should focus on doing that concern only.

Components should select the data they need to render using selectors (currently only defined in `/resources`) and should dispatch actions for effects they would like to trigger. Avoid doing processing in the components; rather do transformations in selectors or in reducers.

## Tests

Tests are written in the same directories as the source as `.spec.ts` files.
