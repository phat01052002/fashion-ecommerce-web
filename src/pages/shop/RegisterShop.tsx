import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import Header from '../../components/user-guest/header/Header';
import { Button, Input } from '../../components/ComponentsLogin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert } from '../../components/alert/Alert';
import { useNavigate } from 'react-router-dom';
import { PostApi } from '../../untils/Api';
import { useSelector } from 'react-redux';
import { ReducerProps } from '../../reducers/ReducersProps';
import { filterInput, toastError, toastSuccess, toastWarning } from '../../untils/Logic';
import { typeRole } from '../../common/Common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface RegisterShopProps {}
const RegisterShop: React.FC<RegisterShopProps> = (props) => {
    const { t } = useTranslation();
    const nav = useNavigate();
    const user = useSelector((state: ReducerProps) => state.user);
    //
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    //
    const handleRegisterShop = async () => {
        if (phone != '' && phone != '' && address != '') {
            const resRegisterShop = await PostApi('/user/register-shop', localStorage.getItem('token'), {
                phoneShop: phone,
                name: name,
                addressShop: address,
            });
            if (resRegisterShop.data.message == 'Shop name already exits') {
                toastWarning(t('shop.ShopNameAlreadyExits'));
            }
            if (resRegisterShop.data.message == 'Success Shop Create') {
                window.location.href = `/shop/${resRegisterShop.data.shopId}`;
            } else {
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
        }
    };
    //
    const handleBackAddress = () => {
        if (name != '' || phone != '' || address != '') {
            Alert(() => {
                nav('/user/info-user');
            }, t('user.InfoNotSave'));
        } else {
            nav('/user/info-user');
        }
    };
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 w-full z-50">
                <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
                <Header />
            </div>

            <div style={{ marginTop: 120 }} className="flex justify-center">
                {user.role == typeRole.USER ? (
                    <div
                        style={{
                            width: '70%',
                        }}
                        className="box-shadow p-6 rounded-lg"
                    >
                        <Button
                            style={{
                                width: 40,
                                height: 30,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onClick={handleBackAddress}
                        >
                            <ArrowBackIcon />
                        </Button>
                        <div className="font-bold mt-6 text-2xl">{t('user.InfoShop')}</div>
                        <div className="mt-3" style={{ width: '75%' }}>
                            <div className="ml-12 flex items-center  text-xl font-thin grid grid-cols-4">
                                <div className="col-span-1">
                                    <div className="text-sm">{t('shop.Name')} :</div>
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        style={{ width: '60%', marginLeft: '20px' }}
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder={t('shop.Name')}
                                    />
                                </div>
                            </div>
                            <div className="ml-12 flex items-center text-xl font-thin grid grid-cols-4">
                                <div className="col-span-1">
                                    <div className="text-sm">{t('shop.Address')} :</div>
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        style={{ width: '60%', marginLeft: '20px' }}
                                        value={address}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
                                        }}
                                        placeholder={t('shop.Address')}
                                    />
                                </div>
                            </div>
                            <div className="ml-12 flex items-center text-xl font-thin grid grid-cols-4">
                                <div className="col-span-1">
                                    <div className="text-sm">{t('shop.Phone')} :</div>
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        style={{ width: '60%', marginLeft: '20px' }}
                                        value={phone}
                                        onChange={(e) => {
                                            filterInput(e.target.value, setPhone);
                                        }}
                                        placeholder={t('shop.Phone')}
                                    />
                                </div>
                            </div>
                            <div className="ml-12 mt-12 flex items-center  text-xl font-thin">
                                <Button onClick={handleRegisterShop}>{t('auth.Submit')}</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Button onClick={()=>nav(`/shop/${user.shopId}`)}>
                        Shop &nbsp; <ArrowForwardIcon />
                    </Button>
                )}
            </div>
        </div>
    );
};
export default RegisterShop;
