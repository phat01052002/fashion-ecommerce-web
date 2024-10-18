import React, { useEffect, useState } from 'react';
import { filterInputNumber, findProductDetailInStore, formatPrice, removeItemFromCart } from '../../../untils/Logic';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ComponentsLogin';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSelector, useStore } from 'react-redux';
import {
    decrease_more_number_cart,
    decrementNumberCart,
    incrementNumberCart,
    remove_item_from_cart,
    set_number_cart,
} from '../../../reducers/Actions';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { useTranslation } from 'react-i18next';
interface CartItemProps {
    productDetail: any;
}
const CartItem: React.FC<CartItemProps> = (props) => {
    const { productDetail } = props;
    const productDetailInStore = findProductDetailInStore(productDetail.id);
    const [quantity, setQuantity] = useState<number>(0);
    const numberCart = useSelector((state: ReducerProps) => state.numberCart);
    const nav = useNavigate();
    const store = useStore();
    const { t } = useTranslation();
    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            store.dispatch(decrementNumberCart());
            setQuantity((prev: any) => parseInt(prev) - 1);
            const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
            const productIndex = existingCart.findIndex((item: any) => item.productDetailId === productDetail.id);
            existingCart[productIndex].quantity -= 1;
            localStorage.setItem('listCart', JSON.stringify(existingCart));
        }
    };
    const handleDeleleInStore = () => {
        store.dispatch(decrease_more_number_cart(quantity));
        store.dispatch(remove_item_from_cart(productDetail.id));
        removeItemFromCart(productDetail.id);
    };
    const handleIncreaseQuantity = () => {
        if (quantity < productDetail.quantity) {
            store.dispatch(incrementNumberCart());
            setQuantity((prev: any) => parseInt(prev) + 1);
            const existingCart = JSON.parse(localStorage.getItem('listCart') || '[]');
            const productIndex = existingCart.findIndex((item: any) => item.productDetailId === productDetail.id);
            existingCart[productIndex].quantity += 1;
            localStorage.setItem('listCart', JSON.stringify(existingCart));
        }
    };
    const handleClickItem = () => {
        window.location.href = `/product/${productDetail.productId}`;
    };
    useEffect(() => {
        if (productDetailInStore) {
            setQuantity(productDetailInStore.quantity);
        }
    }, []);
    return (
        <div
            style={{
                width: '100%',
                height: 250,
            }}
            className="border border-gray-300 mb-3 rounded relative"
        >
            <div
                className="absolute top-0 right-0 hover:bg-red-400 cursor-pointer p-1 rounded"
                onClick={handleDeleleInStore}
            >
                <HighlightOffIcon />
            </div>
            <div
                className="grid grid-cols-3  p-2 rounded flex items-center hover:bg-gray-300 cursor-pointer transition-all duration-500 border-b border-gray-300"
                onClick={handleClickItem}
            >
                <div className="col-span-1 border-r border-gray-300 flex items-center justify-center">
                    <img
                        style={{
                            width: '75%',
                            objectFit: 'cover',
                        }}
                        src={productDetail.images[0]}
                    />
                </div>
                <div className="ml-3 col-span-2 ">
                    <div className="font-bold text-sm select-none">{productDetail.name}</div>
                    <div className="mt-3 font-thin text-red-400 select-none flex items-center">
                        {/* {formatPrice(parseInt(productDetail.price) * parseInt(productDetailInStore.quantity))} */}
                        {formatPrice(productDetail.price)}
                        <span className="ml-12 font-bold text-black">
                            So luong : {productDetailInStore ? productDetailInStore.quantity : 0}
                        </span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 w-full mt-6 ">
                <div className="flex items-center justify-end pl-5">
                    <div
                        className={`p-3 pl-6 pr-6 hover:bg-gray-300 rounded m-1 cursor-pointer border border-gray-400 select-none flex justify-center ${
                            quantity == 1 ? 'cursor-not-allowed bg-gray-200 opacity-70 border-none' : ''
                        }`}
                        style={{ width: 50, height: 50 }}
                        onClick={handleDecreaseQuantity}
                    >
                        -
                    </div>

                    <input
                        value={quantity}
                        style={{ width: '50px' }}
                        className="p-3 rounded m-1 border border-gray-300 text-center"
                        onChange={(e) => {
                            if (e.target.value <= productDetail.quantity) {
                                if (e.target.value.toString() == '') {
                                } else {
                                    filterInputNumber(e.target.value, setQuantity);
                                }
                            }
                        }}
                    />

                    <div
                        onClick={handleIncreaseQuantity}
                        style={{ width: 50, height: 50 }}
                        className={`p-3 pl-6 pr-6 hover:bg-gray-300 rounded m-1 cursor-pointer border border-gray-400 select-none flex justify-center ${
                            quantity == productDetail.quantity
                                ? 'cursor-not-allowed bg-gray-200 opacity-70 border-none'
                                : ''
                        }`}
                    >
                        +
                    </div>
                </div>
                <div className="flex items-center pl-5">
                    <h1 className="font-bold text-sm">
                        {t('product.Total')} :{' '}
                        {formatPrice(
                            parseInt(productDetail.price) *
                                parseInt(productDetailInStore ? productDetailInStore.quantity : 0),
                        )}
                    </h1>
                </div>
                <div className="flex items-center justify-end pr-5">
                    <Button style={{ width: '100%', textAlign: 'center' }}>{t('product.Buy')}</Button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
