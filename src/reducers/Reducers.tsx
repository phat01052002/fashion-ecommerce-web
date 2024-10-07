const initialState = {
    numberCart: 0,
    role: 'GUEST',
    user: {},
};
const myReducer = (state = initialState, action: any) => {
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
        case 'SET_NUMBER_CART':
            return {
                ...state,
                numberCart: action.payload,
            };
        case 'CHANGE_ROLE':
            return {
                ...state,
                role: action.payload,
            };
        case 'CHANGE_USER':
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};
export default myReducer;
export { initialState };
