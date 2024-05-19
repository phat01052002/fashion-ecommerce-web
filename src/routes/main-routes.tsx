import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { typeRole } from '../common/Common';
import Login from '../pages/user-guest/login';
import { ReducerProps } from '../reducers/ReducersProps';
export default function MainRouters() {
    const store = useStore();
    const role = useSelector((state: ReducerProps) => state.role);
    //return router suitable for role
    if (role == typeRole.GUEST) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        );
    } else {
        return <></>;
    }
}
