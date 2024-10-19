import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GetGuestApi } from '../../untils/Api';
import { useSelector, useStore } from 'react-redux';
import { add_list_item_in_cart, change_is_loading, set_number_cart } from '../../reducers/Actions';
import Header from '../../components/user-guest/header/Header';
import { useTranslation } from 'react-i18next';
import { Divider } from '@mui/material';
import {
    addToListCartStore,
    checkIsFavorite,
    filterInputNumber,
    formatPrice,
    shortedString,
    toastSuccess,
} from '../../untils/Logic';
import SelectedProductDetailImage from '../../components/user-guest/SelectedProduct';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button } from '../../components/ComponentsLogin';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import DialogTips from '../../components/dialog/DialogTips';
import ChatIcon from '@mui/icons-material/Chat';
import PageviewIcon from '@mui/icons-material/Pageview';
import Footer from '../../components/user-guest/footer/Footer';
import MultiCaroselProduct from '../../components/user-guest/product/MultiCaroselProduct';
import SkeletonProductItem from '../../components/user-guest/product/SkeletonProductItem';
import Heart from '../../components/user-guest/product/Heart';
import { ReducerProps } from '../../reducers/ReducersProps';
interface ProductProps {}

const Product: React.FC<ProductProps> = (props) => {
    const { productId } = useParams();
    const [products, setProducts] = useState<any>(undefined);
    const [productDetails, setProductDetails] = useState<any>([]);
    const [category, setCategory] = useState<any>(undefined);
    const [selectedProductDetail, setSelectedProductDetail] = useState<any>(undefined);
    const [option1, setOption1] = useState<any>(null);
    const [option2, setOption2] = useState<any>(null);
    const [listOption1, setListOption1] = useState<any>([]);
    const [listOption2, setListOption2] = useState<any>([]);
    const [quantity, setQuantity] = useState<number>(1);
    const [productsSimilar, setProductsSimilar] = useState<any>(undefined);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    //
    const [material, setMaterial] = useState<string>('123');
    const [styles, setStyles] = useState<string>('123');
    const [brand, setBrand] = useState<string>('');
    const [origin, setOrigin] = useState<string>('123');
    const [isExpandedDescribe, setIsExpandedDescribe] = useState(false);
    const [shop, setShop] = useState<any>(undefined);
    //
    const [isOpenDialogTips, setIsOpenDialogTips] = useState<boolean>(false);

    //
    const store = useStore();
    const { t } = useTranslation();
    const nav = useNavigate();
    const user = useSelector((state: ReducerProps) => state.user);

    //
    const toggleExpand = () => {
        setIsExpandedDescribe((prev: any) => !prev);
    };
    //
    const handleAddToCart = () => {
        addToListCartStore(selectedProductDetail.id, quantity, selectedProductDetail);
        store.dispatch(set_number_cart(quantity));
        store.dispatch(add_list_item_in_cart(selectedProductDetail));
        toastSuccess(t('auth.Success'));
    };
    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity((prev: any) => parseInt(prev) - 1);
    };
    const handleIncreaseQuantity = () => {
        if (quantity < selectedProductDetail.quantity) setQuantity((prev: any) => parseInt(prev) + 1);
    };
    //
    const getData = async () => {
        store.dispatch(change_is_loading(true));
        const resProduct = await GetGuestApi(`/api/product/${productId}`);
        if (resProduct.status == 200) {
            setProducts(resProduct.data.product);
            //category
            const resCategory = await GetGuestApi(`/api/category/${resProduct.data.product.categoryId}`);
            if (resCategory.status == 200) {
                setCategory(resCategory.data.category);
            }
            //Info more
            // if (resProduct.data.product.stylesId) {
            //     const resStyles = await GetGuestApi(`/api/styles/${resProduct.data.product.stylesId}`);
            //     if (resStyles.data.message == 'Success') {
            //         setStyles(resStyles.data.styles.name);
            //     }
            // } else {
            //     setStyles(resProduct.data.product.stylesOrther);
            // }
            // if (resProduct.data.product.originId) {
            //     const resOrigin = await GetGuestApi(`/api/origin/${resProduct.data.product.originId}`);
            //     if (resOrigin.data.message == 'Success') {
            //         setOrigin(resOrigin.data.origin.name);
            //     }
            // } else {
            //     setOrigin(resProduct.data.product.originOrther);
            // }
            // if (resProduct.data.product.materialId) {
            //     const resMaterial = await GetGuestApi(`/api/material/${resProduct.data.product.materialId}`);
            //     if (resMaterial.data.message == 'Success') {
            //         setMaterial(resMaterial.data.material.name);
            //     }
            // } else {
            //     setMaterial(resProduct.data.product.materialOrther);
            // }
            if (resProduct.data.product.brandId) {
                const resBrand = await GetGuestApi(`/api/brand/${resProduct.data.product.brandId}`);
                if (resBrand.data.message == 'Success') {
                    setBrand(resBrand.data.brand.name);
                }
            } else {
                setBrand(resProduct.data.product.brandOrther);
            }
            //
            if (resProduct.data.product.shopId) {
                const resShop = await GetGuestApi(`/api/shop/${resProduct.data.product.shopId}`);
                if (resShop.data.message == 'Success') {
                    setShop(resShop.data.shop);
                }
            }
            //
        }
        const resProductDetail = await GetGuestApi(`/api/product-detail-by-product/${productId}`);
        if (resProductDetail.status == 200) {
            setProductDetails(resProductDetail.data.productDetail);
            if (resProductDetail.data.productDetail.length > 0) {
                const productDetailFirst = resProductDetail.data.productDetail.find(
                    (productDetail: any) => productDetail.quantity > 0,
                );
                setSelectedProductDetail(productDetailFirst);
                if (productDetailFirst.option1) {
                    setOption1(productDetailFirst.option1);
                    setListOption2(
                        findListOption2ByOption1(productDetailFirst.option1, resProductDetail.data.productDetail),
                    );
                }
                if (productDetailFirst.option2) {
                    setOption2(productDetailFirst.option2);
                    setListOption1(
                        findListOption1ByOption2(productDetailFirst.option2, resProductDetail.data.productDetail),
                    );
                }
            }
        }

        store.dispatch(change_is_loading(false));
        if (resProduct.status == 200) {
            const limit = 10;
            const resProductsSimilar = await GetGuestApi(`/api/product-similar/${resProduct.data.product.id}/${limit}`);
            if (resProductsSimilar.data.message == 'Success') {
                setProductsSimilar(resProductsSimilar.data.productsSimilar);
            }
        }
    };

    //find
    const findListOption1ByOption2 = (option2: string, productDetails: any) => {
        let listOption1: string[] = [];
        productDetails.map((productDetail: any) => {
            if (productDetail.option2 == option2 && productDetail.quantity > 0) {
                listOption1 = [...listOption1, productDetail.option1];
            }
        });
        return listOption1;
    };
    const findListOption2ByOption1 = (option1: string, productDetails: any) => {
        let listOption2: string[] = [];
        productDetails.map((productDetail: any) => {
            if (productDetail.option1 == option1 && productDetail.quantity > 0) {
                listOption2 = [...listOption2, productDetail.option2];
            }
        });
        return listOption2;
    };
    const findProductDetailByOption2 = (option2Value: string) => {
        if (option2Value) {
            return productDetails.find((productDetail: any) => productDetail.option2.includes(option2Value));
        }
    };

    const findProductDetailByOptions = (option1Value: string, option2Value: string) => {
        if (option1Value && option2Value) {
            return productDetails.find(
                (productDetail: any) =>
                    productDetail.option1.includes(option1Value) && productDetail.option2.includes(option2Value),
            );
        }
    };

    //
    //select option
    const selectOption1 = (option1: string) => {
        if (option2) {
            setOption1(option1);
            setListOption2(findListOption2ByOption1(option1, productDetails));
        }
    };
    const selectOption2 = (option2: string) => {
        if (option1) {
            setOption2(option2);
            setListOption1(findListOption1ByOption2(option2, productDetails));
        }
    };
    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        if (user.id && products) {
            setIsFavorite(checkIsFavorite(user, products.id));
        }
    }, [user, products]);
    return (
        <div>
            <Header />
            <div style={{ marginTop: 120 }} className="container">
                <div className="flex items-center ml-12 ">
                    <div className="m-3 hover:underline cursor-pointer" onClick={() => nav('/')}>
                        Home
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className="m-3 hover:underline cursor-pointer">{category?.name}</div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className="m-3 hover:underline cursor-pointer">
                        {products ? shortedString(products.name, 24) : ''}
                    </div>
                </div>
                <div className="lg:grid  lg:grid-cols-2 box-shadow mt-3 relative">
                    <Heart
                        productCurrent={products}
                        setProductCurrent={setProducts}
                        isFavorite={isFavorite}
                        bottom={undefined}
                        right={3}
                        top={4}
                        left={undefined}
                    />
                    {selectedProductDetail ? (
                        <SelectedProductDetailImage productDetail={selectedProductDetail} />
                    ) : null}
                    {products && selectedProductDetail ? (
                        <div className="p-6">
                            <div className="flex mt-3">
                                <div className="font-thin m-2">{`${t('product.NumberSold')}  ${
                                    selectedProductDetail.numberSold
                                }`}</div>
                                <Divider orientation="vertical" variant="middle" flexItem />

                                <div className="font-thin m-2">{`${t('product.Quantity')}  ${
                                    selectedProductDetail.quantity
                                }`}</div>
                            </div>
                            <div className="font-bold text-xl mt-3">{products.name}</div>

                            <div className="mt-3 text-red-400 font-bold text-xl">
                                {formatPrice(selectedProductDetail.price)}
                            </div>

                            {option1 ? (
                                <div className="mt-3">
                                    <div className="font-thin text-xl font-bold">{t('product.Size')}</div>

                                    <div className="flex select-none grid grid-cols-4 lg:grid-cols-6">
                                        {products.options.size.map((size: any, index: number) => (
                                            <div
                                                style={{
                                                    minWidth: 50,
                                                }}
                                                className={`relative m-3 p-3  border-gray-300 rounded cursor-pointer flex items-center justify-center ${
                                                    option1 == size ? 'border-blue-500 border-4' : 'border'
                                                } ${
                                                    listOption1.includes(size)
                                                        ? 'bg-white hover:bg-gray-300'
                                                        : 'bg-gray-400 cursor-not-allowed opacity-70'
                                                }`}
                                                onClick={() => {
                                                    if (listOption1.includes(size)) {
                                                        setSelectedProductDetail(
                                                            findProductDetailByOptions(size, option2),
                                                        );

                                                        selectOption1(size);
                                                    }
                                                }}
                                            >
                                                <h1>{size}</h1>
                                                {option1 == size ? (
                                                    <div
                                                        className="absolute text-blue-500"
                                                        style={{
                                                            top: -10,
                                                            right: -5,
                                                        }}
                                                    >
                                                        <CheckCircleIcon
                                                            sx={{
                                                                height: 15,
                                                                width: 15,
                                                            }}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            {option2 ? (
                                <div className="mt-3">
                                    <div className="font-thin text-xl font-bold">{t('product.Color')}</div>

                                    <div className="grid grid-cols-2 xl:grid-cols-3  select-none">
                                        {products.options.color.map((color: any, index: number) => (
                                            <div
                                                className={`relative m-3 p-3  border-gray-300 rounded cursor-pointer  flex items-center justify-center ${
                                                    option2 == color ? 'border-blue-500 border-4' : 'border'
                                                } ${
                                                    listOption2.includes(color)
                                                        ? 'bg-white hover:bg-gray-300'
                                                        : 'bg-gray-400 cursor-not-allowed opacity-70'
                                                }`}
                                                onClick={() => {
                                                    if (listOption2.includes(color)) {
                                                        setSelectedProductDetail(
                                                            findProductDetailByOptions(option1, color),
                                                        );
                                                        selectOption2(color);
                                                    }
                                                }}
                                            >
                                                <img
                                                    className="rounded"
                                                    style={{ objectFit: 'contain', width: 30, height: 30 }}
                                                    src={findProductDetailByOption2(color).images[0]}
                                                />
                                                <h1 className="ml-3">{color}</h1>
                                                {option2 == color ? (
                                                    <div
                                                        className="absolute text-blue-500 "
                                                        style={{
                                                            top: -10,
                                                            right: -5,
                                                        }}
                                                    >
                                                        <CheckCircleIcon
                                                            sx={{
                                                                height: 15,
                                                                width: 15,
                                                            }}
                                                        />
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                            <Button
                                className="mt-5 font-bold text-xl flex items-center cursor-pointer"
                                style={{ height: 40 }}
                                onClick={() => setIsOpenDialogTips(true)}
                            >
                                <TipsAndUpdatesIcon /> &nbsp;
                                <h1>{t('product.SizeTip')}</h1>
                            </Button>
                            <div className="flex items-center w-full mt-6">
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
                                        if (e.target.value <= selectedProductDetail.quantity) {
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
                                        quantity == selectedProductDetail.quantity
                                            ? 'cursor-not-allowed bg-gray-200 opacity-70 border-none'
                                            : ''
                                    }`}
                                >
                                    +
                                </div>
                            </div>
                            <div className="flex items-center w-full mt-3">
                                <Button
                                    className="mt-2 mb-2  mr-3 font-bold"
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                    onClick={handleAddToCart}
                                >
                                    <AddShoppingCartIcon sx={{ height: 14, width: 14 }} /> &nbsp;
                                    {t('product.AddToCart')}
                                </Button>
                                <Button className="mt-2 mb-2 ml-3  font-bold">{t('product.BuyNow')}</Button>
                            </div>
                        </div>
                    ) : null}
                </div>
                {shop ? (
                    <div className="box-shadow p-3 rounded mt-6">
                        <div className=" border-b border-gray-300 flex">
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-red-500"
                            >
                                {t('product.Shop')}
                            </div>
                        </div>

                        <div className="flex mt-3 rounded-xl p-3">
                            <div className="col-span-1 rounded flex items-center">
                                <img
                                    className="rounded-xl"
                                    style={{ height: 120, objectFit: 'contain' }}
                                    src={shop.image}
                                />
                            </div>
                            <div className="col-span-2 ml-6">
                                <div className="font-bold text-xl">{shop.name}</div>
                                <div className="flex items-center mt-8">
                                    <div>
                                        <Button style={{ backgroundColor: 'white', color: 'black' }}>
                                            <ChatIcon />
                                            Chat ngay
                                        </Button>
                                    </div>
                                    <div className="ml-3">
                                        <Button onClick={() => (window.location.href = `/shop-view/${shop.id}`)}>
                                            <PageviewIcon />
                                            Xem shop
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                {products ? (
                    <div className="box-shadow p-3 rounded mt-6">
                        <div className="mt-6 border-b border-gray-300 flex">
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-red-500"
                            >
                                {t('product.Info')}
                            </div>
                        </div>

                        <div style={{ width: '70%' }} className="p-3">
                            <div className="mt-3 grid grid-cols-2">
                                <div
                                    style={{ height: 50 }}
                                    className="border broder-gray-300 p-3 text-center font-bold"
                                >
                                    {t('product.Material')}
                                </div>
                                <div className="border broder-gray-300 p-3 text-center">{material}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div
                                    style={{ height: 50 }}
                                    className="border broder-gray-300 p-3 text-center font-bold"
                                >
                                    {t('product.Styles')}
                                </div>
                                <div className="border broder-gray-300 p-3 text-center">{styles}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div
                                    style={{ height: 50 }}
                                    className="border broder-gray-300 p-3 text-center font-bold"
                                >
                                    {t('product.Brand')}
                                </div>
                                <div className="border broder-gray-300 p-3 text-center">{brand}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div
                                    style={{ height: 50 }}
                                    className="border broder-gray-300 p-3 text-center font-bold"
                                >
                                    {t('product.Origin')}
                                </div>
                                <div className="border broder-gray-300 p-3 text-center">{origin}</div>
                            </div>
                        </div>
                        <div className="mt-6 border-b border-gray-300 flex">
                            <div
                                style={{
                                    borderBottomWidth: 3,
                                }}
                                className="font-bold text-2xl border-b border-solid  border-red-500"
                            >
                                {t('product.Describe')}
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className={`description ${isExpandedDescribe ? 'expanded' : 'collapsed'}`}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: isExpandedDescribe
                                            ? products.describe
                                            : products.describe.split('<p>').slice(0, 2).join('<p>'),
                                    }}
                                ></div>
                                {!isExpandedDescribe && <div className="fade-out"></div>}
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    className="cursor-pointer text-blue-400 font-bold text-sm"
                                    onClick={toggleExpand}
                                >
                                    {isExpandedDescribe ? 'Thu gọn' : 'Xem thêm'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="box-shadow p-3 rounded mt-6">
                    <div className="mt-6 border-b border-gray-300 flex">
                        <div
                            style={{
                                borderBottomWidth: 3,
                            }}
                            className="font-bold text-2xl border-b border-solid  border-red-500"
                        >
                            {t('product.ProductSimilar')}
                        </div>
                    </div>
                    {productsSimilar ? (
                        <div className="mt-6">
                            <MultiCaroselProduct listProduct={productsSimilar} />
                        </div>
                    ) : (
                        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            <div>
                                <SkeletonProductItem />
                            </div>
                            <div>
                                <SkeletonProductItem />
                            </div>
                            <div>
                                <SkeletonProductItem />
                            </div>
                            <div className="block sm:hidden lg:block">
                                <SkeletonProductItem />
                            </div>
                            <div className="block lg:hidden xl:block">
                                <SkeletonProductItem />
                            </div>
                            <div className="block lg:hidden xl:block">
                                <SkeletonProductItem />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <DialogTips isOpen={isOpenDialogTips} setIsOpen={setIsOpenDialogTips} />
            {products ? <Footer /> : null}
        </div>
    );
};

export default Product;
