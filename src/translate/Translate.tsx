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
                        'Hello, Friend': 'Chào bạn',
                        'Enter your personal details and start journey with us':
                            'Nhập thông tin cá nhân của bạn và bắt đầu hành trình cùng chúng tôi',
                        'Welcome Back': 'Chào mừng trở lại',
                        'Account is inActive': 'Tài khoản không hoạt động',
                        'To login please enter your personal information':
                            'Để đăng nhập vui lòng nhập thông tin cá nhân của bạn',
                        'Account have already exist': 'Tài khoản đã tồn tại',
                    },
                    homepage: {
                        'Free returns within 30 days': 'Đổi trả miễn phí trong vòng 30 ngày',
                        Exit: 'Thoát',
                        'Hot key': 'Từ khoá hot',
                        'Product suggestions': 'Gợi ý sản phẩm',
                        'New Product': 'Sản Phẩm Mới',
                        Sale: 'Giảm Giá',
                        Category: 'Danh Mục',
                        'Men Fashion': 'Thời Trang Nam',
                        'Women Fashion': 'Thời Trang Nữ',
                    },
                    user: {
                        Profile: 'Thông Tin',
                        Orders: 'Đơn Hàng',
                        Logout: 'Đăng Xuất',
                        Setting: 'Cài Đặt',
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
                        'Hello, Friend': 'Hello, Friend',
                        'Enter your personal details and start journey with us':
                            'Enter your personal details and start journey with us',
                        'Account is inActive': 'Account is inActive',
                        'Welcome Back': 'Welcome Back',
                        'To login please enter your personal information':
                            'To login please enter your personal information',
                        'Account have already exist': 'Account have already exist',
                    },
                    homepage: {
                        'Free returns within 30 days': 'Free returns within 30 days',
                        Exit: 'Exit',
                        'Hot key': 'Hot key',
                        'Product suggestions': 'Product suggestions',
                        'New Product': 'New Product',
                        Sale: 'Sale',
                        Category: 'Category',
                        'Men Fashion': 'Men Fashion',
                        'Women Fashion': 'Women Fashion',
                    },
                    user: {
                        Profile: 'Profile',
                        Orders: 'Orders',
                        Logout: 'Logout',
                        Setting: 'Setting',
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
