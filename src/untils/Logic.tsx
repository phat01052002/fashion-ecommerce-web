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
    return value;
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

export const filterInputNumberInCart = (
    id: any,
    value: any,
    setValue: any,
    productDetail: any,
    setTotalPrice: any,
    setTotalItem: any,
    isCheck: boolean,
    quantityOld: number,
) => {
    value = value.replace(/[^0-9]/g, '');
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const productIndex = existingCart.findIndex((productDetail: any) => productDetail.productDetailId === id);
    if (productIndex != -1) {
        if (productDetail.quantity - parseInt(value) > 0 && parseInt(value) != 0) {
            existingCart[productIndex].quantity = parseInt(value);
            setValue(parseInt(value));
            localStorage.setItem('listCart', JSON.stringify(existingCart));
            if (isCheck) {
                setTotalItem((prev: any) => (prev = prev - quantityOld + parseInt(value)));
                setTotalPrice(
                    (prev: any) =>
                        (prev =
                            prev -
                            quantityOld * parseInt(productDetail.price) +
                            parseInt(value) * parseInt(productDetail.price)),
                );
            }
        }
    }
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

export const setCheckInStore = (id: string, isCheck: boolean) => {
    console.log(id, isCheck);
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const productIndex = existingCart.findIndex((productDetail: any) => productDetail.productDetailId === id);
    if (productIndex != -1) {
        existingCart[productIndex].isCheck = isCheck;
        localStorage.setItem('listCart', JSON.stringify(existingCart));
    }
};

export const removeItemFromCart = (id: string) => {
    const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
    const updatedCart = existingCart.filter((item: any) => item.productDetailId !== id);
    localStorage.setItem('listCart', JSON.stringify(updatedCart));
};

export const checkIsFollow = (shop: any, userId: string) => {
    if (shop.userFollowIdList.length > 0) {
        return shop.userFollowIdList.includes(userId);
    } else {
        return false;
    }
};
export const checkIsFavorite = (user: any, productId: string) => {
    if (user.productFavoriteIdList.length > 0) {
        return user.productFavoriteIdList.includes(productId);
    } else {
        return false;
    }
};
export function formatNumber(num: number) {
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M'; // Triệu
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'k'; // Nghìn
    } else {
        return num.toString(); // Số nhỏ hơn 1000
    }
}
