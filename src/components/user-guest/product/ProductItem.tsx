import React, { useEffect, useState } from 'react';
import { checkIsFavorite, formatPrice, shortedString } from '../../../untils/Logic';

import { useSelector } from 'react-redux';

import { ReducerProps } from '../../../reducers/ReducersProps';

import Heart from './Heart';

interface ProductItemProps {
    product: any;
}
const ProductItem: React.FC<ProductItemProps> = (props) => {
    const { product } = props;

    const [productCurrent, setProductCurrent] = useState<any>(product);
    const user = useSelector((state: ReducerProps) => state.user);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const handleClickProduct = () => {
        window.location.href = `/product/${product.id}`;
    };
    useEffect(() => {
        if (user.id) {
            setIsFavorite(checkIsFavorite(productCurrent, user.id));
        }
    }, [user]);
    return (
        <div className="relative">
            <div
                onClick={handleClickProduct}
                style={{ height: 320 }}
                className="relative p-3 border border-gray-200 m-1 transition-transform transform cursor-pointer hover:scale-105 duration-500"
            >
                <div>
                    <img style={{ height: 170, objectFit: 'cover', width: '100%' }} src={productCurrent.image} />
                </div>
                <div className="font-bold mt-2" style={{ height: 90 }}>
                    {shortedString(productCurrent.name, 50)}
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
