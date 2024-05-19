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
