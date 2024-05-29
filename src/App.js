import './App.css';
import MainRouters from './routes/MainRoutes';
import SelectTranslate from './components/SelectTranslate';
import { createStore } from 'redux';
import { useEffect } from 'react';
import myReducer from './reducers/Reducers';
import { Provider } from 'react-redux';
import { change_role } from './reducers/Actions';
import { typeLng } from './common/Common';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initI18n } from './translate/Translate';
import { GetApi } from './untils/Api';
function App() {
    const store = createStore(myReducer);
    initI18n(sessionStorage.getItem('lng') || typeLng.VN);
    //get role if have token
    const getRole = async () => {
        try {
            const res = await GetApi('/guest/authenticate/get-role', localStorage.getItem('token'));
            store.dispatch(change_role(res.data));
        } catch (e) {
            localStorage.removeItem('token');
        }
    };
    useEffect(() => {
        if (localStorage.getItem('token')) getRole();
    }, []);
    return (
        <Provider store={store}>
            <SelectTranslate />
            <MainRouters />
            <ToastContainer />
        </Provider>
    );
}

export default App;
