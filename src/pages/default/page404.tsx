import React from 'react';
import { Button } from '../../components/ComponentsLogin';

interface page404Props {}
const Page404: React.FC<page404Props> = (props) => {
    return (
        <div className="text-center mt-12">
            <div className="font-bold text-3xl">404 not found</div>
            <Button className='mt-12' onClick={() => (window.location.href = '/')}>Home</Button>
        </div>
    );
};

export default Page404;
