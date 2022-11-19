<!--
 * @Author: lhk
 * @Date: 2020-04-07 10:37:22
 * @LastEditTime: 2020-04-07 21:28:22
 * @LastEditors: Please set LastEditors
 * @Description: README
 * @FilePath: \redux-controlled-promise\README.md
 -->

# redux-controlled-promise

redux middleware to controll dispatch order use promise when use redux-thunk

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
    import thunk from 'redux-thunk';
    import reduxControlledPromise from 'redux-controlled-promise';
    import rootReducer from './reducers';

    const store = createStore(rootReducer, applyMiddleware(reduxControlledPromise, thunk));
    ```

## USE IN ACTION

If we want to control the order of dispatch, especially when you use the redux thunk middlewareWe.
you can follow the example below to program, The order of the following


example dispatch is asyncApi1 => asyncApi2 & LOAD_B_CONFIG => LOAD_C_CONFIG

```js
const asyncApi1 = (config) => {
    return async (dispatch) => {
        await xxx();
        dispatch({
            type: 'LOAD_A_CONFIG',
        })
    }
}
store.dispatch([
    asyncApi1(config),
    [
        asyncApi2(config),
        {
            type: 'LOAD_B_CONFIG',
            config: [],
        },
    ],
    {
        type: 'LOAD_C_CONFIG',
        config: [],
    },
]);
```

The return value of middleware is promise, So we can execute some callback functions after the dispatch

 ```js
store.dispatch([
    asyncApi1(config),
    asyncApi2(config),
]).then(res) => {
    // ...config loaded
};
```
