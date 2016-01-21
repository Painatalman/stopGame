const createStore = (reducer) => {
    let
        state,
        listeners = [];

    const getState = () => state;

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };
    
    // the great initial triggerer
    dispatch({});

    return { getState, dispatch, subscribe };
}