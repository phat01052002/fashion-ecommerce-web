import React, { useState,useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import Header from '../../components/user-guest/header/Header';
import LeftNav from '../../components/user-guest/info-user/LeftNav';
import { ReducerProps } from '../../reducers/ReducersProps';
import { Button, Input } from '../../components/ComponentsLogin';
import SaveIcon from '@mui/icons-material/Save';

interface AddressCreateProps {}

const AddressCreate: React.FC<AddressCreateProps> = (props) => {
    const store = useStore();
    const isLoading = useSelector((state: ReducerProps) => state.isLoading);
    const { t } = useTranslation();
    const [citys, setCitys] = useState([]);
    const getDataCity = () =>{
        
    }
    useEffect(()=>{
        getDataCity()
    },[])
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 w-full z-50">
                <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
                <Header />
            </div>

            <div style={{ marginTop: 120 }} className="container z-10">
                <div className="grid grid-cols-4  gap-4 container h-16">
                    <div className="hidden lg:block col-span-1 bg-white box-shadow">
                        <LeftNav index={10} />
                    </div>
                    <div className="col-span-4 lg:col-span-3 mt-12 lg:mt-0">
                        <h1 className="text-2xl font-bold">{t('user.CreateAddress')}</h1>
                        <div className="bg-white p-6 rounded-lg box-shadow mt-4 relative">
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.Name')} :</div>
                                <div>
                                    <Input placeholder={t('user.Name')} />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.Phone')} :</div>
                                <div>
                                    <Input placeholder={t('user.Phone')} />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.City')} :</div>
                                <div>
                                    <Input />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.District')} :</div>
                                <div>
                                    <Input />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.Ward')} :</div>
                                <div>
                                    <Input />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.ApartmentNumber')} :</div>
                                <div>
                                    <Input placeholder={t('user.ApartmentNumber')} />
                                </div>
                            </div>
                            <div className="mt-12 mr-12">
                                <Button className="flex items-center">
                                    <SaveIcon /> &nbsp; {t('user.Save')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddressCreate;
