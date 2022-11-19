/*
 * @Author: lhk
 * @Date: 2020-04-07 11:56:20
 * @LastEditTime: 2020-04-07 21:19:16
 * @LastEditors: Please set LastEditors
 * @Description: redux中间件 控制dispatch顺序
 * @FilePath: \redux-controlled-promise\src\index.js
 */
const reduxControlledPromise = ({ dispatch }) => (next) => (action) => {
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
        return result.then(() => dispatch(actionItem));
    }, Promise.resolve());
};

export default reduxControlledPromise;
