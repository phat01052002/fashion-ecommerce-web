import React from 'react';

interface FooterProps {}
const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className="bg-blue-500 mt-12">
            <div
                style={{
                    height: 300,
                }}
                className="grid grid-cols-2 lg:grid-cols-4 container"
            ></div>
        </div>
    );
};
export default Footer;
