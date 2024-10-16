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
export const decrease_more_number_cart = (payload: number) => {
    return {
        type: 'DECREASE_NUMBER_CART',
        payload,
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

export const change_user = (payload: any) => {
    return {
        type: 'CHANGE_USER',
        payload,
    };
};

export const change_is_loading = (payload: any) => {
    return {
        type: 'CHANGE_IS_LOADING',
        payload,
    };
};

export const delete_item_address = (index: any) => {
    return {
        type: 'DELETE_ITEM_ADDRESS',
        index,
    };
};

export const change_list_address = (payload: any) => {
    return {
        type: 'CHANGE_LIST_ADDRESS',
        payload,
    };
};

export const add_item_address = (payload: any) => {
    return {
        type: 'ADD_ITEM_ADDRESS',
        payload,
    };
};

export const change_item_address = (payload: any) => {
    return {
        type: 'CHANGE_ITEM_ADDRESS',
        payload,
    };
};

export const add_list_item_in_cart = (payload: any) => {
    return {
        type: 'ADD_LIST_ITEM_IN_CART',
        payload,
    };
};

export const remove_item_from_cart = (payload: any) => {
    return {
        type: 'REMOVE_ITEM_FROM_CART',
        payload,
    };
};
