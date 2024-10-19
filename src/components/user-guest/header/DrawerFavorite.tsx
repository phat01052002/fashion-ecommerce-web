import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { GetGuestApi } from '../../../untils/Api';
import FavoriteItem from '../favorite/FavoriteItem';
import { motion, AnimatePresence } from 'framer-motion';

interface DrawerFavoriteProps {
    open: boolean;
    toggleDrawer: any;
}

const DrawerFavorite: React.FC<DrawerFavoriteProps> = (props) => {
    const { open, toggleDrawer } = props;
    const { t } = useTranslation();
    const user = useSelector((state: ReducerProps) => state.user);
    const [listFavorite, setListFavorite] = useState<any>([]);
    const getListFavorite = async () => {
        setListFavorite([]);
        user.productFavoriteIdList.map(async (productId: any, index: any) => {
            const productFavorite = await GetGuestApi(`/api/product/${productId}`);
            if (productFavorite.status == 200) {
                setListFavorite((prev: any) => [...prev, productFavorite.data.product]);
            }
        });
    };
    useEffect(() => {
        if (user.id && listFavorite.length != user.productFavoriteIdList.length) {
            getListFavorite();
        }
    }, [user]);
    const DrawerList = (
        <Box sx={{ width: '100%', minWidth: 400, maxWidth: 550 }} role="presentation">
            <AnimatePresence>
                {listFavorite.length > 0 ? (
                    <div className="p-3">
                        {listFavorite.map((product: any, index: number) => (
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
                                <FavoriteItem key={product.id} product={product} />
                            </motion.li>
                        ))}
                    </div>
                ) : null}
            </AnimatePresence>
        </Box>
    );
    return (
        <div>
            <Drawer className="relative" anchor="right" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    );
};
export default DrawerFavorite;
