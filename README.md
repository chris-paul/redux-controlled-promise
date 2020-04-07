<!--
 * @Author: lhk
 * @Date: 2020-04-07 10:37:22
 * @LastEditTime: 2020-04-07 21:21:30
 * @LastEditors: Please set LastEditors
 * @Description: README
 * @FilePath: \redux-controlled-promise\README.md
 -->

# redux-controlled-promise

redux middleware to controll dispatcch order use promise

```
npm install redux-controlled-promise
```

## HOW TO USE

-   install package

```
npm install redux-controlled-promise
```

-   add middleware

```js
import { createStore, applyMiddleware } from 'redux';
import reduxControlledPromise from 'redux-controlled-promise';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(reduxControlledPromise));
```

-   use in action

    -   control sequence

    ```js
    import { createStore, applyMiddleware } from 'redux';
    import reduxControlledPromise from 'redux-controlled-promise';
    import rootReducer from './reducers';

    const store = createStore(rootReducer, applyMiddleware(reduxControlledPromise));

    // If we want to control the order of dispatch, We can follow the example below to program,The order of the following
    // example dispatch is LOAD_A_CONFIG => LOAD_B_CONFIG & LOAD_C_CONFIG => LOAD_D_CONFIG
    store.dispatch([
        {
            type: 'LOAD_A_CONFIG',
            config: [],
        },
        [
            {
                type: 'LOAD_B_CONFIG',
                config: [],
            },
            {
                type: 'LOAD_C_CONFIG',
                config: [],
            },
        ],
        {
            type: 'LOAD_D_CONFIG',
            config: [],
        },
    ]);

    // The return value of middleware is promise, So we can execute some callback functions after the dispatch
    store.dispatch([
        {
            type: 'LOAD_A_CONFIG',
            config: [],
        },
        {
            type: 'LOAD_B_CONFIG',
            config: [],
        },
    ]).then(res) => {
        // ...config loaded
    };
    ```

-   You can customize the return value that can't find the action type

```js
const errorAlert = () => ({
    // ... error dialog
});
const store = createStore(
    reducer,
    applyMiddleware(reduxControlledPromise.withErrorArgument(errorAlert)),
);
```
