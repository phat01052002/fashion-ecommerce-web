import React, { useEffect, useState } from 'react';
import { checkIsFavorite, formatPrice, shortedString } from '../../../untils/Logic';
import Heart from '../product/Heart';
import { useSelector } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';

interface FavoriteItemProps {
    product: any;
}
const FavoriteItem: React.FC<FavoriteItemProps> = (props) => {
    const { product } = props;
    const user = useSelector((state: ReducerProps) => state.user);
    const [productCurrent, setProductCurrent] = useState<any>(product);
    const [isFavorite, setIsFavorite] = useState<boolean>(true);
    useEffect(() => {
        if (user.id) {
            setIsFavorite(checkIsFavorite(user, productCurrent.id));
        }
    }, [user]);
    return (
        <div className="p-3 mt-6 rounded border border-gray-300 relative select-none">
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <img
                        className="rounded-xl"
                        style={{
                            height: 120,
                            objectFit: 'cover',
                        }}
                        src={product.image}
                    />
                </div>
                <div className="col-span-2">
                    <div className="font-bold">{shortedString(product.name, 60)}</div>
                    <div className="font-bold text-red-400 mt-6">{formatPrice(product.price)}</div>
                    <div>
                        <Heart
                            bottom={3}
                            right={3}
                            left={undefined}
                            top={undefined}
                            productCurrent={product}
                            setProductCurrent={setProductCurrent}
                            isFavorite={isFavorite}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteItem;
