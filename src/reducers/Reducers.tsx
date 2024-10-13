const initialState = {
    numberCart: 0,
    role: 'GUEST',
    user: {},
    listAddress: [],
    isLoading: false,
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
        case 'CHANGE_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'DELETE_ITEM_ADDRESS':
            return {
                ...state,
                listAddress: state.listAddress.filter((item: any, index: any) => index !== action.index),
            };
        case 'CHANGE_LIST_ADDRESS':
            return {
                ...state,
                listAddress: action.payload,
            };
        case 'ADD_ITEM_ADDRESS':
            return {
                ...state,
                listAddress: action.payload,
            };
        case 'CHANGE_ITEM_ADDRESS':
            return {
                ...state,
                listAddress: state.listAddress.map((address, i) =>
                    i === action.payload.index ? action.payload.address : address,
                ),
            };
        default:
            return state;
    }
};
export default myReducer;
export { initialState };
