import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { set_number_cart } from '../../../reducers/Actions';
import DrawerMenu from './DrawerMenu';
import DrawerSearch from './DrawerSearch';
import { TextField } from '@mui/material';
import { filterSpecialInput } from '../../../untils/Logic';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { typeRole } from '../../../common/Common';
interface HeaderProps {}
const Header: React.FC<HeaderProps> = (props) => {
    const nav = useNavigate();
    const { t } = useTranslation();
    const Logo = require('../../../static/Name.png');
    const numberCart = useSelector((state: ReducerProps) => state.numberCart);
    const store = useStore();
    const [openMenu, setOpenMenu] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const role = useSelector((state: ReducerProps) => state.role);

    //
    const typingTimeoutRef = useRef<any>(null);
    if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
    }
    //
    const toggleDrawerMenu = (newOpen: boolean) => () => {
        setOpenMenu(newOpen);
    };

    const toggleDrawerSearch = (newOpen: boolean) => () => {
        setOpenSearch(newOpen);
    };

    const setNumberCart = () => {
        const numberString = localStorage.getItem('nCart');
        if (numberString) {
            try {
                const numberInt = parseInt(numberString);
                store.dispatch(set_number_cart(numberInt));
            } catch (e) {}
        }
    };

    useEffect(() => {
        setNumberCart();
    }, []);

    const getDataSearch = async () => {
        console.log('getApi');
    };
    useEffect(() => {
        typingTimeoutRef.current = setTimeout(() => {
            if (search) {
                getDataSearch();
            }
        }, 500);
    }, [search]);
    return (
        <div>
            {' '}
            <div className="box-shadow">
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 container ">
                    <div className="flex items-center justify-start lg:ml-0 ml-6">
                        <div
                            className="lg:hidden flex items-center justify-center mr-6 cursor-pointer"
                            onClick={toggleDrawerMenu(true)}
                        >
                            <MenuIcon color="primary" />
                        </div>
                        <img
                            className="cursor-pointer"
                            src={Logo}
                            style={{
                                height: '50px',
                                objectFit: 'cover',
                            }}
                            onClick={() => (window.location.href = '/')}
                        />
                    </div>

                    <div className="lg:flex hidden flex items-center justify-center col-span-4">
                        <span className="mr-3 ml-3 cursor-pointer font-bold">{t('homepage.Category')}</span>
                        <span className="mr-3 ml-3 cursor-pointer font-bold">{t('homepage.New Product')}</span>
                        <span className="mr-3 ml-3 cursor-pointer font-bold">{t('homepage.Men Fashion')}</span>
                        <span className="mr-3 ml-3 cursor-pointer font-bold">{t('homepage.Women Fashion')}</span>
                    </div>

                    <div className="flex items-center justify-end">
                        <span className="mr-3 ml-3 cursor-pointer scale">
                            <FavoriteIcon color="primary" />
                        </span>
                        <span className="mr-3 ml-3 cursor-pointer scale">
                            <Badge badgeContent={numberCart} color="error">
                                <LocalMallIcon color="primary" />
                            </Badge>
                        </span>
                        {role == typeRole.GUEST ? (
                            <span className="mr-3 ml-3 cursor-pointer scale" onClick={() => nav('/login')}>
                                <AccountCircleIcon color="primary" />
                            </span>
                        ) : null}

                        <span className="mr-3 ml-3 cursor-pointer scale lg:block hidden">
                            <SearchIcon color="primary" onClick={toggleDrawerSearch(true)} />
                        </span>
                    </div>
                </div>

                <DrawerMenu open={openMenu} toggleDrawer={toggleDrawerMenu} />
                <DrawerSearch open={openSearch} toggleDrawer={toggleDrawerSearch} />
            </div>
            <div className="mt-6 mb-6 ml-12 mr-12 relative lg:hidden block">
                <span className="absolute top-1 left-2">
                    <SearchIcon />
                </span>

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    value={search}
                    InputProps={{
                        style: { borderRadius: '100px', height: '37px' },
                    }}
                    inputProps={{
                        style: { paddingLeft: 40, paddingRight: 40 },
                    }}
                    onChange={(e) => {
                        filterSpecialInput(e.target.value, setSearch);
                    }}
                />
                {search ? (
                    <span className="absolute top-1 right-2 cursor-pointer">
                        <HighlightOffIcon onClick={() => setSearch('')} />
                    </span>
                ) : null}
            </div>
        </div>
    );
};
export default Header;
