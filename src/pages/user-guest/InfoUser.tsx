import { Avatar, Dialog, Divider, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import { Button, Input } from '../../components/ComponentsLogin';
import Header from '../../components/user-guest/header/Header';
import { ReducerProps } from '../../reducers/ReducersProps';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FestivalIcon from '@mui/icons-material/Festival';
import SecurityIcon from '@mui/icons-material/Security';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { AlertSaveInfo } from '../../components/alert/Alert';
import { GetApi, PostApi, PostGuestApi } from '../../untils/Api';
import OtpInput from 'react-otp-input';

import {
    filterInput,
    filterInputNumber,
    filterPassword,
    filterSpecialInput,
    toastError,
    toastSuccess,
    toastWarning,
} from '../../untils/Logic';
import { change_is_loading, change_user } from '../../reducers/Actions';
import LeftNav from '../../components/user-guest/info-user/LeftNav';
import { HOST_BE } from '../../common/Common';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { Button as Btn } from '@mui/material';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CheckPasswordMeter from '../../components/user-guest/CheckPasswordMeter';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../../components/user-guest/footer/Footer';

interface InfoUserProps {}

const InfoUser: React.FC<InfoUserProps> = (props) => {
    const store = useStore();
    const { t } = useTranslation();
    const user = useSelector((state: ReducerProps) => state.user);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [sex, setSex] = useState<string>('');
    const [birthday, setBirthday] = useState<Dayjs | undefined>(undefined);
    const [phone, setPhone] = useState<string>('');
    const [rank, setRank] = useState<string>('');
    const [point, setPoint] = useState<number | undefined>(undefined);
    const [addressIdList, setAddressIdList] = useState([]);
    //
    const [passwordOld, setPasswordOld] = useState<string>('');
    const [passwordNew, setPasswordNew] = useState<string>('');
    const [rePasswordNew, setRePasswordNew] = useState<string>('');
    const [strength, setStrength] = useState(0);
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
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
    const [selectImage, setSelectImage] = useState<File | null>(null);

    const [image, setImage] = useState<string | undefined>(undefined);
    //birthday
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (newValue: any) => {
        setSelectedDate(newValue);
    };
    //
    const [isNotEdit, setIsNotEdit] = useState(true);
    //
    const [isShowChangePassword, setIsShowChangePassword] = useState(false);
    const [isShowChangePhone, setIsShowChangePhone] = useState(false);
    //
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    //
    const getData = () => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setBirthday(dayjs(user.birthDay));
        setSex(user ? 'male' : 'female');
        setImage(user.image);
    };
    const changeIsHidePassword = () => {
        setIsHidePassword((prev) => !prev);
    };
    const toggleShowChangePassword = () => {
        setIsShowChangePassword((prev) => !prev);
    };
    const toggleIsNotEdit = () => {
        setIsNotEdit((prev) => !prev);
    };
    const toggleIsShowPhone = () => {
        setIsShowChangePhone((prev) => !prev);
    };
    const openDialog = () => {
        setOpenOtp(true);
    };

    const handleCloseDialog = () => {
        setOpenOtp(false);
    };
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
    //
    const toggleSex = () => {
        if (!isNotEdit) {
            setSex((prev) => {
                if (prev == 'male') {
                    return 'female';
                } else {
                    return 'male';
                }
            });
        }
    };
    const handleChangePassword = async () => {
        const resChangePassword = await PostApi('/user/change-password', localStorage.getItem('token'), {
            passwordOld: passwordOld,
            email: user.email,
        });
        if (resChangePassword.data.message == 'Email sent successfully') {
            openDialog();
            setIsRunning(true);
        }
        if (resChangePassword.data.message == 'Incorrect password') {
            toastWarning(t('auth.IncorrectPassword'));
        }
    };
    const handleClickAddress = () => {};
    const handleUpdateImage = async () => {
        store.dispatch(change_is_loading(true));

        const data = new FormData();
        if (selectImage) {
            const imageBlob = await fetch(URL.createObjectURL(selectImage)).then((response) => response.blob());
            console.log(imageBlob);
            data.append('file', imageBlob);
        }

        try {
            const resUpdateImg = await axios.post(`${HOST_BE}/user/update-image`, data, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(resUpdateImg.status, resUpdateImg.data);
            if (resUpdateImg.status == 200) {
                toastSuccess(t('Success'));
                setSelectImage(null);
                setImage(resUpdateImg.data.user.image);
            } else {
                toastError(t('Fail'));
            }
            store.dispatch(change_is_loading(false));
        } catch (e) {
            store.dispatch(change_is_loading(false));
        }
    };
    const handleChangePhone = async () => {
        AlertSaveInfo(async () => {
            store.dispatch(change_is_loading(true));
            await PostApi('/user/update-user-info', localStorage.getItem('token'), {
                phone: phone,
            });
            setIsShowChangePhone(false);
            store.dispatch(change_is_loading(false));
        });
    };
    const handleSaveInfo = async () => {
        AlertSaveInfo(async () => {
            store.dispatch(change_is_loading(true));
            await PostApi('/user/update-user-info', localStorage.getItem('token'), {
                name: name,
                birthDay: birthday?.date() ? birthday?.toISOString() : null,
                sex: sex == 'Female' ? false : sex == 'male' ? true : null,
            });
            store.dispatch(change_is_loading(false));
        });
    };
    const handleVerifyOTP = async (otp: string, comfirm: any) => {
        try {
            const res = await PostGuestApi('/user/change-password-2fa', {
                code: otp,
                passwordNew: passwordNew,
            });
            if (res.data.message == 'Code expiry') {
                return toastWarning('OTP hết hạn');
            }
            if (res.data.message == 'Success') {
                store.dispatch(change_user(res.data.user));
                toastSuccess(t('auth.Success'));
                handleCloseDialog();
                setIsShowChangePassword(false);
                setIsHidePassword(true);
                setPasswordNew('');
                setPasswordOld('');
                setRePasswordNew('');
            }
        } catch {}
    };
    //time otp
    const handleResendOtp = async () => {
        try {
            const resResend = await PostGuestApi('/auth/require-otp', { email: user.email });
            if (resResend.data.message == 'More require') {
                toastWarning('More require');
            }
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
        handleResendOtp();
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
    useEffect(() => {
        console.log(user);
        getData();
    }, [user]);

    return (
        <>
            <Header />

            <div style={{ marginTop: 120 }} className="container">
                <div className="grid grid-cols-4 gap-4">
                    <div className="hidden lg:block col-span-1 bg-white box-shadow">
                        <LeftNav index={0} />
                    </div>
                    <div className="col-span-4 lg:col-span-3 mt-12 lg:mt-0">
                        <h1 className="text-2xl font-bold">{t('user.Profile')}</h1>
                        <div className="bg-white p-6 rounded-lg box-shadow mt-4 relative">
                            <div
                                className="absolute top-3 right-3 cursor-pointer hover:scale-110 rounded-full p-2 transition-transform transform"
                                onClick={toggleIsNotEdit}
                            >
                                {isNotEdit ? (
                                    <EditIcon />
                                ) : (
                                    <div onClick={handleSaveInfo}>
                                        <SaveIcon />
                                    </div>
                                )}
                            </div>
                            <h1 className="text-xl">{t('user.Info Profile')}</h1>
                            <div className="lg:grid lg:grid-cols-3 mt-3 gap-4 ">
                                <div className="border border-solid p-3 rounded-xl col-span-1 flex justify-center items-center">
                                    {/* {user.image ? (
                                        <Avatar sx={{ width: 70, height: 70 }} sizes="30" src={user.image}></Avatar>
                                    ) : (
                                        <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                    )} */}
                                    <div className="relative">
                                        {image ? (
                                            selectImage ? (
                                                <div>
                                                    <Avatar
                                                        src={URL.createObjectURL(selectImage)}
                                                        sx={{ width: 100, height: 100 }}
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar
                                                    src={image.startsWith('uploads') ? `${HOST_BE}/${image}` : image}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                            )
                                        ) : selectImage ? (
                                            <div>
                                                <Avatar
                                                    sx={{ width: 100, height: 100 }}
                                                    src={URL.createObjectURL(selectImage)}
                                                />
                                            </div>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="169"
                                                height="169"
                                                viewBox="0 0 169 169"
                                                fill="none"
                                            >
                                                <rect width="169" height="169" rx="84.5" fill="#EBF5FF" />
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M109.851 67.6C109.851 81.6004 98.5012 92.95 84.5008 92.95C70.5004 92.95 59.1508 81.6004 59.1508 67.6C59.1508 53.5996 70.5004 42.25 84.5008 42.25C98.5012 42.25 109.851 53.5996 109.851 67.6ZM101.401 67.6C101.401 76.9336 93.8344 84.5 84.5008 84.5C75.1672 84.5 67.6008 76.9336 67.6008 67.6C67.6008 58.2664 75.1672 50.7 84.5008 50.7C93.8344 50.7 101.401 58.2664 101.401 67.6Z"
                                                    fill="#3399FF"
                                                />
                                                <path
                                                    d="M84.5008 105.625C57.1465 105.625 33.84 121.8 24.9619 144.461C27.1247 146.609 29.403 148.64 31.7867 150.545C38.3977 129.74 59.1369 114.075 84.5008 114.075C109.865 114.075 130.604 129.74 137.215 150.546C139.599 148.64 141.877 146.609 144.04 144.461C135.162 121.8 111.855 105.625 84.5008 105.625Z"
                                                    fill="#3399FF"
                                                />
                                            </svg>
                                        )}

                                        <span
                                            className={`absolute bottom-0 left-16 bg-gray-white flex justify-center items-center rounded-full w-[20px] h-[20px] cursor-pointer ${
                                                selectImage ? 'hidden' : ''
                                            }`}
                                        >
                                            <Btn component="label">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                    <path
                                                        d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                                                        stroke="black"
                                                        stroke-width="3"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                                <VisuallyHiddenInput
                                                    type="file"
                                                    accept=".png, .jpg, .jpeg"
                                                    onChange={(e: any) => {
                                                        const file = e.target.files[0];
                                                        if (
                                                            file &&
                                                            (file.type === 'image/png' || file.type === 'image/jpeg')
                                                        ) {
                                                            setSelectImage(file);
                                                        } else {
                                                            toastWarning('');
                                                        }
                                                    }}
                                                />
                                            </Btn>
                                        </span>

                                        {selectImage ? (
                                            <div className=" flex justify-center items-center mt-6 mb-6">
                                                <div
                                                    className="right-14 absolute cursor-pointer hover:bg-gray-500 hover:opacity-70 p-3 rounded-lg"
                                                    onClick={() => {
                                                        setSelectImage(null);
                                                    }}
                                                >
                                                    <CancelPresentationIcon />
                                                </div>
                                                <div
                                                    className="left-14 absolute cursor-pointer hover:bg-gray-500 hover:opacity-70 p-3 rounded-lg"
                                                    onClick={handleUpdateImage}
                                                >
                                                    <SaveIcon />
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="grid grid-cols-3">
                                        <h1 className="p-2 font-bold flex items-center">{t('user.Name')}</h1>
                                        <Input
                                            className="col-span-2 sm:col-span-1"
                                            disabled={isNotEdit}
                                            value={name}
                                            onChange={(e) => filterSpecialInput(e.target.value, setName)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3">
                                        <h1 className="p-2 font-bold flex items-center">{t('Email')}</h1>
                                        <h1 className="p-2 font-bold flex  items-center overload-hidden"> {email}</h1>
                                    </div>
                                </div>
                            </div>
                            <span className="grid grid-cols-3 mt-6">
                                <h1 className="p-2 font-bold flex justify-start lg:justify-center items-center">
                                    {t('user.Sex')}
                                </h1>
                                <RadioGroup className="col-span-2 sm:col-span-1" row value={sex} onChange={toggleSex}>
                                    <FormControlLabel value="male" control={<Radio />} label={t('user.Male')} />
                                    <FormControlLabel value="female" control={<Radio />} label={t('user.Female')} />
                                </RadioGroup>
                            </span>
                            <span className="grid grid-cols-3 mt-6">
                                <h1 className="p-2 font-bold flex justify-start lg:justify-center items-center">
                                    {t('user.Birthday')}
                                </h1>
                                <div className="col-span-2 sm:col-span-1">
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
                                            <DatePicker
                                                disabled={isNotEdit}
                                                value={birthday}
                                                onChange={(newValue: any) => setBirthday(newValue)}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                            </span>
                            <div className="m-6 ml-12 mr-12">
                                <Divider />
                            </div>
                            <div className="grid grid-cols-3 flex justify-center items-center">
                                <div className="col-span-2 sm:col-span-1">
                                    <div className="flex items-center">
                                        <LocalPhoneIcon /> &nbsp; &nbsp;
                                        <div className="text-xl">{t('user.Phone')}</div>
                                    </div>
                                    {!isShowChangePhone ? (
                                        phone == null ? (
                                            <div className="ml-12 mt-3">----------</div>
                                        ) : (
                                            <div className=" ml-12 mt-3">{phone}</div>
                                        )
                                    ) : (
                                        <div className="pl-4 pr-4">
                                            <Input
                                                value={phone}
                                                onChange={(e) => filterInputNumber(e.target.value, setPhone)}
                                            />
                                        </div>
                                    )}
                                </div>
                                {!isShowChangePhone ? (
                                    <div className="">
                                        <Button onClick={toggleIsShowPhone}>{t('auth.Change')}</Button>
                                    </div>
                                ) : (
                                    <div className="">
                                        <Button onClick={handleChangePhone}>{t('auth.Change')}</Button>
                                        <Button className="mt-3" onClick={toggleIsShowPhone}>
                                            {t('auth.Back')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="m-6 ml-12 mr-12">
                                <Divider />
                            </div>
                            <div className="grid grid-cols-3 flex justify-center items-center">
                                <div className="col-span-2 sm:col-span-1">
                                    <div className="flex items-center">
                                        <FestivalIcon /> &nbsp; &nbsp;
                                        <div className="text-xl">{t('user.Address')}</div>
                                    </div>
                                    {addressIdList.length == 0 ? (
                                        <div className="ml-12 mt-3">----------</div>
                                    ) : (
                                        <div className="mt-3">{phone}</div>
                                    )}
                                </div>

                                <div>
                                    <Button onClick={handleClickAddress}>{t('auth.Change')}</Button>
                                </div>
                            </div>
                            <div className="m-6 ml-12 mr-12">
                                <Divider />
                            </div>
                            {localStorage.getItem('oauth2') == 'false' ? (
                                <div className="grid grid-cols-3 flex justify-center items-center">
                                    {!isShowChangePassword ? (
                                        <>
                                            <div className="col-span-2 sm:col-span-1">
                                                <div className="flex items-center">
                                                    <SecurityIcon /> &nbsp; &nbsp;
                                                    <div className="text-xl">{t('user.Secure')}</div>
                                                </div>
                                                <div className="mt-3">{t('auth.Password')} &nbsp; ***********</div>
                                            </div>
                                            <div>
                                                <Button onClick={toggleShowChangePassword}>{t('auth.Change')}</Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div>
                                                <div className="flex items-center">
                                                    <SecurityIcon /> &nbsp; &nbsp;
                                                    <div className="text-xl">{t('user.Secure')}</div>
                                                </div>
                                                <div className="mt-3">{t('auth.Password')}</div>
                                                <div>
                                                    <span className="w-full relative">
                                                        <Input
                                                            type={isHidePassword ? 'password' : 'text'}
                                                            placeholder={t('auth.Password')}
                                                            value={passwordOld}
                                                            onChange={(e) => setPasswordOld(e.target.value)}
                                                        />
                                                        <span
                                                            className="absolute top-0 right-2"
                                                            onClick={changeIsHidePassword}
                                                        >
                                                            {isHidePassword ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </span>
                                                    </span>
                                                    <span className="w-full relative">
                                                        <Input
                                                            type={isHidePassword ? 'password' : 'text'}
                                                            placeholder={t('auth.Password')}
                                                            value={passwordNew}
                                                            onChange={(e) => {
                                                                filterPassword(
                                                                    e.target.value,
                                                                    setPasswordNew,
                                                                    setStrength,
                                                                );
                                                            }}
                                                        />
                                                        <span
                                                            className="absolute top-0 right-2"
                                                            onClick={changeIsHidePassword}
                                                        >
                                                            {isHidePassword ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </span>
                                                    </span>
                                                    <div className="w-full h-5">
                                                        {passwordNew ? (
                                                            <CheckPasswordMeter password={passwordNew} />
                                                        ) : null}
                                                    </div>

                                                    <span className="w-full relative">
                                                        <Input
                                                            type={isHidePassword ? 'password' : 'text'}
                                                            placeholder={t('auth.Re-password')}
                                                            value={rePasswordNew}
                                                            onChange={(e) =>
                                                                filterInput(e.target.value, setRePasswordNew)
                                                            }
                                                        />
                                                        <span
                                                            className="absolute top-0 right-2"
                                                            onClick={changeIsHidePassword}
                                                        >
                                                            {isHidePassword ? (
                                                                <VisibilityIcon />
                                                            ) : (
                                                                <VisibilityOffIcon />
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="ml-10">
                                                <Button onClick={handleChangePassword}>{t('auth.Change')}</Button>
                                                <Button className="mt-3" onClick={toggleShowChangePassword}>
                                                    {t('auth.Back')}
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

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
        </>
    );
};
export default InfoUser;
