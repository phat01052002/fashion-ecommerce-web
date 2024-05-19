import { toast } from 'react-toastify';

/// filter input
export const filterInput = (value: any, setValue: any) => {
    value = value.replace(/[^a-zA-Z0-9âáăạấầẩậặắẳòóọỏôồốổộơờớợởưừứửựùúụủìíịỉỳýỵỷ" "]/g, '');
    setValue(value);
};
export const filterInputWebsite = (value: any, setValue: any) => {
    value = value.replace(/[^a-zA-Z0-9./]/g, '');
    setValue(value);
};
export const filterInputNumber = (value: any, setValue: any) => {
    value = value.replace(/[^0-9]/g, '');
    setValue(value);
};
export const filterEmail = (event: any, setValue: any) => {
    const input = event.target;
    const email = input.value;

    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        toastError('Không đúng định dạng email');
        setValue('');
    } else {
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
