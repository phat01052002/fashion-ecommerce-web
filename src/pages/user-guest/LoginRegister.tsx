import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    checkIsEmail,
    filterInput,
    filterInputNumber,
    filterPassword,
    toastError,
    toastSuccess,
    toastWarning,
} from '../../untils/Logic';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GetApi, PostGuestApi } from '../../untils/Api';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { change_role, change_user } from '../../reducers/Actions';
import { passwordStrength } from 'check-password-strength';
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
import Slider from '@mui/material/Slider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import OtpInput from 'react-otp-input';
import Dialog from '@mui/material/Dialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { auth } from '../../firebase/Firebase';
function LoginRegister() {
    const [recaptchaVerifier, setRecapchaVerifier] = useState<RecaptchaVerifier | null>(null);
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
    const [openOtp, setOpenOtp] = useState<boolean>(true);
    //
    const nav = useNavigate();
    if (localStorage.getItem('token')) {
        nav('/');
    }
    const store = useStore();

    //Handle login
    const handleClickLogin = async (e: any) => {
        e.preventDefault();
        if (!checkIsEmail(email)) {
            return toastWarning('Không đúng định dạng email');
        }
        if (email && password) {
            const res = await PostGuestApi(`/auth/login`, { email: email, password: password });
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
            }
            if (res.data.message == 'Login success') {
                localStorage.setItem('token', res.data.accessToken);
                localStorage.setItem('refreshToken', res.data.refreshToken);
                const res_role = await GetApi(`/user/get-role`, res.data.accessToken);
                store.dispatch(change_role(res_role.data.role));
                const res_user = await GetApi('/user/get-user', res.data.accessToken);
                store.dispatch(change_user(res_user.data.user));
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
                        toastError(t('auth.Account have already exist'));
                        return null;
                    }
                    if (res.data.message == 'Account creation fail') {
                        setEmail('');
                        setPassword('');
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
                            {password ? (
                                <Slider
                                    sx={{
                                        color: strength >= 3 ? 'green' : 'gray',
                                        '& .MuiSlider-thumb': {
                                            backgroundColor: strength >= 3 ? 'green' : 'gray',
                                        },
                                        '& .MuiSlider-track': {
                                            backgroundColor: strength >= 3 ? 'green' : 'gray',
                                        },
                                    }}
                                    aria-label="Volume"
                                    value={strength * 25}
                                    disabled
                                />
                            ) : null}
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
                            <Button id="register-button" onClick={(e) => handleClickRegister(e)}>
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
