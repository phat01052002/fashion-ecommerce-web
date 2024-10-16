import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import { filterSpecialInput } from '../../../untils/Logic';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { async } from '@firebase/util';
import Hot from './Hot';
import Suggestion from './Suggestion';
import { GetGuestApi } from '../../../untils/Api';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { add_list_item_in_cart } from '../../../reducers/Actions';
import CartItem from '../cart/CartItem';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
interface DrawerCartProps {
    open: boolean;
    toggleDrawer: any;
}
const DrawerCart: React.FC<DrawerCartProps> = (props) => {
    const { open, toggleDrawer } = props;
    const { t } = useTranslation();
    const listItemInCart = useSelector((state: ReducerProps) => state.listItemInCart);
    const store = useStore();
    const nav = useNavigate();
    //get data in cart
    const getDataInCart = async () => {
        const listCart = JSON.parse(localStorage.getItem('listCart') || '[]');
        listCart.map(async (item: any, index: number) => {
            const resProductDetail = await GetGuestApi(`/api/product-detail/${item.productDetailId}`);
            if (resProductDetail.data.message == 'Success') {
                store.dispatch(add_list_item_in_cart(resProductDetail.data.productDetail));
            }
        });
    };

    useEffect(() => {
        if (localStorage.getItem('listCart')) getDataInCart();
    }, []);
    console.log(listItemInCart);
    const DrawerList = (
        <Box sx={{ width: '100%', minWidth: 400 }} role="presentation">
            <div className="mt-3 ml-3 mb-3 flex justify-start items-center ">
                <KeyboardBackspaceIcon className="cursor-pointer" onClick={toggleDrawer(false)} />{' '}
                <span className="cursor-pointer pl-3" onClick={toggleDrawer(false)}>
                    {t('homepage.Exit')}
                </span>
            </div>
            <Divider />
            <div className="mt-6 mb-6 ml-12 mr-12 relative">
                <AnimatePresence>
                    {listItemInCart.length > 0
                        ? listItemInCart.map((productDetail: any, index: number) => (
                              <motion.li
                                  style={{ listStyleType: 'none' }}
                                  key={index}
                                  initial={{ opacity: 1, height: 'auto' }}
                                  exit={{
                                      opacity: 0,
                                      height: 0,
                                      transition: { duration: 0.2 },
                                  }}
                                  transition={{ duration: 0.2 }}
                              >
                                  <CartItem key={productDetail.id} productDetail={productDetail} />
                              </motion.li>
                          ))
                        : null}
                </AnimatePresence>
            </div>
        </Box>
    );
    return (
        <div>
            <Drawer className="" anchor="right" open={open} onClose={toggleDrawer(false)}>
                <div style={{ maxWidth: 650 }}> {DrawerList}</div>
            </Drawer>
        </div>
    );
};
export default DrawerCart;
