import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import Header from '../../../components/user-guest/header/Header';
import LeftNav from '../../../components/user-guest/info-user/LeftNav';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { Button, Input } from '../../../components/ComponentsLogin';
import SaveIcon from '@mui/icons-material/Save';
import { GetGuestApi, PostApi } from '../../../untils/Api';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { add_item_address, change_is_loading } from '../../../reducers/Actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterInputNumber, toastSuccess, toastWarning } from '../../../untils/Logic';

interface CityProps {
    province_id: string;
    province_name: string;
    province_type: string;
}

interface DistrictProps {
    district_id: string;
    district_name: string;
    district_type: string;
}
interface WardProps {
    ward_id: string;
    ward_name: string;
    ward_type: string;
}

interface AddressCreateProps {}

const AddressCreate: React.FC<AddressCreateProps> = (props) => {
    const store = useStore();
    const isLoading = useSelector((state: ReducerProps) => state.isLoading);
    const { t } = useTranslation();
    const nav = useNavigate();
    //
    const [phone, setPhone] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [apartmentNumber, setApartmentNumber] = useState<string>('');

    const [city, setCity] = useState<any>(null);
    const [district, setDistrict] = useState<any>(null);
    const [ward, setWard] = useState<any>(null);
    //
    const [citys, setCitys] = useState<CityProps[]>([]);
    const [districts, setDistricts] = useState<DistrictProps[]>([]);
    const [wards, setWards] = useState<WardProps[]>([]);
    //
    const getDataCity = async () => {
        store.dispatch(change_is_loading(true));
        const resCitys = await GetGuestApi('/province');
        if (resCitys.status == 200) {
            setCitys(resCitys.data.results);
        }
        store.dispatch(change_is_loading(false));
    };
    const getDataDistrict = async () => {
        store.dispatch(change_is_loading(true));
        const resDistricts = await GetGuestApi(`/province/district/${city.province_id}`);
        if (resDistricts.status == 200) {
            setDistricts(resDistricts.data.results);
        }
        store.dispatch(change_is_loading(false));
    };
    const getDataWard = async () => {
        store.dispatch(change_is_loading(true));
        const resWards = await GetGuestApi(`/province/ward/${district.district_id}`);
        if (resWards.status == 200) {
            setWards(resWards.data.results);
        }
        store.dispatch(change_is_loading(false));
    };
    //
    const handleSelectCity = (e: any) => {
        setCity({
            province_id: e.target.value,
            province_name: citys.find((city) => city.province_id === e.target.value)?.province_name,
        });
        setDistricts([]);
        setWards([]);
    };
    const handleSelectDistrict = (e: any) => {
        setDistrict({
            district_id: e.target.value,
            district_name: districts.find((district) => district.district_id === e.target.value)?.district_name,
        });
        setWards([]);
    };
    const handleSelectWard = (e: any) => {
        setWard({
            ward_id: e.target.value,
            ward_name: wards.find((ward) => ward.ward_id === e.target.value)?.ward_name,
        });
    };
    //
    const handleSaveAddress = async () => {
        if (phone != '' && apartmentNumber != '' && name != '' && city && district && ward) {
            const resSaveAddress = await PostApi('/user/address/save', localStorage.getItem('token'), {
                phone: phone,
                name: name,
                apartment: apartmentNumber,
                city: city,
                district: district,
                ward: ward,
            });
            if (resSaveAddress.status == 200) {
                toastSuccess(t('auth.Success'));
                setPhone('');
                setApartmentNumber('');
                setName('');
                setCity(null);
                setDistrict(null);
                setWard(null);
                store.dispatch(add_item_address(resSaveAddress.data.Address));
                nav('/address');
            }
        } else {
            toastWarning(t('auth.Please enter complete information'));
        }
    };
    //
    useEffect(() => {
        getDataCity();
    }, []);
    useEffect(() => {
        if (city != null) {
            getDataDistrict();
        }
    }, [city]);
    useEffect(() => {
        if (district != null) {
            getDataWard();
        }
    }, [district]);

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
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t('user.Name')}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.Phone')} :</div>
                                <div>
                                    <Input
                                        value={phone}
                                        onChange={(e) => filterInputNumber(e.target.value, setPhone)}
                                        placeholder={t('user.Phone')}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.City')} :</div>
                                <div className="mt-2">
                                    <Select
                                        value={city ? city.province_id : ''}
                                        fullWidth
                                        input={<OutlinedInput />}
                                        onChange={(e) => handleSelectCity(e)}
                                    >
                                        {citys.length > 0
                                            ? citys.map((city) => (
                                                  <MenuItem key={city.province_id} value={city.province_id}>
                                                      {city.province_name}
                                                  </MenuItem>
                                              ))
                                            : null}
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.District')} :</div>
                                <div className="mt-2">
                                    <Select
                                        value={district ? district.district_id : ''}
                                        fullWidth
                                        input={<OutlinedInput />}
                                        onChange={(e) => handleSelectDistrict(e)}
                                    >
                                        {districts.length > 0
                                            ? districts.map((district) => (
                                                  <MenuItem key={district.district_id} value={district.district_id}>
                                                      {district.district_name}
                                                  </MenuItem>
                                              ))
                                            : null}
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.Ward')} :</div>
                                <div className="mt-2">
                                    <Select
                                        value={ward ? ward.ward_id : ''}
                                        fullWidth
                                        input={<OutlinedInput />}
                                        onChange={(e) => handleSelectWard(e)}
                                    >
                                        {wards.length > 0
                                            ? wards.map((ward) => (
                                                  <MenuItem key={ward.ward_id} value={ward.ward_id}>
                                                      {ward.ward_name}
                                                  </MenuItem>
                                              ))
                                            : null}
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 flex justify-center items-center">
                                <div className="font-bold">{t('user.ApartmentNumber')} :</div>
                                <div>
                                    <Input
                                        value={apartmentNumber}
                                        onChange={(e) => setApartmentNumber(e.target.value)}
                                        placeholder={t('user.ApartmentNumber')}
                                    />
                                </div>
                            </div>
                            <div className="mt-12 mr-12">
                                <Button onClick={handleSaveAddress} className="flex items-center">
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
