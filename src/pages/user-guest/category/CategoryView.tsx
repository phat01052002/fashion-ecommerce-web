import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetGuestApi } from '../../../untils/Api';
import Header from '../../../components/user-guest/header/Header';
import { useTranslation } from 'react-i18next';

const CategoryView: React.FC<any> = (props) => {
    const { categoryId } = useParams();
    const [category, setCategory] = useState<any>(undefined);
    const { t } = useTranslation();
    const [limit, setLimit] = useState<number>(24); //default get 24 product 
    const getDataCategory = async () => {
        const resCategory = await GetGuestApi(`/api/category/${categoryId}`);
        console.log(resCategory.data);
        if (resCategory.data.message == 'Success') {
            setCategory(resCategory.data.category);
        }
    };
    useEffect(() => {
        // getDataCategory();
    }, []);
    return (
        <div>
            <Header />
            <div style={{ marginTop: 120 }}>
                {category ? (
                    <div className="font-bold text-xl m-3">
                        <div>
                            <img
                                className="rounded-xl"
                                style={{
                                    width: '100%',
                                    height: 600,
                                    objectFit: 'cover',
                                }}
                                src={category.image}
                            />
                        </div>
                        <div className="container">
                            <div className="p-3 mt-6 font-bold text-center text-3xl">{category.name}</div>
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-red-500 mt-12"
                            >
                                {t('product.Product')}
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default CategoryView;
