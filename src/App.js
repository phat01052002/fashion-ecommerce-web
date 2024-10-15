import './App.css';
import MainRouters from './routes/MainRoutes';
import LoadingProcess from './components/loading/LoadingProcess';
import SelectTranslate from './components/SelectTranslate';
import { applyMiddleware, createStore } from 'redux';
import { useEffect } from 'react';
import myReducer from './reducers/Reducers';
import { Provider, useSelector } from 'react-redux';
import { change_role, change_user, set_number_cart } from './reducers/Actions';
import { typeLng } from './common/Common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initI18n } from './translate/Translate';
import { GetApi } from './untils/Api';
import { thunk } from 'redux-thunk';
import { totalQuantityInCart } from './untils/Logic';

function App() {
    const store = createStore(myReducer, applyMiddleware(thunk));
    initI18n(sessionStorage.getItem('lng') || typeLng.VN);
    //get role if have token
    const getRoleAndUser = async () => {
        try {
            const res_role = await GetApi('/user/get-role', localStorage.getItem('token'));
            store.dispatch(change_role(res_role.data.role));
            const res_user = await GetApi('/user/get-user', localStorage.getItem('token'));
            store.dispatch(change_user(res_user.data.user));
            store.dispatch(set_number_cart(totalQuantityInCart()));
        } catch (e) {
            localStorage.removeItem('token');
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token')) getRoleAndUser();
    }, []);
    return (
        <Provider store={store}>
            <SelectTranslate />
            <MainRouters />
            <ToastContainer />
            <LoadingProcess />
        </Provider>
    );
}

export default App;
