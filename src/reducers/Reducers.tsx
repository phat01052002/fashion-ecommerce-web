const initialState = {
    numberCart: 0,
    role: 'GUEST',
    user: {},
    listAddress: [],
    isLoading: false,
    listItemInCart: [],
    numberFavorite: 0,
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
                numberCart: state.numberCart + action.payload,
            };
        case 'SET_NUMBER_FAVOITE':
            return {
                ...state,
                numberFavorite: state.numberFavorite + action.payload,
            };
        case 'INCREASE_NUMBER_FAVOITE':
            return {
                ...state,
                numberFavorite: (state.numberFavorite += 1),
            };
        case 'DECREASE_NUMBER_FAVOITE':
            return {
                ...state,
                numberFavorite: (state.numberFavorite -= 1),
            };
        case 'DECREASE_NUMBER_CART':
            return {
                ...state,
                numberCart: state.numberCart - action.payload,
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
        case 'ADD_LIST_ITEM_IN_CART':
            const productIndex = state.listItemInCart.findIndex(
                (productDetail: any) => action.payload.id == productDetail.id,
            );
            if (productIndex == -1) {
                return {
                    ...state,
                    listItemInCart: [...state.listItemInCart, action.payload],
                };
            } else {
                return {
                    ...state,
                };
            }
        case 'REMOVE_ITEM_FROM_CART':
            const newList = state.listItemInCart.filter((productDetail: any) => productDetail.id !== action.payload);
            return {
                ...state,
                listItemInCart: newList,
            };

        default:
            return state;
    }
};
export default myReducer;
export { initialState };
