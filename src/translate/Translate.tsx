import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { typeLng } from '../common/Common';
export const initI18n = (lng: string) => {
    i18n.use(initReactI18next).init({
        resources: {
            vn: {
                translation: {
                    auth: {
                        Login: 'Đăng nhập',
                        Register: 'Đăng kí',
                        Phone: 'Số điện thoại',
                        Password: 'Mật khẩu',
                        'Please enter complete information': 'Vui lòng nhập đủ thông tin',
                        'Account is incorrect': 'Tài khoản mật khẩu không đúng',
                        'Enter OTP': 'Nhập OTP',
                        Submit: 'Gửi',
                        Cancel: 'Huỷ',
                        'Verify failed': 'Xác thực thất bại',
                        'Verify success': 'Xác thực thành công',
                        'Can not send OTP': 'Không thể gửi OTP',
                        'Send OTP successfully': 'Đã gửi OTP',
                        'Forget password': 'Quên mật khẩu',
                        'Enter phone': 'Nhập số điện thoại',
                        'Phone non exist': 'Số điện thoại không tồn tại',
                        Success: 'Thành công',
                        'Can not change password': 'Không thể thay đổi mật khẩu',
                        Change: 'Thay đổi',
                        'Re-password': 'Nhập lại mật khẩu',
                        'Password must contain letters, numbers, one capital letter, one special character and must be 10 characters or more':
                            'Mật khẩu phải bao gồm chữ ,số ,một chữ cái hoa , một kí tự đặc biệt và phải từ 10 kí tự trở lên',
                        'Password is no strong': 'Mật khẩu yếu',
                        'Password and Re-password do not match': 'Không trùng khớp',
                    },
                },
            },
            en: {
                translation: {
                    auth: {
                        Login: 'Login',
                        Register: 'Register',
                        Phone: 'Phone',
                        Password: 'Password',
                        'Please enter complete information': 'Please enter complete information',
                        'Account is incorrect': 'Account is incorrect',
                        'Enter OTP': 'Enter OTP',
                        Submit: 'Submit',
                        Cancel: 'Cancel',
                        'Verify failed': 'Verify failed',
                        'Verify success': 'Verify success',
                        'Can not send OTP': 'Can not send OTP',
                        'Send OTP successfully': 'Send OTP successfully',
                        'Forget password': 'Forget password',
                        'Enter phone': 'Enter phone',
                        'Phone non exist': 'Phone non exist',
                        Success: 'Success',
                        'Can not change password': 'Can not change password',
                        Change: 'Change',
                        'Re-password': 'Re-password',
                        'Password must contain letters, numbers, one capital letter, one special character and must be 10 characters or more':
                            'Password must contain letters, numbers, one capital letter, one special character and must be 10 characters or more',
                        'Password is no strong': 'Password is no strong',
                        'Password and Re-password do not match': 'Password and Re-password do not match',
                    },
                },
            },
        },
        lng: lng,
        fallbackLng: typeLng.EN,
        interpolation: {
            escapeValue: false,
        },
    });
};
