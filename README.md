# Turborepo starter

This is an official Yarn v1 starter turborepo.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [React.js](https://reactjs.org/) app
- `api`: a [Node.js](https://nodejs.org/en/) api
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [JavaScript](https://www.javascript.com/).

### State Management 

The web app is using a [React Query](https://react-query-v3.tanstack.com/) for fetching, caching, synchronizing and updating server state.

### Database

This project is using a [JSON](https://www.json.org/json-en.html) file called db.json as the Database to demonstrate how the api will interact with cloud NoSQL databases like Firebase Realtime Database or MongoDB

### Utilities

This turborepo has some additional tools already setup for you:

- [Prettier](https://prettier.io) for code formatting

### Develop

To develop all apps and packages, run the following command:

```
cd Kiosk
yarn run dev
```

### Build

To build all apps and packages, run the following command:

```
cd Kiosk
yarn run build
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
