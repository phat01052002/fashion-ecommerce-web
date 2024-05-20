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
