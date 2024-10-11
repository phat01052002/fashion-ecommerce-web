import React, { useCallback, useEffect, useRef, useState } from 'react';
import { checkIsEmail, filterInput, filterPassword, toastError, toastSuccess, toastWarning } from '../../untils/Logic';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetApi, PostGuestApi } from '../../untils/Api';
import { change_is_loading, change_role, change_user } from '../../reducers/Actions';
import { passwordStrength } from 'check-password-strength';
import { useStore } from 'react-redux';
import GoogleIcon from '@mui/icons-material/Google';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import OtpInput from 'react-otp-input';
import Dialog from '@mui/material/Dialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import CheckPasswordMeter from '../../components/user-guest/CheckPasswordMeter';
function LoginRegister() {
    const [logIn, toggle] = React.useState(true);
    const { t } = useTranslation();
    const [email, setEmail] = useState<string>('');
    const [errPhone, setErrPhone] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [errPassword, setErrPassword] = useState<boolean>(false);
    const [errRePassword, setErrRePassword] = useState<boolean>(false);
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    //
    const [strength, setStrength] = useState(0);
    //time
    const [time, setTime] = useState(300);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<any>(null);
    //
    const [comfirm, setComfirm] = useState<any>([]);
    const [otp, setOtp] = useState<string>('');
    //
    const [openOtp, setOpenOtp] = useState<boolean>(false);
    //
    const nav = useNavigate();
    if (localStorage.getItem('token')) {
        nav('/');
    }
    const store = useStore();
    //

    //Handle login
    const handleClickLogin = async (e: any) => {
        e.preventDefault();
        if (!checkIsEmail(email)) {
            return toastWarning('Không đúng định dạng email');
        }
        if (email && password) {
            store.dispatch(change_is_loading(true));
            const res = await PostGuestApi(`/auth/login`, { email: email, password: password });
            store.dispatch(change_is_loading(false));

            if (res.data.message == 'Phone or password is incorrect') {
                toastWarning(t('auth.Account is incorrect'));
                return null;
            }
            if (res.data.message == 'Account is inActive') {
                localStorage.setItem('email', email);
                toastWarning(t('auth.Account is inActive'));
                setIsRunning(true);
                handleResendOtpRegister();
                openDialog();
                store.dispatch(change_is_loading(false));
            }
            if (res.data.message == 'Login success') {
                store.dispatch(change_is_loading(true));
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                const res_role = await GetApi(`/user/get-role`, res.data.accessToken);
                store.dispatch(change_role(res_role.data.role));
                const res_user = await GetApi('/user/get-user', res.data.accessToken);
                store.dispatch(change_user(res_user.data.user));
                store.dispatch(change_is_loading(false));

                nav('/');
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
            if (email == '') {
                setErrPhone(true);
            }
            if (password == '') {
                setErrPassword(true);
            }
        }
    };
    const handleVerifyOTP = async (otp: string, comfirm: any) => {
        try {
            const res = await PostGuestApi('/auth/register-2fa', { code: otp, email: localStorage.getItem('email') });
            if (res.data.message == 'Code expery') {
                return toastWarning('OTP hết hạn');
            }
            if (res.data.message == 'Success') {
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                localStorage.removeItem('email');
                //
                const res_role = await GetApi(`/user/get-role`, res.data.accessToken);
                store.dispatch(change_role(res_role.data.role));
                const res_user = await GetApi('/user/get-user', res.data.accessToken);
                store.dispatch(change_user(res_user.data.user));
                nav('/');
            }
        } catch {}
    };

    const handleClickRegister = async (e: any) => {
        e.preventDefault();
        if (!checkIsEmail(email)) {
            return toastWarning('Không đúng định dạng email');
        }
        if (email && password && rePassword) {
            if (rePassword === password) {
                if (passwordStrength(password).id === 3) {
                    const res = await PostGuestApi('/auth/register', { email: email, password: password });
                    if (res.data.message == 'Account have already exist') {
                        setEmail('');
                        setPassword('');
                        setRePassword('');
                        toastError(t('auth.Account have already exist'));
                        return null;
                    }
                    if (res.data.message == 'Account creation fail') {
                        setEmail('');
                        setPassword('');
                        setRePassword('');
                        return null;
                    }
                    if (res.data.message == 'Email sent successfully') {
                        localStorage.setItem('email', email);
                        setEmail('');
                        setPassword('');
                        setIsRunning(true);
                        openDialog();
                    }
                } else {
                    toastWarning(t('auth.Password is no strong'));
                }
            } else {
                toastError(t('auth.Password and Re-password do not match'));
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
            if (email == '') {
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
    const openDialog = () => {
        setOpenOtp(true);
    };

    const handleCloseDialog = () => {
        setOpenOtp(false);
    };
    //
    const changeIsHidePassword = () => {
        setIsHidePassword((prev) => !prev);
    };
    //
    const handleOtpChange = (otpValue: string) => {
        const otpNumber = parseInt(otpValue, 10);
        setOtp(otpValue);
    };
    const handlePaste: React.ClipboardEventHandler = (event) => {
        const data = event.clipboardData.getData('text');
        if (!isNaN(parseInt(data, 10))) {
            setOtp(data);
        }
    };
    //time otp
    const handleResendOtpRegister = async () => {
        try {
            const resResend = await PostGuestApi('/auth/require-otp', { email: localStorage.getItem('email') });
        } catch (e) {}
    };
    const handleStart = () => {
        intervalRef.current = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime == 1) {
                    setIsRunning(false);
                }
                return prevTime - 1;
            });
        }, 1000);
    };
    const handleReset = () => {
        setTime(300);
        setIsRunning(true);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        handleResendOtpRegister();
    };

    const handleClickSignWithGoogle = (e: any) => {
        e.preventDefault();

        if (process.env.REACT_APP_ID_CLIENT_GG) {
            const url_gg = new URL(
                `https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=http://localhost:3000/login-register&response_type=code&client_id=${process.env.REACT_APP_ID_CLIENT_GG}&approval_prompt=force`,
            );
            window.location.href = url_gg.toString();
        }
    };
    const getGmail = useCallback(async () => {
        const query = new URLSearchParams(window.location.search);
        const gmailCode = query.get('code');
        if (gmailCode != null) {
            try {
                let data = JSON.stringify({
                    client_id: process.env.REACT_APP_ID_CLIENT_GG,
                    client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
                    redirect_uri: 'http://localhost:3000/login-register',
                    code: gmailCode,
                    grant_type: 'authorization_code',
                });

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'https://accounts.google.com/o/oauth2/token',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: data,
                };

                const response = await axios.request(config);
                //save access token to sessionStorage
                sessionStorage.setItem('gmailAccesstoken', JSON.stringify(response.data.access_token));
                if (sessionStorage.getItem('gmailAccesstoken')) {
                    let config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${sessionStorage.getItem(
                            'gmailAccesstoken',
                        )}`,
                        headers: {},
                    };
                    const response = await axios.request(config);
                    //save gmail to sessionStorage
                    const loginGmail = await PostGuestApi('/auth/login-gmail', {
                        email: response.data.email,
                        password: response.data.id,
                    });
                    if (loginGmail.data.message == 'Login success') {
                        sessionStorage.removeItem('gmailAccesstoken');
                        localStorage.setItem('token', loginGmail.data.accessToken);
                        localStorage.setItem('refreshToken', loginGmail.data.refreshToken);
                        const res_role = await GetApi(`/user/get-role`, loginGmail.data.accessToken);
                        store.dispatch(change_role(res_role.data.role));
                        const res_user = await GetApi('/user/get-user', loginGmail.data.accessToken);
                        store.dispatch(change_user(res_user.data.user));
                        nav('/');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    }, []);
    useEffect(() => {
        if (isRunning) {
            handleStart();
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);
    useEffect(() => {
        getGmail();
    }, []);
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
                            <span className="w-full">
                                <Input
                                    type={'text'}
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </span>
                            <span className="w-full relative">
                                <Input
                                    type={isHidePassword ? 'password' : 'text'}
                                    placeholder={t('auth.Password')}
                                    value={password}
                                    onChange={(e) => {
                                        filterPassword(e.target.value, setPassword, setStrength);
                                    }}
                                />
                                <span className="absolute top-4 right-2" onClick={changeIsHidePassword}>
                                    {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </span>
                            <div className="w-full h-5">
                                {' '}
                                {password ? <CheckPasswordMeter password={password} /> : null}
                            </div>

                            <span className="w-full relative">
                                <Input
                                    type={isHidePassword ? 'password' : 'text'}
                                    placeholder={t('auth.Re-password')}
                                    value={rePassword}
                                    onChange={(e) => filterInput(e.target.value, setRePassword)}
                                />
                                <span className="absolute top-4 right-2" onClick={changeIsHidePassword}>
                                    {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </span>
                            <Button
                                className="w-full mt-3"
                                id="register-button"
                                onClick={(e) => handleClickRegister(e)}
                            >
                                {t('auth.Register')}
                            </Button>
                        </Form>
                    </RegisterContainer>

                    {/*------------------------------- LOGIN-------------------------------------- */}

                    <LogInContainer logIn={logIn}>
                        <Form>
                            <Title>{t('auth.Login')}</Title>
                            <span className="w-full">
                                <span className="w-full">
                                    <Input
                                        type={'text'}
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </span>
                            </span>
                            <span className="w-full relative">
                                <Input
                                    type={isHidePassword ? 'password' : 'text'}
                                    placeholder={t('auth.Password')}
                                    value={password}
                                    onChange={(e) => {
                                        filterPassword(e.target.value, setPassword, setStrength);
                                    }}
                                />
                                <span className="absolute top-4 right-2" onClick={changeIsHidePassword}>
                                    {isHidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </span>
                            </span>
                            <Anchor className="italic" href="forget-password">
                                {t('auth.Forget password')}
                            </Anchor>
                            <Button className="w-full" onClick={(e) => handleClickLogin(e)}>
                                {t('auth.Login')}
                            </Button>
                            <div className="mt-3 font-bold">---</div>

                            <Button className="mt-3 w-full" onClick={(e) => handleClickSignWithGoogle(e)}>
                                <GoogleIcon />
                            </Button>
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

            <Dialog onClose={() => {}} open={openOtp}>
                <Button className="mt-2 ml-2 w-2 mb-10 flex items-center justify-center" onClick={handleCloseDialog}>
                    <ArrowBackIcon />
                </Button>
                <h1 className="text-center text-2xl font-bold">OTP</h1>
                <OtpInput
                    containerStyle={{ padding: 20 }}
                    inputStyle={{
                        backgroundColor: '#CAF5FF',
                        borderRadius: 4,
                        width: 50,
                        height: 50,
                        marginBottom: 10,
                        color: 'black',
                        outline: 'none',
                        margin: 5,
                    }}
                    value={otp}
                    onChange={handleOtpChange}
                    onPaste={handlePaste}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                />
                <Button className="mt-10 ml-12 mr-12 mb-10" onClick={() => handleVerifyOTP(otp, comfirm)}>
                    {t('Submit')}
                </Button>
                <div className="text-[16px] font-[700] flex justify-center items-center mt-12 mb-3">
                    <Button disabled={time > 0 ? true : false} onClick={handleReset}>
                        {time > 0 ? `${time} s` : 'Reset'}
                    </Button>
                </div>
            </Dialog>
        </div>
    );
}

export default LoginRegister;
