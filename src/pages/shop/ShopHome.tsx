import React from 'react';
import { useParams } from 'react-router-dom';

interface ShopHome {}

const ShopHome: React.FC<ShopHome> = (props) => {
    const { shopId } = useParams();
    return <>{shopId}</>;
};
export default ShopHome;
