import { toast } from 'react-toastify';
import { passwordStrength } from 'check-password-strength';

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
