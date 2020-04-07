/*
 * @Author: lhk
 * @Date: 2020-04-07 11:56:20
 * @LastEditTime: 2020-04-07 14:12:01
 * @LastEditors: Please set LastEditors
 * @Description: redux中间件 控制dispatch顺序
 * @FilePath: \redux-controlled-promise\src\index.js
 */
const createControlledMiddleware = (extraArgument) => ({ dispatch }) => (next) => (action) => {
    if (!Array.isArray(action)) {
        return next(action);
    }
    return action.reduce((result, actionItem) => {
        if (!actionItem) {
            return result;
        }
        if (Array.isArray(actionItem)) {
            return Promise.all(actionItem.map((item) => dispatch(item)));
        }
        return Promise.resolve(dispatch(actionItem));
    }, Promise.resolve(extraArgument));
};

const reduxControlledPromise = createControlledMiddleware({ errMsg: 'action type node found' });
reduxControlledPromise.withExtraArgument = createControlledMiddleware;
export default reduxControlledPromise;
