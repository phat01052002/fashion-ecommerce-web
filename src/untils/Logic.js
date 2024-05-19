/// filter input
export const filterInput = (value, setValue) => {
    value = value.replace(/[^a-zA-Z0-9âáăạấầẩậặắẳòóọỏôồốổộơờớợởưừứửựùúụủìíịỉỳýỵỷ" "]/g, '');
    setValue(value);
};
export const filterInputWebsite = (value, setValue) => {
    value = value.replace(/[^a-zA-Z0-9./]/g, '');
    setValue(value);
};
export const filterInputNumber = (value, setValue) => {
    value = value.replace(/[^0-9]/g, '');
    setValue(value);
};
export const filterEmail = (event, setValue) => {
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
export const toggleDialog = (setIsVisiableDialog) => {
    setIsVisiableDialog((prev) => !prev);
};
