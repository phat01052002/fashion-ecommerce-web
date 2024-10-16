import { toast } from 'react-toastify';
import { passwordStrength } from 'check-password-strength';
//format price
export const formatPrice = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
//shorted
export const shortedString = (input: string, length: number = 4) => {
    if (input.length <= length) {
        return input;
    }
    return input.slice(0, length) + '...';
};
/// filter input
export const filterSpecialInput = (value: any, setValue: any) => {
    value = value
        .replace('?', '')
        .replace('`', '')
        .replace('!', '')
        .replace('@', '')
        .replace('#', '')
        .replace('$', '')
        .replace('%', '')
        .replace('^', '')
        .replace('&', '')
        .replace('*', '')
        .replace('(', '')
        .replace(')', '')
        .replace('_', '')
        .replace('-', '')
        .replace('+', '')
        .replace('=', '')
        .replace('<', '')
        .replace('>', '')
        .replace('/', '')
        .replace(':', '')
        .replace(';', '')
        .replace('{', '')
        .replace('}', '')
        .replace('script', '');

    setValue(value);
};
export const filterInput = (value: any, setValue: any) => {
    //value = value.replace(/[^a-zA-Z0-9àáảâáăạấầẩậặắẳòóọỏôồốổộơờớợởưừứửựùúụủìíịỉỳýỵỷeêếệểềéẹẻèiếđ" "]/g, '');
    setValue(value);
};
export const filterPassword = (value: any, setValue: any, setStrength: any) => {
    //value = value.replace(/[^a-zA-Z0-9àáảâáăạấầẩậặắẳòóọỏôồốổộơờớợởưừứửựùúụủìíịỉỳýỵỷeêếệểềéẹẻèiếđ" "]/g, '');
    setValue(value);
    setStrength(passwordStrength(value).id);
};
export const filterInputWebsite = (value: any, setValue: any) => {
    value = value.replace(/[^a-zA-Z0-9./]/g, '');
    setValue(value);
};
export const filterInputNumber = (value: any, setValue: any) => {
    value = value.replace(/[^0-9]/g, '');
    setValue(value);
};
export const checkIsEmail = (email: string) => {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return false;
    } else {
        return true;
    }
};
export const toastError = (text: string) => {
    toast.error(text, { position: 'top-right', autoClose: 3000, pauseOnHover: false, closeOnClick: true });
};
export const toastSuccess = (text: string) => {
    toast.success(text, { position: 'top-right', autoClose: 3000, pauseOnHover: false, closeOnClick: true });
};
export const toastInfo = (text: string) => {
    toast.info(text, { position: 'top-right', autoClose: 3000, pauseOnHover: false, closeOnClick: true });
};
export const toastWarning = (text: string) => {
    toast.warning(text, { position: 'top-right', autoClose: 3000, pauseOnHover: false, closeOnClick: true });
};

export const addToListCartStore = (productDetailId: string, quantity: number, productDetail: any) => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const productIndex = existingCart.findIndex(
        (productDetail: any) => productDetail.productDetailId === productDetailId,
    );
    if (productIndex != -1) {
        if (productDetail.quantity > existingCart[productIndex].quantity) {
            existingCart[productIndex].quantity += quantity;
            localStorage.setItem('listCart', JSON.stringify(existingCart));
        } else {
            toastWarning('Không đủ số lượng');
        }
    } else {
        localStorage.setItem(
            'listCart',
            JSON.stringify([...existingCart, { productDetailId: productDetailId, quantity: quantity, isCheck: false }]),
        );
    }
};

export const removeFromListCartStore = (productDetailId: string, quantity: number, productDetail: any) => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const productIndex = existingCart.findIndex(
        (productDetail: any) => productDetail.productDetailId === productDetailId,
    );
    if (productIndex != -1) {
        if (existingCart[productIndex].quantity - quantity > 0) {
            existingCart[productIndex].quantity -= quantity;
            localStorage.setItem('listCart', JSON.stringify(existingCart));
        } else {
            const updatedCart = existingCart.filter(
                (productDetail: any) => productDetail.productDetailId === productDetailId,
            );
            localStorage.setItem('listCart', JSON.stringify(updatedCart));
        }
    } else {
        localStorage.setItem(
            'listCart',
            JSON.stringify([...existingCart, { productDetailId: productDetailId, quantity: quantity, isCheck: false }]),
        );
    }
};

export const totalQuantityInCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    if (existingCart.length > 0) {
        const total = existingCart.reduce((sum: any, item: any) => sum + item.quantity, 0);
        return total;
    } else {
        return 0;
    }
};

export const findProductDetailInStore = (id: string) => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    return existingCart.find((item: any, index: number) => item.productDetailId == id);
};

export const removeItemFromCart = (id: string) => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const updatedCart = existingCart.filter((item: any) => item.productDetailId !== id);
    localStorage.setItem('listCart', JSON.stringify(updatedCart));
};
