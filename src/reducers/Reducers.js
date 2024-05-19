const initialState = {
    numberCart: 0,
    role: 'GUEST',
};
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                numberCart: state.numberCart + 1,
            };
        case 'DECREMENT':
            return {
                ...state,
                numberCart: state.numberCart - 1,
            };
        case 'SET_TO_ZERO':
            return {
                ...state,
                numberCart: 0,
            };
        case 'CHANGE_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        default:
            return state;
    }
};
export default myReducer;
export { initialState };
