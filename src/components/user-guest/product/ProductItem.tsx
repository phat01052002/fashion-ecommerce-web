import React, { useEffect, useState } from 'react';
import { checkIsFavorite, formatNumber, formatPrice, shortedString } from '../../../untils/Logic';

import { useSelector } from 'react-redux';

import { ReducerProps } from '../../../reducers/ReducersProps';

import Heart from './Heart';
import { useTranslation } from 'react-i18next';

interface ProductItemProps {
    product: any;
}
const ProductItem: React.FC<ProductItemProps> = (props) => {
    const { product } = props;
    const { t } = useTranslation();
    const [productCurrent, setProductCurrent] = useState<any>(product);
    const user = useSelector((state: ReducerProps) => state.user);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const handleClickProduct = () => {
        window.location.href = `/product/${product.id}`;
    };
    useEffect(() => {
        if (user.id) {
            setIsFavorite(checkIsFavorite(user, productCurrent.id));
        }
    }, [user]);
    return (
        <div className="relative">
            <div
                onClick={handleClickProduct}
                style={{ height: 340 }}
                className="relative p-3 border border-gray-200 m-1 transition-transform transform cursor-pointer hover:scale-105 duration-500"
            >
                <div>
                    <img style={{ height: 170, objectFit: 'cover', width: '100%' }} src={productCurrent.image} />
                </div>
                <div className="font-bold mt-1" style={{ height: 80 }}>
                    {shortedString(productCurrent.name, 50)}
                </div>
                <div
                    style={{
                        fontSize: 12,
                    }}
                    className="fot-thin"
                >
                    {t('product.Sold')} : {formatNumber(product.numberSold)}
                </div>
                <div className="text-red-400">{formatPrice(productCurrent.price)}</div>
            </div>

            <Heart
                productCurrent={productCurrent}
                setProductCurrent={setProductCurrent}
                isFavorite={isFavorite}
                bottom={4}
                right={3}
                top={undefined}
                left={undefined}
            />
        </div>
    );
};
export default ProductItem;
