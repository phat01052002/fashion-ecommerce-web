import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useSelector } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { AlertAddShop } from '../../alert/Alert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
interface LeftNavProps {
    index: number;
}

const LeftNav: React.FC<LeftNavProps> = (props) => {
    const { t } = useTranslation();
    const { index } = props;
    const nav = useNavigate();
    const user = useSelector((state: ReducerProps) => state.user);
    const handleClickShop = () => {
        if (user.shopId == null) {
            AlertAddShop(() => {});
        }
    };
    return (
        <div className="p-6 rounded-lg mt-4">
            <div
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center ${
                    index == 0
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
                onClick={() => nav('/info-user')}
            >
                <PersonIcon /> &nbsp;<div>{t('user.Profile')}</div>
            </div>
            <div
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center mt-6 ${
                    index == 1
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
                onClick={() => nav('/address')}
            >
                <LocationOnIcon /> &nbsp;<div>{t('user.AllAddress')}</div>
            </div>
            <div
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center mt-6 ${
                    index == 2
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
            >
                <NotificationsActiveIcon /> &nbsp;<div>{t('user.Notification')}</div>
            </div>
            <div
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center mt-6 ${
                    index == 3
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
            >
                <InventoryIcon /> &nbsp;<div>{t('user.Orders')}</div>
            </div>
            <div
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center mt-6 ${
                    index == 4
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
            >
                <SettingsIcon /> &nbsp;<div>{t('user.Setting')}</div>
            </div>
            <div
                onClick={handleClickShop}
                 className={`transition-transform duration-500 ease-linear transform hover:translate-x-4 rounded p-4 cursor-pointer flex items-center mt-6 ${
                    index == 5
                        ? 'bg-blue-200 font-bold opacity-70 hover:opacity-50'
                        : 'hover:bg-blue-200 hover:opacity-70'
                }`}
            >
                <AddBusinessIcon /> &nbsp;<div>{t('user.Shop')}</div>
            </div>
        </div>
    );
};
export default LeftNav;
