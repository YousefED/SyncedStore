# TODO MVC example

This example demonstrates how you can use Reactive CRDT to build a collaborative version of the [TODO MVC](http://todomvc.com) app.

The code that sets up our store is defined in [src/store.ts](src/store.ts). By using the `useReactive` hook, our React components (starting at [src/App.tsx](src/App.tsx)) are easy to read and update automatically.

# Running

    npm install
    npm start

🔥 Make sure to open multiple browsers to see the app syncing automatically.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
