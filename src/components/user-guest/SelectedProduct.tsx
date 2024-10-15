import React, { useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
interface SelectedProductProps {
    productDetail: any;
}

const SelectedProductDetailImage: React.FC<SelectedProductProps> = (props) => {
    const { productDetail } = props;
    const [selectedImage, setSelectedImage] = useState<number>(0);

    return (
        <div className="p-6">
            <Carousel>
                {productDetail.images.map((image: any, index: number) => (
                    <div>
                        <img style={{ objectFit: 'contain' }} src={image} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default SelectedProductDetailImage;
