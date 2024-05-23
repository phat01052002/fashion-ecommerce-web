import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { filterInput, filterInputNumber, toastWarning } from '../../untils/Logic';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetApi, PostGuestApi } from '../../untils/Api';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useStore } from 'react-redux';
interface LoginProps {}
const Login: React.FC<LoginProps> = (props) => {
    const { t } = useTranslation();
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errPhone, setErrPhone] = useState<boolean>(false);
    const [errPassword, setErrPassword] = useState<boolean>(false);
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    //
    const nav = useNavigate();
    const store = useStore();
    //
    const handleClickRegister = () => {
        nav('/register');
    };
    const handleClickLogin = async () => {
        if (phone && password) {
            const res = await PostGuestApi('/guest/authenticate/login', { username: phone, password: password });
            if (res.data.message == 'Fail to login') {
                toastWarning(t('auth.Account is incorrect'));
                return null;
            }
            if (res.data.message == 'Login success') {
                localStorage.setItem('token', res.data.accessToken);
                const res_role = await GetApi('/guest/authenticate/get-role', res.data.accessToken);
                nav('/');
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
            if (phone == '') {
                setErrPhone(true);
            }
            if (password == '') {
                setErrPassword(true);
            }
        }
    };

    const hidePassword = () => {
        setIsHidePassword((prev) => !prev);
    };

    return (
        <div className="mt-3 flex justify-center align-center">
            <div className="text-center" style={{ width: 400 }}>
                <h1>{t('auth.Login')}</h1>
                <div className="mt-6">
                    <TextField
                        label={t('auth.Phone')}
                        variant="outlined"
                        placeholder={t('auth.Phone')}
                        value={phone}
                        onChange={(e) => {
                            setErrPhone(false);
                            filterInputNumber(e.target.value, setPhone);
                        }}
                        fullWidth
                        error={errPhone}
                    />
                </div>
                <div className="mt-3 relative">
                    <TextField
                        label={t('auth.Password')}
                        variant="outlined"
                        placeholder={t('auth.Password')}
                        value={password}
                        onChange={(e) => {
                            setErrPassword(false);
                            filterInput(e.target.value, setPassword);
                        }}
                        fullWidth
                        error={errPassword}
                        type={isHidePassword ? 'password' : 'text'}
                    />
                    {isHidePassword ? (
                        <span className="absolute top-3 right-1" onClick={hidePassword}>
                            <RemoveRedEyeIcon />
                        </span>
                    ) : (
                        <span className="absolute top-3 right-1" onClick={hidePassword}>
                            <VisibilityOffIcon />
                        </span>
                    )}
                </div>
                <div className="mt-6">
                    <Button variant="contained" fullWidth onClick={handleClickLogin}>
                        {t('auth.Login')}
                    </Button>
                </div>
                <div className='mt-6 italic underline'>
                    <a href="/forget-password">{t('auth.Forget password')}</a>
                </div>
                <div className="mt-6">
                    <Button variant="contained" fullWidth onClick={handleClickRegister}>
                        {t('auth.Register')}
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Login;
