export const increment = () => {
    return {
        type: 'INCREMENT',
    };
};

export const decrement = () => {
    return {
        type: 'DECREMENT',
    };
};
export const set_to_zero = () => {
    return {
        type: 'SET_TO_ZERO',
    };
};
export const change_role = (payload: any) => {
    return {
        type: 'CHANGE_ROLE',
        payload,
    };
};
