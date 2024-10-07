import React, { useState } from 'react';
import { filterInput, filterInputNumber, toastError, toastSuccess, toastWarning } from '../../untils/Logic';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetApi, PostGuestApi } from '../../untils/Api';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { change_role, change_user } from '../../reducers/Actions';
import CheckPasswordMeter from '../../components/user-guest/CheckPasswordMeter';
import { passwordStrength } from 'check-password-strength';
import OTPInput from 'react-otp-input';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useStore } from 'react-redux';
import {
    Container,
    RegisterContainer,
    LogInContainer,
    OverlayContainer,
    Overlay,
    LeftOverlayPanel,
    RightOverlayPanel,
    GhostButton,
    Paragraph,
    Form,
    Anchor,
    Title,
    Input,
    Button,
} from '../../components/ComponentsLogin';
import { HOST_BE } from '../../common/Common';
import { color } from '@mui/system';

function LoginRegister() {
    const [logIn, toggle] = React.useState(true);
    const { t } = useTranslation();
    const [phone, setPhone] = useState<string>('');
    const [errPhone, setErrPhone] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [errPassword, setErrPassword] = useState<boolean>(false);
    const [errRePassword, setErrRePassword] = useState<boolean>(false);
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    //
    const [comfirm, setComfirm] = useState<any>([]);
    const [otp, setOtp] = useState<string>('');
    const [isVerify, setIsVerify] = useState<boolean>(false);
    //
    const [open, setOpen] = useState<boolean>(false);
    //
    const nav = useNavigate();
    const store = useStore();

    //Handle login
    const handleClickLogin = async (e: any) => {
        e.preventDefault();
        console.log('here');
        if (phone && password) {
            const res = await PostGuestApi(`/auth/login`, { phone: phone, password: password });
            if (res.data.message == 'Phone or password is incorrect') {
                toastWarning(t('auth.Account is incorrect'));
                return null;
            }
            if (res.data.message == 'Account is inActive') {
                toastWarning(t('auth.Account is inActive'));
                return null;
            }
            if (res.data.message == 'Login success') {
                localStorage.setItem('token', res.data.accessToken);
                const res_role = await GetApi(`/user/get-role`, res.data.accessToken);
                store.dispatch(change_role(res_role.data.role));
                const res_user = await GetApi('/user/get-user', res.data.accessToken);
                store.dispatch(change_user(res_user.data.user));
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
    //Sign up
    //
    const register = async () => {
        const res = await PostGuestApi('/auth//register', { phone: phone, password: password });
        if (res.data.message == 'Account have already exist') {
            setPhone('');
            setPassword('');
            toastError(t('auth.Account have already exist'));
            return null;
        }
        if (res.data.message == 'Account creation fail') {
            setPhone('');
            setPassword('');
            return null;
        }
        if (res.data.message == 'Account successfully created') {
            localStorage.setItem('token', res.data.accessToken);
            const res_role = await GetApi('/guest/authenticate/get-role', res.data.accessToken);
            store.dispatch(change_role(res_role.data));
            nav('/');
        }
    };
    const handleSendOTP = async (phone: string) => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
            const comfirmation = await signInWithPhoneNumber(auth, `+84${phone}`, recaptcha);
            setComfirm(comfirmation);
            toastSuccess(t('auth.Send OTP successfully'));
        } catch {
            toastError(t('auth.Can not send OTP'));
        }
    };

    const handleVerifyOTP = async (otp: string, comfirm: any) => {
        try {
            const data = await comfirm.confirm(otp); //if error => notify, else go to register
            if (data) {
                setIsVerify(true);
                toastSuccess(t('auth.Verify success'));
                handleCloseDialog();
                register();
            }
        } catch {
            toastError(t('auth.Verify failed'));
        }
    };

    const handleClickRegister = async (e: any) => {
        e.preventDefault();
        if (phone && password && rePassword) {
            if (rePassword === password) {
                if (passwordStrength(password).id === 3) {
                    await handleSendOTP(phone);
                    handleClickOpen();
                } else {
                    toastWarning(t('auth.Password is no strong'));
                }
            } else {
                toastError(t('auth.Password and Re-password do not match'));
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
            if (phone == '') {
                setErrPhone(true);
            }
            if (password == '') {
                setErrPassword(true);
            }
            if (rePassword == '') {
                setErrRePassword(true);
            }
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    //
    const hidePassword = () => {
        setIsHidePassword((prev) => !prev);
    };

    return (
        <div className="mt-3 flex justify-center align-center" style={{}}>
            <div
                className="mt-3 flex justify-center align-center"
                style={{ width: 900, background: '#f6f5f7', padding: '30px', borderRadius: '10px' }}
            >
                <Container>
                    <RegisterContainer logIn={logIn}>
                        <Form>
                            <Title>Create Account</Title>
                            <Input
                                type="phone"
                                placeholder={t('auth.Phone')}
                                onChange={(e) => filterInputNumber(e.target.value, setPhone)}
                            />
                            <Input
                                type="password"
                                placeholder={t('auth.Password')}
                                onChange={(e) => filterInput(e.target.value, setPassword)}
                            />
                            <Input type="re-password" placeholder={t('auth.Re-password')}  onChange={(e) => filterInput(e.target.value, setRePassword)}/>
                            <Button onClick={(e) => handleClickRegister(e)}>{t('auth.Register')}</Button>
                        </Form>
                    </RegisterContainer>

                    <LogInContainer logIn={logIn}>
                        <Form>
                            <Title>{t('auth.Login')}</Title>
                            <Input
                                type="phone"
                                placeholder={t('auth.Phone')}
                                onChange={(e) => filterInput(e.target.value, setPhone)}
                            />
                            <Input
                                type="password"
                                placeholder={t('auth.Password')}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Anchor href="#">{t('auth.Forget password')}</Anchor>
                            <Button onClick={(e) => handleClickLogin(e)}>{t('auth.Login')}</Button>
                        </Form>
                    </LogInContainer>

                    <OverlayContainer logIn={logIn}>
                        <Overlay logIn={logIn}>
                            <LeftOverlayPanel logIn={logIn}>
                                <Title>{t('Welcome Back')}!</Title>
                                <Paragraph>{t('To login please enter your personal information')}</Paragraph>
                                <GhostButton
                                    onClick={() => {
                                        toggle(true);
                                    }}
                                >
                                    {t('auth.Login')}
                                </GhostButton>
                            </LeftOverlayPanel>

                            <RightOverlayPanel logIn={logIn}>
                                <Title>{t('Hello, Friend')}!</Title>
                                <Paragraph>{t('Enter your personal details and start journey with us')}</Paragraph>
                                <GhostButton onClick={() => toggle(false)}>{t('auth.Register')}</GhostButton>
                            </RightOverlayPanel>
                        </Overlay>
                    </OverlayContainer>
                </Container>
            </div>
        </div>
    );
}

export default LoginRegister;
