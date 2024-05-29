import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import Header from '../../components/user-guest/header/Header';
import { incrementNumberCart } from '../../reducers/Actions';
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="text-center bg-black text-white">{t('homepage.Free returns within 30 days')}</div>
            <Header />
        </>
    );
};
export default HomePage;
