import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'react-redux';
import Header from '../../components/user-guest/header/Header';
import { incrementNumberCart } from '../../reducers/Actions';
import Footer from '../../components/user-guest/footer/Footer';
interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <Header />
        </>
    );
};
export default HomePage;
