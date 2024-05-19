import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { typeLng, typeRole } from '../common/Common';
import Login from '../pages/user-guest/Login';
import Register from '../pages/user-guest/Register';
import { ReducerProps } from '../reducers/ReducersProps';
import { initI18n } from '../translate/Translate';
interface MainRoutersProps {}
const MainRouters: React.FC<MainRoutersProps> = (props) => {
    const store = useStore();
    const role = useSelector((state: ReducerProps) => state.role);
    //return router suitable for role
    if (role == typeRole.USER || role == typeRole.GUEST) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return <></>;
    }
};
export default MainRouters;
