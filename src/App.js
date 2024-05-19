import './App.css';
import MainRouters from './routes/main-routes';
import { createStore } from 'redux';
import { useLayoutEffect } from 'react';
import myReducer from './reducers/Reducers';
import { Provider } from 'react-redux';
import { change_role } from './reducers/Actions';
import { typeRole } from './common/Common';
function App() {
    const store = createStore(myReducer);

    //get role if have token
    const getRole = async () => {
        store.dispatch(change_role(typeRole.GUEST));
    };
    useLayoutEffect(() => {
        getRole();
    }, []);
    return (
        <Provider store={store}>
            <MainRouters />
        </Provider>
    );
}

export default App;
