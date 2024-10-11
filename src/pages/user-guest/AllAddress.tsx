import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useStore } from 'react-redux';
import Header from '../../components/user-guest/header/Header';
import LeftNav from '../../components/user-guest/info-user/LeftNav';
import { ReducerProps } from '../../reducers/ReducersProps';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
interface AllAddressProps {}

const AllAddress: React.FC<AllAddressProps> = (props) => {
    const store = useStore();
    const isLoading = useSelector((state: ReducerProps) => state.isLoading);
    const { t } = useTranslation();
    const nav = useNavigate();
    const handleClickCreateAddress = () => {
        nav('/address/create');
    };
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 w-full z-50">
                <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
                <Header />
            </div>

            <div style={{ marginTop: 120 }} className="container z-10">
                <div className="grid grid-cols-4  gap-4 container h-16">
                    <div className="hidden lg:block col-span-1 bg-white box-shadow">
                        <LeftNav index={1} />
                    </div>
                    <div className="col-span-4 lg:col-span-3 mt-12 lg:mt-0">
                        <h1 className="text-2xl font-bold">{t('user.Address')}</h1>
                        <div className="bg-white p-6 rounded-lg box-shadow mt-4 relative">
                            <div>
                                <Button
                                    onClick={handleClickCreateAddress}
                                    style={{ height: 50 }}
                                    fullWidth
                                    variant="outlined"
                                >
                                    <AddIcon />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AllAddress;
