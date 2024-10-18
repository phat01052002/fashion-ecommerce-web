import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/user-guest/header/Header';
import { GetApi, GetGuestApi, PostApi, PostGuestApi } from '../../untils/Api';
import { Button } from '../../components/ComponentsLogin';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import { checkIsFollow, formatNumber, toastWarning } from '../../untils/Logic';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from '../../reducers/ReducersProps';
import CheckIcon from '@mui/icons-material/Check';
import { typeRole } from '../../common/Common';
import { change_is_loading, change_user } from '../../reducers/Actions';
import { useTranslation } from 'react-i18next';
import MultiCaroselProduct from '../../components/user-guest/product/MultiCaroselProduct';
import Footer from '../../components/user-guest/footer/Footer';

interface ShopViewProps {}

const ShopView: React.FC<ShopViewProps> = (props) => {
    const { shopId } = useParams();
    const [shop, setShop] = useState<any>(undefined);
    const [isFollow, setIsFollow] = useState<boolean | undefined>(undefined);
    const [products, setProducts] = useState<any>([]);
    const [topProducts, setTopProducts] = useState<any>([]);
    const user = useSelector((state: ReducerProps) => state.user);
    const role = useSelector((state: ReducerProps) => state.role);
    const store = useStore();
    const { t } = useTranslation();
    const getData = async () => {
        store.dispatch(change_is_loading(true));

        if (shopId) {
            const resShop = await GetGuestApi(`/api/shop/${shopId}`);
            if (resShop.data.message == 'Success') {
                setShop(resShop.data.shop);
            }

            ///
            const resProducts = await GetGuestApi(`/api/product-by-shop/${shopId}`);
            if (resProducts.data.message == 'Success') {
                setProducts(resProducts.data.products);
            }
        }

        store.dispatch(change_is_loading(false));
    };
    const getDataTopProduct = async () => {
        const listProductsId = products.slice(0, 15).map((product: any) => product.productId);
        console.log(listProductsId);
        const resTopProducts = await PostGuestApi(`/api/top-product-by-shop/${shopId}`, { listProductsId });
        if (resTopProducts.data.message == 'Success') {
            setTopProducts(resTopProducts.data.topProducts);
        }
    };
    const handleFollowShop = async () => {
        store.dispatch(change_is_loading(true));
        if (role == typeRole.USER) {
            if (user.id != shop.userId) {
                const resFollow = await PostApi('/user/follow-shop', localStorage.getItem('token'), {
                    shopId: shop.id,
                });
                if (resFollow.data.message == 'Success') {
                    store.dispatch(change_user(resFollow.data.user));
                    setShop(resFollow.data.shop);
                }
            } else {
                toastWarning('Not allowed');
            }
        }
        store.dispatch(change_is_loading(false));
    };
    const handleUnFollowShop = async () => {
        store.dispatch(change_is_loading(true));

        if (role == typeRole.USER) {
            if (user.id != shop.userId) {
                const resFollow = await PostApi('/user/un-follow-shop', localStorage.getItem('token'), {
                    shopId: shop.id,
                });
                if (resFollow.data.message == 'Success') {
                    store.dispatch(change_user(resFollow.data.user));
                    setShop(resFollow.data.shop);
                }
            } else {
                toastWarning('Not allowed');
            }
        }
        store.dispatch(change_is_loading(false));
    };
    const getTotalSold = () => {
        const total = products.reduce((total: any, product: any) => {
            return total + product._sum.numberSold;
        }, 0);
        return formatNumber(total);
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        if (shop) {
            setIsFollow(checkIsFollow(shop, user.id));
        }
    }, [shop, user]);
    useEffect(() => {
        if (products.length > 0) {
            getDataTopProduct();
        }
    }, [products]);
    return (
        <div>
            <Header />
            {shop ? (
                <div
                    className="container"
                    style={{
                        marginTop: 120,
                    }}
                >
                    <div className="grid grid-cols-8 box-shadow rounded p-3">
                        <div className="col-span-8 lg:col-span-3 border border-gray-300 rounded bg-gray-200">
                            <div className="p-3 flex items-center ">
                                <img
                                    className="rounded"
                                    style={{
                                        height: 100,
                                        width: '30%',
                                        objectFit: 'cover',
                                    }}
                                    src={shop.image}
                                />
                                <div className="ml-6">
                                    <div className="font-bold">{shop.name}</div>
                                    <div className="grid grid-cols-2  mt-3">
                                        {isFollow ? (
                                            <Button
                                                onClick={handleUnFollowShop}
                                                className="font-bold text-sm flex items-center justify-center"
                                                style={{ backgroundColor: 'white', color: 'black', maxWidth: '80%' }}
                                            >
                                                <CheckIcon sx={{ width: 20, height: 20 }} /> UnFollow
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={handleFollowShop}
                                                className="font-bold text-sm flex items-center justify-center"
                                                style={{ backgroundColor: 'white', color: 'black', maxWidth: '80%' }}
                                            >
                                                <AddIcon sx={{ width: 20, height: 20 }} /> Follow
                                            </Button>
                                        )}
                                        <Button
                                            style={{ maxWidth: '80%' }}
                                            className="font-bold text-sm ml-3 flex items-center justify-center"
                                        >
                                            <ChatIcon sx={{ width: 20, height: 20 }} /> Chat
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-8 lg:col-span-5 p-3 ml-6">
                            {products.length > 0 ? (
                                <div className="flex items-center">
                                    <div className="font-bold">{t('product.Sold')} : &nbsp;</div>
                                    <div className="text-red-400">{getTotalSold()}</div>
                                </div>
                            ) : null}
                            {shop ? (
                                <div className="flex items-center mt-3">
                                    <div className="font-bold">{t('shop.Followed')} : &nbsp;</div>
                                    <div className="text-red-400">{shop.userFollowIdList.length}</div>
                                </div>
                            ) : null}
                            {products.length > 0 ? (
                                <div className="flex items-center mt-3">
                                    <div className="font-bold">{t('product.Product')} : &nbsp;</div>
                                    <div className="text-red-400">{products.length}</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div>
                        <div className="mt-6 border-b border-gray-300 flex">
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-blue-500"
                            >
                                {t('product.Describe')}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: shop ? shop.describeShop : null,
                            }}
                        ></div>
                    </div>
                    <div>
                        <div className="mt-6 border-b border-gray-300 flex">
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-blue-500"
                            >
                                {t('shop.TopProduct')}
                            </div>
                        </div>
                        <div className="mt-6">
                            {topProducts.length > 0 ? <MultiCaroselProduct listProduct={topProducts} /> : null}
                        </div>
                    </div>
                </div>
            ) : null}
            {topProducts.length > 0 ? <Footer /> : null}
        </div>
    );
};

export default ShopView;
