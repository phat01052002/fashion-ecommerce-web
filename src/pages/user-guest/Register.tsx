import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { filterInput, filterInputNumber, toastError, toastSuccess, toastWarning } from '../../untils/Logic';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/Firebase';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { GetApi, PostGuestApi } from '../../untils/Api';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import { change_role } from '../../reducers/Actions';
import CheckPasswordMeter from '../../components/user-guest/CheckPasswordMeter';
import { passwordStrength } from 'check-password-strength';
import OTPInput from 'react-otp-input';
interface RegisterProps {}
const Register: React.FC<RegisterProps> = (props) => {
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rePassword, setRePassword] = useState<string>('');
    const [errPhone, setErrPhone] = useState<boolean>(false);
    const [errPassword, setErrPassword] = useState<boolean>(false);
    const [errRePassword, setErrRePassword] = useState<boolean>(false);
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    const [samePassword, setSamePassword] = useState<boolean>(false);
    //
    const [comfirm, setComfirm] = useState<any>([]);
    const [otp, setOtp] = useState<string>('');
    const [isVerify, setIsVerify] = useState<boolean>(false);
    //
    const [open, setOpen] = useState<boolean>(false);
    //
    const { t } = useTranslation();
    const nav = useNavigate();
    const store = useStore();
    //
    const register = async () => {
        const res = await PostGuestApi('/guest/authenticate/register', { username: phone, password: password });
        if (res.data.message == 'Account already exists') {
            setPhone('');
            setPassword('');
            return null;
        }
        if (res.data.message == 'Fail to register') {
            setPhone('');
            setPassword('');
            return null;
        }
        if (res.data.message == 'Register Success') {
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

    const handleClickRegister = async () => {
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

    const hidePassword = () => {
        setIsHidePassword((prev) => !prev);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };
    return (
        <div className="mt-3 flex justify-center align-center">
            <div className="text-center" style={{ width: 400 }}>
                <h1>{t('auth.Register')}</h1>
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
                {password ? <CheckPasswordMeter password={password} /> : null}
                <div className="mt-3 relative">
                    <TextField
                        label={t('auth.Re-password')}
                        variant="outlined"
                        placeholder={t('auth.Re-password')}
                        value={rePassword}
                        onChange={(e) => {
                            setErrRePassword(false);
                            filterInput(e.target.value, setRePassword);
                        }}
                        fullWidth
                        error={errRePassword}
                        type={isHidePassword ? 'password' : 'text'}
                    />
                    {rePassword ? (
                        <span className="absolute top-3 right-1">
                            {password === rePassword ? (
                                <CheckIcon style={{ color: 'green' }} />
                            ) : (
                                <ClearIcon style={{ color: 'red' }} />
                            )}
                        </span>
                    ) : null}
                </div>
                <div className="mt-3 italic">
                    {t(
                        'auth.Password must contain letters, numbers, one capital letter, one special character and must be 10 characters or more',
                    )}
                </div>
                <div className="mt-6">
                    <Button variant="contained" fullWidth onClick={handleClickRegister}>
                        {t('auth.Register')}
                    </Button>
                </div>

                <div id="recaptcha" className="mt-6"></div>
            </div>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogContent>
                    <DialogContentText>{t('auth.Enter OTP')}</DialogContentText>
                    {/* <TextField
                        autoFocus
                        required
                        margin="dense"
                        label="OTP"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={otp}
                        onChange={(e) => filterInputNumber(e.target.value, setOtp)}
                    /> */}
                    <div className="mt-6">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>{t('auth.Cancel')}</Button>
                    <Button type="submit" onClick={() => handleVerifyOTP(otp, comfirm)}>
                        {t('auth.Submit')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default Register;
