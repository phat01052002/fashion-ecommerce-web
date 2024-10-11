import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { typeRole } from '../common/Common';
import ForgetPassword from '../pages/user-guest/ForgetPassword';
import HomePage from '../pages/user-guest/Homepage';

import { ReducerProps } from '../reducers/ReducersProps';
import LoginRegister from '../pages/user-guest/LoginRegister';
import { Login } from '@mui/icons-material';
import InfoUser from '../pages/user-guest/InfoUser';
interface MainRoutersProps {}
const MainRouters: React.FC<MainRoutersProps> = (props) => {
    const store = useStore();
    const role = useSelector((state: ReducerProps) => state.role);
    //return router suitable for role
    if (role === typeRole.USER || role === typeRole.GUEST) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/login-register" element={<LoginRegister />}></Route>
                    <Route path="/forget-password" element={<ForgetPassword />}></Route>
                    <Route path="/info-user" element={<InfoUser />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return <></>;
    }
};
export default MainRouters;
