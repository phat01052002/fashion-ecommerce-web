import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { typeRole } from '../common/Common';
import ForgetPassword from '../pages/user-guest/auth/ForgetPassword';
import HomePage from '../pages/user-guest/Homepage';

import { ReducerProps } from '../reducers/ReducersProps';
import LoginRegister from '../pages/user-guest/auth/LoginRegister';
import { Login } from '@mui/icons-material';
import InfoUser from '../pages/user-guest/InfoUser';
import AllAddress from '../pages/user-guest/address/AllAddress';
import AddressCreate from '../pages/user-guest/address/AddressCreate';
import AddressEdit from '../pages/user-guest/address/AddressEdit';
import RegisterShop from '../pages/shop/RegisterShop';
import ShopHome from '../pages/shop/ShopHome';

interface MainRoutersProps {}
const MainRouters: React.FC<MainRoutersProps> = (props) => {
    const store = useStore();
    const role = useSelector((state: ReducerProps) => state.role);

    //return router suitable for role
    if (role === typeRole.GUEST) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/login-register" element={<LoginRegister />}></Route>
                    <Route path="/forget-password" element={<ForgetPassword />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else if (role === typeRole.USER) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/user/info-user" element={<InfoUser />}></Route>
                    <Route path="/user/address" element={<AllAddress />}></Route>
                    <Route path="/user/address/create" element={<AddressCreate />}></Route>
                    <Route path="/user/address/edit/:addressId" element={<AddressEdit />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else if (role === typeRole.SHOP) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/user/info-user" element={<InfoUser />}></Route>
                    <Route path="/user/address" element={<AllAddress />}></Route>
                    <Route path="/user/address/create" element={<AddressCreate />}></Route>
                    <Route path="/user/address/edit/:addressId" element={<AddressEdit />}></Route>
                    <Route path="/user/register-shop" element={<RegisterShop />}></Route>
                    <Route path="/shop/:shopId" element={<ShopHome />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return <></>;
    }
};
export default MainRouters;