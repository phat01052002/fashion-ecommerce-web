import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector, useStore } from 'react-redux';
import { ReducerProps } from '../../../reducers/ReducersProps';
import { typeRole } from '../../../common/Common';
import { change_is_loading, change_user } from '../../../reducers/Actions';
import { PostApi } from '../../../untils/Api';
import { AlertLogin } from '../../alert/Alert';
interface HeartProps {
    top: number | undefined;
    left: number | undefined;
    right: number | undefined;
    bottom: number | undefined;
    productCurrent: any;
    isFavorite: boolean;
    setProductCurrent: any;
}
const Heart: React.FC<HeartProps> = (props) => {
    const { top, left, right, bottom, productCurrent, isFavorite, setProductCurrent } = props;
    const store = useStore();
    const user = useSelector((state: ReducerProps) => state.user);
    const role = useSelector((state: ReducerProps) => state.role);
    const handleUnFavorite = async () => {
        store.dispatch(change_is_loading(true));
        if (role == typeRole.USER) {
            if (user.productFavoriteIdList.includes(productCurrent.id)) {
                const resFavorite = await PostApi('/user/un-favorite-product', localStorage.getItem('token'), {
                    productId: productCurrent.id,
                });
                if (resFavorite.data.message == 'Success') {
                    store.dispatch(change_user(resFavorite.data.user));
                    let new_product = productCurrent;
                    new_product.userFavoriteIdList = productCurrent.userFavoriteIdList.filter(
                        (item: any) => item !== user.id,
                    );
                    setProductCurrent(new_product);
                }
            }
        }
        store.dispatch(change_is_loading(false));
    };
    const handleFavorite = async () => {
        store.dispatch(change_is_loading(true));
        if (role == typeRole.USER) {
            if (!user.productFavoriteIdList.includes(productCurrent.id)) {
                const resFavorite = await PostApi('/user/favorite-product', localStorage.getItem('token'), {
                    productId: productCurrent.id,
                });
                if (resFavorite.data.message == 'Success') {
                    store.dispatch(change_user(resFavorite.data.user));
                    let new_product = productCurrent;
                    new_product.userFavoriteIdList = [...new_product.userFavoriteIdList, user.id];
                    setProductCurrent(new_product);
                }
            }
        } else {
            AlertLogin();
        }
        store.dispatch(change_is_loading(false));
    };
    return (
        <div className={`absolute bottom-${bottom} right-${right} top-${top} left-${left} flex items-center`}>
            {isFavorite ? (
                <div
                    onClick={handleUnFavorite}
                    className="ml-3 transition-transform transform cursor-pointer hover:scale-110 duration-300"
                >
                    <FavoriteIcon sx={{ height: 29, width: 29 }} className="text-blue-500" />
                </div>
            ) : (
                <div
                    onClick={handleFavorite}
                    className="ml-3 transition-transform transform cursor-pointer hover:scale-110 duration-300"
                >
                    <FavoriteBorderIcon sx={{ height: 29, width: 29 }} className="text-blue-500" />
                </div>
            )}
        </div>
    );
};
export default Heart;
