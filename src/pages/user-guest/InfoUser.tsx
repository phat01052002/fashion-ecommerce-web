import { Avatar, Divider, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Input } from '../../components/ComponentsLogin';
import Header from '../../components/user-guest/header/Header';
import { ReducerProps } from '../../reducers/ReducersProps';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
import { PostApi } from '../../untils/Api';
import { filterInputNumber, filterSpecialInput } from '../../untils/Logic';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
interface InfoUserProps {}

const InfoUser: React.FC<InfoUserProps> = (props) => {
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
    const [isShowChangeAddress, setIsShowChangeAddress] = useState(false);
    //
    const getData = () => {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setBirthday(dayjs(user.birthDay));
        setSex(user ? 'male' : 'female');
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
    const toggleIsShowChangeAddress = () => {
        setIsShowChangeAddress((prev) => !prev);
    };
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
    const handleChangePhone = () => {
        AlertSaveInfo(() => {
            PostApi('/user/update-user-info', localStorage.getItem('token'), {
                phone: phone,
            });
        });
    };
    const handleSaveInfo = () => {
        AlertSaveInfo(() => {
            PostApi('/user/update-user-info', localStorage.getItem('token'), {
                name: name,
                birthDay: birthday?.date() ? birthday?.toISOString() : null,
                sex: sex == 'Female' ? false : sex == 'male' ? true : null,
            });
        });
    };
    useEffect(() => {
        console.log(user);
        getData();
    }, [user]);

    return (
        <div>
            <div className="fixed top-0 left-0 right-0 w-full z-50">
                <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
                <Header />
            </div>

            <div style={{ marginTop: 120 }} className="container z-10">
                <div className="grid grid-cols-4  gap-4 container h-16">
                    <div className="col-span-1 "></div>
                    <div className="col-span-3 ">
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
                            <div className="grid grid-cols-3 mt-3 gap-4 ">
                                <div className="col-span-1 flex justify-center items-center">
                                    {user.image ? (
                                        <Avatar sx={{ width: 70, height: 70 }} sizes="30" src={user.image}></Avatar>
                                    ) : (
                                        <Avatar sx={{ width: 70, height: 70 }}></Avatar>
                                    )}
                                </div>
                                <div className="col-span-2">
                                    <div className="grid grid-cols-2">
                                        <h1 className="p-2 font-bold flex justify-center items-center">
                                            {t('user.Name')}
                                        </h1>
                                        <Input
                                            disabled={isNotEdit}
                                            value={name}
                                            onChange={(e) => filterSpecialInput(e.target.value, setName)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <h1 className="p-2 font-bold flex justify-center items-center">{t('Email')}</h1>
                                        <h1 className="p-2 font-bold flex justify-center items-center"> {email}</h1>
                                    </div>
                                </div>
                            </div>
                            <span className="grid grid-cols-3 mt-6">
                                <h1 className="p-2 font-bold flex justify-center items-center">{t('user.Sex')}</h1>
                                <RadioGroup row value={sex} onChange={toggleSex}>
                                    <FormControlLabel value="male" control={<Radio />} label={t('user.Male')} />
                                    <FormControlLabel value="female" control={<Radio />} label={t('user.Female')} />
                                </RadioGroup>
                            </span>
                            <span className="grid grid-cols-3 mt-6">
                                <h1 className="p-2 font-bold flex justify-center items-center">{t('user.Birthday')}</h1>
                                <div className="">
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
                                <div>
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
                                        <div className='pl-4 pr-4'>
                                            <Input
                                                value={phone}
                                                onChange={(e) => filterInputNumber(e.target.value, setPhone)}
                                            />
                                        </div>
                                    )}
                                </div>
                                {!isShowChangePhone ? (
                                    <div>
                                        <Button onClick={toggleIsShowPhone}>{t('auth.Change')}</Button>
                                    </div>
                                ) : (
                                    <div>
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
                                <div>
                                    <div className="flex items-center">
                                        <FestivalIcon /> &nbsp; &nbsp;
                                        <div className="text-xl">{t('user.Address')}</div>
                                    </div>
                                    <div className="mt-3">{phone}</div>{' '}
                                </div>
                                {!isShowChangeAddress ? (
                                    <div>
                                        <Button onClick={toggleIsShowChangeAddress}>{t('auth.Change')}</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button>{t('auth.Change')}</Button>
                                        <Button className="mt-3" onClick={toggleIsShowChangeAddress}>
                                            {t('auth.Back')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="m-6 ml-12 mr-12">
                                <Divider />
                            </div>
                            <div className="grid grid-cols-3 flex justify-center items-center">
                                {!isShowChangePassword ? (
                                    <>
                                        <div>
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
                                                <Input placeholder='old'/>
                                                <Input placeholder='new'/>
                                                <Input placeholder='re-new'/>
                                            </div>
                                        </div>

                                        <div className="ml-10">
                                            <Button>{t('auth.Change')}</Button>
                                            <Button className="mt-3" onClick={toggleShowChangePassword}>
                                                {t('auth.Back')}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default InfoUser;
