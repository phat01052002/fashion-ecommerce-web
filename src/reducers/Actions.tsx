export const incrementNumberCart = () => {
    return {
        type: 'INCREMENT',
    };
};

export const decrementNumberCart = () => {
    return {
        type: 'DECREMENT',
    };
};
export const set_to_zero = () => {
    return {
        type: 'SET_TO_ZERO',
    };
};
export const set_number_cart = (payload: number) => {
    return {
        type: 'SET_NUMBER_CART',
        payload,
    };
};
export const change_role = (payload: any) => {
    return {
        type: 'CHANGE_ROLE',
        payload,
    };
};
