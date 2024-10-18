import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../../untils/Logic';

interface ProductItemSearchProps {
    product: any;
}
const ProductItemSearch: React.FC<ProductItemSearchProps> = (props) => {
    const { product } = props;

    return (
        <div className="mt-6 grid grid-cols-3 p-3 border-b border-gray-300">
            <div className="col-span-1 p-3">
                <img
                    className="rounded-xl"
                    style={{
                        width: 300,
                        height: 150,
                        objectFit: 'cover',
                    }}
                    src={product.image}
                />
            </div>
            <div className="col-span-2 p-4">
                <div className="cursor-pointer hover:text-blue-400 transition-all duration-500">{product.name}</div>
                <div className="font-bold text-red-400 mt-6">{formatPrice(product.price)}</div>
            </div>
        </div>
    );
};

export default ProductItemSearch;
