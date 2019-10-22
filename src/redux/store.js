
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer'

let store = null;

// const persistedReducer = persistReducer(persistConfig, rootReducer);

if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 10 }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
    );
    store = createStore(rootReducer, undefined, enhancer);

    if (module.hot) {
        module.hot.accept(rootReducer, () => {
            const nextrootReducer = rootReducer;
            store.replaceReducer(nextrootReducer);
        });
    }
} else store = createStore(rootReducer, applyMiddleware(thunk));
export default store;